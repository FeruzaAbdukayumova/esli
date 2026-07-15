/**
 * SEO Landing Page: Computer Science Flashcards
 * Route: /flashcards/computer-science
 * Meta title: Computer Science Flashcards Free — AI | Esli (50 chars)
 * Meta description: Generate CS flashcards with AI. Data structures, algorithms, Big O, OOP, databases — free, spaced repetition. No signup needed. (130 chars)
 * Target keywords: computer science flashcards, CS fundamentals flashcards, data structures flashcards, algorithms flashcards free, software engineering flashcards
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
      name: 'Can Esli generate flashcards for data structures and algorithms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Prompt Esli with 'data structures and algorithms flashcards for technical interviews', 'Big O complexity for common algorithms', 'binary search tree operations and time complexity', or 'dynamic programming patterns with examples'. You get cards covering definitions, time/space complexity, implementation details, and when to use each structure — everything needed for LeetCode-style interview prep.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for CS exam prep at university?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. Whether it's intro CS (CS101), data structures (CS201), algorithms, operating systems, computer networks, databases, or software engineering — Esli generates cards aligned with the specific course level you specify. Upload your lecture notes or textbook chapters (CLRS, Tanenbaum, Silberschatz) as PDFs and get a complete study deck in under a minute.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use Esli for software engineering interview prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Generate decks per interview topic: 'SOLID principles with code examples', 'system design concepts: load balancing, caching, sharding', 'object-oriented design patterns (Gang of Four)', 'database indexing and query optimization', 'REST vs GraphQL API design', 'concurrency and threading concepts'. Combine AI generation with PDF upload of your own interview notes for a personalized prep deck.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate flashcards for specific programming languages alongside CS theory?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Esli handles both theory and language-specific content. For language syntax and patterns, see the dedicated Python and JavaScript pages. For CS theory, prompt with the topic and level: 'operating systems concepts for OS final exam', 'computer networks OSI model layers and protocols', 'database normalization 1NF through BCNF with examples'. You can mix theory and practice in one deck.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli work for self-taught developers learning CS fundamentals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — this is one of Esli's most popular use cases. Self-taught developers use Esli to fill CS fundamentals gaps: 'binary representation and bit manipulation', 'recursion and the call stack explained', 'time and space complexity analysis', 'graph traversal BFS vs DFS'. You can start from any level and build up systematically. No textbook required — just type the topic.",
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is Big O notation? Give the complexity rankings from fastest to slowest.',
    a: "Big O notation describes the upper bound on an algorithm's time or space growth relative to input size n. Rankings (fastest to slowest): O(1) constant → O(log n) logarithmic → O(n) linear → O(n log n) linearithmic → O(n²) quadratic → O(2ⁿ) exponential → O(n!) factorial. Example: binary search is O(log n); bubble sort is O(n²).",
  },
  {
    q: 'What is the difference between a stack and a queue? When do you use each?',
    a: 'Stack: LIFO (Last In, First Out). Operations: push (add to top), pop (remove from top). Use for: function call management, undo/redo, DFS traversal, expression parsing. Queue: FIFO (First In, First Out). Operations: enqueue (add to rear), dequeue (remove from front). Use for: BFS traversal, task scheduling, print spoolers, message queues. Both O(1) for their primary operations.',
  },
  {
    q: 'Explain the 4 pillars of Object-Oriented Programming.',
    a: '1. Encapsulation: bundle data and methods together; restrict direct access via access modifiers (private/public). 2. Abstraction: hide implementation details, expose only necessary interfaces. 3. Inheritance: a class (child) derives properties and methods from another class (parent), promoting code reuse. 4. Polymorphism: same interface behaves differently depending on the object — method overriding (runtime) and overloading (compile-time).',
  },
  {
    q: 'What is a hash table? What is the average and worst-case time complexity for lookup?',
    a: 'A hash table stores key-value pairs using a hash function to map keys to array indices. Average case: O(1) for insert, lookup, and delete — the hash function maps directly to the bucket. Worst case: O(n) — when all keys hash to the same bucket (hash collision), degenerating to a linked list traversal. Collision resolution: chaining (linked list per bucket) or open addressing (probing for next empty slot).',
  },
  {
    q: 'What is the difference between TCP and UDP?',
    a: "TCP (Transmission Control Protocol): connection-oriented; guarantees delivery, ordering, and error-checking via three-way handshake and acknowledgements. Higher overhead. Use when data integrity matters: HTTP, email, file transfer. UDP (User Datagram Protocol): connectionless; no delivery guarantee, no ordering, minimal error checking. Lower latency. Use when speed > reliability: video streaming, VoIP, DNS, online gaming.",
  },
  {
    q: 'What is database normalization? What problem does it solve?',
    a: 'Normalization is the process of organizing a relational database to reduce data redundancy and improve integrity. It solves update, insertion, and deletion anomalies. Key normal forms: 1NF — no repeating groups, atomic values. 2NF — 1NF + no partial dependency on composite primary key. 3NF — 2NF + no transitive dependency. BCNF — every determinant is a candidate key. Higher normal forms reduce redundancy but may increase query join complexity.',
  },
]

const benefits = [
  {
    title: 'Data structures, algorithms, and interview prep',
    body: 'Generate cards for every major CS topic tested in technical interviews: array/linked list/tree/graph operations, sorting algorithms with complexity, dynamic programming patterns, system design concepts.',
  },
  {
    title: 'Upload lecture notes, textbooks, or your own study guides',
    body: 'Drop a PDF of your CLRS chapter, Tanenbaum OS slides, or a Neetcode guide and Esli creates a flashcard deck in seconds — definitions, complexities, and examples extracted automatically.',
  },
  {
    title: 'Theory + language-specific decks side by side',
    body: 'Build separate decks for CS theory (Big O, OOP, databases) and language-specific implementation (Python data structures, JavaScript async). Study them together or focus on what you need.',
  },
  {
    title: 'Self-taught developer? Fill CS fundamentals gaps fast',
    body: "You don't need a CS degree to learn CS fundamentals. Esli generates structured flashcard curricula from any topic — start with 'CS fundamentals for self-taught developers' and go from there.",
  },
]

export default function ComputerScienceFlashcardsPage() {
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
                <span className="text-primary-600">Computer Science</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any CS topic — data structures, algorithms, Big O, OOP, databases, networking — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Data Structures', 'Algorithms', 'Big O', 'OOP', 'Databases', 'Networking', 'OS', 'System Design'].map((tag) => (
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
                  Generate CS Flashcards Free
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
                Learn CS fundamentals in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                For students, self-taught developers, and interview preppers alike.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your CS topic',
                  body: 'Enter "binary trees and traversal algorithms", "SOLID principles with examples", "database normalization 1NF to BCNF", or upload your lecture slides as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering definitions, time and space complexity, implementation trade-offs, and real-world use cases — calibrated to the level you specify.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces cards at optimal intervals — concepts you know well get spaced out; ones you find hard come back sooner, building genuine long-term retention.',
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
                Example computer science flashcards
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
                Generate Your CS Deck Free
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
                Why CS students and developers choose Esli
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
                CS flashcard FAQs
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
              Nail your CS exam or interview
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any CS topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate CS Flashcards Free
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
              <a href="/flashcards/python-programming" className="hover:text-white transition-colors no-underline">Python Flashcards</a>
              <a href="/flashcards/javascript" className="hover:text-white transition-colors no-underline">JavaScript Flashcards</a>
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
