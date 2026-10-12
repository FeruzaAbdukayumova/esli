# Decision Log

Append-only. When a meaningful decision is made, log it here.

Format: [YYYY-MM-DD] DECISION: ... | REASONING: ... | CONTEXT: ...

---

[2026-07-18] DECISION: Adopted Team Constitution v2 (`agents/config/constitution.md`) as the top-level operating doc for the autonomous agent team. | REASONING: Shift the team from task-completion to outcomes (awareness, visitors, sign-ups, activation, retention, revenue). Agents now plan around the single highest-impact task, report opportunity/risk/confidence, and may push back on busy work. Approval hard stops expanded to include publishing public content, deleting production data, and security-sensitive changes. | CONTEXT: Wired into orchestrator.py (daily plan prompt + Telegram format), runner.py (deliverable + free-text request prompts), and roles.md (read order: constitution -> agent-context -> role).

[2026-07-18] DECISION: Full UX/design-system overhaul of the frontend (branch agent-team, uncommitted). Shared primitives (Button/Input/Modal/ConfirmDialog/Spinner/Skeleton) now the only way to build dialogs and buttons; hardcoded violet/indigo/blue replaced with primary-* tokens so all 6 theme presets work; focus-visible everywhere. | REASONING: Audit found the design system existed but was bypassed (4% Button adoption, 10 copy-pasted modals, 43 files without focus styles); consistency is the cheapest path to a premium feel. | CONTEXT: 4-agent audit + 12-agent implementation sweep; tsc/lint/build green; visually verified in Chrome.

[2026-07-18] DECISION: Extension promo surfaces (navbar link, dashboard banner) are hidden behind EXTENSION_STORE_URL in frontend/src/shared/config.ts, currently null. | REASONING: All extension links pointed to github.com/feruzaabdukayumova/flashcards-extension which 404s (repo is the private esli monorepo). Dead links before launch are worse than no promo; set the constant once the Chrome Web Store listing is live and everything reappears. | CONTEXT: Store listing work in projects/extension-publish.

[2026-07-18] DECISION: Public deck API no longer exposes owner emails; PublicDeckOwner now returns id + username only. | REASONING: Privacy leak - Browse showed every deck owner's email address publicly. | CONTEXT: backend/app/schemas/deck.py + frontend types; UI falls back to "Community member".

[2026-07-18] DECISION: Deck list API now returns card_count (single grouped query); DeckCard no longer fires one cards query per deck. | REASONING: Dashboard was issuing N requests just to render counts. | CONTEXT: backend deck routes/service + both frontend repos.

[2026-07-18] DECISION: Dashboard IA cleanup - YourDecks limit raised 2->6, StatsSidebar keeps only forecast + deck progress (headline stats live solely in MomentumPanel), category filter moved next to the deck lists it filters, redundant mobile FAB removed. | REASONING: Core job is "study my decks"; two decks above the fold and the same stats rendered twice made the screen read as clutter. | CONTEXT: MomentumPanel remains the hero for returning users.

[2026-07-18] DECISION: Pre-Paddle, the pricing page no longer shows a "Manage subscription" button (no billing portal exists); added "Cancel anytime" + refund-policy link. | REASONING: Dead button eroded trust on the one page that needs it most. | CONTEXT: restore a portal action when Paddle is live.

[2026-07-18] DECISION: Code-split the frontend: admin section (recharts) lazy-loaded, xlsx dynamically imported, TipTap editor lazy-loaded on DeckPage. | REASONING: Single 2.87 MB bundle (850 KB gzip) -> 1.35 MB (392 KB gzip) main chunk; first paint matters for activation. | CONTEXT: vite build verified.

[2026-07-18] DECISION: SRS daily new-card limit now tracked per-day in localStorage (esli-new-cards-YYYY-MM-DD), counted when a new card is first answered. | REASONING: The "daily" limit was per-session - every reload served another batch of new cards, defeating SRS pacing. | CONTEXT: frontend/src/features/study/scheduler.ts; client-side pacing for both guest and auth users.

[2026-07-18] DECISION: Dashboard visual redesign after Feruza rejected the flat look: dark mode is now the default for new visitors, MomentumPanel is an always-dark violet-glow hero panel (both themes), a compact "Give Esli anything" CreationBar sits on every dashboard visit, and deck cards got gradient identity headers + mastery bars. | REASONING: "Doesn't look modern, doesn't show our strengths" - the differentiator (create cards from anything) was invisible after first run, and white-cards-on-grey read as a prototype. Dark-first matches .claude/rules/frontend-design.md brand preference. | CONTEXT: Mastery color coding unified app-wide (green=mastered, amber=learning, neutral=new). Verified in Chrome, both themes.
