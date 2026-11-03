export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Tempo Friend";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const TIMEZONE = process.env.NEXT_PUBLIC_TIMEZONE || "America/Sao_Paulo";

export const SESSION_DURATION_MINUTES = 15;
export const EXTENSION_DURATION_MINUTES = 15;
export const EXTENSION_REQUEST_MINUTE = 14;
export const MIN_BOOKING_ADVANCE_HOURS = 12;
export const MESSAGE_RETENTION_DAYS = 30;
export const MAX_MESSAGE_LENGTH = 8000;

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  requested: "Solicitada",
  accepted: "Confirmada",
  declined: "Recusada",
  cancelled_by_participant: "Cancelada por você",
  cancelled_by_host: "Cancelada pelo anfitrião",
  expired: "Expirada",
  completed: "Concluída",
  no_show: "Não compareceu",
};

export const SESSION_STATUS_LABELS: Record<string, string> = {
  scheduled: "Agendada",
  active: "Em andamento",
  ended: "Encerrada",
  expired: "Expirada",
  cancelled: "Cancelada",
};

export const EXTENSION_DECISION_LABELS: Record<string, string> = {
  pending: "Pendente",
  accepted: "Aceita",
  declined: "Recusada",
  expired: "Expirada",
  conflict: "Conflito de agenda",
};

export const REPORT_CATEGORY_LABELS: Record<string, string> = {
  harassment: "Assédio",
  threat: "Ameaça",
  illegal_content: "Conteúdo ilegal",
  minor_suspicion: "Suspeita de menor de idade",
  fraud: "Fraude",
  privacy: "Privacidade",
  professional_service_misrepresentation: "Falsa representação de serviço profissional",
  other: "Outro",
};

export const PRIVACY_REQUEST_TYPE_LABELS: Record<string, string> = {
  export: "Exportar dados",
  delete_one_conversation: "Excluir uma conversa",
  delete_all_history: "Excluir todo o histórico",
  account_delete: "Excluir conta",
};