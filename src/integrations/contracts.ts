export type ProviderKind =
  | "email"
  | "calendar"
  | "board"
  | "crm"
  | "linkedin"
  | "notes"
  | "contacts";

export type ApprovalState = "draft" | "approved" | "executed" | "rejected";

export interface IntegrationProvider {
  id: string;
  name: string;
  kind: ProviderKind;
  status: "not_connected" | "connected" | "needs_attention";
  capabilities: string[];
}

export interface ProposedAction {
  id: string;
  title: string;
  providerId: string;
  risk: "low" | "medium" | "high";
  state: ApprovalState;
  summary: string;
  payload: Record<string, unknown>;
  evidenceIds: string[];
}

export interface EmailAdapter {
  listPriorityThreads(): Promise<EmailThread[]>;
  createDraft(input: EmailDraftInput): Promise<ProposedAction>;
  scheduleSend(actionId: string, sendAt: string): Promise<ProposedAction>;
}

export interface CalendarAdapter {
  listUpcomingEvents(): Promise<CalendarEvent[]>;
  proposeReschedule(input: CalendarRecoveryInput): Promise<ProposedAction[]>;
}

export interface BoardAdapter {
  syncActionItems(items: ActionItem[]): Promise<ProposedAction[]>;
}

export interface RelationshipGraphAdapter {
  findPaths(input: RelationshipPathInput): Promise<RelationshipPath[]>;
  proposeOutreach(pathId: string): Promise<ProposedAction[]>;
}

export interface EmailThread {
  id: string;
  from: string;
  subject: string;
  urgency: "low" | "normal" | "urgent";
  recommendedAction: string;
}

export interface EmailDraftInput {
  threadId: string;
  intent: string;
  tone: "concise" | "warm" | "firm";
}

export interface CalendarEvent {
  id: string;
  title: string;
  startsAt: string;
  attendees: string[];
  flexibility: "fixed" | "movable" | "optional";
}

export interface CalendarRecoveryInput {
  unavailableFrom: string;
  unavailableUntil: string;
  reason: string;
  notifyAttendees: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  dueAt?: string;
  sourceId: string;
}

export interface RelationshipPathInput {
  targetName: string;
  targetCompany: string;
  sourceProviderIds: string[];
}

export interface RelationshipPath {
  id: string;
  targetName: string;
  targetCompany: string;
  path: string[];
  confidence: "low" | "medium" | "high";
  evidenceIds: string[];
  recommendedNextStep: string;
}
