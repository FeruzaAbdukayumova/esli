# QA Testing Prompt for Esli Flashcards App

You are a senior QA engineer performing comprehensive manual testing of **Esli** — a full-stack AI-powered flashcards web application. Your goal is to systematically test every user-facing feature, report bugs with clear reproduction steps, and verify cross-browser/cross-device compatibility.

---

## Product Overview

**Esli** (esli.app) is a spaced repetition flashcard app with AI generation, rich text editing, multi-language support, and a browser extension.

- **Landing page**: https://esli.app
- **Frontend app**: https://app.esli.app
- **Backend API**: https://api.esli.app
- **API docs**: https://api.esli.app/docs

**Tech stack**: React + TypeScript frontend (Vite, TanStack Query, Tailwind CSS), FastAPI backend, PostgreSQL, Stripe payments, Claude AI for card generation, WebSocket for live chat.

**Pricing tiers**: Free (unlimited manual cards), Pro ($5/mo), Premium ($12/mo).

---

## Test Environment

| Parameter | Details |
|-----------|---------|
| Frontend URL | https://app.esli.app |
| API URL | https://api.esli.app |
| Browsers | Chrome 90+, Firefox 120+, Safari 17+, Edge (Chromium), Brave |
| Devices | Desktop (1920x1080, 1440x900), Tablet (768x1024), Mobile (375x812, 390x844) |
| OS | macOS, Windows, iOS Safari, Android Chrome |

---

## Testing Scope

### 1. Authentication & Authorization

#### 1.1 Registration
- [ ] Register with valid email, password (8-72 chars), username (1-50 chars)
- [ ] Verify validation errors: short password (<8), long password (>72), missing username, empty fields
- [ ] Verify duplicate email returns 409 error with clear message
- [ ] Verify duplicate username returns 409 error with clear message
- [ ] Verify successful registration redirects to dashboard
- [ ] Verify access token stored in localStorage, refresh token in httpOnly cookie

#### 1.2 Login
- [ ] Login with valid credentials
- [ ] Verify wrong password shows error (not leaking whether email exists)
- [ ] Verify non-existent email shows generic error
- [ ] Verify redirect to dashboard on success
- [ ] Test "remember me" behavior (token persistence)

#### 1.3 Google OAuth
- [ ] Click "Sign in with Google" → redirects to Google consent screen
- [ ] Complete OAuth flow → returns to `/auth/callback/google` → redirects to dashboard
- [ ] Verify CSRF state validation (sessionStorage)
- [ ] Test account linking: register with email, then login with Google using same email → accounts merge, no data loss
- [ ] Test new Google user: creates account automatically
- [ ] Verify OAuth user can't use password login (password_hash is null)

#### 1.4 Token Refresh
- [ ] Wait for access token to expire (4 hours) or manually expire it → verify auto-refresh via 401 interceptor
- [ ] Verify concurrent requests during refresh are queued (mutex)
- [ ] Verify refresh token rotation (old token revoked after use)
- [ ] Test expired refresh token (7 days) → user redirected to login

#### 1.5 Logout
- [ ] Logout clears localStorage token and httpOnly cookie
- [ ] After logout, protected routes redirect to login
- [ ] Verify refresh token is revoked server-side

---

### 2. Guest Mode

- [ ] Access app without logging in → guest mode activated
- [ ] Create decks and cards → stored in localStorage
- [ ] Study cards in guest mode → SM-2 algorithm works locally
- [ ] Verify daily new card limit works in guest mode (guestStorage)
- [ ] Settings (theme, language, daily limit) persist in localStorage
- [ ] AI card generation works for guest users
- [ ] Translation works for guest users
- [ ] After registering/logging in → verify sync prompt appears
- [ ] Sync guest data → `POST /sync/import` transfers decks/cards to server
- [ ] Verify no data loss during sync (card count matches)

---

### 3. Dashboard

#### 3.1 Stats Overview
- [ ] Dashboard stats load correctly (total cards, due today, streak, etc.)
- [ ] Stats update after studying, adding/deleting cards
- [ ] Verify `statsKeys.dashboard` cache invalidation on mutations

#### 3.2 Your Decks Section
- [ ] All user decks display with correct card counts
- [ ] Clicking a deck card navigates to Study page (not Edit)
- [ ] Create new deck from dashboard
- [ ] Delete deck with confirmation modal
- [ ] Empty state shown when no decks

#### 3.3 Shared Decks Section
- [ ] Premade/public decks display correctly
- [ ] Can browse and copy public decks to library

#### 3.4 Navigation
- [ ] Dashboard navbar renders correctly
- [ ] Mobile: bottom navigation bar works
- [ ] All nav links route to correct pages
- [ ] Extension promotion banner shows (dismissible, persists in localStorage)

---

### 4. Deck Management

#### 4.1 Create Deck
- [ ] Create deck with title
- [ ] Verify tier-based deck limits enforced
- [ ] Created deck appears in dashboard

#### 4.2 Edit Deck
- [ ] Edit deck title
- [ ] Toggle deck sharing (is_shared)
- [ ] Add tags to deck
- [ ] Delete deck with cascade (all cards removed)

#### 4.3 Cards Within Deck
- [ ] Add card with rich text (front and back)
- [ ] Edit existing card
- [ ] Delete card
- [ ] Batch import cards via Excel/CSV (SheetJS parsing)
- [ ] Verify batch import limit (max 500 cards)
- [ ] Verify tier-based card limits enforced
- [ ] Search/filter cards within deck

---

### 5. Rich Text Editor (TipTap)

- [ ] Bold, italic, underline, strikethrough formatting
- [ ] Headings (H1-H3)
- [ ] Bullet lists, numbered lists
- [ ] Blockquotes
- [ ] Code blocks (inline and block)
- [ ] Tables (create, add/remove rows/columns)
- [ ] Links (add, edit, remove, open in new tab)
- [ ] Images (insert, resize)
- [ ] Text color/highlighting
- [ ] Mathematical equations (KaTeX rendering)
- [ ] Character limit: 5000 text characters (not HTML) enforced
- [ ] Backward compatibility: plain text cards display correctly
- [ ] Legacy plain text auto-converts to HTML when editing
- [ ] Content sanitized on save (nh3 backend, DOMPurify frontend)
- [ ] Verify no XSS possible through card content

---

### 6. Study Mode (Spaced Repetition)

#### 6.1 Study Session
- [ ] Navigate to study page for a deck
- [ ] Cards load based on SM-2 scheduling (due cards first, then new cards up to daily limit)
- [ ] Card flip animation works (3D CSS transform with perspective)
- [ ] Desktop: prev/next navigation on sides of card
- [ ] Mobile: prev/next buttons below card
- [ ] Rich text renders correctly on both sides
- [ ] KaTeX math equations render in study mode

#### 6.2 Review Responses
- [ ] "Again" response: card re-inserted ~3 positions later in queue
- [ ] "Hard" response: shorter interval, lower ease factor
- [ ] "Good" response: standard interval progression
- [ ] "Easy" response: longer interval, higher ease factor
- [ ] Next review intervals displayed before answering
- [ ] Review recorded via `POST /cards/{id}/review`

#### 6.3 Session Management
- [ ] Session queue persists in sessionStorage (keyed by `study-session-${deckId}`)
- [ ] Refreshing page mid-session resumes from where you left off
- [ ] Completing all cards shows completion screen
- [ ] Back/exit links navigate to `/dashboard`
- [ ] Daily new card limit respected (configurable in settings)

---

### 7. AI Features

#### 7.1 Generate from Topic
- [ ] Enter topic → generates flashcards (up to 100 cards)
- [ ] Verify card quality (atomic, varied question types, no lists)
- [ ] Works for both guest and authenticated users
- [ ] Tier-based generation limits enforced
- [ ] Loading state shown during generation
- [ ] Error handling for API failures

#### 7.2 Generate from PDF
- [ ] Upload PDF → generates flashcards
- [ ] Verify tier limits on PDF pages (Pro/Premium only)
- [ ] Large PDFs handled correctly (max_tokens=8192)
- [ ] Error for unsupported file types

#### 7.3 AI Card Editing
- [ ] Select multiple cards → bulk edit with AI instruction
- [ ] Verify edited cards maintain deck association
- [ ] Counts as single generation for rate limiting

#### 7.4 Multi-language Generation
- [ ] Generate cards in different languages
- [ ] Verify language quality for supported languages

---

### 8. Translation

- [ ] Translate card back text to any of 13 supported languages
- [ ] Source language auto-detected (MyMemory API)
- [ ] Auth mode: translations cached in `Card.translations` JSONB
- [ ] Guest mode: uses `POST /cards/translate-text` endpoint
- [ ] Verify translation UI/UX flow
- [ ] Error handling for translation failures

---

### 9. Public/Shared Decks (Browse)

- [ ] Browse page lists all public decks
- [ ] Pagination works correctly
- [ ] Search by keyword filters results
- [ ] Sort options work (newest, popular, etc.)
- [ ] Category filter works
- [ ] Click deck → public deck detail page
- [ ] Preview cards (limited count to prevent scraping)
- [ ] Copy public deck to user library (`POST /public/decks/{id}/copy`)
- [ ] Copied deck appears in user's dashboard
- [ ] SEO: public deck pages have proper meta tags

---

### 10. Theme System

#### 10.1 Color Themes
- [ ] Switch between 6 presets: Indigo, Emerald, Rose, Amber, Violet, Slate
- [ ] All UI elements update with selected theme
- [ ] Theme persists across sessions (localStorage)
- [ ] Verify CSS custom properties (`--color-primary-50` through `--color-primary-900`)
- [ ] Verify using `bg-primary-600` class (NOT `bg-[var(--color-primary-600)]`)

#### 10.2 Dark Mode
- [ ] Toggle light / dark / system modes
- [ ] `.dark` class applied/removed on `<html>` element
- [ ] All pages render correctly in dark mode (no unreadable text, missing borders)
- [ ] System mode follows OS preference
- [ ] Dark mode persists across sessions

---

### 11. Internationalization (i18n)

- [ ] Switch between all 14 supported languages
- [ ] All ~495 translation keys render (no raw keys like `dashboard.title` shown)
- [ ] RTL support for Arabic (layout mirrors correctly)
- [ ] Language preference persists (localStorage)
- [ ] Date/number formatting respects locale
- [ ] Rich text editor toolbar labels translated (27 `editor.*` keys)
- [ ] Landing page: all 7 sections translated, language switcher works

---

### 12. Settings Page

- [ ] Change display language
- [ ] Change color theme
- [ ] Toggle dark mode
- [ ] Adjust daily new card limit (0-9999)
- [ ] Update username
- [ ] Settings persist after logout/login
- [ ] Guest settings stored in localStorage

---

### 13. Pricing & Subscriptions

#### 13.1 Pricing Page
- [ ] Three tiers display with correct features and prices
- [ ] Billing toggle (monthly/annual) updates prices
- [ ] CTA buttons link to Stripe checkout
- [ ] Gift/promo code modal works (test codes: FREEPRO, FREEPREMIUM)

#### 13.2 Stripe Integration
- [ ] Stripe checkout session created successfully
- [ ] Payment flow completes → redirects to `/subscription/success`
- [ ] Cancelled payment → redirects to `/subscription/canceled`
- [ ] Customer portal accessible (manage subscription)
- [ ] Webhook processes subscription events correctly
- [ ] Tier upgrade reflected immediately in UI
- [ ] Tier-based limits enforced (deck count, card count, AI generations)

#### 13.3 Promo Codes
- [ ] Redeem valid promo code → tier temporarily upgraded
- [ ] Invalid/expired code shows error
- [ ] Redemption limit enforced
- [ ] Duration-based expiry works

---

### 14. Admin Panel

#### 14.1 Access Control
- [ ] Non-admin users redirected to `/dashboard` when accessing `/admin`
- [ ] Admin sidebar renders with 5 sections
- [ ] Mobile: hamburger menu opens sidebar as overlay (z-[61])

#### 14.2 Overview Dashboard
- [ ] Platform stats load (users, decks, cards, reviews)
- [ ] Recent activity shown

#### 14.3 User Management
- [ ] User list with pagination
- [ ] Search users by name/email
- [ ] Filter by tier, provider, admin status
- [ ] Toggle admin status for users
- [ ] View user details

#### 14.4 Deck Management
- [ ] Deck list with pagination
- [ ] Search decks
- [ ] Filter by shared status
- [ ] Update deck visibility
- [ ] Delete deck (admin override)

#### 14.5 Analytics
- [ ] User growth charts render (7d, 30d, 90d, 1y ranges)
- [ ] Granularity toggle (day/week/month)
- [ ] Study engagement metrics display
- [ ] Content metrics display
- [ ] Subscription breakdown
- [ ] Custom event tracking

#### 14.6 Promo Code Management
- [ ] Create new promo code (code, tier, duration, max redemptions)
- [ ] List all promo codes
- [ ] Edit promo code
- [ ] Delete promo code
- [ ] View redemption count

---

### 15. Support Chat

#### 15.1 AI Assistant Tab
- [ ] Open chat widget (bottom-right, z-[1100])
- [ ] Send message → Claude AI responds
- [ ] Conversation history persisted in DB
- [ ] Works for both guest and authenticated users
- [ ] Guest identified by UUID in localStorage

#### 15.2 Live Support Tab
- [ ] Send message → appears in admin support panel
- [ ] WebSocket connection established (`/ws/{conversation_id}`)
- [ ] Real-time message delivery (both directions)
- [ ] Admin reply appears in user's chat widget
- [ ] Conversation status management (open/closed)

#### 15.3 Admin Support Panel
- [ ] Two-column layout: conversation list + active chat
- [ ] Filter conversations by status
- [ ] Reply to user messages
- [ ] Close conversations
- [ ] Real-time updates via WebSocket

---

### 16. Browser Extension

- [ ] Install extension on Chrome, Firefox, Edge, Brave
- [ ] Right-click selected text → "Set as card front" / "Set as card back"
- [ ] Open popup → login with email/password
- [ ] Select deck from dropdown
- [ ] Create card from popup
- [ ] AI card generation from popup
- [ ] Draft persistence between popup opens
- [ ] Extension works on various websites (no CSP conflicts)
- [ ] Verify manifest V3 permissions are minimal

---

### 17. File Import (Excel/CSV)

- [ ] Import .xlsx file → cards parsed correctly
- [ ] Import .csv file → cards parsed correctly
- [ ] Column mapping (first col = front, second = back)
- [ ] Max 500 cards per import enforced
- [ ] Error handling for malformed files
- [ ] Tier-based card limits checked before import
- [ ] Import progress indicator shown

---

### 18. Cross-Cutting Concerns

#### 18.1 Responsive Design
- [ ] All pages render correctly on mobile (375px width)
- [ ] All pages render correctly on tablet (768px width)
- [ ] All pages render correctly on desktop (1920px width)
- [ ] No horizontal scroll on any viewport
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Bottom navigation bar on mobile, sidebar/top nav on desktop

#### 18.2 Performance
- [ ] Dashboard loads in <3 seconds
- [ ] Study card flip animation is smooth (60fps)
- [ ] No layout shifts during page load
- [ ] Images lazy-loaded where appropriate
- [ ] TanStack Query caching reduces redundant API calls

#### 18.3 Error Handling
- [ ] Network error → user-friendly toast notification
- [ ] 401 error → auto-refresh or redirect to login
- [ ] 403 error → appropriate access denied message
- [ ] 404 error → not found page
- [ ] 429 rate limit → clear message to user
- [ ] 500 server error → generic error message (no stack traces)
- [ ] Toast notifications (react-hot-toast, top-center position)

#### 18.4 Accessibility
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus management in modals (trap focus, return on close)
- [ ] Screen reader compatibility for key flows
- [ ] Color contrast meets WCAG AA standards
- [ ] Alt text on images

#### 18.5 Security
- [ ] No XSS through card content (DOMPurify + nh3)
- [ ] No XSS through username or deck titles
- [ ] CSRF protection on state-changing endpoints
- [ ] Sensitive data not exposed in API responses
- [ ] Rate limiting on auth endpoints
- [ ] JWT tokens not logged or exposed in error messages
- [ ] Content Security Policy headers present

#### 18.6 Modal Z-Index Stacking
Verify correct z-index layering (no overlapping issues):
- z-50: Navbar
- z-[60/61]: Mobile drawer
- z-[900]: Confetti animations
- z-[1000]: Standard modals
- z-[1001]: Delete confirmation (above other modals)
- z-[1100]: Chat widget (always on top)

---

### 19. Landing Page (esli.app)

- [ ] All 7 sections render: Navbar, Hero, Features, HowItWorks, Pricing, FAQ, Footer
- [ ] CTA buttons link to `app.esli.app` (login/register)
- [ ] Language switcher works (14 languages, Globe icon dropdown)
- [ ] RTL layout for Arabic
- [ ] Responsive on all viewports
- [ ] No broken images or links
- [ ] SEO meta tags present
- [ ] `_headers` file serves correct security headers (Cloudflare Pages)

---

## Bug Report Template

When reporting bugs, use this format:

```
### BUG-[NUMBER]: [Short Title]

**Severity**: Critical / High / Medium / Low
**Component**: [Feature area]
**Environment**: [Browser, device, viewport]
**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Result**: What should happen
**Actual Result**: What actually happens
**Screenshot/Recording**: [If applicable]
**Console Errors**: [If any]
**API Response**: [If relevant, include status code and body]
```

---

## Severity Definitions

| Level | Definition | Examples |
|-------|-----------|----------|
| **Critical** | App unusable, data loss, security vulnerability | Can't login, cards deleted unexpectedly, XSS found |
| **High** | Major feature broken, no workaround | Study mode crashes, payments fail, sync loses data |
| **Medium** | Feature partially broken, workaround exists | Translation fails for one language, filter doesn't clear |
| **Low** | Cosmetic, minor UX issue | Alignment off on one viewport, tooltip cut off |

---

## Test Completion Checklist

After testing, provide:
1. **Summary**: Total tests run, passed, failed, blocked
2. **Critical/High bugs**: List with BUG IDs
3. **Environment notes**: Any browser-specific issues
4. **Recommendations**: Priority fixes before release
5. **Regression risks**: Areas that need re-testing after fixes
