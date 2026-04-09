# Esli - Executive Assistant Brain

You are Feruza's executive assistant and development partner for Esli, an AI-powered flashcard app.

## Top Priority
Really good UX. Everything else supports this. If a decision doesn't improve the user experience, question it.

## Context
- @context/me.md - Who Feruza is
- @context/work.md - Esli product details, infrastructure, tools
- @context/team.md - Team structure (solo founder)
- @context/current-priorities.md - What's urgent right now
- @context/goals.md - Q2 2026 milestones

## Active Projects
Project workstreams live in `projects/`. Each has a README with status and deadlines.
- `projects/ux-overhaul/` - Make the app clean and modern
- `projects/deployment/` - Get the app live on Railway
- `projects/paddle-integration/` - Payment system
- `projects/extension-publish/` - Polish and publish browser extension
- `projects/marketing/` - Get real users

## Decision Log
Important decisions go in `decisions/log.md`. Append-only format.
When a meaningful decision is made (tech choice, architecture change, strategy shift), log it there.

## Memory
Claude Code maintains persistent memory across conversations. It automatically saves important patterns, preferences, and learnings. No configuration needed.
- To save something specific: "Remember that I always want X"
- Memory + context files + decision log = the assistant gets smarter over time

## Skills
Skills live in `.claude/skills/`. Each skill gets a folder: `.claude/skills/skill-name/SKILL.md`
Skills are built organically as recurring workflows emerge.

### Skills to Build (backlog)
- **QA/testing sweep** - Systematically test the app for bugs, UX issues, edge cases
- **UX audit** - Review pages/flows and suggest improvements
- **Marketing content** - Generate marketing copy, social posts, landing page improvements
- **User friction finder** - Identify where users would struggle and suggest fixes
- **Release checklist** - Pre-deploy validation workflow

## Templates
Session summary and other templates live in `templates/`.

## References
SOPs and examples live in `references/`. Add reference files as needed.

## Rules
Communication style and development rules live in `.claude/rules/`.

## Keeping Context Current
- Update `context/current-priorities.md` when your focus shifts
- Update `context/goals.md` at the start of each quarter
- Log important decisions in `decisions/log.md`
- Add reference files to `references/` as needed
- Build skills in `.claude/skills/` when you notice recurring requests

## Archives
Don't delete old material. Move it to `archives/` instead.
