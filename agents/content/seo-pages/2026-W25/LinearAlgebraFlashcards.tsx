/**
 * SEO Landing Page: Linear Algebra Flashcards
 * Route: /flashcards/linear-algebra
 * Meta title: Linear Algebra Flashcards Free — AI Generator | Esli
 * Meta description: Generate linear algebra flashcards with AI. Matrices, eigenvalues, vector spaces, transformations — free, spaced repetition.
 * Target keywords: linear algebra flashcards, matrix flashcards free, eigenvalue flashcards, vector space flashcards, linear algebra study cards
 * Week: 2026-W25
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
      name: 'Are linear algebra flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited linear algebra flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What linear algebra topics can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: vectors and vector spaces, matrix operations (addition, multiplication, transpose, inverse), determinants, eigenvalues and eigenvectors, linear transformations, rank and nullity, orthogonality and projections, Gram-Schmidt process, LU/QR/SVD decompositions, inner product spaces, and more. Type the topic and get targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards from my linear algebra textbook PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your Gilbert Strang "Introduction to Linear Algebra", Lay\'s "Linear Algebra and Its Applications", Axler\'s "Linear Algebra Done Right", or any course notes as a PDF. Esli\'s AI extracts definitions, theorems, proofs, and key formulas into a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Esli flashcards help with linear algebra proofs and theorems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can generate flashcards specifically for theorems: type "rank-nullity theorem statement and proof outline", "spectral theorem conditions", "Gram-Schmidt orthogonalization steps", or "conditions for matrix invertibility" and get cards that quiz you on the theorem statement, key conditions, and proof strategy — not just formulas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for machine learning students studying linear algebra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "linear algebra for machine learning", "SVD in dimensionality reduction", "PCA mathematical foundations", "matrix factorization for recommender systems", or "eigendecomposition in deep learning" and get flashcards bridging pure linear algebra with ML applications. Great for courses like Andrew Ng\'s ML or fast.ai.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the conditions for a matrix A to be invertible? List 5 equivalent statements.',
    a: 'A is invertible (non-singular) iff: (1) det(A) ≠ 0; (2) rank(A) = n (full rank); (3) Ax = 0 has only the trivial solution x = 0; (4) null space N(A) = {0}; (5) columns of A are linearly independent. Also equivalent: A has n pivot positions; A is row-equivalent to the identity matrix; Ax = b has a unique solution for every b.',
  },
  {
    q: 'Define eigenvalue and eigenvector. How do you compute eigenvalues of a matrix A?',
    a: 'An eigenvector v ≠ 0 satisfies Av = λv for scalar λ (the eigenvalue). To find eigenvalues: solve the characteristic equation det(A − λI) = 0. This gives the characteristic polynomial. The roots are the eigenvalues. Then for each λ, solve (A − λI)x = 0 to find the eigenvectors. Note: eigenvectors are only defined up to scalar multiples; eigenspaces are the corresponding null spaces.',
  },
  {
    q: 'State the Rank-Nullity Theorem. What does it say geometrically?',
    a: 'For a linear transformation T: V → W with matrix A (m × n): rank(A) + nullity(A) = n. Where rank = dim(column space) = number of pivots; nullity = dim(null space) = number of free variables. Geometrically: the input space (dimension n) is split — some dimensions map to output (rank) and some "collapse" to zero (nullity). Total input dimensions = those that survive + those that vanish.',
  },
  {
    q: 'What is the Gram-Schmidt process? Give the formula for the first two orthonormal vectors.',
    a: 'Gram-Schmidt converts a linearly independent set {v₁, v₂, ..., vₙ} into an orthonormal set {e₁, e₂, ..., eₙ}. Step 1: u₁ = v₁, e₁ = u₁/‖u₁‖. Step 2: u₂ = v₂ − (v₂·e₁)e₁, e₂ = u₂/‖u₂‖. General step: uₖ = vₖ − Σᵢ₌₁ᵏ⁻¹ (vₖ·eᵢ)eᵢ. Each step removes the component of the new vector in the direction of all previous orthonormal vectors. Used in QR decomposition.',
  },
  {
    q: 'What is Singular Value Decomposition (SVD)? State the theorem.',
    a: 'Every m × n matrix A can be written as A = UΣVᵀ where: U is m × m orthogonal matrix (left singular vectors); Σ is m × n diagonal matrix with singular values σ₁ ≥ σ₂ ≥ ... ≥ 0 on diagonal; V is n × n orthogonal matrix (right singular vectors). The singular values are √(eigenvalues of AᵀA). Applications: low-rank approximation (data compression), PCA, pseudoinverse, least squares, image compression.',
  },
  {
    q: 'What is the difference between orthogonal and orthonormal vectors/matrices?',
    a: 'Orthogonal vectors: u · v = 0 (perpendicular, zero inner product). No constraint on length. Orthonormal vectors: u · v = 0 AND ‖u‖ = ‖v‖ = 1 (perpendicular AND unit length). Orthogonal matrix Q: columns are orthonormal, so QᵀQ = I (and QQᵀ = I if square). Key property: Qᵀ = Q⁻¹. Orthogonal matrices preserve lengths: ‖Qx‖ = ‖x‖. Examples: rotation matrices, reflection matrices.',
  },
]

const benefits = [
  {
    title: 'Every theorem and definition in seconds',
    body: 'Type "eigenvalue decomposition conditions", "properties of positive definite matrices", or "basis and dimension theorems" and get a targeted deck covering exactly what your exam will test.',
  },
  {
    title: 'Formulas with context, not bare equations',
    body: 'Cards include geometric interpretations, conditions for applicability, and worked examples. Understand why the rank-nullity theorem works, not just how to state it.',
  },
  {
    title: 'Upload your textbook or lecture notes',
    body: 'Turn Strang, Lay, Axler, or your professor\'s slides into a complete flashcard deck. AI extracts definitions, theorem statements, and key formulas automatically.',
  },
  {
    title: 'Spaced repetition for exam retention',
    body: 'SVD steps, orthogonality conditions, and matrix factorization algorithms that keep slipping resurface at exactly the right interval using SM-2 — so you stay sharp through finals.',
  },
]

export default function LinearAlgebraFlashcardsPage() {
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
                <span className="text-primary-600">Linear Algebra Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any topic — eigenvalues, matrix factorizations, vector spaces, SVD — and get a complete flashcard deck in seconds. Upload your textbook or lecture notes as a PDF for instant cards.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'Matrices & Determinants',
                  'Vector Spaces',
                  'Linear Transformations',
                  'Eigenvalues & Eigenvectors',
                  'Orthogonality',
                  'Matrix Factorizations',
                  'Systems of Equations',
                  'ML Applications',
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
                  Generate Linear Algebra Flashcards Free
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
                Master linear algebra in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From topic to a full deck of theorem and definition cards in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your linear algebra topic',
                  body: 'Enter anything — "eigenvalue decomposition step by step", "conditions for a matrix to be positive definite", "Gram-Schmidt orthogonalization" — or upload your Strang or Lay textbook as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates cards covering theorem statements, conditions, proof strategies, formulas with geometric interpretation, and applications — not just bare equations to memorize.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Definitions and theorem conditions that keep slipping resurface at exactly the right interval so they stick through your midterm, final, or qualifying exam.',
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
                Example linear algebra flashcards
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
                Generate Your Linear Algebra Deck Free
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
                Why math students choose Esli
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
                Linear algebra flashcard FAQs
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
              Ready to master linear algebra?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of students generating smarter math flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Linear Algebra Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Studying other math subjects?{' '}
              <a href="/flashcards/calculus" className="text-white underline hover:no-underline">
                Calculus flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/statistics" className="text-white underline hover:no-underline">
                statistics flashcards
              </a>{' '}
              are free too.
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
