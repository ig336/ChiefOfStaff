import type { ProposedAction } from "../integrations/contracts";

export interface WorkflowRun {
  id: string;
  command: string;
  createdAt: string;
  status: "planning" | "waiting_for_approval" | "executing" | "complete";
  actions: ProposedAction[];
}

export const approvalRequired = (action: ProposedAction) => {
  return action.risk !== "low" || ["email", "calendar", "board"].some((kind) => action.providerId.includes(kind));
};

export const buildSickDayRun = (createdAt: string): WorkflowRun => ({
  id: "run_sick_day_afternoon",
  command: "I am out sick from afternoon today. Cancel meetings, notify people, and schedule follow-ups.",
  createdAt,
  status: "waiting_for_approval",
  actions: [
    {
      id: "cancel_customer_sync",
      title: "Cancel 2:00 PM customer sync",
      providerId: "calendar_google",
      risk: "high",
      state: "draft",
      summary: "Cancel the event, send a short note to attendees, and offer two reschedule windows.",
      payload: { eventId: "evt_customer_sync", reason: "out sick" },
      evidenceIds: ["calendar_today"]
    },
    {
      id: "draft_investor_note",
      title: "Draft investor update",
      providerId: "email_gmail",
      risk: "medium",
      state: "draft",
      summary: "Let the investor know the meeting will move and include a concise status update.",
      payload: { threadId: "thr_investor" },
      evidenceIds: ["email_investor_thread", "board_metrics"]
    },
    {
      id: "update_notion_board",
      title: "Update Notion recovery board",
      providerId: "board_notion",
      risk: "medium",
      state: "draft",
      summary: "Move affected meeting tasks to Waiting and add follow-up owners.",
      payload: { databaseId: "notion_exec_board" },
      evidenceIds: ["calendar_today", "meeting_notes"]
    }
  ]
});
