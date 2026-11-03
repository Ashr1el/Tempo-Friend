-- Migration: 001_initial_schema.sql
-- Esquema inicial PostgreSQL para o MVP do Tempo Friend
-- Execute este script no Supabase SQL Editor

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Perfil mínimo associado ao usuário do provedor de autenticação
CREATE TABLE profiles (
  user_id uuid PRIMARY KEY,
  display_name text NOT NULL CHECK (length(display_name) BETWEEN 1 AND 60),
  adult_confirmed_at timestamptz NOT NULL,
  email_verified_at timestamptz,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','suspended','deletion_pending','deleted')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Registros de consentimento versionados
CREATE TABLE consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(user_id),
  document_type text NOT NULL CHECK (document_type IN ('terms','privacy','community_rules')),
  document_version text NOT NULL,
  accepted_at timestamptz NOT NULL DEFAULT now(),
  withdrawn_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX consent_records_user_idx ON consent_records(user_id, accepted_at DESC);

-- Horários concretos publicados pelo anfitrião
CREATE TABLE availability_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','hidden','closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at > starts_at),
  CHECK (ends_at - starts_at >= interval '15 minutes')
);
CREATE INDEX availability_slots_open_idx ON availability_slots(starts_at) WHERE status = 'open';

-- Solicitações de reserva
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id uuid NOT NULL UNIQUE REFERENCES availability_slots(id),
  participant_id uuid NOT NULL REFERENCES profiles(user_id),
  status text NOT NULL DEFAULT 'requested' CHECK (status IN (
    'requested','accepted','declined','cancelled_by_participant',
    'cancelled_by_host','expired','completed','no_show'
  )),
  requested_at timestamptz NOT NULL DEFAULT now(),
  decided_at timestamptz,
  cancelled_at timestamptz,
  decision_note_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX bookings_participant_idx ON bookings(participant_id, requested_at DESC);
CREATE INDEX bookings_status_idx ON bookings(status, requested_at);

-- Sessões de conversa
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL UNIQUE REFERENCES bookings(id),
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled','active','ended','expired','cancelled')),
  started_at timestamptz,
  initial_ends_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  ended_at timestamptz,
  ended_by uuid REFERENCES profiles(user_id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at >= initial_ends_at),
  CHECK (ended_at IS NULL OR started_at IS NOT NULL)
);

-- Bloqueios de agenda do anfitrião (impede sobreposição)
CREATE TABLE host_time_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_key text NOT NULL DEFAULT 'primary-host',
  booking_id uuid NOT NULL REFERENCES bookings(id),
  time_range tstzrange NOT NULL,
  block_type text NOT NULL CHECK (block_type IN ('initial_session','extension')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','released')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(time_range)),
  EXCLUDE USING gist (
    host_key WITH =,
    time_range WITH &&
  ) WHERE (status = 'active')
);
CREATE INDEX host_time_blocks_booking_idx ON host_time_blocks(booking_id);

-- Pedidos de extensão (máximo 1 por sessão)
CREATE TABLE extension_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL UNIQUE REFERENCES sessions(id),
  requested_at timestamptz NOT NULL DEFAULT now(),
  decision text NOT NULL DEFAULT 'pending' CHECK (decision IN ('pending','accepted','declined','expired','conflict')),
  decided_at timestamptz,
  decided_by uuid REFERENCES profiles(user_id),
  new_ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Mensagens do chat
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id),
  sender_id uuid NOT NULL REFERENCES profiles(user_id),
  body text NOT NULL CHECK (length(body) BETWEEN 1 AND 8000),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  deleted_at timestamptz
);
CREATE INDEX messages_session_created_idx ON messages(session_id, created_at);
CREATE INDEX messages_expiry_idx ON messages(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX messages_sender_idx ON messages(sender_id, created_at DESC);

-- Denúncias
CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid NOT NULL REFERENCES profiles(user_id),
  session_id uuid NOT NULL REFERENCES sessions(id),
  category text NOT NULL CHECK (category IN (
    'harassment','threat','illegal_content','minor_suspicion',
    'fraud','privacy','professional_service_misrepresentation','other'
  )),
  description text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','reviewing','closed','escalated')),
  created_at timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz
);
CREATE INDEX reports_status_idx ON reports(status, created_at);

-- Evidências de denúncia (cópia mínima das mensagens selecionadas)
CREATE TABLE report_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES reports(id),
  original_message_id uuid,
  message_snapshot text NOT NULL,
  sender_label text NOT NULL,
  message_created_at timestamptz NOT NULL,
  retention_until timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX report_evidence_retention_idx ON report_evidence(retention_until);

-- Solicitações de privacidade (LGPD)
CREATE TABLE privacy_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(user_id),
  request_type text NOT NULL CHECK (request_type IN (
    'export','delete_one_conversation','delete_all_history','account_delete'
  )),
  target_session_id uuid REFERENCES sessions(id),
  status text NOT NULL DEFAULT 'received' CHECK (status IN (
    'received','processing','completed','rejected_with_reason'
  )),
  requested_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  reason_code text
);

-- Log de auditoria administrativa
CREATE TABLE admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid NOT NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid,
  reason_code text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX admin_audit_actor_idx ON admin_audit_log(actor_id, created_at DESC);

-- Eventos de doação (criar somente após validação PIX)
CREATE TABLE donation_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  provider_reference text NOT NULL UNIQUE,
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  currency char(3) NOT NULL DEFAULT 'BRL',
  status text NOT NULL CHECK (status IN ('pending','received','refunded','reversed','failed')),
  received_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - Habilitar em todas as tabelas
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE host_time_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE extension_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_events ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- POLÍTICAS RLS BÁSICAS
-- ============================================================

-- profiles: usuário vê/edita próprio perfil
CREATE POLICY "profiles_own_select" ON profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_own_update" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- consent_records: usuário vê próprios consentimentos
CREATE POLICY "consent_own_select" ON consent_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "consent_own_insert" ON consent_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- availability_slots: todos veem slots abertos (apenas starts_at, ends_at)
CREATE POLICY "slots_public_select" ON availability_slots
  FOR SELECT USING (status = 'open');

-- bookings: participante vê próprias reservas
CREATE POLICY "bookings_participant_select" ON bookings
  FOR SELECT USING (auth.uid() = participant_id);
CREATE POLICY "bookings_participant_insert" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = participant_id);
CREATE POLICY "bookings_participant_update" ON bookings
  FOR UPDATE USING (auth.uid() = participant_id);

-- sessions: participante vê próprias sessões
CREATE POLICY "sessions_participant_select" ON sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = sessions.booking_id
      AND b.participant_id = auth.uid()
    )
  );

-- messages: participante vê mensagens de suas sessões (enquanto não expiradas)
CREATE POLICY "messages_participant_select" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM sessions s
      JOIN bookings b ON b.id = s.booking_id
      WHERE s.id = messages.session_id
      AND b.participant_id = auth.uid()
      AND (messages.expires_at IS NULL OR messages.expires_at > now())
    )
  );
CREATE POLICY "messages_participant_insert" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM sessions s
      JOIN bookings b ON b.id = s.booking_id
      WHERE s.id = session_id
      AND b.participant_id = auth.uid()
      AND s.status = 'active'
    )
  );

-- extension_requests: participante vê/insere próprios pedidos
CREATE POLICY "ext_participant_select" ON extension_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM sessions s
      JOIN bookings b ON b.id = s.booking_id
      WHERE s.id = extension_requests.session_id
      AND b.participant_id = auth.uid()
    )
  );
CREATE POLICY "ext_participant_insert" ON extension_requests
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions s
      JOIN bookings b ON b.id = s.booking_id
      WHERE s.id = session_id
      AND b.participant_id = auth.uid()
      AND s.status = 'active'
    )
  );

-- reports: participante cria/ vê próprias denúncias
CREATE POLICY "reports_own_select" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);
CREATE POLICY "reports_own_insert" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- report_evidence: participante insere evidências em próprias denúncias
CREATE POLICY "evidence_own_insert" ON report_evidence
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM reports r
      WHERE r.id = report_evidence.report_id
      AND r.reporter_id = auth.uid()
    )
  );

-- privacy_requests: usuário gerencia próprias solicitações
CREATE POLICY "privacy_own_all" ON privacy_requests
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- FUNÇÕES AUXILIARES (RPC) - Para operações transacionais seguras
-- ============================================================

-- Solicitar reserva (valida antecedência, slot livre, cria booking)
CREATE OR REPLACE FUNCTION request_booking(p_slot_id uuid, p_participant_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_slot availability_slots%ROWTYPE;
  v_profile profiles%ROWTYPE;
BEGIN
  -- Bloqueia o slot
  SELECT * INTO v_slot FROM availability_slots WHERE id = p_slot_id FOR UPDATE;
  IF NOT FOUND OR v_slot.status <> 'open' THEN
    RAISE EXCEPTION 'Slot não disponível';
  END IF;

  -- Valida antecedência mínima (12h)
  IF v_slot.starts_at < now() + interval '12 hours' THEN
    RAISE EXCEPTION 'Antecedência mínima de 12 horas';
  END IF;

  -- Valida perfil ativo e maioridade
  SELECT * INTO v_profile FROM profiles WHERE user_id = p_participant_id;
  IF NOT FOUND OR v_profile.status <> 'active' OR v_profile.adult_confirmed_at IS NULL THEN
    RAISE EXCEPTION 'Perfil inválido ou maioridade não confirmada';
  END IF;

  -- Cria booking
  INSERT INTO bookings (slot_id, participant_id, status, requested_at)
  VALUES (p_slot_id, p_participant_id, 'requested', now());

  -- Marca slot como reservado temporariamente
  UPDATE availability_slots SET status = 'hidden', updated_at = now() WHERE id = p_slot_id;
END;
$$;

-- Aceitar reserva (cria sessão + host_time_block)
CREATE OR REPLACE FUNCTION accept_booking(p_booking_id uuid, p_host_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_booking bookings%ROWTYPE;
  v_slot availability_slots%ROWTYPE;
  v_session_id uuid;
BEGIN
  SELECT * INTO v_booking FROM bookings WHERE id = p_booking_id FOR UPDATE;
  IF NOT FOUND OR v_booking.status <> 'requested' THEN
    RAISE EXCEPTION 'Reserva não encontrada ou não está pendente';
  END IF;

  SELECT * INTO v_slot FROM availability_slots WHERE id = v_booking.slot_id FOR UPDATE;
  IF v_slot.starts_at < now() + interval '12 hours' THEN
    RAISE EXCEPTION 'Antecedência mínima não atendida no momento do aceite';
  END IF;

  -- Cria sessão
  INSERT INTO sessions (booking_id, initial_ends_at, ends_at, status)
  VALUES (p_booking_id, v_slot.starts_at + interval '15 minutes', v_slot.starts_at + interval '15 minutes', 'scheduled')
  RETURNING id INTO v_session_id;

  -- Cria bloqueio de agenda
  INSERT INTO host_time_blocks (booking_id, time_range, block_type)
  VALUES (p_booking_id, tstzrange(v_slot.starts_at, v_slot.starts_at + interval '15 minutes', '[)'), 'initial_session');

  -- Atualiza booking e slot
  UPDATE bookings SET status = 'accepted', decided_at = now() WHERE id = p_booking_id;
  UPDATE availability_slots SET status = 'closed', updated_at = now() WHERE id = v_booking.slot_id;
END;
$$;

-- Encerrar sessão (idempotente, define expires_at das mensagens)
CREATE OR REPLACE FUNCTION end_session(p_session_id uuid, p_ended_by uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_session sessions%ROWTYPE;
  v_ended_at timestamptz := now();
BEGIN
  SELECT * INTO v_session FROM sessions WHERE id = p_session_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Sessão não encontrada';
  END IF;
  IF v_session.status IN ('ended','expired','cancelled') THEN
    RETURN; -- Idempotente
  END IF;

  UPDATE sessions
  SET status = 'ended', ended_at = v_ended_at, ended_by = p_ended_by, updated_at = v_ended_at
  WHERE id = p_session_id;

  -- Define expiração das mensagens (30 dias)
  UPDATE messages
  SET expires_at = v_ended_at + interval '30 days'
  WHERE session_id = p_session_id AND expires_at IS NULL;
END;
$$;

-- ============================================================
-- TRIGGERS PARA updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_availability_slots_updated_at BEFORE UPDATE ON availability_slots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();