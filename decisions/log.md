# Decision Log

Append-only. When a meaningful decision is made, log it here.

Format: [YYYY-MM-DD] DECISION: ... | REASONING: ... | CONTEXT: ...

---

[2026-07-18] DECISION: Adopted Team Constitution v2 (`agents/config/constitution.md`) as the top-level operating doc for the autonomous agent team. | REASONING: Shift the team from task-completion to outcomes (awareness, visitors, sign-ups, activation, retention, revenue). Agents now plan around the single highest-impact task, report opportunity/risk/confidence, and may push back on busy work. Approval hard stops expanded to include publishing public content, deleting production data, and security-sensitive changes. | CONTEXT: Wired into orchestrator.py (daily plan prompt + Telegram format), runner.py (deliverable + free-text request prompts), and roles.md (read order: constitution -> agent-context -> role).
