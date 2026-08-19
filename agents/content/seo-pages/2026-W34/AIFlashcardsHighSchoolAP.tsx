/**
 * SEO Landing Page: AI Flashcards for High School AP Students
 * Route: /use-case/high-school-ap-students
 * Meta title: AI Flashcards for AP Exam Prep — Free | Esli
 * Meta description: One AI flashcard app for all your AP exams. Generate cards for AP Bio, AP Calc, AP US History, AP Psych — free, spaced repetition. No signup.
 * Target keywords: AI flashcards AP exam, AP exam flashcards free, flashcards for AP students,
 *   best flashcard app for AP exams, AP exam prep flashcards, study tool for AP students
 * Week: 2026-W34
 * Note: Distinct from W15 (AI flashcards high school students, broad). This page is AP-exam-season-specific
 *   with "one tool for all your APs" angle.
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
      name: 'Is Esli free for AP students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate flashcards for all your AP exams with AI and study with spaced repetition — no credit card, no account required. You can start in under a minute.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AP exams can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All of them. Esli covers every AP exam: AP Biology, AP Calculus AB/BC, AP US History, AP World History, AP Psychology, AP Human Geography, AP Chemistry, AP Physics, AP English, AP Computer Science, AP Statistics, and more. Just type the AP course name and get cards instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my AP review book PDF and turn it into flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Barron\'s, Princeton Review, Kaplan, your teacher\'s review packet, or your own notes — and Esli\'s AI extracts key concepts and turns them into study-ready flashcards. Great for quickly building decks from thick review books.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with AP exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spaced repetition (SM-2 algorithm) schedules each card\'s review at the optimal moment — just before you\'d forget it. Instead of cramming the night before, you spread studying across weeks and months. By May, the content is in long-term memory, not short-term. Most AP students underestimate how much vocabulary and concept recall the free-response sections require.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for AP classes during the school year, not just before the exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely — and that\'s the best strategy. Using Esli all year means you\'re not relearning Unit 1 material in April. Generate a small deck after each class or unit and let spaced repetition maintain it. By May, you need review, not relearning.',
      },
    },
  ],
}

const apExams = [
  { name: 'AP Biology', icon: '🧬' },
  { name: 'AP Calc AB/BC', icon: '∫' },
  { name: 'AP US History', icon: '🇺🇸' },
  { name: 'AP Psychology', icon: '🧠' },
  { name: 'AP Human Geography', icon: '🌍' },
  { name: 'AP Chemistry', icon: '⚗️' },
  { name: 'AP Physics', icon: '⚡' },
  { name: 'AP English Lang', icon: '✍️' },
  { name: 'AP Computer Science', icon: '💻' },
  { name: 'AP Statistics', icon: '📊' },
  { name: 'AP World History', icon: '🌐' },
  { name: 'AP Environmental Sci', icon: '🌿' },
]

const sampleCards = [
  {
    q: '[AP Biology] What are the four properties of water that make it essential for life?',
    a: '1. Cohesion/surface tension (hydrogen bonding between water molecules). 2. Adhesion (water sticks to other substances). 3. High specific heat (resists temperature change — climate stabilization). 4. Universal solvent (dissolves ionic and polar substances for cellular reactions). Bonus: water expands when frozen (ice less dense than liquid, insulates aquatic life).',
  },
  {
    q: '[AP US History] What was the significance of the Missouri Compromise (1820)?',
    a: 'Admitted Missouri as slave state, Maine as free state — preserved Senate balance. Drew the 36°30\' line: slavery prohibited in Louisiana Purchase territory north of the line, permitted south. Delayed sectional conflict over slavery by 30 years. Henry Clay brokered it ("Great Compromiser"). Declared unconstitutional by Dred Scott (1857) — removed the line and escalated sectional crisis.',
  },
  {
    q: '[AP Psychology] Explain the difference between classical and operant conditioning.',
    a: 'Classical conditioning (Pavlov): learning through association — neutral stimulus paired with unconditioned stimulus until neutral stimulus alone elicits response. Involuntary. Operant conditioning (Skinner): learning through consequences — reinforcement increases behavior, punishment decreases it. Voluntary. Key difference: classical = what happens TO the organism; operant = what the organism DOES and the consequence that follows.',
  },
  {
    q: '[AP Calculus] What is the Fundamental Theorem of Calculus (Part 1)?',
    a: 'If f is continuous on [a,b] and F(x) = ∫[a to x] f(t) dt, then F\'(x) = f(x). In plain terms: the derivative of an integral function equals the original function. Connects differentiation and integration — they are inverse operations. Part 2: ∫[a to b] f(x) dx = F(b) - F(a), where F is any antiderivative of f.',
  },
  {
    q: '[AP Human Geography] What is the difference between a nation and a state?',
    a: 'State: a politically organized territory with sovereignty, defined borders, government, and recognition by other states (synonymous with "country"). Nation: a group of people with shared cultural identity (language, history, ethnicity, religion) — not necessarily having their own state. Nation-state: a state where the nation and state boundaries align (e.g., Japan, Iceland). Stateless nation: a nation without its own state (e.g., Kurds, Palestinians).',
  },
  {
    q: '[AP Chemistry] What is Le Chatelier\'s Principle?',
    a: 'When a chemical system at equilibrium is disturbed, it shifts to partially counteract the disturbance and re-establish equilibrium. Adding reactant → shifts right (toward products). Removing product → shifts right. Increasing pressure → shifts toward fewer moles of gas. Increasing temperature → shifts toward endothermic direction. Catalysts speed equilibrium but do NOT shift it. Used to predict how changes affect reaction yield.',
  },
]

const benefits = [
  {
    title: 'One tool for all your AP exams',
    body: 'Stop juggling 5 different Quizlet accounts. Generate cards for every AP class in one place and study them all with a single spaced repetition schedule.',
  },
  {
    title: 'Upload your Barron\'s or Princeton Review PDF',
    body: 'Review books are packed with the right content but hard to memorize. Upload a chapter and Esli turns the dense text into flash-card-ready Q&As.',
  },
  {
    title: 'Build vocabulary all year, not just in April',
    body: 'AP exams reward students who retain content from September through May. Spaced repetition makes that possible without extra studying sessions — just short daily reviews.',
  },
  {
    title: 'Free-response answers come faster with strong vocabulary',
    body: 'FRQs reward precise terminology. Esli builds the vocabulary recall that makes writing under time pressure significantly easier.',
  },
]

export default function AIFlashcardsHighSchoolAPPage() {
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
                One AI Flashcard App for{' '}
                <span className="text-primary-600">All Your AP Exams</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate flashcards for AP Bio, AP Calc, AP US History, AP Psychology, and every other AP exam — with AI. Type any topic or upload your review book PDF. Spaced repetition included. No signup needed.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate AP Flashcards Free
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

        {/* AP Exam Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Every AP exam. One tool.
              </h2>
              <p className="mt-3 text-slate-600">Type any AP subject and get cards in seconds.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {apExams.map((exam) => (
                <div
                  key={exam.name}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary-300 hover:shadow-md transition-all cursor-default"
                >
                  <span className="text-xl">{exam.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{exam.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                AP prep in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From any AP topic or review book to a full study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your AP topic or upload PDF',
                  body: 'Enter "AP Bio Unit 3 cell communication" or upload your Barron\'s review chapter. Esli handles any AP subject automatically.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates subject-specific cards',
                  body: 'AI creates definition cards, concept comparisons, and recall-format questions — matched to how AP exams actually test each subject.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Spaced repetition keeps it all fresh',
                  body: 'SM-2 algorithm surfaces each card at the optimal review moment across the school year. By May, everything is in long-term memory.',
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
        <section id="sample-cards" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example AP flashcards across subjects
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                One card from each major AP — click any card to flip it.
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
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCard === i ? '[transform:rotateY(180deg)]' : ''}`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-relaxed">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-relaxed">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate AP Flashcards for Your Exam
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why AP students use Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Check className="text-primary-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-slate-200">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i}>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to ace your AP exams?
            </h2>
            <p className="text-lg text-primary-100 mb-10">
              Generate your first AP flashcard deck in under a minute — free, no account needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate AP Exam Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500 mb-6">Popular AP subject pages</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'AP Biology Flashcards', href: '/flashcards/ap-biology' },
                { label: 'AP US History Flashcards', href: '/flashcards/ap-us-history' },
                { label: 'AP Human Geography Flashcards', href: '/flashcards/ap-human-geography' },
                { label: 'AP Psychology Flashcards', href: '/flashcards/psychology' },
                { label: 'AI Flashcards for High School Students', href: '/use-case/high-school-students' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-primary-300 hover:text-primary-700 transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="https://esli.app" className="flex items-center gap-2 no-underline">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Esli</span>
            </a>
            <p className="text-sm text-slate-400">Free AI flashcard generator with spaced repetition.</p>
            <div className="flex gap-6">
              <a href="https://esli.app" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Home</a>
              <a href={`${APP_URL}/register`} className="text-sm text-slate-500 hover:text-slate-800 no-underline">Get Started</a>
              <a href="https://esli.app/pricing" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Pricing</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
