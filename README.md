# Chief of Staff OS

A connector-ready personal operating system for email triage, calendar recovery, meeting prep/follow-up, Notion or Kanban updates, and GTM relationship mapping.

## What is built

- Working local product UI in `public/`
- Structured connector contracts in `src/integrations/`
- Workflow orchestration model in `src/workflows/`
- Product and integration plan in `docs/`

## Run

```bash
npm run dev
```

Open `http://127.0.0.1:3000`.

## Integration Direction

The app is designed around explicit user approval. Email sends, calendar cancellations, board updates, and outbound introductions should be drafted first, then executed after approval.
