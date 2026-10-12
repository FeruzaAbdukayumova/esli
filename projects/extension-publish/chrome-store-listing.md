# Chrome Web Store Listing - Esli Flashcards

Copy/paste these fields directly into the Chrome Web Store developer dashboard.

---

## Basic Info

**Name** (max 75 chars):
```
Esli Flashcards - AI Card Creator
```

**Short description / Summary** (max 132 chars):
```
Turn any webpage into flashcards. Highlight text or use AI to auto-generate study cards from articles, docs, anything.
```

**Category:** Productivity (primary) → Workflow & Planning

**Language:** English

---

## Detailed Description

```
Esli Flashcards turns any webpage into a study deck in seconds. Highlight text and right-click to save it as a flashcard, or let AI generate a full set of cards from any article, doc, or page you're reading.

Built for students, language learners, and anyone who studies online.

━━━ KEY FEATURES ━━━

✦ Right-click to capture
Select text on any page → right-click → "Add to Esli" → choose Front or Back. Build cards as you read.

✦ AI card generation
Click the Esli icon, hit "Extract from Page", and generate 5 to 100 flashcards automatically. Pick your card count and language.

✦ 14 languages supported
Generate cards in English, Spanish, French, German, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Turkish, Vietnamese, or Uzbek.

✦ Smart deck management
Pick from your existing decks or create a new one without leaving the popup. Last-used deck is remembered.

✦ Drafts persist across sessions
Capture the front side from one page, the back side from another, and Esli holds onto both until you save.

✦ Spaced repetition built in
Cards sync to your Esli account where the SM-2 algorithm schedules reviews so you remember what you study.

✦ Guest mode
Try it before signing up. Generate AI cards instantly, then create a free account to save them.

━━━ HOW IT WORKS ━━━

1. Install the extension
2. Sign in with your free Esli account (or use guest mode to try it)
3. Highlight text on any page → right-click → "Add to Esli"
   OR click the extension icon → "Extract from Page" → "Generate Cards"
4. Pick a deck, save, and study at app.esli.app

━━━ PERFECT FOR ━━━

• Students reading textbooks, papers, or course material online
• Language learners building vocabulary from articles in their target language
• Professionals studying documentation, certifications, or training material
• Anyone who reads to learn

━━━ FREE TO USE ━━━

The extension is free. Esli has a free tier with everything you need to start. Pro and Premium plans unlock higher AI card limits.

━━━ PRIVACY ━━━

Esli only sends data to its own servers (api.esli.app) when you take an action - log in, save a card, generate cards. We don't track your browsing. See our full privacy policy at https://esli.app/privacy

━━━ SUPPORT ━━━

Found a bug or have a feature request? Email support@esli.app or use the in-app chat at app.esli.app
```

---

## Permission Justifications

Chrome will ask for justification for each permission. Use these:

**`contextMenus`** (Single purpose justification)
```
Used to add an "Add to Esli" right-click menu so users can save selected text as a flashcard front, back, or AI-generate cards from a selection.
```

**`activeTab`**
```
Used to read the user-selected text or visible page content when the user explicitly clicks "Extract from Page" or right-clicks "Add to Esli". No data is read without explicit user action.
```

**`storage`**
```
Used to store the user's authentication token and persist card drafts (front/back text) across popup open/close so users don't lose their work.
```

**`scripting`**
```
Used to inject a small content script into the active tab when the user clicks "Extract from Page" so we can read the page text the user wants to turn into flashcards.
```

**`tabs`**
```
Used to open the Esli web app login page when the user clicks "Sign in via App" and to detect when the OAuth-style callback completes.
```

**Host permissions: `https://api.esli.app/*`**
```
The extension talks to our backend at api.esli.app for login, fetching the user's decks, creating decks, creating cards, and AI card generation.
```

**Host permissions: `https://app.esli.app/*`**
```
Used during the "Sign in via App" flow to receive the auth token from the Esli web app after the user logs in.
```

**Content script matches `<all_urls>`**
```
Required because users want to create flashcards from any webpage they read - articles, documentation, online textbooks, language-learning sites, etc. The content script only runs when the user explicitly triggers it via right-click or "Extract from Page" - it does not auto-collect data from any page.
```

---

## Single Purpose Statement

Chrome requires a single purpose. Use this:

```
Esli Flashcards has a single purpose: helping users create flashcards from web content, either by selecting text and right-clicking, or by using AI to auto-generate cards from a page.
```

---

## Privacy Practices Disclosure

Chrome will ask about data collection. Check these boxes:

- **Personally identifiable info** (email): YES - collected for authentication
- **Authentication info** (passwords/tokens): YES - collected for sign-in
- **Web history**: NO
- **User activity**: NO
- **Website content**: YES - only when user explicitly triggers it (selected text or "Extract from Page")
- **Health info / Financial info / Personal communications / Location**: NO

**Data usage certification (must check all that apply):**
- ✅ I do not sell or transfer user data to third parties, outside of the approved use cases
- ✅ I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- ✅ I do not use or transfer user data to determine creditworthiness or for lending purposes

**Privacy policy URL:**
```
https://esli.app/privacy
```

---

## Store Listing Assets Needed

You need to upload these. Spec required by Chrome:

| Asset | Size | Required | Notes |
|-------|------|----------|-------|
| Icon | 128x128 PNG | ✅ already in zip | done |
| Screenshots | 1280x800 or 640x400 PNG/JPG | ✅ at least 1, up to 5 | see screenshot list |
| Small promo tile | 440x280 PNG/JPG | optional | recommended |
| Marquee promo tile | 1400x560 PNG/JPG | optional | only for featured placement |

---

## Final Submission Checklist

- [ ] Created Chrome Web Store developer account ($5)
- [ ] Uploaded `esli-chrome-v1.0.0.zip`
- [ ] Filled name, short desc, detailed description
- [ ] Selected category: Productivity
- [ ] Uploaded 128x128 icon (auto from zip)
- [ ] Uploaded 1-5 screenshots
- [ ] Filled permission justifications
- [ ] Filled single purpose statement
- [ ] Set privacy policy URL: https://esli.app/privacy
- [ ] Completed data usage certification
- [ ] Set distribution: Public, all regions
- [ ] Set pricing: Free
- [ ] Submitted for review (review takes 1-3 days typically, can be longer for first submission)
