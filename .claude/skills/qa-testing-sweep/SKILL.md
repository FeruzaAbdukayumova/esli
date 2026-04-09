# QA Testing Sweep

Systematically test the Esli flashcard app for bugs, UX issues, and edge cases.

## Usage
Run with: "Do a QA sweep" or "Do a QA sweep on [area]"

## How It Works

When invoked, pick a scope (full app or specific area) and run through the relevant checklist below. For each item:
- Read the component/page code
- Check for bugs, broken logic, missing error handling at boundaries, and bad UX
- Report findings as a prioritized list: critical > major > minor

## Areas to Test

### 1. Auth Flow
- Login with valid/invalid credentials
- Registration with duplicate email/username
- OAuth Google flow (callback handling, state validation)
- Token refresh logic (401 interceptor in apiClient.ts)
- Guest-to-auth transition (data preservation)
- Logout clears all state

### 2. Dashboard & Navigation
- Dashboard stats load correctly (DashboardStats.tsx)
- Deck list renders with 0, 1, many decks
- Bottom nav highlights correct tab
- Mobile responsive layout
- Empty states have clear CTAs

### 3. Deck Management
- Create deck (name validation, limits by tier)
- Edit deck name/description
- Delete deck (confirmation, cleanup)
- Import cards from CSV/Excel (valid/invalid files, column mapping)
- AI generation (topic input, PDF upload, error states)
- Batch card creation (within tier limits)
- Card CRUD (create, edit, delete)
- Rich text editor (formatting, math/KaTeX, character limit 5000)

### 4. Study Flow
- Study page loads due cards correctly
- Card flip animation works (3D transform)
- SM-2 responses (again/hard/good/easy) update card state
- "Again" re-inserts card ~3 positions later
- Session persistence (sessionStorage)
- Empty deck / no due cards state
- Desktop nav (prev/next on sides) vs mobile (buttons below)
- Session completion (confetti, stats)
- Back/exit goes to /dashboard

### 5. Browse & Shared Decks
- Browse page loads public decks
- Search, sort, filter by category
- Public deck detail page
- Copy deck to own collection
- Handles tier limits when copying

### 6. Subscription & Payments
- Pricing page renders all tiers correctly
- Monthly/yearly toggle works
- Tier limits enforced (deck count, card count, AI generations)
- Promo code redemption
- Upgrade/downgrade flow
- Free tier restrictions are clear to user

### 7. Settings & Profile
- Language switcher (14 languages)
- Theme/color switcher (6 presets)
- Dark mode toggle (light/dark/system)
- Daily new card limit setting
- Profile edit (username, email)
- Password change

### 8. Browser Extension
- Manifest valid
- Popup login/deck selection
- Right-click context menu (set front/set back)
- Card creation from extension
- Extension promotion banner (dismissible)

### 9. Support & Chat
- Chat widget opens/closes (z-index correct)
- AI assistant tab works
- Live support tab (WebSocket connection)
- Guest user identification
- Conversation history persists

### 10. Cross-Cutting Concerns
- i18n: no hardcoded strings, all 14 locales have keys
- API error responses show user-friendly messages
- Loading states (skeletons, spinners) on all async operations
- 404/error pages
- Mobile responsiveness on all pages
- Tier limit error messages are clear and actionable
- camelCase/snake_case transformation (apiRepo layer)

## Output Format

```markdown
## QA Sweep: [Area] - [Date]

### Critical (blocks users)
- [ ] [File:line] Description of issue

### Major (bad UX but workaround exists)
- [ ] [File:line] Description of issue

### Minor (polish)
- [ ] [File:line] Description of issue

### Passed
- Item that looks good
```

## Tips
- Focus on user-facing behavior, not code style
- Check mobile and desktop layouts
- Look at empty states and error states, not just happy paths
- Check that tier limits show helpful upgrade prompts, not cryptic errors
- Verify loading/skeleton states exist for all API calls
