/**
 * SEO Landing Page: AP US History Flashcards
 * Route: /flashcards/ap-us-history
 * Meta title: AP US History Flashcards Free — AI Generator | Esli (55 chars)
 * Meta description: Generate APUSH flashcards with AI. Key events, people, themes — free, spaced repetition. No signup needed. Covers all AP periods. (132 chars)
 * Target keywords: AP US History flashcards, APUSH flashcards free, APUSH key events flashcards, AP US History exam prep, APUSH AI flashcards
 * Week: 2026-W27
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
      name: 'What APUSH topics should I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cover all 9 AP US History periods: Colonial era, American Revolution, Early Republic, Antebellum, Civil War & Reconstruction, Gilded Age & Progressivism, WWI & the 1920s, Great Depression & WWII, Cold War through Contemporary. Within each period, focus on key vocabulary terms, turning point events, major figures, and College Board Themes (American and National Identity, Politics and Power, Work/Exchange/Technology, Culture/Society, Migration, Geography, America in the World). Esli can generate a full period\'s cards in one prompt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover the AP US History College Board themes and reasoning skills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Specify "APUSH College Board themes Period 5" or "APUSH historical causation Civil War" and Esli generates cards that address the specific themes and reasoning skills (causation, continuity and change over time, comparison, contextualization) tested on the AP exam. This helps you go beyond memorisation to the analytical thinking the exam rewards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my APUSH review book or class notes as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your AMSCO, Barron\'s, Princeton Review, or your teacher\'s unit packets — Esli extracts key terms, events, people, and arguments into a flashcard deck instantly. You can upload one chapter at a time or an entire unit to build a comprehensive review deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I start using APUSH flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start building cards at the beginning of each unit — not just before the exam. Spaced repetition works best when material is spread over weeks, not crammed in days. Generate a small deck after each chapter, study it daily for 10 minutes, and by exam time you will have reviewed everything multiple times with the optimal spacing. Starting early reduces final-week panic significantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use Esli for the APUSH DBQ and LEQ essays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generate flashcards for historical arguments, evidence, and contextualization. For example: "APUSH Gilded Age industrial capitalism evidence for DBQ" creates cards with specific examples, dates, and analytical framing you can deploy in essays. Also try "APUSH continuity and change over time thesis templates" for essay structure practice. Knowing your evidence cold is what separates 3s from 5s on the FRQs.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What was the Missouri Compromise (1820) and why did it matter?',
    a: 'Admitted Missouri as a slave state and Maine as free; drew 36°30\' line across Louisiana Purchase territory (slavery prohibited north, permitted south). Preserved the sectional balance in the Senate. Repealed by Kansas-Nebraska Act (1854), which replaced it with popular sovereignty — reigniting the slavery debate.',
  },
  {
    q: 'What were the main causes of the Civil War? (APUSH Period 5)',
    a: 'Slavery\'s expansion into territories, economic differences (industrial North vs. agrarian South), states\' rights ideology, failure of political compromise after 1850, election of Lincoln in 1860 triggering secession. College Board emphasizes slavery as the central cause, not simply "states\' rights."',
  },
  {
    q: 'What was Manifest Destiny and what were its consequences?',
    a: 'Belief that US expansion to the Pacific was divinely ordained and inevitable (coined by journalist John O\'Sullivan, 1845). Consequences: Texas annexation, Mexican-American War (1846-48), Oregon Treaty with Britain, California Gold Rush. Also accelerated conflict over slavery expansion in new territories.',
  },
  {
    q: 'Compare the First and Second Great Awakenings.',
    a: 'First (1730s-40s): Jonathan Edwards, George Whitefield; emphasized individual sin and salvation; undermined Puritan elite authority. Second (1790s-1840s): Charles Finney; emphasized free will and perfectionism; fueled reform movements (abolitionism, temperance, women\'s rights). Both democratised religion and challenged established churches.',
  },
  {
    q: 'What was the significance of the New Deal? (APUSH Period 7)',
    a: 'FDR\'s response to the Great Depression: Three Rs — Relief (immediate aid), Recovery (economic stimulus), Reform (structural change). Key programs: FDIC, SEC, Social Security Act, Wagner Act, CCC, PWA. Established precedent for federal government role in economic welfare. Critics: expanded federal power, did not end Depression (WWII did).',
  },
  {
    q: 'What was the significance of the Emancipation Proclamation (1863)?',
    a: 'Declared enslaved people in Confederate states "forever free" — did not apply to border states or Union-controlled Confederate territory. Military/strategic purpose: deprived Confederacy of labor, allowed Black men to serve in Union Army (180,000 did). Transformed the war\'s moral character, discouraged British recognition of the Confederacy.',
  },
]

const benefits = [
  {
    title: 'Generate a full period\'s cards in one prompt',
    body: 'Type "APUSH Period 4 key events and people" and get a complete deck covering the Era of Good Feelings through Jacksonian Democracy in seconds.',
  },
  {
    title: 'Aligned with College Board themes and skills',
    body: 'Request cards by APUSH theme (Politics and Power, America in the World, etc.) or reasoning skill (causation, CCOT, comparison) to prep for the analytical questions on the exam.',
  },
  {
    title: 'Upload your AMSCO or review book',
    body: 'Drop in any chapter PDF and Esli extracts the key people, events, and arguments into a study-ready deck — no manual card creation needed.',
  },
  {
    title: 'DBQ and LEQ evidence cards',
    body: 'Generate cards focused on specific historical evidence and arguments to deploy in your essays — go into the exam with concrete examples memorised, not just vague ideas.',
  },
]

export default function APUSHistoryFlashcardsPage() {
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
                <span className="text-primary-600">AP US History</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any APUSH period, theme, or topic and get a complete flashcard deck in seconds. Key events, people, causation, College Board themes — free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Period 1–9', 'Key Events', 'Major Figures', 'DBQ Evidence', 'College Board Themes', 'Reconstruction', 'Cold War', 'Progressive Era'].map((tag) => (
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
                  Generate APUSH Flashcards Free
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
                Ace APUSH in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Build a complete review deck one unit at a time — starting on day one of the course.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your APUSH topic',
                  body: 'Enter "APUSH Period 5 Civil War key terms", "Progressive Era reforms", or upload your AMSCO chapter. Esli handles the rest.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering events, people, themes, causation, and analytical arguments — aligned to what the AP exam actually tests.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces cards at the optimal interval. Start in September and every period will be fresh come May.',
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
                Example APUSH flashcards
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
                Generate Your APUSH Deck Free
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
                Why APUSH students choose Esli
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
                APUSH flashcard FAQs
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
              Get your 5 on AP US History
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any APUSH period or topic and get a complete flashcard deck in seconds. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate APUSH Flashcards Free
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
              <a href="/use-case/high-school-students" className="hover:text-white transition-colors no-underline">High School Students</a>
              <a href="/flashcards/sat-vocabulary" className="hover:text-white transition-colors no-underline">SAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
