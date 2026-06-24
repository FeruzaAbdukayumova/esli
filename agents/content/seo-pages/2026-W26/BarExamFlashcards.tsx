/**
 * SEO Landing Page: Bar Exam Flashcards
 * Route: /flashcards/bar-exam
 * Meta title: Bar Exam Flashcards Free — AI Generator | Esli (49 chars)
 * Meta description: Generate MBE and state bar exam flashcards with AI. Constitutional law, contracts, torts — free, spaced repetition. (116 chars)
 * Target keywords: bar exam flashcards, MBE flashcards free, multistate bar exam prep flashcards, bar exam study cards, bar prep AI flashcards
 * Week: 2026-W26
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
      name: 'Can Esli help me study for the MBE specifically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate flashcard decks for each MBE subject: Civil Procedure, Constitutional Law, Contracts, Criminal Law and Procedure, Evidence, Real Property, and Torts. Type "MBE Constitutional Law equal protection" or "MBE Contracts offer and acceptance" and get high-yield Q&A cards covering the tested rules. You can also upload your Barbri or Themis outlines as PDFs and Esli will extract the key rules automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make flashcards from my bar prep outlines and notes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload any PDF — Barbri outlines, Themis summaries, Kaplan notes, your own handwritten summaries photographed or scanned — and Esli\'s AI parses the content and generates a complete flashcard deck. Each card is a self-contained rule statement, element list, or distinction question so you can quiz yourself immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for bar exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited bar exam flashcards, study with full spaced repetition, and access all features without a credit card or subscription. Commercial bar prep (Barbri, Themis, Kaplan) costs $3,000–$4,500 — Esli\'s AI flashcard tool is a powerful supplement at no cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for MEE (Multistate Essay Examination) prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The MEE tests 12 subjects including some not on the MBE — Business Associations, Conflict of Laws, Family Law, Secured Transactions, Trusts and Estates, and UCC Article 9. Generate topic-specific decks for each: "MEE Business Associations fiduciary duties", "MEE Trusts creation requirements". Esli covers the full bar, not just MBE subjects.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli compare to Barbri or Themis for bar prep flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Barbri and Themis are full bar prep courses with lectures, practice exams, and structured schedules — they include some flashcards but that\'s a small part of their value. Esli is a dedicated AI flashcard tool: unlimited generation, your own topics, your uploaded materials, and SM-2 spaced repetition. Most bar takers use Esli alongside a commercial course to reinforce rule memorisation — not as a replacement for the full program.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the elements of promissory estoppel under Restatement (Second) § 90?',
    a: '(1) A clear and definite promise; (2) promisor reasonably expected reliance; (3) promisee actually and reasonably relied; (4) promisee suffered a detriment; (5) enforcement is necessary to avoid injustice. Damages may be limited to reliance interest.',
  },
  {
    q: 'When does strict scrutiny apply under Equal Protection, and what must the government show?',
    a: 'Strict scrutiny applies to laws targeting suspect classifications (race, national origin) or fundamental rights (voting, interstate travel, privacy). Government must show the law is necessary to achieve a compelling government interest and narrowly tailored to that end. Rarely survives.',
  },
  {
    q: 'What is the Parol Evidence Rule, and what are its main exceptions?',
    a: 'A fully integrated written contract cannot be contradicted or supplemented by prior or contemporaneous oral/written agreements. Exceptions: fraud, duress, illegality, mistake, condition precedent to formation, ambiguity, or to show the writing is not the final agreement.',
  },
  {
    q: 'State the elements of adverse possession using the OCEAN mnemonic.',
    a: 'Open and notorious; Continuous for the statutory period; Exclusive; Adverse/hostile (without the owner\'s permission); and Notorious (visible to a reasonable person inspecting the land). Many states also require "claim of right." Successful adverse possession transfers title by operation of law.',
  },
  {
    q: 'What is the difference between general and specific intent crimes?',
    a: 'Specific intent requires the defendant to have a subjective purpose to achieve a specific result (e.g., larceny requires intent to permanently deprive). General intent requires only intent to do the prohibited act (e.g., battery). Voluntary intoxication negates specific intent; it is no defense to general intent crimes.',
  },
  {
    q: 'Under FRE, what is hearsay, and name three categorical exceptions that apply regardless of declarant availability.',
    a: 'Hearsay = out-of-court statement offered to prove the truth of the matter asserted (FRE 801). Three FRE 803 exceptions (declarant availability irrelevant): Present sense impression (803(1)); Excited utterance (803(2)); Business records (803(6)). Note: opposing party admissions under FRE 801(d)(2) are definitionally not hearsay.',
  },
]

const benefits = [
  {
    title: 'All 7 MBE subjects covered',
    body: 'Generate decks for Contracts, Torts, Con Law, Evidence, Civil Procedure, Criminal Law, and Real Property — or all 12 MEE subjects.',
  },
  {
    title: 'Upload your bar prep outlines',
    body: 'Turn Barbri, Themis, or Kaplan outlines into flashcard decks automatically. AI extracts black-letter rules, elements, and distinctions.',
  },
  {
    title: 'SM-2 spaced repetition',
    body: 'The algorithm maximises long-term retention — rules resurface at the optimal moment so you remember them on exam day, not just the night before.',
  },
  {
    title: 'Study anywhere, free forever',
    body: 'Phone, tablet, laptop — no subscription, no credit card. Most bar takers supplement commercial courses with Esli to drill rule memorisation.',
  },
]

export default function BarExamFlashcardsPage() {
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
                <span className="text-primary-600">Bar Exam Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any MBE or MEE topic and get a complete deck of rule-statement flashcards in seconds. Upload your Barbri or Themis outlines and Esli extracts the black-letter rules automatically. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['MBE Contracts', 'Constitutional Law', 'Torts', 'Evidence', 'Civil Procedure', 'Real Property', 'Criminal Law', 'MEE Subjects'].map((tag) => (
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
                  Generate Bar Exam Flashcards Free
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
                Bar prep flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From outline to study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your bar topic or upload PDF',
                  body: 'Enter any MBE subject and subtopic — "hearsay exceptions FRE", "promissory estoppel elements" — or upload your Barbri/Themis outline.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates rule-statement cards',
                  body: 'Esli creates precise Q&A cards for each black-letter rule, element test, and key distinction you need to know for the exam.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Drill with spaced repetition',
                  body: 'SM-2 ensures the rules you struggle with resurface more often. You retain more rules with less total study time — critical with a packed bar prep schedule.',
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
                Example bar exam flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
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
                Generate Your Bar Exam Deck Free
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
                Why bar candidates choose Esli
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
                Bar exam flashcard FAQs
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
              Ready to pass the bar?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate unlimited bar exam flashcards from any topic or outline. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Bar Exam Flashcards Free
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
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href="/use-case/law-students" className="hover:text-white transition-colors no-underline">AI for Law Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
