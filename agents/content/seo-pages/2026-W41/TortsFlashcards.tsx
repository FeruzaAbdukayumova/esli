/**
 * SEO Landing Page: Torts Flashcards
 * Route: /flashcards/torts
 * Meta title: Torts Flashcards Free — MBE Prep AI | Esli
 * Meta description: Generate torts and MBE negligence flashcards with AI. Elements, defenses,
 *   strict liability — free, spaced repetition. No signup needed.
 * Target keywords: torts flashcards, MBE torts flashcards, negligence elements flashcards,
 *   tort law flashcards, products liability flashcards, intentional torts flashcards, bar exam torts
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
      name: 'Are torts flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited torts flashcards with AI — negligence elements, intentional torts, strict liability, products liability, defamation, MBE torts — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What torts topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any torts topic: negligence (duty, breach, causation, damages), intentional torts (battery, assault, false imprisonment, IIED, trespass), strict liability (abnormally dangerous activities, animals), products liability (manufacturing defect, design defect, failure to warn), defamation (libel, slander, public vs. private figure), nuisance, economic torts, and all MBE torts subtopics.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with MBE torts prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any MBE torts subtopic — "negligence per se", "res ipsa loquitur", "proximate cause", "Palsgraf foreseeability", "comparative vs contributory negligence" — and Esli generates flashcards focused on the tested rule. You can also upload your bar prep outline PDF and Esli turns it into a targeted deck. Spaced repetition ensures you retain the distinctions that matter on exam day.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between negligence and strict liability on the MBE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Negligence requires proving a duty of care, breach of that duty, actual and proximate causation, and damages — fault must be shown. Strict liability imposes liability without fault for abnormally dangerous activities (Restatement factors) and for keeping wild animals or domesticated animals with known dangerous propensities. Products liability can be brought under either theory. Esli generates cards that drill these distinctions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to study torts for law school exams (not just the bar)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Upload your casebook notes or syllabus PDF and Esli generates flashcards covering the cases and rules you need to know. You can type specific topics like "Palsgraf proximate cause", "Rylands v Fletcher strict liability", "res ipsa loquitur elements", or "learned intermediary doctrine" and get targeted cards for your 1L torts final.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the four elements of a negligence claim?',
    a: 'Duty: defendant owed a legal duty of care to the plaintiff. Breach: defendant failed to meet the standard of care (what a reasonable person would do). Causation: actual cause (but-for) + proximate cause (foreseeable harm). Damages: plaintiff suffered legally cognizable harm. All four must be proven; absence of any one element defeats the claim.',
  },
  {
    q: 'What is res ipsa loquitur and when does it apply?',
    a: 'Latin for "the thing speaks for itself." Allows inference of negligence without direct evidence when: (1) the accident is the kind that ordinarily does not occur without negligence, (2) defendant had exclusive control over the instrumentality, and (3) plaintiff did not contribute. Classic example: surgical sponge left in a patient. Shifts burden of production, not persuasion.',
  },
  {
    q: 'What are the elements of battery?',
    a: 'Battery = intentional harmful or offensive contact with the plaintiff\'s person. Elements: (1) intent to cause contact or apprehension (transferred intent applies), (2) harmful or offensive contact (objective "reasonable person" standard for "offensive"), (3) with plaintiff\'s person (includes anything connected to the body). No physical injury required — dignitary harm suffices.',
  },
  {
    q: 'What is the difference between strict liability for products and negligence?',
    a: 'Products liability (strict liability): plaintiff does not need to prove how the defendant was negligent — just that the product was defective (manufacturing, design, or warning defect) and the defect caused harm. Negligence: plaintiff must identify the specific act of carelessness. Strict liability is easier to prove but requires showing a defect; negligence can reach a broader range of conduct.',
  },
  {
    q: 'What is the Palsgraf rule for proximate cause?',
    a: 'Palsgraf v. Long Island Railroad (Cardozo majority): a defendant owes a duty only to foreseeable plaintiffs within the zone of foreseeable danger — not to anyone who might conceivably be affected. If harm to this plaintiff was not foreseeable, there is no duty. Andrews dissent (minority): once negligence is shown, defendant is liable for all direct consequences. Most MBE questions follow Cardozo.',
  },
  {
    q: 'What is the difference between comparative and contributory negligence?',
    a: 'Contributory negligence (minority): plaintiff\'s own negligence, however slight, completely bars recovery. Pure comparative fault: plaintiff recovers reduced by their % of fault (even if 99% at fault). Modified comparative fault (50% rule, majority): plaintiff recovers if their fault is less than 50%; bars recovery at 50% or more. Know the jurisdiction rule — MBE tests all three.',
  },
]

const benefits = [
  { title: 'MBE torts distinctions drilled', body: 'The bar tests fine distinctions — negligence vs. recklessness, strict liability vs. products liability, transferred intent, Palsgraf vs. Andrews. Esli builds cards that isolate exactly what the MBE tests.' },
  { title: 'Upload your bar outline', body: 'Upload your BARBRI, Themis, or Adaptibar torts outline PDF and Esli extracts the rules, elements, and exceptions into a targeted flashcard deck.' },
  { title: 'Remember what you\'re forgetting', body: 'SM-2 spaced repetition surfaces cards right before you forget them — so you spend time on the rules you actually need, not ones you already know.' },
  { title: 'Works for 1L and bar prep', body: 'Whether you\'re studying Prosser & Keeton for your 1L final or drilling MBE subjects for the bar, Esli adapts to any torts topic you throw at it.' },
]

export default function TortsFlashcardsPage() {
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
                <span className="text-primary-600">Torts Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any torts topic and get a complete flashcard deck in seconds. Negligence elements, intentional torts, strict liability, MBE prep — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Negligence Elements', 'Intentional Torts', 'Strict Liability', 'Products Liability', 'MBE Prep', 'Defamation', 'Res Ipsa Loquitur', 'Proximate Cause'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Torts Flashcards Free
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
                Bar-ready torts knowledge in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From negligence elements to MBE distinctions — faster than re-reading your outline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your torts topic',
                  body: 'Enter any rule — "negligence elements", "strict liability abnormally dangerous activities", "transferred intent", "Palsgraf foreseeability" — or upload your bar outline PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli generates Q&A cards covering elements, exceptions, leading cases, and the MBE distinctions examiners love to test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces the rules you\'re forgetting before exam day. Lock in the distinctions — comparative vs. contributory, duty to whom, defect types.',
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
                Example torts flashcards
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
                Generate Your Torts Deck Free
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
                Why law students choose Esli for torts
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
                Torts flashcard FAQs
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
              Ready to master torts for the bar?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate torts flashcards with AI — negligence, strict liability, intentional torts, MBE prep — free, with spaced repetition. Build the rules that actually stick.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Torts Flashcards Free
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
              <a href="/flashcards/bar-exam" className="hover:text-white transition-colors no-underline">Bar Exam Flashcards</a>
              <a href="/flashcards/constitutional-law" className="hover:text-white transition-colors no-underline">Constitutional Law</a>
              <a href="/use-case/law-students" className="hover:text-white transition-colors no-underline">Law Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
