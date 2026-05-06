/**
 * SEO Landing Page: Biochemistry Flashcards
 * Route: /flashcards/biochemistry
 * Meta title: Biochemistry Flashcards Free — AI Generator | Esli
 * Meta description: Generate biochemistry flashcards with AI. Type any topic — metabolism, enzymes, USMLE Step 1 — and get cards instantly. Free, spaced repetition.
 * Target keywords: biochemistry flashcards, USMLE biochemistry flashcards, biochemistry study cards free, biochemistry flashcards free
 * Week: 2026-W19
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
      name: 'Are biochemistry flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free to use. You can generate unlimited biochemistry flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate USMLE Step 1 biochemistry flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type topics like "urea cycle", "fatty acid synthesis", "enzyme kinetics", or "vitamins and cofactors" and Esli generates high-yield USMLE-style Q&A cards instantly. You can also upload First Aid PDFs or your own notes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which biochemistry topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: glycolysis, TCA cycle, oxidative phosphorylation, amino acid metabolism, lipid metabolism, nucleotide synthesis, enzyme kinetics, vitamins and cofactors, molecular biology (DNA replication, transcription, translation), and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my biochemistry textbook or notes as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Lehninger, Stryer, Harper\'s Illustrated Biochemistry, First Aid for USMLE, your own lecture notes — and Esli\'s AI will extract the key concepts and generate a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than making biochemistry flashcards manually?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Creating biochemistry flashcards manually takes hours. Esli generates a complete deck in seconds — and the AI knows how to phrase questions for active recall (not just definitions). Combined with spaced repetition, you learn faster and retain longer.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the committed step of glycolysis and what enzyme catalyzes it?',
    a: 'Phosphofructokinase-1 (PFK-1) catalyzes fructose-6-phosphate → fructose-1,6-bisphosphate. It is irreversible, allosterically inhibited by ATP/citrate, and activated by AMP/fructose-2,6-bisphosphate.',
  },
  {
    q: 'What are the products of one turn of the TCA cycle?',
    a: '3 NADH, 1 FADH₂, 1 GTP, 2 CO₂. Net: acetyl-CoA is fully oxidized; carbons enter as acetyl-CoA and leave as CO₂.',
  },
  {
    q: 'What is the role of biotin in metabolism?',
    a: 'Biotin is a CO₂ carrier cofactor for carboxylase enzymes: pyruvate carboxylase (gluconeogenesis), acetyl-CoA carboxylase (fatty acid synthesis), and propionyl-CoA carboxylase. Deficiency causes dermatitis, alopecia, neurological symptoms.',
  },
  {
    q: 'Describe competitive vs. uncompetitive enzyme inhibition.',
    a: 'Competitive: inhibitor binds active site → ↑Km, Vmax unchanged. Overcome by excess substrate. Uncompetitive: inhibitor binds enzyme-substrate complex → ↓Km and ↓Vmax (both decrease proportionally). Cannot be overcome by excess substrate.',
  },
  {
    q: 'What is the rate-limiting step of the urea cycle?',
    a: 'Carbamoyl phosphate synthetase I (CPS-I) in the mitochondria. Activated by N-acetylglutamate (NAG). Deficiency → hyperammonemia. Remember: CPS-I is the "first and rate-limiting" step.',
  },
  {
    q: 'What is the Km of an enzyme and what does a low Km indicate?',
    a: 'Km is the substrate concentration at which reaction velocity is half of Vmax. Low Km = high affinity for substrate (enzyme reaches half-max rate at low [S]). High Km = low affinity.',
  },
]

const benefits = [
  { title: 'USMLE-ready cards in seconds', body: 'Type "First Aid biochemistry" or any high-yield topic and get exam-style Q&As instantly — no formatting, no manual entry.' },
  { title: 'Upload First Aid, Lehninger, or your notes', body: 'Turn any biochemistry PDF into a complete flashcard deck. Esli extracts key concepts and builds the cards automatically.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Difficult enzyme pathways resurface at exactly the right time so you retain them through exam day.' },
  { title: 'All platforms, no install', body: 'Study in your browser, on your phone, or on a tablet. Your decks sync everywhere — no app download needed.' },
]

export default function BiochemistryFlashcardsPage() {
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
                <span className="text-primary-600">Biochemistry Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any biochemistry topic — glycolysis, enzyme kinetics, USMLE Step 1 — and get a complete set of high-yield flashcards in seconds. No manual entry, no expensive subscriptions.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Glycolysis', 'TCA Cycle', 'Enzyme Kinetics', 'Urea Cycle', 'Lipid Metabolism', 'Vitamins & Cofactors', 'Amino Acid Metabolism', 'USMLE Step 1'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full border border-primary-200">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Biochemistry Flashcards Free
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
                Biochemistry prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full flashcard deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your biochem topic',
                  body: 'Enter anything — "oxidative phosphorylation", "fatty acid beta-oxidation", "DNA repair mechanisms" — or upload a First Aid PDF or lecture notes.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates high-yield Q&A cards covering key pathways, enzyme names, regulation, and clinical correlations.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Cards you struggle with resurface sooner, so complex metabolic pathways stick before exam day.',
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
                Example biochemistry flashcards
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
                Generate Your Biochemistry Deck Free
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
                Why biochemistry students choose Esli
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
                Biochemistry flashcard FAQs
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
              Ready to master biochemistry?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Biochemistry Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying for USMLE? See our{' '}
              <a href="/flashcards/mcat" className="text-white underline hover:no-underline">MCAT flashcards</a>{' '}
              and{' '}
              <a href="/flashcards/anatomy" className="text-white underline hover:no-underline">anatomy flashcards</a>.
            </p>
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
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
              <a href={`${APP_URL}/login`} className="hover:text-white transition-colors no-underline">Log In</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
