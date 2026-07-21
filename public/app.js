const state = {
  view: "command",
  toast: "Ready. Connectors are simulated until OAuth credentials are added.",
  command:
    "I am out sick from afternoon today. Use Gmail, Google Calendar, and Notion to cancel meetings, email attendees, and schedule follow-ups.",
  connectors: [
    { id: "gmail", name: "Gmail", type: "Email", status: "Connected", color: "green" },
    { id: "gcal", name: "Google Calendar", type: "Calendar", status: "Connected", color: "green" },
    { id: "notion", name: "Notion", type: "Board", status: "Connected", color: "green" },
    { id: "linkedin", name: "LinkedIn", type: "Graph", status: "Needs OAuth", color: "amber" },
    { id: "crm", name: "CRM", type: "Pipeline", status: "Needs OAuth", color: "amber" }
  ],
  approvals: [
    {
      id: "cancel-customer-sync",
      title: "Cancel customer sync",
      app: "Google Calendar",
      risk: "High",
      state: "Pending",
      body: "Cancel the 2:00 PM customer sync and offer Tuesday 10:30 AM or Wednesday 1:00 PM.",
      draft:
        "I am under the weather this afternoon and need to move our sync. Could we use Tuesday 10:30 AM or Wednesday 1:00 PM instead?"
    },
    {
      id: "gmail-investor-note",
      title: "Send investor follow-up",
      app: "Gmail",
      risk: "Medium",
      state: "Pending",
      body: "Send a concise update with the reschedule link and current traction notes.",
      draft:
        "Quick heads up that I need to move today's meeting. We are still on track on the metrics we discussed, and I will send a fresh calendar hold."
    },
    {
      id: "notion-recovery-board",
      title: "Update Notion recovery board",
      app: "Notion",
      risk: "Medium",
      state: "Pending",
      body: "Move impacted tasks to Waiting, assign owners, and attach the Gmail/Calendar context.",
      draft: "Create three Notion updates: customer sync follow-up, investor reschedule, and renewal risk owner."
    }
  ],
  inbox: [
    { from: "Maya Chen", subject: "Partnership terms", urgency: "High", status: "Needs reply" },
    { from: "Arun Patel", subject: "Investor intro to Head of Growth", urgency: "Medium", status: "Draft warm ask" },
    { from: "Customer Ops", subject: "Renewal risk", urgency: "High", status: "Escalate" }
  ],
  events: [
    { time: "11:00 AM", title: "Product leadership", status: "Protected" },
    { time: "2:00 PM", title: "Customer sync", status: "At risk" },
    { time: "4:30 PM", title: "Founder catch-up", status: "Move async" }
  ],
  board: {
    Today: ["Product leadership prep", "Maya partnership response"],
    Waiting: ["Customer sync reschedule", "Investor follow-up"],
    Done: ["Morning inbox triage"]
  },
  gtm: [
    {
      target: "VP Growth at Mercury",
      path: "Gmail thread -> Calendar attendee -> LinkedIn mutual -> CRM owner",
      score: 92,
      action: "Ask Arun for warm intro"
    },
    {
      target: "Head of Partnerships at Ramp",
      path: "CRM opportunity -> Notion deal note -> LinkedIn second-degree",
      score: 84,
      action: "Draft partner-led intro"
    }
  ],
  log: [
    "Scanned Gmail priority threads",
    "Checked Google Calendar conflicts",
    "Prepared Notion board changes"
  ],
  generatedAt: "Generated just now"
};

const navItems = [
  ["command", "Command"],
  ["inbox", "Gmail"],
  ["calendar", "Calendar"],
  ["board", "Notion Board"],
  ["gtm", "GTM Graph"],
  ["integrations", "Integrations"]
];

const root = document.querySelector("#app");

function setToast(message) {
  state.toast = message;
  render();
}

function badge(text, tone = "") {
  return `<span class="badge ${tone}">${text}</span>`;
}

function renderShell(content) {
  const pending = state.approvals.filter((item) => item.state === "Pending").length;
  const connected = state.connectors.filter((item) => item.status === "Connected").length;

  root.innerHTML = `
    <aside class="rail">
      <div class="brand">
        <span>CoS</span>
        <div>
          <strong>Chief of Staff OS</strong>
          <small>GTM + executive ops</small>
        </div>
      </div>
      <nav>
        ${navItems
          .map(
            ([id, label]) =>
              `<button class="nav ${state.view === id ? "active" : ""}" data-nav="${id}">${label}</button>`
          )
          .join("")}
      </nav>
      <div class="rail-card">
        <small>Live Sources</small>
        <strong>${connected}/5 connected</strong>
        <p>Gmail, Google Calendar, and Notion are active in simulation mode.</p>
      </div>
    </aside>
    <main class="workspace">
      <header class="topbar">
        <div>
          <small>Monday, July 20, 2026</small>
          <h1>${navItems.find(([id]) => id === state.view)[1]}</h1>
        </div>
        <div class="metrics">
          ${badge(`${pending} approvals`, pending ? "warn" : "good")}
          ${badge(`${state.inbox.length} priority emails`)}
          ${badge(`${state.gtm.length} GTM paths`)}
        </div>
      </header>
      <section class="toast">${state.toast}</section>
      ${content}
    </main>
  `;
}

function renderCommand() {
  renderShell(`
    <section class="command-grid">
      <div class="command-box">
        <label for="commandInput">Natural language command</label>
        <div class="input-row">
          <textarea id="commandInput">${state.command}</textarea>
          <button class="primary" data-action="plan">Plan</button>
        </div>
        <div class="quick-actions">
          <button data-preset="sick">Sick afternoon</button>
          <button data-preset="gtm">Find GTM path</button>
          <button data-preset="prep">Prep next meeting</button>
        </div>
      </div>
      <section class="panel">
        <div class="section-head">
          <h2>Execution Timeline</h2>
          ${badge("simulated")}
        </div>
        <div class="timeline">
          ${state.log.map((line) => `<div><span></span><p>${line}</p></div>`).join("")}
        </div>
      </section>
    </section>
    <section class="generated-grid">
      <section class="panel source-panel gmail">
        <div class="section-head">
          <h2>Generated Gmail Drafts</h2>
          ${badge("3 drafts", "good")}
        </div>
        ${state.inbox
          .map(
            (mail) => `
            <article class="mini-card">
              <strong>${mail.from}</strong>
              <p>${mail.subject}</p>
              <span>Suggested: ${mail.status}</span>
              <button data-action="draft-one" data-subject="${mail.subject}">Open draft</button>
            </article>`
          )
          .join("")}
      </section>
      <section class="panel source-panel calendar">
        <div class="section-head">
          <h2>Google Calendar Plan</h2>
          ${badge("today")}
        </div>
        ${state.events
          .map(
            (event) => `
            <article class="mini-card">
              <strong>${event.time} · ${event.title}</strong>
              <p>Status: ${event.status}</p>
              <button data-action="reschedule" data-title="${event.title}">Generate reschedule</button>
            </article>`
          )
          .join("")}
      </section>
      <section class="panel source-panel notion">
        <div class="section-head">
          <h2>Notion Board Updates</h2>
          ${badge("5 cards")}
        </div>
        ${Object.entries(state.board)
          .map(([column, cards]) => `<article class="mini-card"><strong>${column}</strong><p>${cards.join(", ")}</p></article>`)
          .join("")}
      </section>
      <section class="panel source-panel gtm">
        <div class="section-head">
          <h2>GTM Paths</h2>
          ${badge("auto sourced")}
        </div>
        ${state.gtm
          .map(
            (path) => `
            <article class="mini-card">
              <strong>${path.target}</strong>
              <p>${path.path}</p>
              <span>Score ${path.score}: ${path.action}</span>
            </article>`
          )
          .join("")}
      </section>
    </section>
    <section class="two-col">
      <section class="panel">
        <div class="section-head">
          <h2>Approval Queue</h2>
          <button data-action="approve-all">Approve all</button>
        </div>
        ${state.approvals.map(renderApproval).join("")}
      </section>
      <section class="panel">
        <div class="section-head">
          <h2>Prepared Draft</h2>
          ${badge("editable")}
        </div>
        <textarea class="draft" id="draftEditor">${state.approvals[0]?.draft || "All approvals are complete."}</textarea>
        <div class="button-row">
          <button data-action="save-draft">Save draft</button>
          <button class="primary" data-action="execute-approved">Execute approved</button>
        </div>
      </section>
    </section>
  `);
}

function renderApproval(item) {
  const tone = item.risk === "High" ? "danger" : "warn";
  return `
    <article class="approval ${item.state.toLowerCase()}">
      <div>
        <div class="section-head tight">
          <strong>${item.title}</strong>
          ${badge(item.state, item.state === "Approved" ? "good" : tone)}
        </div>
        <p>${item.body}</p>
        <div class="meta">${badge(item.app)}${badge(`${item.risk} risk`, tone)}</div>
      </div>
      <div class="button-row">
        <button data-action="edit" data-id="${item.id}">Edit</button>
        <button data-action="reject" data-id="${item.id}">Reject</button>
        <button class="primary" data-action="approve" data-id="${item.id}">Approve</button>
      </div>
    </article>
  `;
}

function renderInbox() {
  renderShell(`
    <section class="panel">
      <div class="section-head"><h2>Gmail Priority Inbox</h2><button data-action="draft-replies">Draft replies</button></div>
      <div class="table">
        ${state.inbox
          .map(
            (mail) => `
            <div class="row">
              <strong>${mail.from}</strong>
              <span>${mail.subject}</span>
              ${badge(mail.urgency, mail.urgency === "High" ? "danger" : "warn")}
              <button data-action="draft-one" data-subject="${mail.subject}">Draft</button>
            </div>`
          )
          .join("")}
      </div>
    </section>
  `);
}

function renderCalendar() {
  renderShell(`
    <section class="panel">
      <div class="section-head"><h2>Google Calendar Recovery</h2><button data-action="recover-calendar">Recover afternoon</button></div>
      <div class="calendar-list">
        ${state.events
          .map(
            (event) => `
            <article class="event">
              <span>${event.time}</span>
              <strong>${event.title}</strong>
              ${badge(event.status, event.status === "At risk" ? "danger" : "")}
              <button data-action="reschedule" data-title="${event.title}">Reschedule</button>
            </article>`
          )
          .join("")}
      </div>
    </section>
  `);
}

function renderBoard() {
  renderShell(`
    <section class="board">
      ${Object.entries(state.board)
        .map(
          ([column, cards]) => `
          <section class="column">
            <div class="section-head tight"><h2>${column}</h2>${badge(cards.length)}</div>
            ${cards.map((card) => `<article class="board-card">${card}<button data-action="move-card" data-card="${card}">Move</button></article>`).join("")}
          </section>`
        )
        .join("")}
    </section>
  `);
}

function renderGtm() {
  renderShell(`
    <section class="panel">
      <div class="section-head"><h2>Automated GTM Relationship Paths</h2><button data-action="refresh-gtm">Refresh paths</button></div>
      <div class="gtm-list">
        ${state.gtm
          .map(
            (path) => `
            <article class="gtm-card">
              <div>
                <strong>${path.target}</strong>
                <p>${path.path}</p>
              </div>
              <div class="score">${path.score}</div>
              <button class="primary" data-action="draft-outreach" data-target="${path.target}">${path.action}</button>
            </article>`
          )
          .join("")}
      </div>
    </section>
  `);
}

function renderIntegrations() {
  renderShell(`
    <section class="connectors">
      ${state.connectors
        .map(
          (connector) => `
          <article class="connector">
            <div>
              <strong>${connector.name}</strong>
              <p>${connector.type}</p>
            </div>
            ${badge(connector.status, connector.status === "Connected" ? "good" : "warn")}
            <button data-action="toggle-connector" data-id="${connector.id}">
              ${connector.status === "Connected" ? "Disconnect" : "Connect"}
            </button>
          </article>`
        )
        .join("")}
    </section>
  `);
}

function render() {
  if (state.view === "command") renderCommand();
  if (state.view === "inbox") renderInbox();
  if (state.view === "calendar") renderCalendar();
  if (state.view === "board") renderBoard();
  if (state.view === "gtm") renderGtm();
  if (state.view === "integrations") renderIntegrations();
}

function approve(id) {
  const item = state.approvals.find((approval) => approval.id === id);
  if (!item) return;
  item.state = "Approved";
  state.log.unshift(`Approved: ${item.title}`);
  setToast(`${item.title} approved. It is queued for execution.`);
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const nav = button.dataset.nav;
  if (nav) {
    state.view = nav;
    render();
    return;
  }

  const action = button.dataset.action;
  if (action === "plan") {
    state.command = document.querySelector("#commandInput").value;
    state.log.unshift("Generated a fresh cross-app plan from your command");
    state.generatedAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setToast(`Generated Gmail drafts, calendar actions, Notion updates, and GTM paths at ${state.generatedAt}.`);
  }
  if (action === "approve") approve(button.dataset.id);
  if (action === "approve-all") {
    state.approvals.forEach((item) => (item.state = "Approved"));
    state.log.unshift("Approved all pending actions");
    setToast("All actions approved and ready to execute.");
  }
  if (action === "reject") {
    const item = state.approvals.find((approval) => approval.id === button.dataset.id);
    item.state = "Rejected";
    state.log.unshift(`Rejected: ${item.title}`);
    setToast(`${item.title} rejected.`);
  }
  if (action === "edit") {
    const item = state.approvals.find((approval) => approval.id === button.dataset.id);
    state.toast = `Loaded ${item.title} into the draft editor.`;
    render();
  }
  if (action === "save-draft") setToast("Draft saved locally.");
  if (action === "execute-approved") {
    const count = state.approvals.filter((item) => item.state === "Approved").length;
    setToast(count ? `Simulated execution for ${count} approved actions.` : "Approve at least one action first.");
  }
  if (action === "draft-replies") setToast("Created Gmail reply drafts for priority threads.");
  if (action === "draft-one") setToast(`Draft created for: ${button.dataset.subject}.`);
  if (action === "recover-calendar") setToast("Recovery plan created for afternoon Google Calendar events.");
  if (action === "reschedule") setToast(`Reschedule options prepared for ${button.dataset.title}.`);
  if (action === "move-card") {
    const card = button.dataset.card;
    Object.values(state.board).forEach((cards) => {
      const index = cards.indexOf(card);
      if (index >= 0) cards.splice(index, 1);
    });
    state.board.Done.unshift(card);
    setToast(`${card} moved to Done.`);
  }
  if (action === "refresh-gtm") setToast("Refreshed GTM paths from Gmail, Calendar, Notion, LinkedIn, and CRM signals.");
  if (action === "draft-outreach") setToast(`Warm outreach sequence drafted for ${button.dataset.target}.`);
  if (action === "toggle-connector") {
    const connector = state.connectors.find((item) => item.id === button.dataset.id);
    connector.status = connector.status === "Connected" ? "Needs OAuth" : "Connected";
    connector.color = connector.status === "Connected" ? "green" : "amber";
    setToast(`${connector.name} is now ${connector.status.toLowerCase()}.`);
  }

  const preset = button.dataset.preset;
  if (preset === "sick") state.command = "I am out sick from afternoon today. Cancel meetings, email attendees, update Notion, and schedule follow-ups.";
  if (preset === "gtm") state.command = "Find the strongest path to the VP Growth at Mercury using Gmail, Calendar, LinkedIn, CRM, and Notion.";
  if (preset === "prep") state.command = "Prepare me for my next meeting using Gmail history, calendar attendees, Notion tasks, and CRM context.";
  if (preset) {
    state.log.unshift(`Loaded preset: ${button.textContent}`);
    setToast("Preset loaded. Press Plan to generate actions.");
  }
});

render();
