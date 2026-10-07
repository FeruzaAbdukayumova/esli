/**
 * SEO Landing Page: AP Chemistry Flashcards
 * Route: /flashcards/ap-chemistry
 * Meta title: AP Chemistry Flashcards Free — AI Generator | Esli
 * Meta description: Generate AP Chemistry flashcards with AI. Equilibrium, thermodynamics,
 *   electrochemistry, reaction types — free, spaced repetition. No signup needed.
 * Target keywords: AP Chemistry flashcards, AP Chem flashcards, AP Chem study cards,
 *   AP Chem equilibrium flashcards, AP Chemistry review, AP Chem thermodynamics flashcards
 * Week: 2026-W41
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
      name: 'Are AP Chemistry flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited AP Chemistry flashcards with AI — equilibrium, thermodynamics, electrochemistry, reaction types, kinetics, atomic structure — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AP Chemistry topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All nine AP Chemistry units: atomic structure and properties, molecular and ionic compound structure, intermolecular forces, chemical reactions, kinetics, thermodynamics, equilibrium, acids and bases, and electrochemistry. Type any concept from Le Chatelier\'s principle to Nernst equation and Esli builds a targeted deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with AP Chem exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type "AP Chemistry Unit 7 equilibrium" or upload your AP Chem review notes PDF, and Esli generates flashcards covering all the tested concepts with their formulas, exceptions, and common exam traps. Spaced repetition ensures equilibrium constants, Gibbs free energy relationships, and electrochemical cell notation all stay sharp by exam day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me memorize AP Chem equations and formulas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "AP Chemistry formulas" or any specific equation — "Arrhenius equation", "Henderson-Hasselbalch", "Nernst equation", "integrated rate laws", "van\'t Hoff factor" — and Esli creates cards with the formula, each variable defined, and worked-example context. Flashcards beat passive re-reading for formula retention.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for both the AP Chem exam and college chemistry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. High school students studying for the AP Chem exam (May) and college students in general chemistry or physical chemistry all use Esli. The AI adapts to whatever depth you need — introductory reaction types for AP prep, or advanced quantum mechanics and statistical thermodynamics for upper-division courses.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'State Le Chatelier\'s principle and give an example of each type of stress.',
    a: 'When a system at equilibrium is stressed, it shifts to partially counteract that stress. Concentration: add reactant → shift right (toward products). Temperature: increase temp in endothermic rxn → shift right. Pressure/volume: decrease volume → shift toward fewer moles of gas. Catalyst: speeds up both directions equally — no shift in equilibrium position.',
  },
  {
    q: 'What is the relationship between ΔG, ΔH, ΔS, and spontaneity?',
    a: 'ΔG = ΔH - TΔS (Gibbs free energy). Spontaneous: ΔG < 0. Non-spontaneous: ΔG > 0. At equilibrium: ΔG = 0. Exothermic + increase entropy (ΔH < 0, ΔS > 0): always spontaneous. Endothermic + decrease entropy (ΔH > 0, ΔS < 0): never spontaneous. Temperature-dependent when signs match.',
  },
  {
    q: 'What is the Arrhenius equation and what does each term mean?',
    a: 'k = A·e^(-Ea/RT). k = rate constant. A = frequency factor (collision frequency × proper orientation). Ea = activation energy (J/mol). R = 8.314 J/(mol·K). T = temperature in Kelvin. Key implication: increasing temperature increases k exponentially; a catalyst lowers Ea, increasing k without changing temperature.',
  },
  {
    q: 'For an electrochemical cell, how do you determine which electrode is the anode vs. cathode?',
    a: 'Anode: oxidation occurs (loses electrons), negative electrode in galvanic cell, positive in electrolytic cell. Cathode: reduction occurs (gains electrons), positive in galvanic cell, negative in electrolytic cell. Mnemonic: An Ox (Anode = Oxidation), Red Cat (Reduction = Cathode). Cell notation: anode | anode solution || cathode solution | cathode.',
  },
  {
    q: 'What is the Henderson-Hasselbalch equation and when is it used?',
    a: 'pH = pKa + log([A⁻]/[HA]). Used for buffer solutions (weak acid + conjugate base). When [A⁻] = [HA]: pH = pKa (buffer midpoint). Buffer capacity is greatest at pH = pKa ± 1. Useful range: pKa ± 1. To find pKa: pKa = -log(Ka). Works for both acidic and basic buffers with the corresponding form.',
  },
  {
    q: 'What are the four quantum numbers and their allowed values?',
    a: 'n (principal): 1, 2, 3... (energy level/shell size). ℓ (angular momentum): 0 to n-1 (subshell shape: 0=s, 1=p, 2=d, 3=f). mℓ (magnetic): -ℓ to +ℓ (orbital orientation). ms (spin): +1/2 or -1/2. Pauli exclusion principle: no two electrons can have identical sets of all four quantum numbers.',
  },
]

const benefits = [
  { title: 'All 9 AP Chem units covered', body: 'From atomic structure to electrochemistry — type any unit or concept and Esli generates cards targeting exactly what the College Board tests.' },
  { title: 'Formula retention that actually works', body: 'Passive re-reading makes formulas feel familiar. Active recall via flashcards makes them retrievable under exam pressure. Arrhenius, Nernst, Henderson-Hasselbalch — locked in.' },
  { title: 'Upload your review notes', body: 'Upload your teacher\'s review packets, Barron\'s pages, or Princeton Review PDFs and Esli turns them into a focused flashcard deck in seconds.' },
  { title: 'Study on your schedule', body: 'Commute, lunch, before school — your AP Chem decks sync across all devices. SM-2 spaced repetition ensures you\'re reviewing the right material at the right time.' },
]

export default function APChemistryFlashcardsPage() {
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
                <span className="text-primary-600">AP Chemistry Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any AP Chem topic and get a complete flashcard deck in seconds. Equilibrium, thermodynamics, electrochemistry, kinetics — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Equilibrium (Le Chatelier)', 'Thermodynamics (ΔG)', 'Electrochemistry', 'Kinetics & Arrhenius', 'Acids & Bases', 'Quantum Numbers', 'Reaction Types', 'Buffers & pH'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate AP Chem Flashcards Free
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
                AP Chem mastery in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From re-reading your notes to active recall that actually sticks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your AP Chem topic',
                  body: 'Enter any concept — "AP Chemistry equilibrium constants", "electrochemical cell potential", "thermodynamics Gibbs free energy" — or upload your review notes PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli generates Q&A cards covering formulas with variable definitions, conceptual principles, worked-example applications, and the distinctions that show up on the AP exam.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces the concepts you\'re forgetting before exam day. Build the confident recall that lets you apply formulas under time pressure.',
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
                Example AP Chemistry flashcards
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
                Generate Your AP Chem Deck Free
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
                Why AP Chem students choose Esli
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
                AP Chemistry flashcard FAQs
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
              Ready to ace AP Chemistry?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate AP Chem flashcards with AI — equilibrium, thermodynamics, electrochemistry, all 9 units — free, with spaced repetition. Score a 5.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate AP Chemistry Flashcards Free
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
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology Flashcards</a>
              <a href="/flashcards/chemistry" className="hover:text-white transition-colors no-underline">Chemistry Flashcards</a>
              <a href="/use-case/high-school-students" className="hover:text-white transition-colors no-underline">High School Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
