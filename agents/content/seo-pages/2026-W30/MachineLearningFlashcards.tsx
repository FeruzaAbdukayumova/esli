/**
 * SEO Landing Page: Machine Learning Flashcards
 * Route: /flashcards/machine-learning
 * Meta title: Machine Learning Flashcards Free — AI | Esli (51 chars)
 * Meta description: Generate machine learning flashcards with AI. Supervised, unsupervised, deep learning, math — free, spaced repetition. No signup. (132 chars)
 * Target keywords: machine learning flashcards, AI concepts flashcards, deep learning study cards, ML interview prep flashcards, data science flashcards
 * Week: 2026-W30
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
      name: 'Can Esli generate machine learning flashcards for interview prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. ML interview prep is one of the best use cases for AI-generated flashcards. Prompt Esli with 'Bias-variance tradeoff explanation for ML interviews', 'L1 vs L2 regularization', 'Common ML interview questions on gradient descent', 'Precision vs recall vs F1 score', 'Decision tree vs random forest vs gradient boosting' — and get structured Q&A cards ready for spaced repetition review. You can also upload course PDFs from fast.ai, deeplearning.ai, or Stanford CS229.",
      },
    },
    {
      '@type': 'Question',
      name: 'What machine learning topics work best for flashcard study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value ML flashcard topics: foundational concepts (supervised vs unsupervised vs reinforcement learning, train/val/test split, overfitting/underfitting), model evaluation metrics (accuracy, precision, recall, AUC-ROC, RMSE), algorithms (linear regression, logistic regression, decision trees, SVMs, k-means, PCA), deep learning (backpropagation, activation functions, CNNs, RNNs, transformers, attention mechanism), math foundations (gradient descent, chain rule, matrix multiplication, probability). Flashcards work especially well for definitions, formulas, and comparing similar concepts.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload a machine learning textbook or research paper to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any ML PDF — 'Hands-On Machine Learning' (Geron), 'Pattern Recognition and Machine Learning' (Bishop), Stanford CS229 lecture notes, fast.ai course materials, or even arXiv papers — and Esli extracts the key concepts, algorithms, formulas, and definitions into a structured flashcard deck. This is particularly useful for dense mathematical material that's hard to summarize manually.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I study deep learning concepts with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Prompt Esli with specific deep learning subtopics: 'Transformer architecture: self-attention, multi-head attention, positional encoding', 'Convolutional neural networks: convolution, pooling, feature maps, receptive field', 'Vanishing gradient problem: causes and solutions (ReLU, batch norm, residual connections)', 'Backpropagation: chain rule applied to neural networks step by step', 'Regularization in deep learning: dropout, batch normalization, L2 weight decay'. Build one deck per topic for focused review.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for machine learning students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and no signup required. Generate as many ML decks as you need and study with the SM-2 spaced repetition algorithm. Guest mode means you can start studying immediately without creating an account. The browser extension also lets you capture ML concepts from any webpage — documentation, blog posts, papers — and convert them to flashcards.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the bias-variance tradeoff in machine learning?',
    a: "Bias: error from overly simplistic assumptions — model underfits the data (high training AND test error). Variance: error from excessive sensitivity to training data — model overfits (low training error, high test error). The tradeoff: reducing bias typically increases variance and vice versa. Goal: find the sweet spot with low total error = bias² + variance + irreducible noise. Solutions: regularization reduces variance; more expressive models reduce bias; ensembles (bagging reduces variance, boosting reduces bias).",
  },
  {
    q: 'What is the difference between precision and recall?',
    a: "Precision: of all instances the model predicted as positive, what fraction were actually positive? Precision = TP / (TP + FP). Optimizing for precision: minimizes false positives. Recall (Sensitivity): of all actually positive instances, what fraction did the model correctly identify? Recall = TP / (TP + FN). Optimizing for recall: minimizes false negatives. F1 score = harmonic mean of precision and recall. Use case: spam detection (high precision); cancer screening (high recall). The precision-recall tradeoff is controlled by the classification threshold.",
  },
  {
    q: 'Explain gradient descent and its variants.',
    a: "Gradient descent: iteratively update parameters θ in the direction of steepest descent of the loss function. θ = θ - α∇L(θ), where α is the learning rate. Variants: Batch GD — compute gradient over entire dataset (accurate but slow for large data). Stochastic GD (SGD) — one sample per update (fast, noisy, can escape local minima). Mini-batch GD — small batch (16-512 samples) per update — best of both (most common). Adaptive methods: Adam (momentum + adaptive learning rate), RMSProp, AdaGrad. Learning rate too high → divergence; too low → slow convergence.",
  },
  {
    q: 'What is the transformer architecture and what problem does self-attention solve?',
    a: "Transformer (Vaswani et al., 2017 'Attention Is All You Need'): encoder-decoder architecture using self-attention instead of recurrence. Problem solved: RNNs process sequences sequentially — slow to train, can't parallelize, struggle with long-range dependencies. Self-attention: each token attends to all other tokens simultaneously, computing weighted sums based on Query-Key-Value dot products. Scaled dot-product attention: Attention(Q,K,V) = softmax(QKᵀ/√dk)V. Multi-head attention: run h attention heads in parallel to capture different relationships. Foundation of BERT, GPT, T5, LLaMA.",
  },
  {
    q: 'What is the difference between L1 and L2 regularization?',
    a: "L1 regularization (Lasso): adds λΣ|wᵢ| to the loss. Effect: produces sparse solutions — many weights become exactly zero (feature selection). Useful when you suspect many features are irrelevant. Geometry: diamond-shaped constraint — corners at axes encourage zeros. L2 regularization (Ridge): adds λΣwᵢ² to the loss. Effect: shrinks all weights toward zero but rarely exactly zero (weight decay). Useful when all features contribute somewhat. Geometry: circular constraint — smooth shrinkage. Elastic Net: combines L1 + L2. Rule of thumb: L2 for most problems; L1 when you need feature selection.",
  },
  {
    q: 'What is overfitting, and what are the main strategies to prevent it?',
    a: "Overfitting: model learns the training data too well — memorizes noise instead of learning generalizable patterns. Signs: low training loss, high validation loss. Strategies to prevent: 1. More training data (most reliable fix). 2. Reduce model complexity (fewer parameters, shallower network). 3. Regularization: L1/L2 weight penalties, dropout (randomly zero out neurons during training). 4. Early stopping: halt training when validation loss stops improving. 5. Data augmentation: artificially expand training set (flip, crop, noise). 6. Cross-validation: ensure evaluation on held-out data.",
  },
]

const benefits = [
  {
    title: 'ML interview prep — the most in-demand use case',
    body: 'Generate targeted decks for each interview topic: "bias-variance tradeoff", "regularization techniques", "model evaluation metrics", "ensemble methods", "neural network architecture". Most interviewers draw from a predictable pool — flashcards let you cover it systematically.',
  },
  {
    title: 'Math foundations made reviewable',
    body: 'Matrix calculus, probability, linear algebra, information theory — the math behind ML is vast. Generate cards for specific identities, proofs, and intuitions. Upload your math notes or textbook chapters and get cards that drill the core formulas.',
  },
  {
    title: 'Upload course materials and research papers',
    body: 'Upload fast.ai notebooks, Stanford CS229 slides, deeplearning.ai PDFs, or arxiv papers. Esli extracts the key concepts and definitions into a structured deck — no manual card writing required.',
  },
  {
    title: 'Covers all levels: foundations to state of the art',
    body: 'From logistic regression and k-means to transformers, diffusion models, and RLHF — generate decks calibrated to your current level and the specific role you are preparing for.',
  },
]

export default function MachineLearningFlashcardsPage() {
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
                <span className="text-primary-600">Machine Learning</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any ML topic — supervised learning, deep learning, transformers, interview prep — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Supervised Learning', 'Deep Learning', 'Transformers', 'Model Evaluation', 'Regularization', 'Interview Prep', 'Neural Networks', 'Statistics & Math'].map((tag) => (
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
                  Generate ML Flashcards Free
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
                Master machine learning in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From course notes to interview prep — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your ML topic',
                  body: 'Enter "Gradient descent variants: batch, SGD, mini-batch, Adam", "Transformer architecture and self-attention", or upload CS229 slides or fast.ai notebooks as PDFs.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering algorithms, formulas, intuitions, and comparisons — structured for ML interview preparation or course exam review.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at optimal intervals, ensuring hard concepts like backpropagation math get reviewed more often than basics you already know.',
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
                Example machine learning flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
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
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      flippedCard === i ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-snug">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-start justify-start p-5 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{card.a}</p>
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
                Generate Your ML Deck Free
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
                Why ML engineers and students choose Esli
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
                Machine learning flashcard FAQs
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
              Start mastering machine learning today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any ML topic in seconds. Free forever — no credit card required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate ML Flashcards Free
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
              <a href="/flashcards/computer-science" className="hover:text-white transition-colors no-underline">CS Flashcards</a>
              <a href="/flashcards/python-programming" className="hover:text-white transition-colors no-underline">Python Flashcards</a>
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
