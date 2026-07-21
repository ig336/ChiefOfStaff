import type { IntegrationProvider } from "./contracts";

export const selectedProviders: IntegrationProvider[] = [
  {
    id: "email_gmail",
    name: "Gmail",
    kind: "email",
    status: "not_connected",
    capabilities: ["read_threads", "create_drafts", "schedule_send", "send_after_approval"]
  },
  {
    id: "calendar_google",
    name: "Google Calendar",
    kind: "calendar",
    status: "not_connected",
    capabilities: ["read_events", "create_events", "update_events", "cancel_after_approval"]
  },
  {
    id: "board_notion",
    name: "Notion",
    kind: "board",
    status: "not_connected",
    capabilities: ["read_databases", "create_pages", "update_cards_after_approval"]
  },
  {
    id: "graph_linkedin",
    name: "LinkedIn",
    kind: "linkedin",
    status: "not_connected",
    capabilities: ["import_people", "track_role_changes", "discover_paths"]
  },
  {
    id: "crm_primary",
    name: "CRM",
    kind: "crm",
    status: "not_connected",
    capabilities: ["read_accounts", "read_contacts", "read_activity", "rank_revenue_priority"]
  }
];
