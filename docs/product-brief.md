# Product Brief

## Vision

Chief of Staff OS is an executive assistant that watches the user's inbox, calendar, relationship graph, tasks, and meetings, then proposes high-leverage actions with clear approval controls.

## Primary Jobs

1. Email command center: identify who needs a reply, draft the response, choose timing, and schedule the send.
2. Calendar operator: reschedule, cancel, and protect focus time based on natural language commands.
3. Sick-day and disruption mode: execute a coordinated recovery plan for afternoon cancellations, stakeholder notes, follow-ups, and board updates.
4. GTM relationship engine: find target people, map paths through mutual connections, draft warm intro requests, and schedule outreach.
5. Meeting intelligence: prepare briefs before meetings, capture notes, generate follow-ups, and update Notion tasks.
6. Integration marketplace: collect what each collaborator wants to connect and track provider status.

## Guardrails

- Never send, cancel, or update external systems without approval.
- Show source evidence for each recommendation.
- Keep drafts editable before execution.
- Record an audit trail for every approved action.

## Suggested Stack

- Frontend: Next.js or Remix when moving beyond this static prototype.
- Backend: Node.js API with workflow queues.
- Database: Postgres for users, approvals, tasks, relationship entities, and audit logs.
- Vector store: pgvector or managed vector database for meeting notes, email memory, and relationship context.
- Auth: OAuth per integration plus organization-level access controls.
- AI layer: tool-calling agent with strict approval policies.

## Selected V1 Integrations

- Gmail for email triage, drafting, scheduling, and relationship evidence.
- Google Calendar for meeting changes, availability, attendee history, and scheduling.
- Notion for the Kanban board, meeting outcomes, GTM opportunities, and audit trail.
- LinkedIn for relationship discovery, role changes, and warm-introduction paths.
- CRM for account priority, ownership, pipeline stage, and prior activity.
