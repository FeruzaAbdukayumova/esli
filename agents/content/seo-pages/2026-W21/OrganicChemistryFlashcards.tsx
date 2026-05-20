/**
 * SEO Landing Page: Organic Chemistry Flashcards
 * Route: /flashcards/organic-chemistry
 * Meta title: Organic Chemistry Flashcards Free — AI Generator | Esli
 * Meta description: Generate organic chemistry flashcards with AI. SN1, SN2, reactions, mechanisms, MCAT orgo — type any topic and get cards instantly. Free.
 * Target keywords: organic chemistry flashcards, ochem flashcards free, MCAT orgo flashcards, organic chemistry study cards
 * Week: 2026-W21
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
      name: 'Are organic chemistry flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited organic chemistry flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate MCAT orgo flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type topics like "SN1 vs SN2", "nucleophilic addition to carbonyls", "stereochemistry", or "MCAT reactions" and Esli generates high-yield Q&A cards instantly. You can also upload your orgo textbook or Kaplan MCAT PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which orgo topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: substitution reactions (SN1/SN2), elimination reactions (E1/E2), addition reactions, carbonyl chemistry (aldehydes, ketones, carboxylic acids), aromatic chemistry, stereochemistry, spectroscopy (NMR, IR, MS), and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my orgo textbook or lecture notes as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Clayden, McMurry, Klein, Bruice, your Kaplan MCAT materials, or your own lecture notes — and Esli\'s AI extracts the key concepts and builds a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Anki for organic chemistry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires you to make every card manually — in organic chemistry that means hours of formatting reactions and mechanisms. Esli generates a full deck in seconds from just a topic or PDF. Then both use spaced repetition, but Esli works in any browser without a desktop app.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the key differences between SN1 and SN2 reactions?',
    a: 'SN1: two steps, carbocation intermediate, racemization, favored by tertiary substrates and polar protic solvents. SN2: one step (concerted), inversion of configuration (Walden inversion), favored by primary substrates, strong nucleophiles, and polar aprotic solvents.',
  },
  {
    q: 'Under what conditions does elimination (E2) compete with substitution (SN2)?',
    a: 'E2 is favored by: strong, bulky bases (e.g., t-BuO⁻), secondary/tertiary substrates, high temperature, and anti-periplanar geometry (anti addition). SN2 is favored by strong, small nucleophiles at primary carbons and lower temperatures.',
  },
  {
    q: 'What is Markovnikov\'s rule and when does anti-Markovnikov addition occur?',
    a: 'Markovnikov: electrophile (H⁺) adds to the carbon with more hydrogens, placing the nucleophile on the more substituted carbon — because the more stable (more substituted) carbocation forms. Anti-Markovnikov: hydroboration-oxidation (HBX/H₂O₂/OH⁻) delivers H and OH without a carbocation, giving opposite regioselectivity.',
  },
  {
    q: 'What makes benzene unusually stable? Define aromaticity.',
    a: 'Aromaticity requires: (1) cyclic, (2) planar, (3) fully conjugated, (4) 4n+2 π electrons (Hückel\'s rule). Benzene has 6 π electrons (n=1). The delocalized electron ring lowers energy ~36 kcal/mol below expected. Antiaromatic = 4n π electrons (cyclobutadiene, n=1, 4π).',
  },
  {
    q: 'Describe the mechanism of nucleophilic addition to a ketone.',
    a: 'Step 1: nucleophile attacks the electrophilic carbonyl carbon (sp² → sp³), forming an alkoxide tetrahedral intermediate. Step 2: protonation of the alkoxide. Overall: nucleophile adds across C=O. Aldehydes are more reactive than ketones (less steric hindrance, more electrophilic carbon).',
  },
  {
    q: 'What is the aldol condensation and what type of reaction is it?',
    a: 'Aldol condensation: base removes α-hydrogen to form enolate, which attacks another carbonyl → β-hydroxy carbonyl (aldol product). On heating, dehydration gives α,β-unsaturated carbonyl (conjugated enone). It is a C–C bond-forming reaction between two carbonyl compounds.',
  },
]

const benefits = [
  { title: 'Reaction mechanisms in seconds', body: 'Type "nucleophilic acyl substitution" or "aldol condensation" and get mechanism-focused cards with conditions, intermediates, and stereochemistry.' },
  { title: 'Upload your textbook or Kaplan MCAT PDF', body: 'Turn Clayden, McMurry, or any orgo PDF into a full flashcard deck. Esli extracts key reactions, rules, and exceptions automatically.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Hard reactions (like E2 anti-periplanar geometry) resurface at exactly the right time so they stick through exam day.' },
  { title: 'Study anywhere, no install', body: 'Browser, phone, tablet — your decks sync everywhere. No app download needed, no desktop client.' },
]

export default function OrganicChemistryFlashcardsPage() {
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
                <span className="text-primary-600">Organic Chemistry Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any orgo topic — SN1/SN2, carbonyl chemistry, MCAT reactions — and get a complete flashcard deck in seconds. No manual entry, no formatting reactions by hand.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['SN1 / SN2', 'E1 / E2', 'Carbonyl Chemistry', 'Stereochemistry', 'Aromatic Reactions', 'Spectroscopy', 'MCAT Orgo', 'Reaction Mechanisms'].map(tag => (
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
                  Generate Orgo Flashcards Free
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
                Orgo prep in 3 simple steps
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
                  title: 'Type your orgo topic',
                  body: 'Enter anything — "aldol condensation", "SN2 reaction conditions", "NMR interpretation" — or upload your textbook, Kaplan MCAT guide, or lecture slides as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering mechanisms, conditions, reagents, stereochemistry, and MCAT-style application questions.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Mechanisms you struggle with resurface sooner, so you never forget SN1 vs SN2 or Markovnikov regioselectivity again.',
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
                Example organic chemistry flashcards
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
                Generate Your Orgo Deck Free
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
                Why orgo students choose Esli
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
                Organic chemistry flashcard FAQs
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
              Ready to conquer organic chemistry?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Organic Chemistry Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also prepping for MCAT? See our{' '}
              <a href="/flashcards/mcat" className="text-white underline hover:no-underline">MCAT flashcards</a>{' '}
              and{' '}
              <a href="/flashcards/biochemistry" className="text-white underline hover:no-underline">biochemistry flashcards</a>.
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
