/**
 * SEO Landing Page: Arabic Vocabulary Flashcards
 * Route: /flashcards/arabic-vocabulary
 * Meta title: Arabic Vocabulary Flashcards Free — AI | Esli (50 chars)
 * Meta description: Generate Arabic vocabulary flashcards with AI. MSA, dialects, script practice — free, spaced repetition. No signup needed. (130 chars)
 * Target keywords: Arabic vocabulary flashcards, MSA Arabic flashcards, Arabic script flashcards, learn Arabic flashcards, Arabic grammar flashcards AI
 * Week: 2026-W26
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Arabic hard to learn with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flashcards are one of the most effective tools for Arabic because the language has a root-based vocabulary system — once you learn a trilateral root, you can recognise dozens of derived words. Esli generates cards that group words by root, so you build a mental network rather than memorising isolated vocabulary. The AI also includes both Arabic script and transliteration so you can learn to read from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for Egyptian Arabic, Levantine Arabic, or other dialects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When you type your topic, just specify the dialect — "Egyptian Arabic greetings", "Levantine Arabic verbs", "Gulf Arabic business vocabulary". Esli\'s AI generates cards for that specific variety. Modern Standard Arabic (MSA) is the default for academic and formal contexts; dialects are great for conversational goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli include Arabic script on the flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Cards generated for Arabic include the Arabic script, vowel diacritics (tashkeel) where relevant, transliteration, and an English definition. This lets you practice reading the actual script rather than relying on romanisation forever — an essential step for real fluency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload Arabic PDF textbooks or course materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — textbook chapters, vocabulary lists, grammar handouts, news articles — and Esli\'s AI will extract the key vocabulary, phrases, and grammar rules into a study-ready flashcard deck. This works whether the PDF is in Arabic, English, or a mix.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Duolingo for learning Arabic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo guides you through a fixed curriculum with gamified exercises — it\'s good for absolute beginners wanting a structured daily habit. Esli gives you full control: generate flashcards on any Arabic topic you\'re currently studying, use your own materials, and study with the scientifically proven SM-2 spaced repetition algorithm. Esli is better for serious learners who want to master vocabulary fast around their own syllabus.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What does كِتَاب (kitāb) mean, and what is its broken plural?',
    a: '"Book." Plural: كُتُب (kutub). Root ك-ت-ب (k-t-b) — the same root gives كَتَبَ (kataba, "he wrote"), كَاتِب (kātib, "writer"), and مَكْتَبة (maktaba, "library/bookstore").',
  },
  {
    q: 'How does the Arabic definite article ال (al-) change before sun letters?',
    a: 'The ل assimilates to the following consonant. Sun letters: ت ث د ذ ر ز س ش ص ض ط ظ ل ن. Example: الشَّمْس = ash-shams ("the sun"), not al-shams. Moon letters keep al- unchanged: القَمَر = al-qamar ("the moon").',
  },
  {
    q: 'Explain the Arabic trilateral root system with an example.',
    a: 'Arabic words derive from 3-consonant roots carrying core meaning. Root د-ر-س (d-r-s, "study/learn"): دَرَسَ (darasa, "he studied"), دَرْس (dars, "lesson"), مَدْرَسة (madrasa, "school"), مُدَرِّس (mudarris, "teacher"), دِرَاسة (dirāsa, "study/studies").',
  },
  {
    q: 'How do you form the dual in Arabic, and when is it used?',
    a: 'Add -ān (nominative) or -ayn (accusative/genitive) to the singular. طَالِب (student) → طَالِبَان / طَالِبَيْن. The dual is used strictly for exactly two — Arabic has separate singular, dual, and plural forms. In spoken dialects the dual is often replaced by the plural.',
  },
  {
    q: 'What is iḍāfa (إضافة) and how does it show possession?',
    a: 'A genitive construction: [possessed noun without ال] + [possessor]. كِتَابُ الطَّالِب = "the student\'s book." The first noun never takes ال; feminines drop their tā\' marbūṭa ending from -a to -at: مَدْرَسَةُ المُدِيرِ (madrasatu l-mudīri, "the principal\'s school").',
  },
  {
    q: 'What are the six derived verb stems (أوزان) in Arabic and what does Form II indicate?',
    a: 'Arabic has 10 main verb forms (Forms I–X). Form I (فَعَلَ): basic meaning. Form II (فَعَّلَ, doubled middle radical): intensification or causation — e.g., عَلِمَ (ʿalima, "knew") → عَلَّمَ (ʿallama, "taught"). Form V is the reflexive of Form II; Form X means "to consider X or seek to be X."',
  },
]

const benefits = [
  {
    title: 'Root-based vocabulary building',
    body: 'Cards group words by trilateral root so you learn كَتَبَ, كِتَاب, and مَكْتَبة together — multiplying every new root you learn.',
  },
  {
    title: 'Script + transliteration on every card',
    body: 'Study Arabic script from day one without getting stuck. Cards show Arabic text, tashkeel vowels, and transliteration side by side.',
  },
  {
    title: 'Any dialect or register',
    body: 'Generate MSA vocabulary for exams and formal reading, or Egyptian/Levantine/Gulf Arabic for real conversations — just specify in your prompt.',
  },
  {
    title: 'Upload your textbook or course materials',
    body: 'Turn any Arabic PDF — Al-Kitaab chapters, Durusul Lughah pages, teacher handouts — into a full deck automatically.',
  },
]

export default function ArabicVocabularyFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <a href="https://esli.app" className="flex items-center gap-2 no-underline">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Esli</span>
            </a>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors no-underline"
            >
              Get Started Free
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Free AI Flashcard Generator
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Generate{' '}
                <span className="text-primary-600">Arabic Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Arabic topic — MSA grammar, Egyptian colloquial, Gulf business vocabulary, Al-Kitaab chapters — and get a complete flashcard deck in seconds. Script, transliteration, and meaning included. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['MSA Vocabulary', 'Egyptian Arabic', 'Levantine Dialect', 'Gulf Arabic', 'Arabic Script', 'Root System', 'Verb Conjugation', 'CEFR A1–C1'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Arabic Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#sample-cards"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Cards
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Learn Arabic vocabulary in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full deck — faster than copying words into a spreadsheet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your Arabic topic',
                  body: 'Enter "MSA food vocabulary", "Egyptian Arabic greetings", "Arabic verb conjugation Form II", or upload a PDF of your course materials.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards with Arabic script, tashkeel vowels, transliteration, and definitions — grouped by root where possible.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces words at the optimal moment. Words you struggle with come back sooner; words you know are spaced further out.',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/25">
                      <step.icon className="text-white" size={28} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Cards */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example Arabic flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-48 cursor-pointer [perspective:1200px]"
                  onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      flippedCard === i ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-snug">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-snug">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your Arabic Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why Arabic learners choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 mb-1">{b.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{b.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Arabic flashcard FAQs
              </h2>
            </div>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full px-6 py-4 text-left bg-transparent border-none cursor-pointer"
                  >
                    <span className="text-base font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 transition-transform shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start building your Arabic vocabulary today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any Arabic topic and get a complete flashcard deck in seconds. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Arabic Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <a href="https://esli.app" className="flex items-center gap-2 justify-center mb-4 no-underline">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-white">Esli</span>
            </a>
            <p className="text-sm">AI-powered flashcards with spaced repetition. Free forever.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
              <a href="https://esli.app" className="hover:text-white transition-colors no-underline">Home</a>
              <a href="/flashcards/japanese-vocabulary" className="hover:text-white transition-colors no-underline">Japanese Flashcards</a>
              <a href="/flashcards/spanish-vocabulary" className="hover:text-white transition-colors no-underline">Spanish Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
