---
description: Design rules for all frontend work - new projects, redesigns, landing pages, dashboards
---

# Frontend Design Rules

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
- NEVER use same font for headings and body - pair display/serif with clean sans
- Tight tracking (`-0.03em`) on large headings
- Generous line-height (`1.7`) on body text
- Font sizes: use a consistent scale, not random values

### Shadows
- NEVER use flat `shadow-md`
- Use layered, color-tinted shadows with low opacity
- Example: `shadow-[0_4px_20px_rgba(var(--brand-rgb),0.15)]`

### Gradients & Depth
- Layer multiple radial gradients for backgrounds
- Add grain/texture via SVG noise filter for depth
- Surfaces need a layering system (base -> elevated -> floating)
- Not everything sits at the same z-plane

### Animations
- Only animate `transform` and `opacity`
- NEVER `transition-all`
- Use spring-style easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy, `cubic-bezier(0.4, 0, 0.2, 1)` for smooth

### Interactive States
- EVERY clickable element needs: hover, focus-visible, and active states
- No exceptions - buttons, links, cards, icons, everything

### Images
- Add gradient overlay (`bg-gradient-to-t from-black/60`) on hero images
- Color treatment layer with `mix-blend-multiply` for consistency

### Spacing
- Use intentional, consistent spacing tokens
- Not random Tailwind steps - pick a scale and stick to it (4, 8, 12, 16, 24, 32, 48, 64)

## Hard Rules
- Do NOT add sections/features not in the reference
- Do NOT "improve" a reference design - match it
- Do NOT use `transition-all`
- Do NOT use default Tailwind blue/indigo as primary
- Do NOT skip interactive states
- Dark theme by default (our brand preference)
