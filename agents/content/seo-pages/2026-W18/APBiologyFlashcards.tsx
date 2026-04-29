/**
 * SEO Landing Page: AP Biology Flashcards
 * Route: /flashcards/ap-biology
 * Meta title: AP Biology Flashcards Free — AI Generator | Esli
 * Meta description: Generate AP Biology flashcards with AI. Type any AP Bio topic — cells, genetics, ecology — and get study-ready cards instantly. Free, spaced repetition.
 * Target keywords: AP Biology flashcards, AP Bio study cards free, AP Biology flashcards free, AP Bio AI flashcards
 * Week: 2026-W18
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
      name: 'Are AP Biology flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited AP Biology flashcards with AI, study with spaced repetition, and access all core features — no credit card, no account required to start.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate AP Biology flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any AP Bio topic — "cell signaling pathways", "Mendelian genetics exceptions", "natural selection vs genetic drift", "photosynthesis light reactions" — and the AI creates a complete set of exam-focused flashcard Q&As in seconds. You can also upload your AP Bio textbook chapter or class notes as a PDF and Esli extracts all the key concepts automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover all 8 AP Biology units?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli generates cards for every AP Bio unit: Chemistry of Life, Cell Structure, Cellular Energetics, Cell Communication, Heredity, Gene Expression, Natural Selection, and Ecology. Just type the unit name or a specific topic and get targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my AP Biology notes or review book to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli accepts PDF uploads. Upload your Campbell Biology chapter, Barron\'s AP Bio review, or handwritten notes scanned to PDF, and Esli generates a complete flashcard deck from the content. This turns dense textbook chapters into active study sessions in minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Quizlet for AP Biology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quizlet has large community AP Bio decks, but they may not match your teacher\'s emphasis or your weak spots. With Esli, you type the specific concept you\'re struggling with and get a targeted deck instantly. The AI generates cards tuned to AP exam style — free-response reasoning, not just definitions. Plus Esli uses spaced repetition to help you retain everything before exam day.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between competitive and noncompetitive enzyme inhibition?',
    a: 'Competitive: inhibitor binds active site, competes with substrate — overcome by increasing substrate concentration. Noncompetitive: inhibitor binds allosteric site, changes enzyme shape — increasing substrate does NOT overcome it. Both reduce reaction rate.',
  },
  {
    q: 'What happens during the light-dependent reactions of photosynthesis?',
    a: 'In thylakoid membranes: light excites electrons in PSII → water splits (O₂ released) → electrons pass through ETC → ATP made via photophosphorylation → PSI re-energizes electrons → NADPH produced. Products: ATP, NADPH, O₂.',
  },
  {
    q: 'Explain the difference between natural selection and genetic drift.',
    a: 'Natural selection: differential survival/reproduction based on heritable traits — directs allele frequencies toward adaptive phenotypes. Genetic drift: random changes in allele frequencies due to chance — most impactful in small populations. Drift has no direction; selection does.',
  },
  {
    q: 'What is the role of cyclic AMP (cAMP) in cell signaling?',
    a: 'cAMP is a second messenger. Ligand binds GPCR → activates adenylyl cyclase → converts ATP to cAMP → activates protein kinase A (PKA) → PKA phosphorylates target proteins → cellular response. Phosphodiesterase degrades cAMP to end signal.',
  },
  {
    q: 'Describe incomplete dominance with an example.',
    a: 'Neither allele is fully dominant — heterozygote shows intermediate phenotype. Classic example: red (RR) × white (WW) snapdragons → pink (RW) offspring. Different from codominance, where both alleles are fully expressed (e.g., AB blood type).',
  },
  {
    q: 'What is the bottleneck effect and how does it reduce genetic diversity?',
    a: 'Bottleneck: drastic population reduction from random event (disaster, disease) — survivors are random subset of original gene pool. Result: many alleles lost by chance, not selection → reduced genetic variation → population more vulnerable to future environmental changes.',
  },
]

const benefits = [
  { title: 'All 8 AP Bio units covered', body: 'Chemistry of Life, Cell Structure, Cellular Energetics, Cell Communication, Heredity, Gene Expression, Natural Selection, Ecology — generate targeted decks for any unit in seconds.' },
  { title: 'Upload your textbook or notes', body: 'Have Campbell Biology, Barron\'s AP Bio, or class notes? Upload them as PDF and Esli generates flashcards from your exact study materials.' },
  { title: 'SM-2 spaced repetition', body: 'The proven algorithm surfaces difficult concepts more frequently. Master hundreds of AP Bio terms and processes before exam day — efficiently.' },
  { title: 'Free response prep included', body: 'AI generates cards that ask you to explain mechanisms, not just define terms — matching the AP exam\'s free-response format.' },
]

const topicTags = ['Cell Biology', 'Genetics', 'Photosynthesis', 'Evolution', 'Ecology', 'Cell Signaling', 'Gene Expression', 'Heredity']

export default function APBiologyFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Navbar ── */}
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

        {/* ── Hero ── */}
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
                <span className="text-primary-600">AP Biology Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any AP Bio topic — cell signaling, genetics, evolution, ecology — and get a full deck of exam-focused flashcards in seconds. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {topicTags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate AP Bio Flashcards Free
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

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build your AP Bio deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a targeted study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter anything — "AP Biology cell signaling", "Mendelian genetics ratios", "light vs dark reactions" — or upload your Campbell Biology chapter or class notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates AP Biology flashcards with clear explanations, mechanisms, and examples — built for the AP exam format, including free-response style reasoning.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces hard concepts more often. With hundreds of AP Bio processes and terms to memorize, optimized scheduling is how you actually retain it all.',
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

        {/* ── Sample Cards ── */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example AP Biology flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-44 cursor-pointer [perspective:1200px]"
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
                Generate Your AP Bio Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why AP students choose Esli for biology
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

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                AP Biology flashcard FAQs
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to score a 5 on AP Bio?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate targeted flashcards for every AP Biology unit. Any topic, in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate AP Bio Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
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
              <a href="/flashcards/sat-vocabulary" className="hover:text-white transition-colors no-underline">SAT Vocabulary</a>
              <a href="/flashcards/gre-vocabulary" className="hover:text-white transition-colors no-underline">GRE Vocabulary</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
