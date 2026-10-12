# Esli Agent Team

An autonomous team of agents that builds and promotes Esli. They plan, work, and review their own output on a schedule. Feruza is the final yes/no via Telegram. Her PC stays off.

**Status:** scaffolding built, waiting on 3 secrets (see `SETUP.md`).

## How it works (the machine)

```
  cron (GitHub Actions, daily)
        │
        ▼
  orchestrator.py ──► Claude (Anthropic API) plans the day
        │
        ▼
  Telegram message  ──►  [✓ Approve]  [✕ Reject / Change]
        │                       │
        │  (you tap on phone)   │
        ▼                       ▼
  Cloudflare Worker  ◄──────────┘  (catches the button tap)
        │
        ▼
  repository_dispatch ──► fires the specialist workflow
        │
        ▼
  specialist agent does the work ──► opens PR / writes draft / runs QA
        │
        ▼
  Telegram: "done, approve to merge/publish?"  ──► you tap again
```

Nothing reaches users without your tap. Hard stops that always wait: production deploys, pricing/payments, anything user-facing going live.

## The team

| Agent | Side | Job | Trigger |
|-------|------|-----|---------|
| Chief of Staff (orchestrator) | — | Plans the week, assigns specialists, reports to you | daily cron |
| Dev | Build | Builds features, fixes bugs, opens PR | dispatch |
| QA | Build | Tests app, reports bugs & UX issues | dispatch + weekly cron |
| Deploy | Build | Ships to Railway/Cloudflare, health checks | dispatch (approval-gated) |
| Growth | Promote | Plans campaigns, finds where users are | weekly cron |
| Content/SEO | Promote | Writes SEO pages & blog posts | weekly cron (already running) |
| Social | Promote | Drafts & schedules posts | dispatch |
| Analytics | Promote | Daily/weekly metrics | daily + weekly cron (already running) |

## What already exists (reused)

- `agents/scripts/daily-pulse.py` + `agents/scripts/weekly-growth.py` — analytics agent (one-way reports)
- `agents/content/seo-pages/` — content agent output
- `agents/config/agent-context.md` — shared API/auth/Telegram context every agent reads
- `agents/config/qa-testing-prompt.md` — QA agent's instructions
- `.github/workflows/daily-pulse.yml` + `weekly-growth.yml` — cron plumbing

## What's new in this build

- `agents/config/roles.md` — role definitions for every agent
- `agents/scripts/orchestrator.py` — Claude-powered daily planner + Telegram approve/reject
- `agents/scripts/lib_telegram.py` — Telegram helper (inline buttons)
- `agents/telegram-bot/` — Cloudflare Worker that catches button taps
- `.github/workflows/team-plan.yml` — daily orchestrator run
- `.github/workflows/agent-dispatch.yml` — runs a specialist when you approve
- `SETUP.md` — the 3-secret checklist

## Approval model

Default: **propose, you approve.** Agents open PRs and draft content; nothing merges or publishes without your tap. You can loosen this later in plain language (e.g. "let QA reports auto-post").

## Cost

- GitHub Actions: free tier (cron + dispatch)
- Cloudflare Worker: free tier (only if you enable phase-2 buttons)
- Claude: runs on Feruza's existing $100 Max plan via a Claude Code token
  (`claude setup-token` → `CLAUDE_CODE_OAUTH_TOKEN`). No separate API bill.
  Agents share the Max usage limits, so heavy days could dip into personal usage.
