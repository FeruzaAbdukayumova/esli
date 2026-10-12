# QA Testing Report — Esli Browser Extension ("Flashcards - Quick Add")

**Project:** Esli Flashcards
**Component:** Browser Extension
**Date:** 2026-04-08
**Version:** 1.2
**Manifest:** V3
**Browsers Tested:** Chrome, Firefox, Edge, Brave

---

## 1. Executive Summary

This report covers the QA testing scope for the Esli browser extension. The extension allows users to create flashcards via context menu (right-click), manual input, and AI generation directly from any webpage. It supports authenticated and guest modes, persistent drafts, deck management, and multi-language AI card generation.

---

## 2. Test Environment

| Parameter | Details |
|-----------|---------|
| Extension Version | 1.2 |
| Manifest Version | MV3 |
| API Base URL | `https://api.esli.app` |
| Target Browsers | Chrome 90+, Firefox 120+, Edge (Chromium), Brave |
| OS | macOS, Windows, Linux |
| Auth Method | Email/password, App login (OAuth-style) |

---

## 3. Features Under Test

| # | Feature | Priority |
|---|---------|----------|
| F1 | Context menu — "As Front side" | High |
| F2 | Context menu — "As Back side" | High |
| F3 | Context menu — "AI Generate Cards" | High |
| F4 | Manual card creation (popup) | High |
| F5 | AI card generation (popup) | High |
| F6 | Email/password login | High |
| F7 | App login (redirect flow) | Medium |
| F8 | Guest mode | Medium |
| F9 | Deck selection & creation | High |
| F10 | Draft persistence | Medium |
| F11 | Dark mode | Low |
| F12 | Tier-based card limits | Medium |
| F13 | Sign out | Medium |
| F14 | Error handling & edge cases | High |

---

## 4. Test Cases

### 4.1 Installation & Setup

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-001 | Install on Chrome | Load unpacked from `extension/` folder | Extension icon appears in toolbar, context menu registered | |
| TC-002 | Install on Firefox | Load as temporary add-on | Extension loads without errors, gecko ID recognized | |
| TC-003 | Install on Edge | Load unpacked | Extension functions identically to Chrome | |
| TC-004 | Install on Brave | Load unpacked | Extension functions identically to Chrome | |
| TC-005 | Extension icon click | Click extension icon in toolbar | Popup opens (400px width), login form shown for unauthenticated user | |

### 4.2 Authentication — Email/Password Login

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-010 | Valid login | Enter valid email + password, click Sign In | Token stored, popup switches to card creation view, user name displayed | |
| TC-011 | Invalid credentials | Enter wrong password | Error message "Invalid email or password" shown in red box | |
| TC-012 | Empty fields | Click Sign In with empty email/password | Validation error displayed | |
| TC-013 | Token persistence | Login, close popup, reopen popup | User remains logged in, card creation view shown | |
| TC-014 | Token expiry (401) | Wait for token expiry (4h) or manually clear token, try an action | Prompted to sign in again, guest mode shown | |
| TC-015 | Password visibility toggle | Click eye icon in password field | Password text toggled between visible/hidden | |

### 4.3 Authentication — App Login (OAuth-style)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-020 | App login flow | Click "Sign in with Esli" button | New tab opens `app.esli.app`, after login token captured via `#token=` hash | |
| TC-021 | App login cancel | Click app login, close the opened tab without logging in | Extension remains in guest mode, no errors | |
| TC-022 | App login with existing session | Already logged in on app.esli.app, click app login | Token captured immediately, popup updates | |

### 4.4 Guest Mode

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-030 | Guest UI | Open popup without logging in | Guest CTA banner visible, "Create free account" link shown | |
| TC-031 | Guest — Manual tab | Switch to Manual tab as guest | Front/back textareas visible but Save button replaced with signup CTA | |
| TC-032 | Guest — AI tab | Switch to AI tab as guest | Can extract text and generate cards, but Save All replaced with signup CTA | |
| TC-033 | Guest — context menu | Right-click text as guest | Context menu items appear, text captured to popup fields | |
| TC-034 | Guest signup link | Click "Create free account" | Opens `app.esli.app/register` in new tab | |

### 4.5 Context Menu

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-040 | Set as Front side | Select text on page, right-click → "Add to Esli" → "As Front side" | Selected text stored as card front, visible when popup opened | |
| TC-041 | Set as Back side | Select text, right-click → "As Back side" | Selected text stored as card back | |
| TC-042 | Front + Back flow | Set front from one selection, set back from another, open popup | Both fields populated in Manual tab | |
| TC-043 | AI Generate from selection | Select text, right-click → "AI Generate Cards" | Text stored as pending AI text, AI tab pre-filled when popup opened | |
| TC-044 | No text selected | Right-click without selecting text | Context menu items appear but no text captured (graceful handling) | |
| TC-045 | Context menu on restricted page | Right-click on `chrome://extensions` | Graceful failure, user-friendly message about restricted pages | |
| TC-046 | Long text selection | Select very long text (>5000 chars) | Text captured fully, character count shown in AI tab | |

### 4.6 Manual Card Creation

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-050 | Create card — happy path | Enter front text, back text, select deck, click "Add Card" | Card created via API, success message shown for 3 seconds, fields cleared | |
| TC-051 | Empty front field | Leave front empty, fill back, click Add Card | Validation error shown | |
| TC-052 | Empty back field | Fill front, leave back empty, click Add Card | Validation error shown | |
| TC-053 | No deck selected | Fill both fields, don't select a deck | Validation error or prompt to select/create deck | |
| TC-054 | Create multiple cards | Create card, verify fields clear, create another | Both cards created successfully, success message each time | |
| TC-055 | Special characters | Enter HTML tags, emojis, unicode in front/back | Card created with content properly escaped/sanitized | |
| TC-056 | Very long text | Enter text exceeding typical limits | Handled gracefully (API validation or frontend limit) | |

### 4.7 AI Card Generation

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-060 | Extract page text | Click "Extract from Page" on AI tab | Full page text extracted, character count displayed | |
| TC-061 | Extract selected text | Select text on page, then click extract | Only selected text extracted | |
| TC-062 | Generate cards — default settings | Extract text, use default count (5) and language, click Generate | Loading spinner shown, cards generated and previewed after 10-30s | |
| TC-063 | Generate cards — custom count | Select count = 20 | 20 cards generated (if content allows) | |
| TC-064 | Generate cards — specific language | Select "Spanish" from language dropdown | Cards generated in Spanish | |
| TC-065 | Card preview — edit | Click edit on a generated card | Inline editing enabled, changes saved | |
| TC-066 | Card preview — remove single | Click remove on one card | Card removed from preview, count decremented | |
| TC-067 | Card preview — remove all | Click "Remove all" | All cards cleared, returns to form state | |
| TC-068 | Card preview — back button | Click "Back" on preview | Returns to AI form, extracted text preserved | |
| TC-069 | Save all cards to deck | Select deck, click "Save All to Deck" | All previewed cards batch-created via API, success message with count and deck name | |
| TC-070 | Generate with no text | Click Generate without extracting text | Error message shown | |
| TC-071 | Tier limits — Free user | Login as free user, check card count options | Only 5, 10, 20 options available | |
| TC-072 | Tier limits — Pro user | Login as pro user | Options up to 30 or 50 available | |
| TC-073 | Tier limits — Premium user | Login as premium user | Options up to 75 or 100 available | |
| TC-074 | AI generation timeout | Simulate slow API response | Loading state persists, no premature errors | |
| TC-075 | AI generation failure | Simulate API error | Error message displayed, form state preserved | |

### 4.8 Deck Management

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-080 | Load decks | Open popup while logged in | Deck dropdown populated with user's decks | |
| TC-081 | Select deck | Choose a deck from dropdown | Deck selected, `lastDeckId` persisted | |
| TC-082 | Last deck persistence | Select deck, close popup, reopen | Previously selected deck auto-selected | |
| TC-083 | Create new deck inline | Click "+" button, enter deck name, submit | New deck created via API, auto-selected in dropdown | |
| TC-084 | Create deck — empty name | Click "+", submit with empty name | Validation error shown | |
| TC-085 | Create deck — duplicate name | Create deck with name that already exists | API error handled gracefully | |
| TC-086 | No decks exist | Login with account that has no decks | Dropdown empty, prompted to create a deck | |

### 4.9 Draft Persistence

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-090 | Draft saved on popup close | Type text in front/back fields, close popup | Draft stored in `chrome.storage.local` | |
| TC-091 | Draft restored on popup open | Close popup with draft, reopen | Front and back fields populated from draft | |
| TC-092 | Draft cleared on submit | Create card successfully | Draft cleared from storage and fields | |
| TC-093 | Context menu + draft merge | Have existing draft, set new front via context menu | Front updated from context menu, back preserved from draft | |
| TC-094 | Draft across browser restart | Create draft, restart browser, reopen popup | Draft persisted and restored | |

### 4.10 Sign Out

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-100 | Sign out | Click "Sign Out" button | Token cleared, popup switches to login view | |
| TC-101 | Sign out and back in | Sign out, then sign in again | Full functionality restored, decks loaded | |
| TC-102 | Sign out preserves drafts | Have draft content, sign out | Draft content preserved for next session | |

### 4.11 Dark Mode

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-110 | System dark mode | Set OS to dark mode | Extension popup uses dark theme | |
| TC-111 | System light mode | Set OS to light mode | Extension popup uses light theme | |
| TC-112 | Dark mode readability | Check all text, inputs, buttons in dark mode | All elements readable, proper contrast ratios | |
| TC-113 | Dark mode — AI preview | Generate cards in dark mode | Card preview list properly styled | |

### 4.12 Error Handling

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-120 | Network offline | Disconnect internet, try any API action | User-friendly "Could not connect" error | |
| TC-121 | API server down | API returns 500 | Error message displayed, no crash | |
| TC-122 | 401 during action | Token expires mid-session, try creating card | AUTH_EXPIRED error, prompted to re-login | |
| TC-123 | Rapid clicking | Click "Add Card" multiple times quickly | No duplicate cards created, button disabled during request | |
| TC-124 | Content script blocked | Open popup on a chrome:// page, try extract text | Friendly error about restricted pages | |
| TC-125 | Error dismissal | Trigger error, then start typing | Error message auto-hides | |

### 4.13 Cross-Browser Compatibility

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-130 | Chrome — full flow | Install, login, create card via context menu + manual + AI | All features work | |
| TC-131 | Firefox — full flow | Install, login, create card via context menu + manual + AI | All features work, `browser` API used | |
| TC-132 | Edge — full flow | Install, login, create card | All features work | |
| TC-133 | Brave — full flow | Install, login, create card | All features work, shields don't block API | |
| TC-134 | Firefox `browserAPI` fallback | Check console for API errors | `browser` global detected, no `chrome` fallback needed | |

### 4.14 Performance & UX

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-140 | Popup load time | Click extension icon, measure time to interactive | Popup loads and is interactive within 500ms | |
| TC-141 | Deck list with many decks | Account with 50+ decks | Dropdown loads and scrolls without lag | |
| TC-142 | AI generation with max cards | Generate 100 cards (premium) | Preview renders smoothly, scroll works | |
| TC-143 | Memory usage | Monitor extension memory in task manager | No memory leaks after repeated open/close cycles | |
| TC-144 | Content script injection | Navigate between pages, check injection | Script injected once per page (guard: `__esliContentScriptLoaded`) | |

---

## 5. Test Data Requirements

| Data | Details |
|------|---------|
| Free tier account | email: `test-free@example.com` |
| Pro tier account | email: `test-pro@example.com` |
| Premium tier account | email: `test-premium@example.com` |
| Account with 0 decks | For empty state testing |
| Account with 50+ decks | For performance testing |
| Test pages | Pages with various content: text-heavy articles, pages with minimal text, restricted pages (`chrome://`), pages with special characters |

---

## 6. Known Limitations

| # | Limitation | Impact |
|---|-----------|--------|
| L1 | Cannot operate on `chrome://`, `about:`, or browser internal pages | Low — expected browser restriction |
| L2 | Token lifetime is 4 hours, no auto-refresh in extension | Medium — user must re-login periodically |
| L3 | AI generation takes 10-30 seconds | Low — loading indicator present |
| L4 | No offline card queue (cards cannot be saved without network) | Medium — requires connectivity |

---

## 7. Risks & Recommendations

| # | Risk | Recommendation |
|---|------|----------------|
| R1 | Token expiry during AI generation (long operation) | Add token validity check before starting generation |
| R2 | Duplicate content script injection on SPA navigations | Verify `__esliContentScriptLoaded` guard across all SPA frameworks |
| R3 | No rate limiting on client-side for API calls | Add debounce/disable on submit buttons during requests |
| R4 | Draft can grow stale if user forgets about it | Consider adding a "clear draft" button or expiry |
| R5 | No confirmation before "Remove all" AI cards | Add confirmation dialog to prevent accidental data loss |

---

## 8. Test Summary

| Category | Total Tests | Pass | Fail | Blocked | Not Run |
|----------|-------------|------|------|---------|---------|
| Installation & Setup | 5 | | | | |
| Auth — Email/Password | 6 | | | | |
| Auth — App Login | 3 | | | | |
| Guest Mode | 5 | | | | |
| Context Menu | 7 | | | | |
| Manual Card Creation | 7 | | | | |
| AI Card Generation | 16 | | | | |
| Deck Management | 7 | | | | |
| Draft Persistence | 5 | | | | |
| Sign Out | 3 | | | | |
| Dark Mode | 4 | | | | |
| Error Handling | 6 | | | | |
| Cross-Browser | 5 | | | | |
| Performance & UX | 5 | | | | |
| **Total** | **84** | | | | |

---

## 9. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Engineer | | | |
| Developer | | | |
| Project Lead | | | |

---

*Report generated on 2026-04-08*
