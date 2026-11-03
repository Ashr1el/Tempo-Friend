export type UserRole = "participant" | "host" | "admin";

export type UserStatus = "active" | "suspended" | "deletion_pending" | "deleted";

export type BookingStatus =
  | "requested"
  | "accepted"
  | "declined"
  | "cancelled_by_participant"
  | "cancelled_by_host"
  | "expired"
  | "completed"
  | "no_show";

export type SessionStatus = "scheduled" | "active" | "ended" | "expired" | "cancelled";

export type ExtensionDecision = "pending" | "accepted" | "declined" | "expired" | "conflict";

export type ReportCategory =
  | "harassment"
  | "threat"
  | "illegal_content"
  | "minor_suspicion"
  | "fraud"
  | "privacy"
  | "professional_service_misrepresentation"
  | "other";

export type ReportStatus = "open" | "reviewing" | "closed" | "escalated";

export type PrivacyRequestType =
  | "export"
  | "delete_one_conversation"
  | "delete_all_history"
  | "account_delete";

export type PrivacyRequestStatus =
  | "received"
  | "processing"
  | "completed"
  | "rejected_with_reason";

export type ConsentDocumentType = "terms" | "privacy" | "community_rules";

export interface Profile {
  user_id: string;
  display_name: string;
  adult_confirmed_at: string;
  email_verified_at: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface AvailabilitySlot {
  id: string;
  starts_at: string;
  ends_at: string;
  status: "open" | "hidden" | "closed";
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  slot_id: string;
  participant_id: string;
  status: BookingStatus;
  requested_at: string;
  decided_at: string | null;
  cancelled_at: string | null;
  decision_note_code: string | null;
  created_at: string;
  updated_at: string;
  slot?: AvailabilitySlot;
  participant?: Profile;
}

export interface Session {
  id: string;
  booking_id: string;
  status: SessionStatus;
  started_at: string | null;
  initial_ends_at: string;
  ends_at: string;
  ended_at: string | null;
  ended_by: string | null;
  created_at: string;
  updated_at: string;
  booking?: Booking;
}

export interface Message {
  id: string;
  session_id: string;
  sender_id: string;
  body: string;
  created_at: string;
  expires_at: string | null;
  deleted_at: string | null;
  sender?: Profile;
}

export interface ExtensionRequest {
  id: string;
  session_id: string;
  requested_at: string;
  decision: ExtensionDecision;
  decided_at: string | null;
  decided_by: string | null;
  new_ends_at: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  session_id: string;
  category: ReportCategory;
  description: string | null;
  status: ReportStatus;
  created_at: string;
  closed_at: string | null;
  reporter?: Profile;
  session?: Session;
}

export interface ReportEvidence {
  id: string;
  report_id: string;
  original_message_id: string | null;
  message_snapshot: string;
  sender_label: string;
  message_created_at: string;
  retention_until: string;
  created_at: string;
}

export interface ConsentRecord {
  id: string;
  user_id: string;
  document_type: ConsentDocumentType;
  document_version: string;
  accepted_at: string;
  withdrawn_at: string | null;
  created_at: string;
}

export interface PrivacyRequest {
  id: string;
  user_id: string;
  request_type: PrivacyRequestType;
  target_session_id: string | null;
  status: PrivacyRequestStatus;
  requested_at: string;
  completed_at: string | null;
  reason_code: string | null;
}

export interface AdminAuditLog {
  id: string;
  actor_id: string;
  action: string;
  target_type: string;
  target_id: string | null;
  reason_code: string;
  created_at: string;
}

export interface DonationEvent {
  id: string;
  provider: string;
  provider_reference: string;
  amount_cents: number;
  currency: string;
  status: "pending" | "received" | "refunded" | "reversed" | "failed";
  received_at: string | null;
  created_at: string;
}

export interface HostTimeBlock {
  id: string;
  booking_id: string;
  time_range: string; // tstzrange as string
  block_type: "initial_session" | "extension";
  status: "active" | "released";
  created_at: string;
}