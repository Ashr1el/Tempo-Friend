# Schema inicial do banco de dados

**Arquivo original:** `schema_inicial.sql`

Este é o esquema inicial PostgreSQL. Ele deve ser adaptado ao provedor de autenticação e receber políticas RLS antes de ser usado em produção.

```sql
-- Esquema inicial PostgreSQL para o MVP.
-- Adaptar referências de autenticação e políticas RLS ao provedor escolhido.
-- Todas as datas são timestamptz (UTC). Horários são exibidos em America/Sao_Paulo.

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE profiles (
  user_id uuid PRIMARY KEY,
  display_name text NOT NULL CHECK (length(display_name) BETWEEN 1 AND 60),
  adult_confirmed_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','suspended','deletion_pending','deleted')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

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

CREATE TABLE availability_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','held','closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at > starts_at),
  CHECK (ends_at - starts_at >= interval '15 minutes')
);
CREATE INDEX availability_slots_open_idx ON availability_slots(starts_at) WHERE status = 'open';

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

-- Bloqueios de agenda. A constraint impede sessões/extensões sobrepostas
-- para o anfitrião único do MVP. A aplicação deve criar/estender os bloqueios
-- dentro da mesma transação que atualiza booking/session.
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

-- Manter desabilitado até validação jurídica/contábil e escolha de PSP/PIX.
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

-- NOTAS DE IMPLEMENTAÇÃO OBRIGATÓRIAS:
-- 1. Não expor tabelas diretamente sem RLS/políticas de autorização testadas.
-- 2. O backend deve validar antecedência mínima de 12h no instante da reserva.
-- 3. O backend deve validar o pedido de extensão após 14 minutos e antes do fim inicial.
-- 4. A aprovação da extensão deve estender o host_time_blocks em transação; a EXCLUDE constraint
--    rejeita conflito. Tratar SQLSTATE 23P01 como conflito de agenda.
-- 5. Ao encerrar sessão, definir expires_at = ended_at + interval '30 days' nas mensagens.
-- 6. O job de expurgo remove mensagens expiradas; evidências seguem retenção própria.
-- 7. O anfitrião não recebe permissão de SELECT geral em messages para sessões encerradas.
-- 8. Não armazenar áudio ao vivo. Não inserir STT no histórico sem confirmação explícita do usuário.
```
