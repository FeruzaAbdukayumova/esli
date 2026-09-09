/**
 * SEO Landing Page: Chemistry Flashcards
 * Route: /flashcards/chemistry
 * Meta title: Chemistry Flashcards Free — AI Generator | Esli (54 chars)
 * Meta description: Generate chemistry flashcards with AI. Periodic table, reactions, stoichiometry — free, spaced repetition. No signup. (123 chars)
 * Target keywords: chemistry flashcards, chemistry flashcards free, make chemistry flashcards, general chemistry flashcards, chemistry study cards
 * Week: 2026-W37
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
      name: 'What chemistry topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates chemistry flashcards across all major areas of general, organic, and physical chemistry. General Chemistry: atomic structure (electron configuration, quantum numbers, orbitals), periodic table trends (electronegativity, atomic radius, ionization energy, electron affinity), chemical bonding (ionic, covalent, metallic, VSEPR theory, molecular geometry, hybridization), stoichiometry (molar mass, mole conversions, limiting reagents, percent yield), chemical reactions (types: synthesis, decomposition, single and double displacement, combustion), thermodynamics (enthalpy, entropy, Gibbs free energy, Hess\'s law, calorimetry), acid-base chemistry (Bronsted-Lowry, Lewis, pH calculations, buffers, titrations), equilibrium (Le Chatelier\'s principle, Ka, Kb, Ksp, Kp, Kc), kinetics (rate laws, order, activation energy, Arrhenius equation), and electrochemistry (galvanic cells, electrolysis, reduction potentials). Organic Chemistry: functional groups, nomenclature, reaction mechanisms (SN1, SN2, E1, E2, addition, elimination, electrophilic aromatic substitution), stereochemistry, and NMR basics. Works for high school chemistry, AP Chemistry, and introductory college chemistry.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I use chemistry flashcards to study effectively?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For chemistry, the most effective flashcard strategy uses three card types: concept cards, formula cards, and application cards. Concept cards ask "what is electronegativity and what is its trend across the periodic table?" Formula cards give you the formula and ask you to state when to use it and what each variable means ("Ka = [H+][A-]/[HA] — what does each bracket represent and when is Ka used vs pKa?"). Application cards present a scenario and ask for the method ("You have 50 mL of 0.1 M HCl — what is the pH?"). Generate all three types for your weakest topics. For AP Chemistry: generate a deck per unit. For stoichiometry: make "given → convert → solve" process cards. For equilibrium: make Le Chatelier\'s principle prediction cards ("Q > K, which direction does the reaction shift?"). Use Esli\'s spaced repetition to drill formula decks daily for 10 minutes — chemistry formulas fade fast without regular review.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli good for AP Chemistry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli works well for AP Chemistry. The AP Chemistry exam covers 9 units: atomic structure, molecular geometry and bonding, intermolecular forces, chemical reactions, kinetics, thermodynamics, equilibrium, acids and bases, and electrochemistry. For each unit you can generate targeted decks: "AP Chemistry equilibrium — all 5 equilibrium constant expressions (Ka, Kb, Kw, Kp, Ksp) with their definitions and how Kp and Kc relate" or "AP Chemistry electrochemistry — galvanic vs electrolytic cell, standard reduction potentials, Nernst equation". Upload your AP Chemistry review book PDF or lab write-up notes for custom decks. The AP Chemistry exam has significant free-response questions requiring multi-step reasoning — generate "explain why" cards ("Why does increasing temperature always increase the rate constant k even if the reaction is exothermic?") to build the explanatory depth the free-response section rewards.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best chemistry flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-yield chemistry prompts: General Chemistry — 'Periodic table trends — electronegativity, atomic radius, ionization energy, electron affinity: the direction of each trend across periods and down groups, with a 1-sentence explanation of why', 'The 5 types of chemical reactions (synthesis, decomposition, single displacement, double displacement, combustion) — definition, general form, and a balanced example each', 'pH calculations — 4 types: strong acid, strong base, weak acid (Ka given), and buffer (Henderson-Hasselbalch) — the formula and worked setup for each'. Equilibrium — 'Le Chatelier principle — for each of the 4 stresses (concentration change, pressure change, temperature change for exo vs endo, inert gas addition) — which direction does the equilibrium shift and why?'. Organic Chemistry — 'SN1 vs SN2 vs E1 vs E2 — substrate preference, nucleophile/base strength, solvent, stereochemistry of product, and rate law for each'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for chemistry students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free with no credit card required. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks. Guest mode lets you start without an account — type a chemistry topic and get flashcards in seconds. Whether you are studying for a high school chemistry final, AP Chemistry, or an introductory college chemistry course, you can generate as many chemistry decks as you need at no cost.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the periodic table trends for atomic radius, ionization energy, and electronegativity?',
    a: "ATOMIC RADIUS: Increases DOWN a group (more electron shells, farther from nucleus). Decreases ACROSS a period left to right (more protons pulling same-shell electrons closer). Largest: francium (bottom-left). IONIZATION ENERGY (energy to remove an electron): Decreases down a group (outer electrons farther, easier to remove). Increases across a period left to right (more protons, harder to remove electron). Exceptions: IE drops slightly from Group 2 to 13 (removing paired s vs unpaired p electron) and from Group 15 to 16 (removing paired p vs singly occupied p). ELECTRONEGATIVITY (tendency to attract electrons in a bond): Decreases down a group. Increases across a period left to right. Highest: fluorine (3.98). Lowest: francium (~0.7). Memory device: 'Atomic radius is the rebel — goes opposite to everything else.'",
  },
  {
    q: 'What is the difference between ΔH, ΔS, and ΔG? When is a reaction spontaneous?',
    a: "ΔH (Enthalpy change): heat absorbed or released at constant pressure. Negative ΔH = exothermic (releases heat). Positive ΔH = endothermic (absorbs heat). ΔS (Entropy change): change in disorder or randomness of a system. Positive ΔS = more disorder (solid → liquid → gas, dissolving, increasing moles of gas). Negative ΔS = more order. ΔG (Gibbs Free Energy): ΔG = ΔH - TΔS (T in Kelvin). Determines spontaneity. ΔG < 0 → spontaneous (thermodynamically favorable). ΔG > 0 → non-spontaneous. ΔG = 0 → equilibrium. 4 cases: (1) -ΔH, +ΔS → always spontaneous. (2) +ΔH, -ΔS → never spontaneous. (3) -ΔH, -ΔS → spontaneous at LOW temperature (enthalpy wins). (4) +ΔH, +ΔS → spontaneous at HIGH temperature (entropy wins). At equilibrium: ΔG° = -RTlnK. For reactions with ΔG° < 0: K > 1 (products favored at equilibrium).",
  },
  {
    q: 'Explain VSEPR theory. What molecular geometry results from 2, 3, 4, 5, and 6 electron domains?',
    a: "VSEPR (Valence Shell Electron Pair Repulsion): electron pairs (bonding and lone pairs) around a central atom arrange to minimize repulsion. ELECTRON DOMAINS → ELECTRON GEOMETRY → MOLECULAR GEOMETRY (if lone pairs present): 2 domains → Linear (180°). 3 domains → Trigonal planar (120°); with 1 lone pair → bent/angular (~117°). 4 domains → Tetrahedral (109.5°); 1 LP → Trigonal pyramidal (~107°); 2 LPs → Bent (~104.5°). 5 domains → Trigonal bipyramidal (90°/120°); LPs prefer equatorial positions. 6 domains → Octahedral (90°); 1 LP → Square pyramidal; 2 LPs → Square planar. Lone pair repulsion: LP-LP > LP-BP > BP-BP (lone pairs take more space, compress bond angles). Examples: H2O → 4 electron domains (2 BP + 2 LP) → bent, ~104.5°. NH3 → 4 electron domains (3 BP + 1 LP) → trigonal pyramidal, ~107°. CO2 → 2 electron domains → linear, 180°.",
  },
  {
    q: 'What is Le Chatelier\'s Principle? How does each type of stress shift equilibrium?',
    a: "Le Chatelier's Principle: if a system at equilibrium is disturbed by an external stress, the equilibrium shifts in the direction that partially counteracts the stress. For the reaction: N2(g) + 3H2(g) ⇌ 2NH3(g), ΔH = -92 kJ/mol. CONCENTRATION STRESS: Add N2 or H2 → shift RIGHT (use up added reactant). Remove NH3 → shift RIGHT. Add NH3 → shift LEFT. PRESSURE STRESS (gases only): Increase pressure (decrease volume) → shift toward FEWER moles of gas. For this reaction: reactants have 4 mol gas, products have 2 → increase pressure shifts RIGHT. TEMPERATURE STRESS: Exothermic reaction: treat heat as a product. Increase temperature → shift LEFT (remove product). Decrease temperature → shift RIGHT. For endothermic: opposite. INERT GAS at constant volume: NO shift (no change in partial pressures of reactants or products). CATALYST: NO shift — speeds up both forward and reverse reactions equally, reaches equilibrium faster.",
  },
  {
    q: 'What are SN1 and SN2 reactions? How do you predict which mechanism applies?',
    a: "SN2 (Substitution Nucleophilic Bimolecular): One-step mechanism. Nucleophile attacks as leaving group departs simultaneously. Rate = k[substrate][nucleophile] (bimolecular, second-order). Stereochemistry: inversion of configuration (Walden inversion) — backside attack. Substrate preference: methyl > primary > secondary (tertiary — too sterically hindered, no SN2). Strong, small nucleophile required (OH⁻, CN⁻, I⁻, RS⁻). Polar aprotic solvent preferred (DMSO, acetone — doesn't solvate nucleophile). SN1 (Substitution Nucleophilic Unimolecular): Two-step mechanism. Step 1: leaving group departs → carbocation intermediate (rate-determining). Step 2: nucleophile attacks carbocation. Rate = k[substrate] (first-order — only substrate in rate law). Stereochemistry: racemization (nucleophile can attack from either face of planar carbocation). Substrate preference: tertiary > secondary (> primary — too unstable as carbocation). Weak nucleophile or polar protic solvent (water, ethanol). Carbocation stability: tertiary > secondary > primary > methyl (allylic and benzylic also stable).",
  },
  {
    q: 'How do you calculate pH for a strong acid, weak acid, and buffer?',
    a: "STRONG ACID (complete dissociation): pH = -log[H⁺] = -log[acid]. Example: 0.01 M HCl → [H⁺] = 0.01 M → pH = -log(0.01) = 2. STRONG BASE: pOH = -log[OH⁻]; pH = 14 - pOH. Example: 0.001 M NaOH → pOH = 3 → pH = 11. WEAK ACID (partial dissociation): Setup ICE table. HA ⇌ H⁺ + A⁻. Ka = [H⁺][A⁻]/[HA] ≈ x²/(C-x) ≈ x²/C (if x << C, valid when Ka << 0.05C). Then [H⁺] = √(Ka × C), pH = -log[H⁺]. Example: 0.1 M acetic acid, Ka = 1.8×10⁻⁵. [H⁺] = √(1.8×10⁻⁵ × 0.1) = √(1.8×10⁻⁶) = 1.34×10⁻³ M. pH = -log(1.34×10⁻³) = 2.87. BUFFER (Henderson-Hasselbalch): pH = pKa + log([A⁻]/[HA]). Best buffer when [A⁻]/[HA] = 1 → pH = pKa. Buffer range: pKa ± 1. Example: 0.1 M acetic acid + 0.2 M sodium acetate, pKa = 4.74. pH = 4.74 + log(0.2/0.1) = 4.74 + 0.30 = 5.04.",
  },
]

const benefits = [
  {
    title: 'Every chemistry topic — from atomic structure to organic reactions',
    body: 'Generate targeted decks for any chemistry concept: periodic trends, stoichiometry, equilibrium, thermodynamics, acid-base chemistry, organic mechanisms. Depth-matched to your level — high school, AP, or college.',
  },
  {
    title: 'Upload your chemistry textbook or lab notes as a PDF',
    body: 'Drop in a chapter from Zumdahl, Tro, or your AP Chemistry review book and get a custom flashcard deck in seconds. Turn equation sheets into active recall drills.',
  },
  {
    title: 'Spaced repetition drills the formulas and mechanisms you forget',
    body: 'The SM-2 algorithm tracks which chemistry formulas and reaction mechanisms you struggle with and shows them more often — so equilibrium constants and organic mechanisms stick before the exam.',
  },
  {
    title: 'Free with no signup required',
    body: 'Guest mode means you can generate chemistry flashcards immediately without creating an account. Free forever, 14 interface languages, works on any device.',
  },
]

export default function ChemistryFlashcardsPage() {
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
                <span className="text-primary-600">Chemistry</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any chemistry topic — periodic trends, stoichiometry, equilibrium, organic mechanisms — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Periodic Table', 'Stoichiometry', 'Equilibrium', 'Thermodynamics', 'Acid-Base', 'Organic Chemistry', 'Kinetics', 'Electrochemistry'].map((tag) => (
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
                  Generate Chemistry Flashcards Free
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
                Master chemistry in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From periodic trends to organic reactions — generate, study, and build automatic recall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic or upload a PDF',
                  body: 'Enter "Le Chatelier\'s principle with all 4 stress types" or "SN1 vs SN2 mechanism comparison", or upload your chemistry textbook chapter for a deck matching exactly what your exam tests.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering formulas, reaction mechanisms, conceptual explanations, and the reasoning behind chemistry rules — not just definitions, but why they work.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: "The SM-2 algorithm surfaces equilibrium constants, thermodynamics formulas, and organic mechanisms you struggle with more often — building exam-ready automatic recall.",
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
                Example chemistry flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-52 cursor-pointer [perspective:1200px]"
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
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-start justify-start p-5 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{card.a}</p>
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
                Generate Your Chemistry Deck Free
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
                Why chemistry students choose Esli
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
                Chemistry flashcard FAQs
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
              Start studying chemistry smarter today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any chemistry topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Chemistry Flashcards Free
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
              <a href="/flashcards/biology" className="hover:text-white transition-colors no-underline">Biology Flashcards</a>
              <a href="/flashcards/organic-chemistry" className="hover:text-white transition-colors no-underline">Organic Chemistry</a>
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
