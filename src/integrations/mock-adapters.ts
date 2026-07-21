import type {
  BoardAdapter,
  CalendarAdapter,
  EmailAdapter,
  RelationshipGraphAdapter
} from "./contracts";

export const gmailAdapter: EmailAdapter = {
  async listPriorityThreads() {
    return [
      {
        id: "thr_partnership_terms",
        from: "Maya Chen",
        subject: "Partnership terms",
        urgency: "urgent",
        recommendedAction: "Draft a concise reply with redlines and request legal review."
      }
    ];
  },
  async createDraft(input) {
    return {
      id: `gmail_draft_${input.threadId}`,
      title: "Create Gmail draft",
      providerId: "email_gmail",
      risk: "medium",
      state: "draft",
      summary: `Draft a ${input.tone} Gmail reply for: ${input.intent}.`,
      payload: input,
      evidenceIds: [input.threadId]
    };
  },
  async scheduleSend(actionId, sendAt) {
    return {
      id: `gmail_schedule_${actionId}`,
      title: "Schedule Gmail send",
      providerId: "email_gmail",
      risk: "high",
      state: "draft",
      summary: `Schedule approved Gmail draft for ${sendAt}.`,
      payload: { actionId, sendAt },
      evidenceIds: [actionId]
    };
  }
};

export const googleCalendarAdapter: CalendarAdapter = {
  async listUpcomingEvents() {
    return [
      {
        id: "evt_customer_sync",
        title: "Customer sync",
        startsAt: "2026-07-20T14:00:00-07:00",
        attendees: ["maya@example.com", "ops@example.com"],
        flexibility: "movable"
      }
    ];
  },
  async proposeReschedule(input) {
    return [
      {
        id: "calendar_recovery_plan",
        title: "Google Calendar recovery plan",
        providerId: "calendar_google",
        risk: "high",
        state: "draft",
        summary: `Reschedule or cancel meetings from ${input.unavailableFrom} to ${input.unavailableUntil}.`,
        payload: input,
        evidenceIds: ["calendar_today"]
      }
    ];
  }
};

export const notionBoardAdapter: BoardAdapter = {
  async syncActionItems(items) {
    return items.map((item) => ({
      id: `notion_sync_${item.id}`,
      title: `Update Notion card: ${item.title}`,
      providerId: "board_notion",
      risk: "medium",
      state: "draft",
      summary: `Sync owner ${item.owner} and due date ${item.dueAt || "unset"} to Notion.`,
      payload: item,
      evidenceIds: [item.sourceId]
    }));
  }
};

export const relationshipGraphAdapter: RelationshipGraphAdapter = {
  async findPaths(input) {
    return [
      {
        id: "path_gmail_calendar_linkedin_crm",
        targetName: input.targetName,
        targetCompany: input.targetCompany,
        path: ["Gmail contact", "Google Calendar attendee", "LinkedIn mutual", "CRM account owner"],
        confidence: "high",
        evidenceIds: input.sourceProviderIds,
        recommendedNextStep: "Ask the CRM owner for a warm intro, then schedule follow-up in Google Calendar."
      }
    ];
  },
  async proposeOutreach(pathId) {
    return [
      {
        id: `outreach_${pathId}`,
        title: "Draft warm intro sequence",
        providerId: "email_gmail",
        risk: "medium",
        state: "draft",
        summary: "Create Gmail intro request and two follow-ups based on LinkedIn and CRM context.",
        payload: { pathId },
        evidenceIds: [pathId]
      }
    ];
  }
};
