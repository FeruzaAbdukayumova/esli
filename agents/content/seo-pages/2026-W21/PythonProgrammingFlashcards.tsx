/**
 * SEO Landing Page: Python Programming Flashcards
 * Route: /flashcards/python-programming
 * Meta title: Python Flashcards Free — AI Generator for Developers | Esli
 * Meta description: Generate Python flashcards with AI. Interview prep, data structures, OOP, decorators — type any topic and get cards instantly. Free, spaced repetition.
 * Target keywords: Python flashcards, programming flashcards free, Python interview prep flashcards, learn Python flashcards
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
      name: 'Are Python flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Python flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate Python interview prep flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type topics like "Python data structures", "list comprehension", "decorators and closures", "concurrency in Python", or "Python OOP concepts" and get interview-style Q&A cards instantly. You can also upload books like Fluent Python or Python Tricks as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Python topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: core syntax, data structures (lists, dicts, sets, tuples), OOP (classes, inheritance, dunder methods), functional programming (lambdas, map/filter, generators), decorators, async/await, built-in functions, standard library modules, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload a Python book or documentation as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Fluent Python, Python Cookbook, Learning Python, or even exported documentation — and Esli\'s AI will extract the key concepts and generate a complete flashcard deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli compare to making Python flashcards on Anki or Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki and Quizlet require manual card creation. Esli generates a complete deck from a topic description in seconds. For technical subjects like Python, AI-generated cards cover edge cases and nuances that most people miss when writing cards by hand.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between a list and a tuple in Python?',
    a: 'Lists are mutable (can be changed after creation), use square brackets [], and are slightly slower. Tuples are immutable, use parentheses (), are faster, and can be used as dict keys or set members. Use tuples for fixed data, lists for data that changes.',
  },
  {
    q: 'What is a Python decorator and how does it work?',
    a: 'A decorator is a function that takes another function as input, wraps it with additional behavior, and returns the modified function. Syntax: @decorator above a def. Under the hood: func = decorator(func). Common uses: logging, authentication, caching (functools.lru_cache), timing.',
  },
  {
    q: 'What is the difference between a generator and an iterator in Python?',
    a: 'An iterator is any object with __iter__ and __next__ methods. A generator is a special iterator created with a function using yield — it lazily produces values one at a time without storing the whole sequence in memory. All generators are iterators, but not all iterators are generators.',
  },
  {
    q: 'What is the GIL in CPython and why does it matter?',
    a: 'The Global Interpreter Lock (GIL) is a mutex that allows only one Python thread to execute bytecode at a time in CPython. This limits true parallelism for CPU-bound threads. Workaround: use multiprocessing (separate processes) for CPU-bound tasks; threading still works for I/O-bound tasks since threads release the GIL during I/O.',
  },
  {
    q: 'What is the time complexity of dict lookup, insertion, and deletion in Python?',
    a: 'O(1) average case for all three operations — Python dicts are hash tables. Worst case O(n) due to hash collisions, but this is rare in practice. Membership testing (key in d) is also O(1) — much faster than O(n) for list membership.',
  },
  {
    q: 'Explain *args and **kwargs in Python function definitions.',
    a: '*args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dict. Example: def f(*args, **kwargs) accepts any number of positional and keyword args. Order in signature: positional, *args, keyword-only, **kwargs.',
  },
]

const benefits = [
  { title: 'Interview-ready cards in seconds', body: 'Type "Python OOP interview questions" or "Python async/await" and get cards phrased for active recall — not just definitions, but the kind of follow-up questions interviewers actually ask.' },
  { title: 'Upload books or docs as PDF', body: 'Turn Fluent Python, Python Cookbook, or any documentation into a complete deck. Esli\'s AI extracts concepts, gotchas, and code patterns automatically.' },
  { title: 'SM-2 spaced repetition', body: 'Cards you find hard resurface at exactly the right time. Master GIL behavior, decorator patterns, and generator semantics before your next interview.' },
  { title: 'Study anywhere, no install', body: 'Works in any browser on any device. Your decks sync across phone, tablet, and desktop — no app download needed.' },
]

export default function PythonProgrammingFlashcardsPage() {
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
                <span className="text-primary-600">Python Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Python topic — decorators, OOP, interview prep, async/await — and get a complete flashcard deck in seconds. No manual entry, no copy-pasting from docs.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Data Structures', 'OOP & Classes', 'Decorators', 'Generators', 'Async / Await', 'Standard Library', 'Interview Prep', 'Python Internals'].map(tag => (
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
                  Generate Python Flashcards Free
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
                Python mastery in 3 simple steps
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
                  title: 'Type your Python topic',
                  body: 'Enter anything — "Python concurrency", "list comprehension vs generator expression", "dunder methods" — or upload Fluent Python, Python Tricks, or any PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering syntax, behavior, gotchas, interview patterns, and real-world use cases — not just definitions.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Topics you find hard resurface at the right time. Nail generators, closures, and async before your next interview.',
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
                Example Python flashcards
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
                Generate Your Python Deck Free
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
                Why developers choose Esli for Python
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
                Python flashcard FAQs
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
              Ready to level up your Python?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of developers and students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Python Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying CS? See our{' '}
              <a href="/flashcards/data-structures" className="text-white underline hover:no-underline">data structures flashcards</a>{' '}
              and{' '}
              <a href="/flashcards/aws-certification" className="text-white underline hover:no-underline">AWS certification flashcards</a>.
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
