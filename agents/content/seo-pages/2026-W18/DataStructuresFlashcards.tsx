/**
 * SEO Landing Page: Data Structures Flashcards
 * Route: /flashcards/data-structures
 * Meta title: Data Structures Flashcards — AI Generator | Esli
 * Meta description: Generate data structures and algorithms flashcards with AI. Arrays, trees, graphs, sorting — study for coding interviews. Free, spaced repetition.
 * Target keywords: data structures flashcards, CS flashcards coding interviews, algorithms flashcards, data structures study cards free
 * Week: 2026-W18
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
      name: 'Are data structures flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited data structures and algorithms flashcards with AI, study with spaced repetition, and access all core features — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate data structures flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any CS topic — "binary search tree operations and time complexity", "graph traversal BFS vs DFS", "dynamic programming patterns", "hash table collision resolution" — and the AI creates a complete deck of conceptual and complexity-focused flashcards in seconds. You can also upload textbook chapters, CLRS excerpts, or LeetCode prep notes as PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover Big-O time and space complexity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When you generate cards on a data structure or algorithm, Esli includes time and space complexity for key operations — average case, worst case, and why. For example, a HashTable card will include O(1) average insert/lookup, O(n) worst case, and the reason (hash collision). This is exactly the format interviewers test.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me prepare for FAANG technical interviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate decks for the most common interview topics: arrays/strings, linked lists, trees/graphs, dynamic programming, heaps, tries, and system design concepts. Esli also generates cards for algorithmic patterns like sliding window, two pointers, and backtracking — the high-level approaches interviewers expect you to recognize and articulate.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from LeetCode for interview prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LeetCode is for practicing coding problems. Esli is for memorizing the conceptual knowledge behind them — data structure properties, complexity guarantees, when to use which structure, and pattern recognition cues. Use both: Esli to build your knowledge foundation, LeetCode to apply it in code. Most engineers fail interviews not because they can\'t code, but because they can\'t quickly recall which structure/pattern fits the problem.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the time complexity of binary search, and what are its requirements?',
    a: 'O(log n) time, O(1) space (iterative). Requirements: the array must be sorted. Algorithm: compare target to middle element → search left half if target < mid, right half if target > mid. Key insight: each comparison eliminates half the remaining elements.',
  },
  {
    q: 'What is the difference between BFS and DFS? When do you use each?',
    a: 'BFS (Queue): explores level by level. Use for: shortest path in unweighted graphs, checking if path exists, finding nodes at distance k. DFS (Stack/recursion): explores a branch fully before backtracking. Use for: topological sort, cycle detection, connected components, tree traversals.',
  },
  {
    q: 'What are the time complexities for a balanced BST vs an unbalanced one?',
    a: 'Balanced BST (AVL, Red-Black): O(log n) search, insert, delete. Unbalanced BST (worst case — sorted input): O(n) for all operations (degrades to linked list). Why it matters: always clarify if a BST is balanced in interviews. Java TreeMap / Python SortedList use balanced BSTs.',
  },
  {
    q: 'What is dynamic programming and what are its two key properties?',
    a: 'DP: solving complex problems by breaking into overlapping subproblems and storing results. Two properties required: (1) Optimal substructure — optimal solution contains optimal solutions to subproblems. (2) Overlapping subproblems — same subproblems are solved multiple times. Approaches: memoization (top-down) or tabulation (bottom-up).',
  },
  {
    q: 'What is a heap and what operations does it support in O(log n)?',
    a: 'Heap: complete binary tree satisfying heap property (max-heap: parent >= children; min-heap: parent <= children). O(log n): insert, extract-max/min, heapify. O(1): peek max/min. Use cases: priority queue, k-th largest/smallest, median of stream, Dijkstra\'s algorithm. Python: heapq (min-heap); negate values for max-heap.',
  },
  {
    q: 'What is the difference between a linked list and an array? When do you prefer each?',
    a: 'Array: O(1) access by index, O(n) insert/delete in middle (shifting), cache-friendly. Linked List: O(n) access by index, O(1) insert/delete at known node, not cache-friendly. Prefer array: random access needed, small/fixed size. Prefer linked list: frequent insertions/deletions at head/tail, unknown size, implementing stack/queue.',
  },
]

const benefits = [
  { title: 'Time complexity on every card', body: 'Every data structure card includes average, worst-case, and space complexity — the exact format coding interviewers test. No need to look it up separately.' },
  { title: 'Covers all interview-critical topics', body: 'Arrays, linked lists, trees, graphs, heaps, tries, DP patterns, sorting algorithms, system design fundamentals — generate targeted decks per topic.' },
  { title: 'Upload your prep materials', body: 'Have CLRS, Cracking the Coding Interview, or course notes as PDFs? Upload them and Esli generates flashcards from your exact materials.' },
  { title: 'SM-2 spaced repetition', body: 'Interview prep requires patterns to be automatic under pressure. Esli\'s spaced repetition builds that automaticity through optimally timed reviews.' },
]

const topicTags = ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'Heaps', 'Hash Tables', 'Sorting', 'Big-O Complexity']

export default function DataStructuresFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Navbar ── */}
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

        {/* ── Hero ── */}
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
                <span className="text-primary-600">Data Structures Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any CS topic — arrays, trees, graphs, dynamic programming, sorting algorithms — and get a complete deck with time complexity in seconds. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {topicTags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
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

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build your CS deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a targeted study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter anything — "binary search tree operations with time complexity", "dynamic programming patterns for interviews", "graph algorithms BFS vs DFS" — or upload your CLRS chapter or course notes as PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates CS flashcards with concept explanations, Big-O complexity for all operations, and when-to-use guidance — exactly the format coding interviewers test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces concepts you find difficult most often. Under interview pressure, pattern recognition needs to be automatic — that comes from systematic, spaced review.',
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

        {/* ── Sample Cards ── */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example data structures flashcards
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
                Generate Your CS Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why engineers choose Esli for interview prep
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

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Data structures flashcard FAQs
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to ace your coding interviews?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate data structures and algorithms flashcards for any CS topic. With Big-O complexity. Free forever.
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

        {/* ── Footer ── */}
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
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification</a>
              <a href="/flashcards/comptia-security-plus" className="hover:text-white transition-colors no-underline">CompTIA Security+</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
