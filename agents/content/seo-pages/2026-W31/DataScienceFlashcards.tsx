/**
 * SEO Landing Page: Data Science Flashcards
 * Route: /flashcards/data-science
 * Meta title: Data Science Flashcards Free — AI Generator | Esli (51 chars)
 * Meta description: Generate data science flashcards with AI. Python, pandas, SQL, statistics, ML — free, spaced repetition. No signup. (117 chars)
 * Target keywords: data science flashcards, pandas flashcards, SQL flashcards, statistics for data science, data science interview prep flashcards
 * Week: 2026-W31
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
      name: 'What data science topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates flashcards for any data science topic: Python (pandas, NumPy, scikit-learn, matplotlib), SQL (window functions, JOINs, CTEs, query optimization), statistics (distributions, hypothesis testing, A/B testing, Bayesian inference), machine learning (supervised/unsupervised, model evaluation, regularization), data visualization, feature engineering, data cleaning, probability theory, and data science interview prep. Type any topic or upload a textbook PDF and get a deck in seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do flashcards help with data science interview prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Data science interviews test exact definitions and distinctions under time pressure — exactly what spaced repetition flashcards are built for. Common interview flashcard topics: 'precision vs recall vs F1 — when to use each', 'bias-variance tradeoff', 'L1 vs L2 regularization geometry', 'Type I vs Type II error', 'when to use which SQL JOIN', 'pandas groupby vs merge vs pivot_table'. Generate a deck per topic area, study for 10 minutes daily for 2-3 weeks, and walk into interviews with instant recall.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload data science textbooks and course notes as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any data science resource — 'Python for Data Analysis' (Wes McKinney), 'Hands-On Machine Learning' (Géron), 'The Elements of Statistical Learning', fast.ai course notes, or your own lecture PDFs — and Esli extracts key concepts, function signatures, formulas, and best practices into a flashcard deck. This is especially useful for dense statistics or ML theory chapters where there are many formulas and conditions to internalize.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are good data science flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value prompt examples: 'SQL window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD — syntax and use cases', 'pandas: 10 most important DataFrame operations with examples', 'hypothesis testing: p-value, alpha, Type I/II error, statistical power — definitions and relationships', 'confusion matrix: TP/TN/FP/FN, precision, recall, F1, accuracy — when each matters', 'gradient descent variants: batch vs SGD vs mini-batch vs Adam — tradeoffs', 'feature engineering: encoding categorical variables — one-hot vs label vs target encoding'. Specific prompts produce exam-ready cards.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for data science students and self-learners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and community decks — no credit card required. Whether you are taking an online bootcamp, a university data science program, or self-studying through Kaggle and fast.ai, you can generate as many data science decks as you need. Guest mode means you can start immediately without signing up.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between supervised and unsupervised learning?',
    a: 'Supervised learning: training data is labeled (input-output pairs). Model learns a mapping from inputs to outputs. Tasks: classification (predict category — logistic regression, random forest, SVM), regression (predict continuous value — linear regression, XGBoost). Unsupervised learning: no labels. Model finds structure in unlabeled data. Tasks: clustering (group similar data — K-means, DBSCAN, hierarchical), dimensionality reduction (PCA, t-SNE, UMAP, autoencoders), anomaly detection (Isolation Forest, LOF). Semi-supervised: small labeled + large unlabeled dataset. Self-supervised: model generates its own labels (BERT, GPT pretraining via next-token prediction). Key decision factor: do you have labeled training data?',
  },
  {
    q: 'Explain SQL window functions and give 3 examples.',
    a: "Window functions: perform calculations across rows related to the current row without collapsing rows like GROUP BY. Syntax: FUNCTION() OVER (PARTITION BY col ORDER BY col [ROWS BETWEEN ...]). Examples: 1. ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY purchase_date) — assigns sequential row number per user's purchases. 2. LAG(amount, 1) OVER (ORDER BY date) — accesses the previous row's amount for period-over-period comparison. 3. SUM(revenue) OVER (PARTITION BY region ORDER BY month ROWS UNBOUNDED PRECEDING) — running total per region. Key use cases: ranking within groups, running totals, moving averages, comparing rows to adjacent rows. Cannot use in WHERE clause — wrap in subquery or CTE.",
  },
  {
    q: 'What is a confusion matrix? Define TP, TN, FP, FN and derived metrics.',
    a: 'Confusion matrix: 2x2 table for binary classification. True Positive (TP): predicted positive, actually positive. True Negative (TN): predicted negative, actually negative. False Positive (FP): predicted positive, actually negative (Type I error — false alarm). False Negative (FN): predicted negative, actually positive (Type II error — missed detection). Derived metrics: Accuracy = (TP+TN)/total — misleading with class imbalance. Precision = TP/(TP+FP) — of predicted positives, how many are correct (minimize false alarms). Recall/Sensitivity = TP/(TP+FN) — of actual positives, how many are caught (minimize misses). F1 = 2·(P·R)/(P+R) — harmonic mean. Use precision when FP cost is high (spam filter); use recall when FN cost is high (cancer screening, fraud detection).',
  },
  {
    q: 'What is the bias-variance tradeoff?',
    a: 'Bias-variance tradeoff: the fundamental tension in ML model generalization. Bias: error from wrong assumptions in the learning algorithm (e.g., using linear model for non-linear data). High bias → underfitting — model misses patterns even in training data. Variance: error from sensitivity to fluctuations in training data. High variance → overfitting — model memorizes training data, fails on new data. Total error = Bias² + Variance + Irreducible noise. Reducing bias often increases variance (and vice versa). Manage: increase bias/reduce variance with regularization (L1/L2), simpler model, more data. Reduce bias/allow more variance with complex model, less regularization, more features. Cross-validation helps estimate the right balance for your dataset.',
  },
  {
    q: 'What is the difference between Pearson and Spearman correlation?',
    a: 'Pearson correlation (r): measures strength of LINEAR relationship between two continuous variables. Range: -1 (perfect negative) to +1 (perfect positive). Assumptions: both variables approximately normally distributed, linear relationship, no extreme outliers. Formula: cov(X,Y)/(σx·σy). Spearman rank correlation (ρ): measures MONOTONIC (not necessarily linear) relationship. Calculated by ranking both variables and applying Pearson to the ranks. No normality assumption. Robust to outliers and skewed distributions. Works on ordinal data. Use Pearson: continuous data, normal distribution, linear relationship expected. Use Spearman: ordinal data, non-normal data, outliers present, monotonic but non-linear relationship. Example where they diverge: exponential relationship — Spearman ~1.0, Pearson < 1.0.',
  },
  {
    q: 'Explain L1 vs L2 regularization — geometry, effect, and when to use each.',
    a: 'Regularization adds a penalty to the loss function to discourage overfitting. L1 (Lasso): penalty = λ·Σ|wᵢ|. Geometry: diamond-shaped constraint region. Effect: drives some weights to exactly zero → sparse models, automatic feature selection. When to use: many features, suspect only a few matter, want interpretable sparse model. L2 (Ridge): penalty = λ·Σwᵢ². Geometry: circular constraint region. Effect: shrinks all weights toward zero but rarely exactly zero. When to use: many features that all contribute slightly, correlated features (Ridge handles multicollinearity better). Elastic Net: α·L1 + (1-α)·L2 — combines sparsity (L1) with multicollinearity handling (L2). Higher λ → stronger regularization → simpler model → higher bias, lower variance. Tune λ with cross-validation.',
  },
]

const benefits = [
  {
    title: 'Interview prep that actually works',
    body: 'Data science interviews test exact definitions under pressure. Generate decks for precision/recall tradeoffs, SQL window functions, probability theory, and ML concepts — then let spaced repetition wire them into instant recall before your interview.',
  },
  {
    title: 'Upload course notes and textbooks as PDFs',
    body: "Drop your 'Python for Data Analysis', 'Elements of Statistical Learning', or Kaggle course PDFs and get focused flashcard decks in seconds. Cover dense statistics and ML theory chapters without hours of manual summarizing.",
  },
  {
    title: 'From Python syntax to statistical theory',
    body: 'Generate cards at any depth: pandas one-liners you always forget, p-value definitions, gradient descent math, SQL JOIN mechanics, or model evaluation metrics. The AI matches card depth to your prompt.',
  },
  {
    title: 'Complements machine learning flashcards',
    body: 'Use alongside the ML flashcard set for complete coverage: data science covers Python, SQL, statistics, and EDA while ML covers algorithms, deep learning, and model architecture. Together they cover the full DS/ML interview prep surface.',
  },
]

export default function DataScienceFlashcardsPage() {
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
                <span className="text-primary-600">Data Science</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any data science topic — Python, pandas, SQL, statistics, ML evaluation — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Python & pandas', 'SQL', 'Statistics', 'ML Evaluation', 'Feature Engineering', 'Interview Prep', 'Probability Theory', 'Data Visualization'].map((tag) => (
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
                  Generate Data Science Flashcards Free
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
                Nail data science in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From Python syntax to statistical theory — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your data science topic',
                  body: 'Enter "SQL window functions with examples", "pandas groupby vs merge", or upload a chapter PDF from your data science textbook or course notes.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: "Esli creates cards covering syntax, definitions, tradeoffs, and when-to-use guidance — exactly the content data science interviews and courses test.",
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at optimal intervals — concepts you struggle with appear more often, building instant recall before interviews.',
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
                Example data science flashcards
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
                Generate Your Data Science Deck Free
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
                Why data science learners choose Esli
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
                Data science flashcard FAQs
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
              Start mastering data science today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any data science topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Data Science Flashcards Free
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
              <a href="/flashcards/machine-learning" className="hover:text-white transition-colors no-underline">Machine Learning Flashcards</a>
              <a href="/flashcards/python-programming" className="hover:text-white transition-colors no-underline">Python Flashcards</a>
              <a href="/flashcards/computer-science" className="hover:text-white transition-colors no-underline">Computer Science Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
