/**
 * SEO Landing Page: AI Flashcards for Software Engineering Interviews
 * Route: /use-case/software-engineering-interviews
 * Meta title: Software Engineering Interview Flashcards — AI | Esli
 * Meta description: Generate coding interview and system design flashcards with AI. LeetCode
 *   patterns, data structures, algorithms — free, spaced repetition. No signup needed.
 * Target keywords: software engineering interview flashcards, coding interview prep flashcards,
 *   system design flashcards, LeetCode flashcards, data structures flashcards algorithms,
 *   FAANG interview prep flashcards
 * Week: 2026-W41
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
      name: 'Are software engineering interview flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited coding interview flashcards with AI — data structures, algorithms, system design, behavioral patterns, LeetCode problem types — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What coding interview topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any software engineering interview topic: data structures (arrays, linked lists, trees, graphs, heaps, hash maps, tries), algorithm patterns (sliding window, two pointers, BFS/DFS, dynamic programming, backtracking, divide and conquer), time and space complexity, system design concepts (load balancing, caching, databases, CAP theorem, microservices), behavioral interview frameworks (STAR method), and language-specific APIs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with system design interview prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type "system design interview concepts" or specific topics like "CAP theorem", "database sharding", "CDN architecture", "rate limiting algorithms", or "consistent hashing" and Esli generates flashcards with the concept, trade-offs, and common interview follow-up questions. You can also upload a system design book PDF (Designing Data-Intensive Applications, System Design Interview) and Esli builds a targeted deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me memorize algorithm complexity and LeetCode patterns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "LeetCode algorithm patterns", "Big O complexity cheat sheet", "sliding window template", "binary search variations", or "dynamic programming patterns" and Esli generates cards with the pattern, when to recognize it, the code template structure, and typical time/space complexity. Spaced repetition ensures the patterns stay retrievable under whiteboard pressure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for both FAANG-level and standard software engineering interviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can tune the depth by how you phrase your topic. "Binary search variations FAANG" generates harder edge cases and follow-up complexity questions. "Data structures interview basics" generates foundational cards appropriate for mid-level roles. The AI adapts to whatever depth you specify, so the same tool works for both new grad and principal-level prep.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the sliding window pattern and when should you recognize it?',
    a: 'Sliding window maintains a subarray/substring of variable or fixed size as you iterate, avoiding re-computation. Recognize it when: finding max/min subarray of size k, longest substring with constraint, minimum window containing target. Template: expand right pointer, shrink left pointer when constraint violated. Time: O(n), Space: O(1) to O(k). Common LeetCode: #3, #76, #209, #424.',
  },
  {
    q: 'What is the time and space complexity of BFS vs DFS and when do you use each?',
    a: 'Both: Time O(V+E), Space O(V). BFS (queue): shortest path in unweighted graph, level-order traversal, "minimum steps" problems — uses more memory (entire level in queue). DFS (stack/recursion): path existence, topological sort, cycle detection, connected components, backtracking — lower memory, can hit stack overflow on deep graphs. BFS for shortest; DFS for connectivity/structure.',
  },
  {
    q: 'What is the CAP theorem and what does it mean for distributed system design?',
    a: 'CAP: A distributed system can only guarantee 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition tolerance (system works despite network splits). Since partitions are unavoidable, real choice is CP vs AP. CP (e.g., HBase, Zookeeper): returns error rather than stale data. AP (e.g., DynamoDB, Cassandra): returns potentially stale data rather than error.',
  },
  {
    q: 'What are the four dynamic programming patterns and how do you identify them?',
    a: '0/1 Knapsack: pick or skip items, mutually exclusive choices (dp[i][w]). Unbounded Knapsack: items can repeat (coin change). Fibonacci/linear DP: current state depends on 1-2 prior states. Interval DP: solve over sub-intervals, merge results (matrix chain). Identify DP when: optimal substructure (optimal solution contains optimal subsolutions) + overlapping subproblems (same sub-problem computed multiple times).',
  },
  {
    q: 'What is consistent hashing and why is it used in distributed systems?',
    a: 'Consistent hashing maps both servers and keys to a circular hash ring. Each key is assigned to the nearest server clockwise. When a server is added/removed, only keys between that server and its predecessor are remapped — O(k/n) keys moved instead of O(k). Used in: distributed caches (Memcached, Redis Cluster), CDNs, load balancers. Virtual nodes solve uneven distribution.',
  },
  {
    q: 'What is the two-pointer pattern and list 3 problem types where it applies.',
    a: 'Two pointers maintain two indices (start/end, slow/fast) that converge or move together. Types: (1) Sorted array pair sum — left and right pointers, move inward based on comparison. (2) Linked list cycle detection — Floyd\'s algorithm, fast moves 2x, slow 1x, meet if cycle. (3) Remove duplicates in-place — slow pointer marks position, fast scans ahead. Time O(n), Space O(1) for all three.',
  },
]

const benefits = [
  { title: 'LeetCode patterns, not just problems', body: 'Memorizing solutions doesn\'t scale. Esli builds pattern-recognition cards — sliding window, two pointers, BFS/DFS, DP templates — so you recognize the approach before writing a line.' },
  { title: 'System design concepts on demand', body: 'Type any system design topic — CAP theorem, consistent hashing, database indexing, message queues — and Esli generates cards with the concept, the trade-offs, and the follow-up questions interviewers ask.' },
  { title: 'Upload your prep material', body: 'Upload Designing Data-Intensive Applications chapters, System Design Interview PDFs, or your own notes and Esli turns them into focused flashcard decks in seconds.' },
  { title: 'Behavioral frameworks locked in', body: 'STAR method, leadership principles, conflict resolution frameworks — type any behavioral interview topic and Esli generates structure cards so your stories come out organized under pressure.' },
]

export default function SoftwareEngineeringInterviewsPage() {
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
                AI Flashcards for{' '}
                <span className="text-primary-600">Software Engineering Interviews</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any interview topic and get a complete flashcard deck in seconds. Algorithm patterns, system design, data structures, behavioral frameworks — free, with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Algorithm Patterns', 'System Design', 'Data Structures', 'Big O Complexity', 'LeetCode Templates', 'CAP Theorem', 'Behavioral (STAR)', 'FAANG Prep'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Interview Flashcards Free
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
                Interview-ready in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From grinding LeetCode to building retrievable patterns — the difference is active recall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your interview topic',
                  body: 'Enter any concept — "sliding window pattern", "system design database sharding", "dynamic programming DP patterns", "behavioral STAR method" — or upload your prep notes PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli creates Q&A cards with pattern recognition cues, code templates, complexity analysis, trade-off comparisons, and the follow-up questions interviewers actually ask.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces the patterns you\'re forgetting — so when a whiteboard problem hits, your brain retrieves the approach before you freeze.',
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
                Example interview prep flashcards
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
                Generate Your Interview Prep Deck Free
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
                Why engineers use Esli for interview prep
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
                Interview flashcard FAQs
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
              Ready to land that offer?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate software engineering interview flashcards with AI — algorithm patterns, system design, behavioral frameworks — free, with spaced repetition.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Interview Flashcards Free
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
              <a href="/flashcards/python" className="hover:text-white transition-colors no-underline">Python Flashcards</a>
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification</a>
              <a href="/use-case/self-taught-developers" className="hover:text-white transition-colors no-underline">Self-Taught Developers</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
