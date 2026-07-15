/**
 * SEO Landing Page: IELTS Vocabulary Flashcards
 * Route: /flashcards/ielts
 * Meta title: IELTS Vocabulary Flashcards Free — AI | Esli (50 chars)
 * Meta description: Generate IELTS vocabulary flashcards with AI. Academic Word List, Band 7+, Writing Task 2 — free, spaced repetition. No signup. (130 chars)
 * Target keywords: IELTS vocabulary flashcards, IELTS preparation flashcards free, IELTS Academic vocabulary, IELTS writing vocabulary, IELTS exam study cards
 * Week: 2026-W29
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
      name: 'Can Esli help me build Academic Word List (AWL) flashcards for IELTS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Prompt Esli with 'Academic Word List sublist 1 vocabulary flashcards for IELTS' or target specific AWL sublists (1-10) by frequency. Each card covers the word, its definition, collocations, and an example sentence in academic context — exactly the vocabulary IELTS Academic tests in Reading and Listening.",
      },
    },
    {
      '@type': 'Question',
      name: 'What IELTS score band can Esli help me reach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli helps you target Band 7.0+ by building the high-frequency academic vocabulary required for that range. Prompt specifically for 'IELTS Band 7 vocabulary collocations', 'lexical resource range for IELTS Writing Task 2', or 'IELTS Listening section 3 and 4 academic vocabulary'. You can also upload your Cambridge IELTS practice book PDFs to generate cards from real exam texts.",
      },
    },
    {
      '@type': 'Question',
      name: 'Should I study IELTS Academic or IELTS General Training vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depends on your test type. IELTS Academic requires a wider range of academic and technical vocabulary from the Academic Word List — used for university admissions. IELTS General Training uses more everyday and workplace vocabulary. Tell Esli which you are preparing for: "IELTS Academic Reading vocabulary" or "IELTS General Training letter-writing vocabulary" and it calibrates accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for IELTS Writing Task 2 vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. Prompt Esli with 'IELTS Writing Task 2 linking words and discourse markers', 'topic-specific vocabulary for IELTS essay: environment', 'paraphrase expressions for IELTS Writing', or 'formal synonyms for IELTS academic writing'. You can build separate decks per common essay topic (technology, education, health, environment, crime) to cover the vocabulary range examiners reward.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long should I study IELTS vocabulary with flashcards each day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Research on spaced repetition suggests 15-20 minutes of daily review is significantly more effective than longer weekly sessions. Esli's SM-2 algorithm schedules each card at the optimal interval so you're not reviewing words you already know. Most IELTS candidates reach the 800-1200 word vocabulary range needed for Band 7+ within 6-8 weeks of consistent daily review.",
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What does "substantiate" mean? Use it in an IELTS context.',
    a: 'Substantiate (verb): to provide evidence to support or prove a claim. IELTS Writing example: "The author\'s argument is not substantiated by sufficient empirical data." Collocations: substantiate a claim / an argument / findings. Formal synonym of "support" or "back up" — use it to demonstrate lexical range in Task 2.',
  },
  {
    q: 'What is a discourse marker? Give 5 examples used in IELTS Writing Task 2.',
    a: 'Discourse markers are linking words/phrases that signal relationships between ideas. For IELTS Writing Task 2: Furthermore (addition), Nevertheless (concession), Consequently (result), In contrast (comparison), To illustrate (example). Using a range of discourse markers correctly raises the Coherence and Cohesion band score.',
  },
  {
    q: 'Paraphrase: "Many people think technology is harmful to society."',
    a: 'Option 1: "A significant proportion of the population holds the view that technological advancement poses a threat to social wellbeing." Option 2: "There is a widespread belief that modern technology has detrimental effects on society." IELTS paraphrasing strategy: replace key nouns (people → population), verbs (think → hold the view), adjectives (many → significant proportion), and restructure the sentence.',
  },
  {
    q: 'What are the IELTS band descriptors for Lexical Resource?',
    a: 'Band 9: full flexibility and precision in using vocabulary. Band 7: sufficient range for the task; uses less common items with some awareness of collocation; occasional inaccuracies. Band 6: adequate range; attempts less common vocabulary; some inappropriate choices. Band 5: limited range; repetition of words; errors in word choice/formation. To reach Band 7+, vary vocabulary and use precise academic collocations.',
  },
  {
    q: 'What does "mitigate" mean? Collocations for IELTS?',
    a: 'Mitigate (verb): to reduce the severity or seriousness of something. IELTS collocations: mitigate the effects of / mitigate risks / mitigate climate change / mitigate poverty. Example: "Governments should introduce policies to mitigate the negative impact of rapid urbanization." Antonym: exacerbate (to make worse). Both are high-value IELTS vocabulary items.',
  },
  {
    q: 'What is the Academic Word List (AWL) and why does it matter for IELTS?',
    a: "The AWL (Coxhead, 2000) is 570 word families covering ~10% of academic text vocabulary. These words appear frequently across academic disciplines — science, law, economics, arts — and are therefore tested heavily in IELTS Academic Reading, Listening, and Writing. Mastering AWL sublists 1-5 (most frequent) gives the highest return for IELTS preparation. Esli can generate flashcard decks for each sublist.",
  },
]

const benefits = [
  {
    title: 'Academic Word List decks by sublist',
    body: 'Generate AWL sublists 1-10 as separate flashcard decks. Each card covers definition, collocations, and an example sentence in academic context — the exact format that boosts IELTS Reading and Writing scores.',
  },
  {
    title: 'Topic-specific essay vocabulary',
    body: 'Build decks per IELTS Writing Task 2 topic: technology, environment, education, globalisation, crime, health. Know the key vocabulary for any essay topic before it appears on exam day.',
  },
  {
    title: 'Upload Cambridge practice books as PDF',
    body: "Drop any Cambridge IELTS Official Guide or practice test PDF and Esli extracts the high-frequency academic vocabulary into a ready-to-study deck with definitions and collocations.",
  },
  {
    title: 'Study in 15-minute bursts anywhere',
    body: 'IELTS preparation works best with consistent short sessions. Esli works on mobile — review 20 cards on your commute and the SM-2 algorithm handles the scheduling so every minute counts.',
  },
]

export default function IELTSFlashcardsPage() {
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
                <span className="text-primary-600">IELTS Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Build your IELTS Academic Word List vocabulary with AI-generated flashcards. Target Band 7+ with topic-specific decks for Writing, Reading, and Listening. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Academic Word List', 'Band 7+', 'Writing Task 2', 'Reading', 'Listening', 'Speaking', 'IELTS Academic', 'IELTS General'].map((tag) => (
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
                  Generate IELTS Flashcards Free
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
                Hit your IELTS band target in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Build the vocabulary range IELTS examiners reward — faster than a textbook.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your IELTS topic',
                  body: 'Enter "IELTS Academic Word List sublist 1", "IELTS Writing Task 2 environment vocabulary", or upload a Cambridge IELTS practice test PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering definitions, collocations, example sentences in academic context, and synonyms that boost your Lexical Resource band score.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study daily with spaced repetition',
                  body: '15-20 minutes a day with the SM-2 algorithm. Most candidates reach the vocabulary range for Band 7+ within 6-8 weeks of consistent review.',
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
                Example IELTS vocabulary flashcards
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
                Generate Your IELTS Deck Free
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
                Why IELTS candidates choose Esli
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
                IELTS flashcard FAQs
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
              Build your Band 7+ vocabulary today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate IELTS vocabulary flashcards in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate IELTS Flashcards Free
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
              <a href="/flashcards/toefl" className="hover:text-white transition-colors no-underline">TOEFL Flashcards</a>
              <a href="/flashcards/gre-vocabulary" className="hover:text-white transition-colors no-underline">GRE Vocabulary Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
