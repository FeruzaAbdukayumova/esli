# SEO Pages — Week 15, 2026

**Generated:** 2026-04-08  
**Directory:** `agents/content/seo-pages/2026-W15/`  
**Status:** Ready for review & integration

---

## Pages Generated (5 total)

### 1. MCAT Flashcards — Subject Page
- **File:** `MCATFlashcards.tsx`
- **Route:** `/flashcards/mcat`
- **Meta title:** `MCAT Flashcards Free — AI Generator | Esli` (46 chars)
- **Meta description:** `Generate MCAT flashcards instantly with AI. Type any MCAT topic and get study-ready cards in seconds. Free, with spaced repetition. Start now — no signup needed.` (163 chars — trim if needed)
- **Primary keyword:** `MCAT flashcards free`
- **Secondary keywords:** `MCAT flashcards`, `MCAT study cards`, `best MCAT flashcards`, `MCAT Anki alternative`
- **Page type:** Subject page
- **Sections:** Hero → How It Works → Sample Cards (6, interactive flip) → Benefits → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)

---

### 2. Japanese Vocabulary Flashcards — Subject / Language Page
- **File:** `JapaneseVocabularyFlashcards.tsx`
- **Route:** `/flashcards/japanese-vocabulary`
- **Meta title:** `Japanese Vocabulary Flashcards — AI Generator | Esli` (52 chars)
- **Meta description:** `Generate Japanese vocabulary flashcards with AI. Type any topic — JLPT N5, N3, kanji, grammar — and get cards instantly. Free, spaced repetition, 14 languages.` (162 chars)
- **Primary keyword:** `Japanese vocabulary flashcards`
- **Secondary keywords:** `JLPT flashcards`, `Japanese flashcards free`, `learn Japanese flashcards`, `Japanese kanji flashcards`
- **Page type:** Subject / Language page
- **Sections:** Hero (with JLPT level tag badges) → How It Works → Sample Cards (6, interactive flip with Japanese text) → Benefits → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)

---

### 3. AWS Certification Flashcards — Subject / IT Page
- **File:** `AWSCertificationFlashcards.tsx`
- **Route:** `/flashcards/aws-certification`
- **Meta title:** `AWS Certification Flashcards — AI Generator | Esli` (50 chars)
- **Meta description:** `Generate AWS certification flashcards with AI. Type any AWS service or exam topic and get study cards instantly. Free, with spaced repetition. Pass faster.` (156 chars)
- **Primary keyword:** `AWS certification flashcards`
- **Secondary keywords:** `AWS flashcards free`, `AWS Solutions Architect flashcards`, `Cloud Practitioner flashcards`, `CompTIA flashcards`
- **Page type:** Subject / IT page
- **Sections:** Hero (with exam code tag badges: CLF-C02, SAA-C03, etc.) → How It Works → Sample Cards (6, interactive flip) → Benefits → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)

---

### 4. Esli vs Anki — Comparison Page
- **File:** `EsliVsAnki.tsx`
- **Route:** `/compare/anki`
- **Meta title:** `Esli vs Anki — Which Flashcard App Is Better?` (46 chars)
- **Meta description:** `Esli vs Anki compared honestly. Both use spaced repetition — but Esli adds AI generation so you never make cards manually again. Free. See the full comparison.` (161 chars)
- **Primary keyword:** `Esli vs Anki`
- **Secondary keywords:** `Anki alternative`, `Anki alternative with AI`, `free Anki alternative`, `best flashcard app 2026`
- **Page type:** Comparison page
- **Sections:** Hero → TL;DR Summary bar → Feature Comparison Table (11 features) → Where Esli Wins (3 cards) → Honest Anki strengths section → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **Tone:** Honest — acknowledges Anki's community deck library and customization strengths
- **FAQ Schema:** Yes (JSON-LD, 5 questions)

---

### 5. AI Flashcards for Medical Students — Use-Case Page
- **File:** `AIFlashcardsMedicalStudents.tsx`
- **Route:** `/use-case/medical-students`
- **Meta title:** `AI Flashcards for Medical Students — Free | Esli` (48 chars)
- **Meta description:** `Esli generates medical flashcards instantly from any topic or PDF. USMLE, MCAT, anatomy, pharmacology — study smarter with AI + spaced repetition. Free forever.` (162 chars)
- **Primary keyword:** `AI flashcards medical students`
- **Secondary keywords:** `USMLE flashcards AI`, `medical school flashcards`, `MCAT flashcards AI`, `anatomy flashcards free`, `pharmacology flashcards`
- **Page type:** Use-case / audience page
- **Sections:** Hero (with exam tag badges) → Pain Points → Solutions → How It Works → Use Cases (6: USMLE, MCAT, NCLEX, Anatomy, Pharmacology, Pathology) → Why AI Generation matters (4 benefits) → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)

---

## Target Keywords Summary

| Keyword | Volume | Page |
|---------|--------|------|
| `MCAT flashcards free` | High | `/flashcards/mcat` |
| `MCAT flashcards` | High | `/flashcards/mcat` |
| `Japanese vocabulary flashcards` | High | `/flashcards/japanese-vocabulary` |
| `JLPT flashcards` | Medium | `/flashcards/japanese-vocabulary` |
| `AWS certification flashcards` | Medium | `/flashcards/aws-certification` |
| `AWS Solutions Architect flashcards` | Medium | `/flashcards/aws-certification` |
| `Anki alternative` | High | `/compare/anki` |
| `Esli vs Anki` | Low (growing) | `/compare/anki` |
| `AI flashcards medical students` | Medium | `/use-case/medical-students` |
| `USMLE flashcards AI` | Medium | `/use-case/medical-students` |
| `free flashcard app` | High | all pages (secondary) |

---

## Integration Notes

### Adding routes (React Router example)
```tsx
import MCATFlashcards from './pages/MCATFlashcards'
import JapaneseVocabularyFlashcards from './pages/JapaneseVocabularyFlashcards'
import AWSCertificationFlashcards from './pages/AWSCertificationFlashcards'
import EsliVsAnki from './pages/EsliVsAnki'
import AIFlashcardsMedicalStudents from './pages/AIFlashcardsMedicalStudents'

// In your router:
<Route path="/flashcards/mcat" element={<MCATFlashcards />} />
<Route path="/flashcards/japanese-vocabulary" element={<JapaneseVocabularyFlashcards />} />
<Route path="/flashcards/aws-certification" element={<AWSCertificationFlashcards />} />
<Route path="/compare/anki" element={<EsliVsAnki />} />
<Route path="/use-case/medical-students" element={<AIFlashcardsMedicalStudents />} />
```

### Adding meta tags
Each page file has its meta title and description in the top JSDoc comment. Inject these via `<Helmet>` (react-helmet-async) or your SSR `<head>` injection logic. The FAQ JSON-LD is already rendered inline inside each component via `<script dangerouslySetInnerHTML>`.

### Prerendering
The existing `prerender.js` script handles single-route SSR. For multi-route SSG, extend it to loop through each SEO page route and write separate HTML files (e.g. `dist/flashcards/mcat/index.html`).

### CSS dependency
All pages use Tailwind CSS v4 with the `primary-*` color tokens defined in `website/src/index.css`. No additional CSS setup needed.

---

## Keywords Already Covered (do not duplicate)
None yet — this is the first batch.

## Suggested Next Pages (Week 16)
- `/flashcards/spanish-vocabulary` — `Spanish flashcards`, `Spanish vocabulary flashcards`
- `/flashcards/gre-vocabulary` — `GRE vocabulary flashcards`, `GRE flashcards free`
- `/compare/quizlet` — `Quizlet alternative`, `Esli vs Quizlet`
- `/flashcards/anatomy` — `anatomy flashcards`, `anatomy flashcards free`
- `/use-case/language-learners` — `AI flashcards language learning`
