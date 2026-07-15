/**
 * SEO Landing Page: Psychology Flashcards
 * Route: /flashcards/psychology
 * Meta title: Psychology Flashcards Free — AI Generator | Esli (52 chars)
 * Meta description: Generate psychology flashcards with AI. AP Psych, cognitive, developmental, abnormal — free, spaced repetition. No signup needed. (133 chars)
 * Target keywords: psychology flashcards, AP Psychology flashcards, intro to psychology flashcards, cognitive psychology flashcards, AP Psych study cards
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
      name: 'Can Esli generate flashcards for AP Psychology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any AP Psychology unit into Esli — "Unit 1: Scientific Foundations of Psychology", "biological bases of behavior", "sensation and perception", "learning and conditioning", "social psychology" — and get a full flashcard deck covering the key terms, researchers, and concepts tested on the AP exam. You can also upload your AP Psychology textbook chapters as PDFs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What psychology topics work best for AI flashcard generation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "All of them. Specific prompts produce the best results: 'Piaget's four stages of cognitive development with age ranges', 'defense mechanisms in Freudian psychology', 'types of long-term memory: explicit vs implicit', 'the DSM-5 criteria for major depressive disorder', 'Milgram obedience study findings and ethical issues'. The more specific the topic, the more precise the cards.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my psychology textbook or lecture notes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Myers Psychology for AP, Ciccarelli & White, Nolen-Hoeksema, or your own lecture notes — and Esli extracts definitions, key researchers, experiments, and theoretical frameworks into a structured flashcard deck. This works for college intro psych, AP, and graduate-level courses alike.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I study the history of psychology with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Prompt Esli with 'Key figures in the history of psychology and their contributions' or 'Schools of psychology: structuralism, functionalism, behaviorism, humanistic, cognitive, psychoanalytic'. You'll get cards pairing each theorist with their theory, key study, and historical impact — exactly the format the AP exam tests.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for psychology students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan on Esli includes AI flashcard generation, spaced repetition, and access to community decks — no credit card required. You can generate as many psychology decks as you need, study with spaced repetition that optimizes your review schedule, and use the app without signing up at all (guest mode).',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between classical and operant conditioning?',
    a: 'Classical conditioning (Pavlov): an organism learns to associate two stimuli — a neutral stimulus becomes conditioned to produce a response originally triggered by an unconditioned stimulus (e.g. bell → salivation). Operant conditioning (Skinner): behavior is shaped by its consequences — reinforcement increases a behavior; punishment decreases it. Classical is about associations; operant is about consequences.',
  },
  {
    q: "Explain Freud's three components of personality.",
    a: "Id: the primitive, unconscious reservoir of basic drives and urges (operates on the pleasure principle). Ego: the rational mediator that balances id demands with reality (operates on the reality principle). Superego: the internalized moral voice from socialization, including conscience and ego ideal. Most behavior results from conflict and compromise among these three systems.",
  },
  {
    q: "List Piaget's four stages of cognitive development with approximate age ranges.",
    a: '1. Sensorimotor (0-2 yrs): object permanence develops; learning through senses and actions. 2. Preoperational (2-7 yrs): symbolic language; egocentric thinking; lacks conservation. 3. Concrete operational (7-11 yrs): logical reasoning about concrete objects; conservation mastered. 4. Formal operational (12+): abstract, hypothetical, and systematic reasoning develops.',
  },
  {
    q: 'What are the three types of memory in the Atkinson-Shiffrin model?',
    a: 'Sensory memory: very brief (< 1 second for iconic, ~3-4 seconds for echoic); high capacity but rapidly decays. Short-term / Working memory: ~7±2 items; lasts ~20-30 seconds without rehearsal; conscious processing. Long-term memory: effectively unlimited capacity and duration; includes explicit (declarative: semantic + episodic) and implicit (procedural, priming, conditioning) memory.',
  },
  {
    q: "Describe Milgram's obedience experiment and its main finding.",
    a: "Stanley Milgram (1961-62) instructed participants to administer electric shocks to a 'learner' (confederate) when they answered questions incorrectly, increasing voltage to a maximum 450V. Result: ~65% of participants administered the maximum shock despite the learner's apparent distress, simply because an authority figure (experimenter in lab coat) told them to continue. Demonstrated the power of situational authority over personal conscience.",
  },
  {
    q: 'What is the difference between correlation and causation in psychological research?',
    a: 'Correlation: a statistical relationship between two variables — when one changes, the other tends to change. Does NOT imply one causes the other (third-variable problem; directionality problem). Causation: one variable directly produces change in another — only established through controlled experiments with random assignment. Example: ice cream sales correlate with drowning rates (both caused by hot weather), but ice cream does not cause drowning.',
  },
]

const benefits = [
  {
    title: 'AP Psychology exam prep — all 9 units',
    body: 'Generate targeted decks per unit: Scientific Foundations, Biological Bases, Sensation & Perception, Learning, Cognitive Psychology, Developmental, Motivation, Social, and Abnormal. Specify "AP Psych" in your prompt for exam-aligned cards.',
  },
  {
    title: 'Researchers, studies, and key terms in one place',
    body: "Psychology is full of named studies and theorists. Generate cards pairing each researcher with their contribution, experiment design, and findings — Pavlov, Skinner, Piaget, Kohlberg, Bandura, Milgram, Zimbardo, and more.",
  },
  {
    title: 'Upload your textbook and get cards in 30 seconds',
    body: 'Drop any psychology PDF — Myers, Ciccarelli, Nolen-Hoeksema, or professor notes — and Esli extracts the key concepts, definitions, and research findings into a structured deck ready for spaced repetition.',
  },
  {
    title: 'Study across all levels: high school to graduate',
    body: 'From AP intro psych to graduate abnormal psychology and neuropsychology, Esli handles the full range. The AI calibrates card complexity to the level of detail in your prompt.',
  },
]

export default function PsychologyFlashcardsPage() {
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
                <span className="text-primary-600">Psychology</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any psychology topic — AP Psych, cognitive, developmental, social, abnormal — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['AP Psychology', 'Cognitive', 'Developmental', 'Social', 'Abnormal', 'Neuroscience', 'Sensation & Perception', 'Research Methods'].map((tag) => (
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
                  Generate Psychology Flashcards Free
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
                Master psychology concepts in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From AP exam prep to graduate coursework — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your psychology topic',
                  body: 'Enter "AP Psychology: learning and conditioning", "Piaget vs Vygotsky cognitive development", or upload a chapter PDF from your textbook.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering key terms, researchers, landmark studies, and theoretical distinctions — exactly the content tested on AP and college exams.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules review at optimal intervals — you see hard cards more often and easy ones less, building long-term retention efficiently.',
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
                Example psychology flashcards
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
                Generate Your Psychology Deck Free
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
                Why psychology students choose Esli
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
                Psychology flashcard FAQs
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
              Start acing psychology today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any psychology topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Psychology Flashcards Free
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
              <a href="/flashcards/statistics" className="hover:text-white transition-colors no-underline">Statistics Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
