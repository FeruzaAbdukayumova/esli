/**
 * SEO Landing Page: AI Flashcards for Self-Taught Developers
 * Route: /use-case/self-taught-developers
 * Meta title: AI Flashcards for Self-Taught Developers | Esli
 * Meta description: Learn coding faster with AI-generated flashcards. Generate decks for any language, framework, or CS concept instantly. Free, spaced repetition.
 * Target keywords: learn coding flashcards, self-taught developer resources, coding flashcards free, programming study cards, software development flashcards AI
 * Week: 2026-W23
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
      name: 'Is Esli free for self-taught developers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited coding flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What programming topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: Python, JavaScript, TypeScript, React, data structures and algorithms, system design, SQL, Git, REST APIs, design patterns, CSS, Node.js, cloud fundamentals (AWS/GCP/Azure), and coding interview prep. Type any concept and get cards instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload a coding book or documentation as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any programming book, course notes, or documentation PDF — Esli\'s AI extracts key concepts, definitions, code patterns, and best practices into flashcards automatically. Great for turning long documentation into something you can actually memorize.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help with coding interview prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "LeetCode data structures", "Big O notation cheat sheet", "JavaScript interview questions closures", or "system design fundamentals" and Esli generates high-yield interview prep flashcards covering the concepts that come up most in technical interviews.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with learning to code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coding requires internalizing hundreds of concepts, syntax patterns, and algorithms. Esli\'s SM-2 spaced repetition resurfaces things you\'re fuzzy on — like Big O complexities, CSS specificity rules, or React hook rules — at the optimal time to move them from short-term to long-term memory.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is a closure in JavaScript?',
    a: 'A closure is a function that retains access to its lexical scope (the variables from its outer function) even after the outer function has returned. Example: counter functions created in a factory function all share the same count variable via closure. Useful for data encapsulation and factory patterns.',
  },
  {
    q: 'What is the time complexity of binary search and why?',
    a: 'O(log n). Each step eliminates half the remaining search space by comparing the target to the middle element. Requires a sorted array. With n = 1 million items, binary search finds the target in ~20 steps vs 1 million for linear search.',
  },
  {
    q: 'What is the difference between == and === in JavaScript?',
    a: '== (loose equality): performs type coercion before comparing — 0 == "0" is true. === (strict equality): checks value AND type — no coercion — 0 === "0" is false. Best practice: always use === unless you explicitly need type coercion.',
  },
  {
    q: 'Explain the difference between SQL JOIN types.',
    a: 'INNER JOIN: rows where the join condition matches in BOTH tables. LEFT JOIN: all rows from left table + matched rows from right (NULLs where no match). RIGHT JOIN: opposite. FULL OUTER JOIN: all rows from both, NULLs where no match. CROSS JOIN: every combination (cartesian product).',
  },
  {
    q: 'What are the SOLID principles?',
    a: 'S: Single Responsibility - one class, one reason to change. O: Open/Closed - open for extension, closed for modification. L: Liskov Substitution - subclasses must be substitutable for their base class. I: Interface Segregation - specific interfaces > one general interface. D: Dependency Inversion - depend on abstractions, not concretions.',
  },
  {
    q: 'What is the difference between a process and a thread?',
    a: 'Process: independent program instance with its own memory space. Thread: a unit of execution within a process — threads share memory. Multiple threads in a process = concurrency within shared memory (risk: race conditions). Multiple processes = true isolation (inter-process communication needed).',
  },
]

const benefits = [
  {
    title: 'Any language or framework in seconds',
    body: 'Type "React hooks explained", "Python generators vs iterators", "SQL window functions", or "Git rebase vs merge" and get concept-focused cards with definitions, examples, and gotchas.',
  },
  {
    title: 'Upload courses and docs as PDF',
    body: 'Turn any programming book, course PDF, or documentation into a complete flashcard deck. Esli extracts key concepts, code patterns, and best practices automatically.',
  },
  {
    title: 'SM-2 spaced repetition',
    body: 'The same algorithm used by top learners. Concepts you struggle with — like Big O complexities, closure rules, or regex syntax — resurface at exactly the right interval to build real fluency.',
  },
  {
    title: 'Interview prep on demand',
    body: 'Generate targeted decks for any interview topic — data structures, system design, JavaScript trivia, CSS specificity — and study them between job applications.',
  },
]

export default function SelfTaughtDevelopersPage() {
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
                For Self-Taught Developers
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Learn to Code Faster with{' '}
                <span className="text-primary-600">AI Flashcards</span>
                {' '}— Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any coding concept — JavaScript closures, data structures, system design, interview prep — and get a complete flashcard deck in seconds. Spaced repetition builds the deep fluency that courses alone can't.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'JavaScript & TypeScript',
                  'Python',
                  'Data Structures & Algorithms',
                  'React & Vue',
                  'SQL & Databases',
                  'System Design',
                  'Git & DevOps',
                  'Interview Prep',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full border border-primary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Coding Flashcards Free
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

        {/* Pain Points */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The self-taught developer problem
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                You can take tutorials all day and still blank on interviews. Esli fixes the retention gap.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  problem: 'You finish a course but forget it two weeks later',
                  solution: 'Spaced repetition resurfaces weak spots before you forget them',
                },
                {
                  problem: 'Making flashcards by hand wastes your coding time',
                  solution: 'AI generates a complete deck in seconds — just type the topic',
                },
                {
                  problem: 'Generic premade decks don\'t match what you\'re learning',
                  solution: 'Upload your course PDF or notes and get personalized cards',
                },
                {
                  problem: 'Interview concepts don\'t stick until you\'re panicking',
                  solution: 'Build fluency with consistent daily review — 10 minutes a day',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <p className="text-sm text-slate-500 line-through mb-1">{item.problem}</p>
                  <p className="text-sm font-medium text-slate-900 flex items-start gap-2">
                    <Check size={14} className="text-primary-600 mt-0.5 shrink-0" />
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From any concept to a flashcard deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Under a minute from topic to studying.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type any coding topic',
                  body: 'Enter "JavaScript closures and scope", "Big O notation time complexity", "React useEffect patterns", or "SQL joins explained" — or upload any course PDF, book, or documentation.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates cards covering definitions, code examples, common gotchas, and interview-style questions — all tailored to your topic and level.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 tracks what you know and what you don\'t. Concepts you\'re shaky on resurface at exactly the right time so they become fluent knowledge, not just familiar terms.',
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
                Example coding flashcards
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
                Generate Your Coding Deck Free
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
                Why self-taught developers choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all"
                >
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
                Coding flashcard FAQs
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
              Ready to level up your coding knowledge?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of developers building fluency with AI flashcards. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Coding Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              See topic pages:{' '}
              <a href="/flashcards/javascript" className="text-white underline hover:no-underline">
                JavaScript flashcards
              </a>
              {' '}and{' '}
              <a href="/flashcards/python-programming" className="text-white underline hover:no-underline">
                Python flashcards
              </a>
              .
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
