/**
 * SEO Landing Page: Physics Flashcards
 * Route: /flashcards/physics
 * Meta title: Physics Flashcards Free — AI Generator | Esli (47 chars)
 * Meta description: Generate physics flashcards with AI. Mechanics, E&M, thermodynamics — AP, college, SAT prep. Free, spaced repetition. No signup. (130 chars)
 * Target keywords: physics flashcards, physics flashcards free, AP physics flashcards, college physics flashcards, physics formula flashcards
 * Week: 2026-W38
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
      name: 'Are physics flashcards on Esli really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited physics flashcards with AI, study with spaced repetition, and use all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What physics topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic you can think of — classical mechanics, electromagnetism, thermodynamics, waves, optics, quantum mechanics, nuclear physics, and more. Type the topic (e.g. "Newton\'s laws", "magnetic flux", "ideal gas law") or upload a PDF of your textbook or notes and Esli generates the cards automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli handle physics formulas and equations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli supports KaTeX math rendering, so formulas like F = ma, E = hf, and ΔG = ΔH − TΔS display correctly. AI-generated cards include the formula, the meaning of each variable, and typical exam applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for AP Physics 1, AP Physics 2, or AP Physics C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Just specify the course: "AP Physics 1 rotational motion", "AP Physics C electricity", or "AP Physics 2 fluid dynamics" and Esli tailors the cards to that exam\'s scope and depth. You can also upload AP review PDFs and get a complete deck in seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for physics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires you to create every card yourself or find pre-made decks that may be wrong or outdated. Esli generates accurate physics flashcards from any topic or PDF in seconds. Both use spaced repetition (SM-2 algorithm) — Esli just removes the hours of card-creation work.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: "What is Newton's Second Law? State the equation and explain each variable.",
    a: 'F = ma. Net force (F, Newtons) equals mass (m, kg) times acceleration (a, m/s²). Acceleration is in the same direction as the net force. Applies in inertial reference frames.',
  },
  {
    q: 'Define electric potential difference (voltage). What is the SI unit?',
    a: 'Voltage (V) is the work done per unit charge to move a positive test charge between two points: V = W/q. SI unit: Volt (V = J/C). Drives current in a circuit (I = V/R).',
  },
  {
    q: 'State the First Law of Thermodynamics.',
    a: 'ΔU = Q − W. The change in internal energy of a system equals heat added to the system minus work done by the system. Energy is conserved — it cannot be created or destroyed, only transferred.',
  },
  {
    q: 'What is the relationship between wave speed, frequency, and wavelength?',
    a: 'v = fλ. Wave speed (v, m/s) equals frequency (f, Hz) times wavelength (λ, m). For light in a vacuum, v = c ≈ 3 × 10⁸ m/s. Frequency and wavelength are inversely proportional at constant speed.',
  },
  {
    q: "State Coulomb's Law. How does force change if distance doubles?",
    a: 'F = kq₁q₂/r². Electrostatic force is proportional to the product of charges and inversely proportional to the square of the distance. If r doubles, F decreases by a factor of 4 (inverse-square law).',
  },
  {
    q: 'What is the de Broglie wavelength? What does it imply?',
    a: 'λ = h/mv (h = Planck\'s constant, m = mass, v = velocity). It implies all matter has wave-like properties. Significant only for subatomic particles — a 1 kg ball at 1 m/s has λ ≈ 6.6 × 10⁻³⁴ m, immeasurably small.',
  },
]

const benefits = [
  { title: 'Every topic, every formula', body: 'Type any physics concept — from kinematics to quantum — or upload your textbook PDF. AI generates cards with formulas, definitions, and worked examples.' },
  { title: 'Math rendering built in', body: 'Esli supports KaTeX so equations like F = kq₁q₂/r² and ΔU = Q − W render correctly. No workarounds, no broken symbols.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Cards you struggle with resurface sooner, maximizing retention before exams.' },
  { title: 'No signup required', body: 'Start generating and studying physics flashcards in seconds. No account needed. No credit card. Free forever for core features.' },
]

export default function PhysicsFlashcardsPage() {
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
                <span className="text-primary-600">Physics Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any physics topic or upload your textbook and get a complete deck of flashcards in seconds. Formulas, definitions, worked examples — all generated by AI, studied with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Mechanics', 'Electromagnetism', 'Thermodynamics', 'Waves & Optics', 'Quantum Physics', 'AP Physics 1 & 2', 'AP Physics C', 'Nuclear Physics'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Physics Flashcards Free
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
                Physics flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a complete deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your physics topic',
                  body: 'Enter anything — "Newton\'s laws of motion", "Maxwell\'s equations", "ideal gas law" — or upload a PDF of your textbook, lecture notes, or AP review guide.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A flashcards covering formulas, definitions, conceptual explanations, and exam-style problem setups for that topic.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. Cards you struggle with resurface sooner, maximizing long-term retention before your exam.',
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
                Example physics flashcards
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
                Generate Your Physics Deck Free
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
                Why physics students choose Esli
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
                Physics flashcard FAQs
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

        {/* CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to master physics?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any physics topic — mechanics, E&amp;M, thermodynamics — in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Physics Flashcards Free
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
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href="/flashcards/chemistry" className="hover:text-white transition-colors no-underline">Chemistry</a>
              <a href="/flashcards/biology" className="hover:text-white transition-colors no-underline">Biology</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
