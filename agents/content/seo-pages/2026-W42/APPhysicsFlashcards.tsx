/**
 * SEO Landing Page: AP Physics Flashcards
 * Route: /flashcards/ap-physics
 * Meta title: AP Physics Flashcards Free — AI Generator | Esli
 * Meta description: Generate AP Physics 1, 2, and C flashcards with AI. Kinematics,
 *   forces, energy, circuits — free, spaced repetition. No signup needed.
 * Target keywords: AP Physics flashcards, AP Physics 1 flashcards, AP Physics C flashcards,
 *   AP Physics 2 flashcards, AP Physics kinematics flashcards, AP Physics electricity flashcards,
 *   AP Physics mechanics flashcards, physics equation flashcards
 * Week: 2026-W42
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
      name: 'Are AP Physics flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited AP Physics 1, AP Physics 2, and AP Physics C flashcards with AI — kinematics, forces, energy, waves, circuits, electromagnetism — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AP Physics topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any AP Physics topic: AP Physics 1 (kinematics, Newton\'s laws, work/energy/power, rotation, simple harmonic motion, waves, circuits); AP Physics 2 (fluid mechanics, thermodynamics, electric force/field/potential, magnetic fields, electromagnetic induction, optics, quantum/nuclear); AP Physics C: Mechanics (calculus-based kinematics, rotation, oscillation, gravitation); AP Physics C: E&M (electrostatics, capacitors, circuits, magnetic fields, induction, Maxwell\'s equations).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with AP Physics exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any AP Physics topic — "rotational kinematics", "Faraday\'s law of induction", "simple harmonic motion energy", "Gauss\'s Law applications" — and Esli generates targeted cards. Upload your AP Physics notes or review book PDF and Esli turns it into a flashcard deck. Spaced repetition ensures equations and concepts stick before your May exam.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between AP Physics 1, 2, and C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AP Physics 1 (algebra-based): mechanics, waves, circuits — the most popular. AP Physics 2 (algebra-based): fluids, thermodynamics, electricity/magnetism, optics, modern physics — continuation of Physics 1. AP Physics C: Mechanics (calculus-based): deeper mechanics using derivatives and integrals. AP Physics C: E&M (calculus-based): electricity and magnetism using vector calculus. Physics C courses are typically taken by students also in or beyond AP Calculus BC.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to memorize AP Physics equations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "AP Physics 1 equations" or any specific equation — "kinematic equations", "rotational inertia formulas", "Ohm\'s Law and power equations" — and Esli generates cards that pair each equation with its variables, units, and a worked context. Esli supports KaTeX math rendering, so equations display properly as you study. The AP Physics exam provides a formula sheet, but knowing when and how to apply each equation is what Esli drills.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the four kinematic equations for constant acceleration?',
    a: 'v = v₀ + at | x = x₀ + v₀t + ½at² | v² = v₀² + 2a(x - x₀) | x = x₀ + ½(v + v₀)t. Variables: v = final velocity, v₀ = initial velocity, a = acceleration, t = time, x = final position, x₀ = initial position. Choose the equation that includes the three knowns and one unknown. Missing variable = variable to exclude when selecting the equation.',
  },
  {
    q: 'State Newton\'s three laws of motion.',
    a: '1st Law (Inertia): An object at rest stays at rest; an object in motion stays in motion at constant velocity — unless acted on by a net external force. 2nd Law: F_net = ma. Net force equals mass times acceleration (vector equation). 3rd Law: For every action force, there is an equal and opposite reaction force acting on a different object. Key AP error: 3rd law pairs act on different objects and never cancel each other.',
  },
  {
    q: 'What is the work-energy theorem?',
    a: 'W_net = ΔKE. The net work done on an object equals its change in kinetic energy. W = Fd cosθ (for constant force). Combined with conservation of energy: ΔKE + ΔPE + W_friction = 0. For conservative forces only: total mechanical energy is conserved. W_friction = -f_k × d converts mechanical energy to thermal energy. Useful when force is not constant: W = area under F-x graph.',
  },
  {
    q: 'What is Faraday\'s Law of electromagnetic induction?',
    a: 'EMF = -dΦ_B/dt. The induced electromotive force in a closed loop equals the negative rate of change of magnetic flux through the loop. Φ_B = B·A·cosθ (magnetic flux). Lenz\'s Law (the negative sign): induced current opposes the change in flux that created it. Ways to induce EMF: change B, change area A, change angle θ, or move conductor in field (motional EMF = BLv).',
  },
  {
    q: 'What are the conditions for simple harmonic motion (SHM)?',
    a: 'SHM occurs when restoring force is proportional to displacement: F = -kx. Period for spring-mass: T = 2π√(m/k). Period for simple pendulum: T = 2π√(L/g) — independent of mass and amplitude (for small angles). Energy: E = ½kA² = ½mv²_max (total), KE = ½mv², PE = ½kx². At equilibrium: KE is max, PE = 0. At amplitude: PE is max, KE = 0. SHM requires no friction (conservative forces only).',
  },
  {
    q: 'What is Gauss\'s Law and how is it used?',
    a: 'Gauss\'s Law: Φ_E = Q_enc/ε₀. The total electric flux through a closed surface (Gaussian surface) equals the enclosed charge divided by ε₀. Used to find E-field for high-symmetry charge distributions: (1) Spherical symmetry: E = kQ/r² outside, E = kQr/R³ inside a uniform sphere. (2) Cylindrical symmetry: E = λ/(2πε₀r). (3) Planar symmetry: E = σ/(2ε₀) per plate. Gaussian surface must match the symmetry.',
  },
]

const benefits = [
  { title: 'AP Physics 1, 2, and C covered', body: 'From algebra-based mechanics to calculus-based electromagnetism — type any AP Physics topic and Esli generates cards targeting the concepts, equations, and application skills your exam tests.' },
  { title: 'Upload your review notes', body: 'Upload your AP Physics review book (Barron\'s, Princeton Review, Flinn) or your own notes PDF and Esli extracts the concepts into a targeted flashcard deck ready for spaced repetition.' },
  { title: 'Equations in context, not just memorized', body: 'AP Physics tests application, not just formula recall. Esli generates cards that pair each equation with its variables, when to use it, and a worked scenario so you know which formula fits which problem.' },
  { title: 'Retention built around your exam date', body: 'SM-2 spaced repetition schedules reviews right before you forget each concept. Set your exam date and Esli optimizes your review schedule around May AP exam week.' },
]

export default function APPhysicsFlashcardsPage() {
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
                <span className="text-primary-600">AP Physics Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any AP Physics topic and get a complete flashcard deck in seconds. Kinematics, forces, energy, circuits, electromagnetism — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Kinematics', 'Newton\'s Laws', 'Work & Energy', 'Rotational Motion', 'Simple Harmonic Motion', 'Circuits (Ohm\'s Law)', 'Faraday\'s Law', 'Gauss\'s Law'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate AP Physics Flashcards Free
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
                5-ready AP Physics knowledge in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From kinematic equations to Maxwell's laws — faster than re-reading your review book.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your physics topic',
                  body: 'Enter any concept — "kinematic equations", "Lenz\'s law induction", "torque and rotational inertia", "Gauss\'s Law spherical symmetry" — or upload your review book PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli generates Q&A cards covering concepts, equations, when to apply them, and the tricky AP FRQ scenarios that separate a 3 from a 5.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces the concepts you\'re forgetting before May. Lock in the equations and physical intuition for every AP Physics unit.',
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
                Example AP Physics flashcards
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
                Generate Your AP Physics Deck Free
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
                Why AP students choose Esli for physics
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
                AP Physics flashcard FAQs
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
              Ready to score a 5 on AP Physics?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate AP Physics flashcards with AI — kinematics, forces, energy, electromagnetism — free, with spaced repetition. Build the physics intuition that earns college credit.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate AP Physics Flashcards Free
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
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology</a>
              <a href="/flashcards/ap-chemistry" className="hover:text-white transition-colors no-underline">AP Chemistry</a>
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
