# SEO Pages — Week 16, 2026

**Generated:** 2026-04-15  
**Directory:** `agents/content/seo-pages/2026-W16/`  
**Status:** Ready for review & integration

---

## Pages Generated (5 total)

### 1. Spanish Vocabulary Flashcards — Subject / Language Page
- **File:** `SpanishVocabularyFlashcards.tsx`
- **Route:** `/flashcards/spanish-vocabulary`
- **Meta title:** `Spanish Vocabulary Flashcards — AI Generator | Esli` (52 chars)
- **Meta description:** `Generate Spanish vocabulary flashcards with AI. Type any topic — beginner, DELE, travel, business — and get cards instantly. Free, spaced repetition, 14 languages.` (163 chars)
- **Primary keyword:** `Spanish vocabulary flashcards`
- **Secondary keywords:** `Spanish flashcards free`, `learn Spanish flashcards`, `DELE flashcards`, `Spanish grammar flashcards`
- **Page type:** Subject / Language page
- **Sections:** Hero (with level tag badges: A1–C2, DELE, Business) → How It Works → Sample Cards (6, interactive flip) → Benefits → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)
- **Special features:** Level tags (A1 Beginner through DELE Exam), Duolingo comparison FAQ

---

### 2. GRE Vocabulary Flashcards — Subject / Exam Page
- **File:** `GREVocabularyFlashcards.tsx`
- **Route:** `/flashcards/gre-vocabulary`
- **Meta title:** `GRE Vocabulary Flashcards — AI Generator | Esli` (48 chars)
- **Meta description:** `Generate GRE vocabulary flashcards with AI. Type any GRE word list or concept and get study-ready cards instantly. Free, with spaced repetition. Score higher.` (161 chars)
- **Primary keyword:** `GRE vocabulary flashcards`
- **Secondary keywords:** `GRE flashcards free`, `GRE word list flashcards`, `GRE prep flashcards`, `GRE Verbal flashcards`
- **Page type:** Subject / Exam page
- **Sections:** Hero (with exam tags: Verbal Reasoning, Text Completion, Sentence Equivalence, etc.) → How It Works → Sample Cards (6, interactive flip) → Benefits → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)
- **Special features:** Magoosh/Quizlet comparison FAQ, cards include etymology + synonyms + antonyms per GRE convention

---

### 3. Esli vs Quizlet — Comparison Page
- **File:** `EsliVsQuizlet.tsx`
- **Route:** `/compare/quizlet`
- **Meta title:** `Esli vs Quizlet — Which Flashcard App Is Better?` (48 chars)
- **Meta description:** `Esli vs Quizlet compared honestly. Quizlet has huge deck libraries — but Esli generates custom AI flashcards in seconds. Free. See the full comparison.` (153 chars)
- **Primary keyword:** `Esli vs Quizlet`
- **Secondary keywords:** `Quizlet alternative`, `Quizlet alternative free`, `best flashcard app 2026`, `free alternative to Quizlet`
- **Page type:** Comparison page
- **Sections:** Hero → TL;DR Summary bar (dark bg) → Feature Comparison Table (11 features) → Where Esli Wins (3 cards) → Honest Quizlet strengths section → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **Tone:** Honest — explicitly acknowledges Quizlet's community deck library and study modes
- **FAQ Schema:** Yes (JSON-LD, 5 questions)
- **Internal links:** Links to `/compare/anki` in footer for cross-linking comparison pages

---

### 4. Anatomy Flashcards — Subject Page
- **File:** `AnatomyFlashcards.tsx`
- **Route:** `/flashcards/anatomy`
- **Meta title:** `Anatomy Flashcards Free — AI Generator | Esli` (46 chars)
- **Meta description:** `Generate anatomy flashcards with AI. Type any anatomy topic — bones, muscles, nerves, organs — and get study-ready cards in seconds. Free, spaced repetition.` (160 chars)
- **Primary keyword:** `anatomy flashcards`
- **Secondary keywords:** `anatomy flashcards free`, `human anatomy flashcards`, `anatomy study cards`, `medical anatomy flashcards`
- **Page type:** Subject page
- **Sections:** Hero (with topic tags: Bones & Joints, Muscles, Nerves, etc.) → How It Works → Sample Cards (6, interactive flip) → Benefits → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)
- **Special features:** Cards include clinical correlations and mnemonics; audience framing for medical/dental students; internal link to `/use-case/medical-students`

---

### 5. AI Flashcards for Language Learners — Use-Case Page
- **File:** `AIFlashcardsLanguageLearners.tsx`
- **Route:** `/use-case/language-learners`
- **Meta title:** `AI Flashcards for Language Learners — Free | Esli` (49 chars)
- **Meta description:** `Esli generates language flashcards instantly from any topic or PDF. Spanish, Japanese, French, TOEFL, DELE, JLPT — study smarter with AI + spaced repetition. Free.` (164 chars)
- **Primary keyword:** `AI flashcards language learning`
- **Secondary keywords:** `language learning flashcards`, `vocabulary flashcards AI`, `AI vocabulary flashcard generator`, `language exam flashcards`
- **Page type:** Use-case / audience page
- **Sections:** Hero → Pain Points + Solutions (4 problems) → How It Works → Language Use Cases (6: Spanish, Japanese, French, German, English/TOEFL, Chinese/HSK) → Benefits → FAQ (5 Qs with JSON-LD) → CTA → Footer
- **FAQ Schema:** Yes (JSON-LD, 5 questions)
- **Special features:** 6-language card grid with exam-specific examples; cross-links to Spanish and Japanese subject pages; Duolingo comparison FAQ

---

## Target Keywords Summary

| Keyword | Volume | Page |
|---------|--------|------|
| `Spanish vocabulary flashcards` | High | `/flashcards/spanish-vocabulary` |
| `Spanish flashcards free` | High | `/flashcards/spanish-vocabulary` |
| `DELE flashcards` | Medium | `/flashcards/spanish-vocabulary` |
| `GRE vocabulary flashcards` | High | `/flashcards/gre-vocabulary` |
| `GRE flashcards free` | High | `/flashcards/gre-vocabulary` |
| `Quizlet alternative` | High | `/compare/quizlet` |
| `Esli vs Quizlet` | Low (growing) | `/compare/quizlet` |
| `Quizlet alternative free` | High | `/compare/quizlet` |
| `anatomy flashcards` | High | `/flashcards/anatomy` |
| `anatomy flashcards free` | High | `/flashcards/anatomy` |
| `AI flashcards language learning` | Medium | `/use-case/language-learners` |
| `language learning flashcards` | Medium | `/use-case/language-learners` |
| `free flashcard app` | High | all pages (secondary) |

---

## Integration Notes

### Adding routes (React Router example)
```tsx
import SpanishVocabularyFlashcards from './pages/SpanishVocabularyFlashcards'
import GREVocabularyFlashcards from './pages/GREVocabularyFlashcards'
import EsliVsQuizlet from './pages/EsliVsQuizlet'
import AnatomyFlashcards from './pages/AnatomyFlashcards'
import AIFlashcardsLanguageLearners from './pages/AIFlashcardsLanguageLearners'

// In your router:
<Route path="/flashcards/spanish-vocabulary" element={<SpanishVocabularyFlashcards />} />
<Route path="/flashcards/gre-vocabulary" element={<GREVocabularyFlashcards />} />
<Route path="/compare/quizlet" element={<EsliVsQuizlet />} />
<Route path="/flashcards/anatomy" element={<AnatomyFlashcards />} />
<Route path="/use-case/language-learners" element={<AIFlashcardsLanguageLearners />} />
```

### Meta tags
Each file has meta title + description in the JSDoc header comment. Inject via `react-helmet-async` or your SSR `<head>` injection. FAQ JSON-LD is rendered inline via `<script dangerouslySetInnerHTML>`.

### CSS
All pages use Tailwind CSS v4 with `primary-*` color tokens from `website/src/index.css`. No extra setup needed.

### Cross-linking
- `/use-case/language-learners` links to `/flashcards/spanish-vocabulary` and `/flashcards/japanese-vocabulary`
- `/flashcards/anatomy` links to `/use-case/medical-students` (from W15)
- `/compare/quizlet` links to `/compare/anki` (from W15)
- Build an internal links graph over time to boost topical authority

---

## Keywords Already Covered (do not duplicate)

### From W15
- `MCAT flashcards free` → `/flashcards/mcat`
- `Japanese vocabulary flashcards` → `/flashcards/japanese-vocabulary`
- `AWS certification flashcards` → `/flashcards/aws-certification`
- `Anki alternative` / `Esli vs Anki` → `/compare/anki`
- `AI flashcards medical students` → `/use-case/medical-students`

### From W16 (this batch)
- `Spanish vocabulary flashcards` → `/flashcards/spanish-vocabulary`
- `GRE vocabulary flashcards` → `/flashcards/gre-vocabulary`
- `Quizlet alternative` / `Esli vs Quizlet` → `/compare/quizlet`
- `anatomy flashcards` → `/flashcards/anatomy`
- `AI flashcards language learning` → `/use-case/language-learners`

---

## Suggested Next Pages (Week 17)

- `/flashcards/nclex` — `NCLEX flashcards`, `NCLEX study cards free`
- `/flashcards/sat-vocabulary` — `SAT vocabulary flashcards`, `SAT prep flashcards`
- `/flashcards/comptia-security-plus` — `CompTIA Security+ flashcards`, `Security+ study cards`
- `/use-case/college-students` — `AI flashcards for college`, `study flashcards for students`
- `/flashcards/pharmacology` — `pharmacology flashcards`, `drug flashcards nursing`
