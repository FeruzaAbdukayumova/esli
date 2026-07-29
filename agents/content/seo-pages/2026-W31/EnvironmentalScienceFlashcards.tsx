/**
 * SEO Landing Page: AP Environmental Science Flashcards
 * Route: /flashcards/environmental-science
 * Meta title: AP Environmental Science Flashcards Free — AI | Esli (58 chars)
 * Meta description: Generate AP Environmental Science flashcards with AI. Ecosystems, climate, biodiversity, pollution — free, spaced repetition. (131 chars)
 * Target keywords: AP Environmental Science flashcards, APES flashcards, environmental science study cards, ecology flashcards, AP enviro science
 * Week: 2026-W31
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
      name: 'Can Esli generate flashcards for AP Environmental Science (APES)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any APES unit into Esli — "biogeochemical cycles", "ecosystem ecology", "biodiversity and evolution", "land use", "energy resources", "pollution", "global change" — and get a complete flashcard deck in seconds. The AI generates cards covering key terms, concepts, case studies, and the free-response style content the AP exam tests. You can also upload your APES textbook chapters (Friedland & Relyea, Miller & Spoolman) as PDFs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the hardest APES topics to study and how do flashcards help?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The hardest APES topics for most students are the biogeochemical cycles (confusing inputs/outputs), environmental legislation (many acts to memorize), and energy calculations. Flashcards help because they break each cycle into discrete steps, pair each law with its year and purpose, and force you to recall energy units and conversions from memory. Prompt Esli with 'nitrogen cycle: nitrification vs denitrification' or 'Clean Air Act vs Clean Water Act key provisions' for targeted decks.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload environmental science PDFs to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload your APES textbook chapters, lab reports, or review packets and Esli extracts key concepts, definitions, case studies, and legislation into a structured flashcard deck. This is especially useful for units like 'Impacts on the Environment' or 'Responding to Environmental Problems' that are content-heavy with many specific examples, policies, and data points.",
      },
    },
    {
      '@type': 'Question',
      name: 'How should I organize my APES flashcard decks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Organize by APES unit: Unit 1 (Living World: Ecosystems), Unit 2 (Living World: Biodiversity), Unit 3 (Populations), Unit 4 (Earth Systems and Resources), Unit 5 (Land and Water Use), Unit 6 (Energy Resources and Consumption), Unit 7 (Atmospheric Pollution), Unit 8 (Aquatic and Terrestrial Pollution), Unit 9 (Global Change). Generate a separate Esli deck per unit, then use spaced repetition to interleave review across all units as the exam approaches.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for AP Environmental Science students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and community decks — no credit card required. Generate as many APES decks as you need and study with the SM-2 spaced repetition algorithm that schedules reviews at optimal intervals. Guest mode means you can start studying without even creating an account.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between primary and secondary succession?',
    a: 'Primary succession: colonization of barren land with no soil (after volcanic eruption, glacier retreat). Pioneer species (lichens, mosses, nitrogen-fixing bacteria) break down rock into soil over centuries. Secondary succession: recovery of disturbed land where soil remains (after forest fire, abandoned farmland). Much faster because soil, seed bank, and some organisms survive. Climax community: the stable, self-sustaining endpoint of succession. AP tip: primary succession starts from bare rock; secondary succession retains soil.',
  },
  {
    q: 'Explain the nitrogen cycle and its key steps.',
    a: "Nitrogen cycle moves N between atmosphere (N₂, ~78% of air), soil, and organisms. Key steps: 1. Nitrogen fixation: N₂ → NH₃ (ammonia) by nitrogen-fixing bacteria (Rhizobium in legume root nodules, cyanobacteria, lightning). 2. Nitrification: NH₃ → NO₂⁻ → NO₃⁻ (nitrates) by nitrifying bacteria — plant-available form. 3. Assimilation: plants absorb NO₃⁻ → organic N (proteins, DNA). 4. Ammonification: decomposers break organic N → NH₃ (ammonium). 5. Denitrification: NO₃⁻ → N₂ by anaerobic bacteria, returning N to atmosphere. Human impact: synthetic fertilizers (Haber-Bosch process) adds 120+ Tg N/yr → eutrophication, dead zones, N₂O (potent GHG).",
  },
  {
    q: 'What are the greenhouse gases and how do they trap heat?',
    a: 'The greenhouse effect: shortwave solar radiation passes through atmosphere → warms Earth\'s surface → Earth re-emits longwave infrared radiation → greenhouse gases absorb and re-emit this infrared, warming the lower atmosphere. Major GHGs (by warming potential): CO₂ (baseline, ~420 ppm today, up from 280 ppm pre-industrial), CH₄ (methane: 80× CO₂ over 20 years; from livestock, wetlands, fossil fuels), N₂O (273× CO₂ over 100 years; from fertilizers, combustion), O₃ (tropospheric), H₂O (positive feedback). Without any GHG, Earth\'s avg temp would be –18°C; actual avg is ~15°C. Human-enhanced GHG effect drives climate change.',
  },
  {
    q: 'Define biodiversity and explain three levels.',
    a: "Biodiversity: the variety of life, measured at three levels: 1. Genetic diversity: allelic variation within a species. Low genetic diversity = vulnerability to disease and environmental change (cheetahs, Florida panthers). 2. Species diversity: number (richness) and relative abundance (evenness) of species in an area. Measured by Shannon index. Tropical rainforests: highest species diversity on Earth. 3. Ecosystem diversity: variety of different habitats, ecological communities, and processes. High ecosystem diversity supports high species diversity. Why it matters: ecosystem services (pollination, water filtration, carbon sequestration), food security, medicine (30% of drugs derived from plants), ecosystem resilience.",
  },
  {
    q: 'Compare point source vs. non-point source pollution.',
    a: "Point source pollution: identifiable, single discharge location. Examples: factory outfall pipe, sewage treatment plant discharge, oil tanker spill. Regulated under the Clean Water Act via NPDES (National Pollutant Discharge Elimination System) permits. Non-point source (NPS) pollution: diffuse, from broad land areas. Examples: agricultural fertilizer/pesticide runoff, urban stormwater runoff, atmospheric deposition. Responsible for ~65% of water pollution in the US (NPS is the #1 water pollutant by volume). Harder to regulate because no single discharge point. Consequences: N/P runoff → eutrophication → algal blooms → hypoxic dead zones (Gulf of Mexico dead zone: 6,000+ sq miles).",
  },
  {
    q: 'What is the IPAT equation and what does it measure?',
    a: 'IPAT equation: I = P × A × T. I = Environmental Impact. P = Population size. A = Affluence (per capita consumption/GDP). T = Technology (environmental impact per unit of consumption). Developed by Ehrlich and Commoner. Uses: quantifies how population growth, rising consumption, and technology choices combine to drive environmental impact. Example: a country with small but very affluent population (high A) may have larger impact than a large, poor population (low A). Technology can cut T (solar replacing coal) or increase it (gas-guzzling SUVs). Criticism: oversimplifies complex interactions; technology can both harm and heal. AP use: analyze why developed vs. developing countries differ in per-capita environmental impact.',
  },
]

const benefits = [
  {
    title: 'All 9 APES units covered with targeted decks',
    body: 'Generate decks per unit: ecosystems, biodiversity, populations, Earth systems, land/water use, energy resources, atmospheric pollution, aquatic/terrestrial pollution, and global change. Match the AP exam structure exactly.',
  },
  {
    title: 'Environmental legislation — fast and painless',
    body: 'The Clean Air Act, Clean Water Act, ESA, CERCLA, NEPA — generate cards that pair each law with its year, purpose, and key provisions. No more mixing up what CERCLA covers vs. RCRA.',
  },
  {
    title: 'Upload your textbook and get a deck instantly',
    body: 'Drop any APES textbook chapter PDF (Friedland, Miller, Botkin) into Esli and get a focused deck in seconds. Cover dense chapters on biogeochemical cycles or energy policy in a fraction of the time.',
  },
  {
    title: 'Spaced repetition schedules your review automatically',
    body: 'Stop passive re-reading. The SM-2 algorithm surfaces cards you struggle with more often and spaces out easy cards — maximizing retention before the AP exam in May.',
  },
]

export default function EnvironmentalScienceFlashcardsPage() {
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
                <span className="text-primary-600">AP Environmental Science</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any APES topic — biogeochemical cycles, biodiversity, climate change, pollution, energy resources — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['AP Enviro Science', 'Biogeochemical Cycles', 'Ecosystems', 'Climate Change', 'Biodiversity', 'Pollution', 'Energy Resources', 'Environmental Policy'].map((tag) => (
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
                  Generate APES Flashcards Free
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
                Ace APES in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From biogeochemical cycles to environmental legislation — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your APES topic',
                  body: 'Enter "nitrogen cycle step by step", "APES Unit 7: atmospheric pollution", or upload a chapter PDF from your Friedland or Miller textbook.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering key terms, cycle diagrams, legislation, case studies, and data — exactly the content tested on the AP exam and FRQs.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at optimal intervals — hard cards appear more often, easy ones less, building long-term retention before May.',
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
                Example APES flashcards
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
                Generate Your APES Deck Free
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
                Why APES students choose Esli
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
                APES flashcard FAQs
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
              Start mastering APES today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any environmental science topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate APES Flashcards Free
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
              <a href="/flashcards/ap-us-history" className="hover:text-white transition-colors no-underline">AP US History Flashcards</a>
              <a href="/flashcards/ecology" className="hover:text-white transition-colors no-underline">Ecology Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
