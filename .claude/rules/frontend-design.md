---
description: Design rules for all frontend work - new projects, redesigns, landing pages, dashboards
---

# Frontend Design Rules

**For the Esli app, `DESIGN.md` at the repo root is the source of truth** (tokens, fonts, banned patterns). Where this file and DESIGN.md disagree, DESIGN.md wins.

Apply to ALL frontend work - new projects, redesigns, landing pages, dashboards.

## Reference Images
- If reference provided: match layout, spacing, typography, colors EXACTLY. Don't "improve" it.
- If no reference: design from scratch with high craft (see guardrails below).
- Compare your output visually. Fix mismatches. At least 2 review rounds.

## Stack Defaults
- React + TypeScript + Vite + Tailwind CSS (unless project specifies otherwise)
- Mobile-first responsive
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Check project for existing brand assets (logos, colors, fonts) before designing

## Anti-Generic Guardrails

### Colors
- NEVER use default Tailwind palette (indigo-500, blue-600, etc.)
- Pick a custom brand color and derive shades from it
- Use CSS variables for theme colors

### Typography
- NEVER use same font for headings and body - pair a characterful display face with a clean sans (no serif "editorial" headlines, see DESIGN.md)
- Tight tracking (`-0.03em`) on large headings
- Generous line-height (`1.7`) on body text
- Font sizes: use a consistent scale, not random values

### Depth
- No blurred shadows, gradients, glows, blobs, grain or glassmorphism. They are AI-template tells.
- Depth comes from solid bottom edges (tactile buttons and cards) and surface color steps, per DESIGN.md.

### Animations
- Only animate `transform` and `opacity`
- NEVER `transition-all`
- Use spring-style easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy, `cubic-bezier(0.4, 0, 0.2, 1)` for smooth

### Interactive States
- EVERY clickable element needs: hover, focus-visible, and active states
- No exceptions - buttons, links, cards, icons, everything

### Spacing
- Use intentional, consistent spacing tokens
- Not random Tailwind steps - pick a scale and stick to it (4, 8, 12, 16, 24, 32, 48, 64)

## Hard Rules
- Do NOT add sections/features not in the reference
- Do NOT "improve" a reference design - match it
- Do NOT use `transition-all`
- Do NOT use default Tailwind blue/indigo as primary
- Do NOT skip interactive states
- Dark theme by default (our brand preference), designed with equal care in light mode
