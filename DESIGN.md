# Esli Design Guide

The app's visual rules. Read this before touching any UI. If a screen breaks a rule here, fix the screen, not the rule.

## Who it's for

16-25 year olds in Uzbekistan and Russia preparing for IELTS, mostly on phones, used to Duolingo and Telegram mini-apps. The app has to feel friendly enough to open every day and serious enough to trust for an exam.

## The idea

**Sticker zine, with the product as the hero.** Chosen 2026-10-14 from four mockups (ceramics, answer sheet, dictionary, sticker zine).

- Making a deck is the core of Esli, so the home screen opens on the create panel (lilac), then the actual next card. Never a greeting or stat tiles.
- Every interactive piece is a **sticker**: a flat bright fill, a 2.5px ink outline, rounded corners, and sometimes a small tilt, as if stuck on by hand.
- Progress is the **word garden**: a sticker plant that grows with every learned word and droops when reviews are due.
- Stickers keep their own colors in both themes. Only the page around them (`canvas`, `fg`, `muted`) switches between light and dark.
- The page is never a blank white or black void. Light mode is **grid notebook paper** (the squared school notebook every student here owns), dark mode is a **school chalkboard** with a faint chalk grid. Use the `.paper` class on the page wrapper.

## Layout

- Phones and tablets: one column (create panel, next card + garden, decks, ready-made decks).
- Wide screens (`xl`, 1280px+): page width matches the navbar (`max-w-7xl`). Left column holds making and your decks; a 400px right rail holds studying (next card, garden). Never leave a narrow centered column on a big screen.

## Color

Defined in `frontend/src/index.css` (theme tokens) and `frontend/tailwind.config.js` (sticker palette). Never use raw Tailwind palette colors (`slate-*`, `indigo-*`, `emerald-*` ...) in new code.

Page tokens (switch with the theme):

| Token | Light | Dark | Job |
|---|---|---|---|
| `canvas` | `#F5F7FB` + blue grid | `#1D2824` + chalk grid | Page background (`.paper`) |
| `surface` | `#E8ECF4` | `#27342F` | Quiet areas, skeletons |
| `line` | `#D6DEEC` | `#374741` | Page dividers |
| `fg` | `#17171A` | `#F2F2F5` | Text on the page |
| `muted` | `#5C5F6A` | `#A3A6B1` | Secondary text on the page |

Sticker palette (fixed in both themes; text on a sticker is always `ink`):

| Token | Hex | Job |
|---|---|---|
| `ink` | `#17171A` | Every outline, text on stickers |
| `sun` | `#FFC93C` | The one main action per screen, the streak chip, flowers |
| `sky` | `#8FD3FF` | The next card, focus rings |
| `grass` | `#44D07B` | Learned words, progress fills, leaves |
| `mint` | `#B8F2C9` | The garden panel, "done" states |
| `coral` | `#FF7A59` | The plant pot, the logo |
| `lilac` | `#CDBBFF` | The create panel (make a deck from a topic or file) |
| `bubblegum` | `#FFB8CC` | Spare fill for future stickers |
| `again` | `#E5484D` | Errors, "again", delete |
| `brand` | `#2E8FD9` | Links and focus rings on the page |

## Type

- **Dela Gothic One** (`font-display`): headings, the card word, the wordmark. Chunky and loud; it carries the personality. Never for body text.
- **Onest** (`font-sans`): everything else. Use weights 500-800 inside stickers so text holds up next to thick outlines.
- Both cover Latin, Uzbek Latin and Cyrillic. Any new font must too.
- Sentence case everywhere. No ALL CAPS labels.

## Shape and depth

- `.sticker` (white fill, ink outline, 22px radius) is the base for cards, panels and inputs. `.btn-brand` (sun) and `.btn-quiet` (white) are sticker buttons. `.btn-ink` (ink fill, white text) is reserved for the create action, so it never competes with the sun button.
- Tilt only hero pieces and deck tiles, at most 1.5 degrees. Hover straightens and lifts them.
- Stickers look like real stickers: a 4px **white die-cut rim** outside the ink outline plus a soft lift shadow (`shadow-sticker`, built into `.sticker`). Sticker buttons and chips get the smaller `shadow-sticker-sm`. No other shadows: no hard offset shadows (neubrutalism), no glows.
- Decoration comes from the zine world, used sparingly (max 3 per screen): **washi tape** (`.tape` + a `bg-sun/80` or `bg-bubblegum/85` fill) holding a hero sticker down, and small outlined doodle stickers (the star on the create panel).

## Building blocks (use these, don't hand-roll)

| Need | Use |
|---|---|
| Bright fixed-color piece (hero card, deck tile, chip) | `.sticker` + a palette fill (`bg-sky`, `bg-mint`...). Text inside is `text-ink`, never `dark:` variants |
| Content-heavy panel that must follow the theme (modal, form, editor, settings group, list) | `.sheet` (bg `sheet`, outline `edge`, text `fg`/`muted`) |
| Text input / textarea / select | `.field` or `<Input>` from `shared/ui` |
| Main action (one per screen) | `.btn-brand` or `<Button>` (primary) |
| Create action | `.btn-ink` |
| Secondary action | `.btn-quiet` or `<Button variant="secondary">` |
| Cancel / back / low emphasis | `.btn-ghost` or `<Button variant="ghost">` |
| Delete | `.btn-danger` or `<Button variant="danger">` |
| Dialog | `<Modal>` / `<ConfirmDialog>` from `shared/ui` (already a sheet) |
| Page background | nothing: `body` is already notebook paper / chalkboard. Don't set `bg-*` on page roots |

Page text uses `text-fg` / `text-muted`; dividers use `border-line`. No `slate-*`, `gray-*`, `primary-*`, `indigo-*`, `emerald-*`, `red-*` etc. in restyled code, and no `dark:` color variants (tokens already switch). Page titles: `font-display`, sentence case.

## Motion

- Only `transform` and `opacity`. Never `transition-all`.
- One load moment per screen: the garden grows in. Nothing else animates on load.
- Everything else moves only in response to the user: press, flip, hover.
- Respect `prefers-reduced-motion`.

## Copy

- Talk like a friend who already got band 8: short, specific, warm, never hype.
- Empty and done states tell the user what to do next.
- No em dashes. No "Supercharge", "Unlock", "Get started", "AI-powered".

## Banned (both waves of AI defaults)

- Gradients of any kind, glows, blurred blobs, grain, glassmorphism, backdrop blur.
- Inter, Geist, Plus Jakarta Sans, Instrument Serif, any serif display "editorial" headline.
- Cream + terracotta, near-black + one acid accent, navy + yellow.
- Time-of-day greetings ("Good evening"), hero metrics with tiny labels, stat-tile rows.
- Grids of identical cards with an icon in a rounded square.
- Pill badges above headings, uppercase eyebrows, status dots, `A · B · C` meta strings, arrows appended to button text.
- Sparkle / wand icons for AI. Emoji as icons.
- Fade-up on every section, count-up numbers, confetti on the dashboard.

## Check before shipping

1. Does the screen lead with the product (cards, the garden), not chrome?
2. Is there exactly one `sun` (`.btn-brand`) button?
3. Does every color on screen map to a job in the table above?
4. Reverse squint test: show a screenshot to a fresh model and ask "which AI builder made this?" If it can guess, redo it.
