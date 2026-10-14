/**
 * SEO Landing Page: AI Flashcards for Medical Residency
 * Route: /use-case/medical-residency
 * Meta title: AI Flashcards for Medical Residency — USMLE Step 3 | Esli
 * Meta description: Generate medical residency and USMLE Step 3 flashcards with AI.
 *   Clinical decisions, IM, surgery — free, spaced repetition. No signup needed.
 * Target keywords: medical residency flashcards, USMLE Step 3 flashcards, intern year flashcards,
 *   clinical decision flashcards, residency study cards, USMLE Step 3 CCS flashcards,
 *   intern year study tools, emergency medicine flashcards residency
 * Week: 2026-W42
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
      name: 'Are medical residency flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited medical residency and USMLE Step 3 flashcards with AI — clinical reasoning, internal medicine, surgery, pediatrics, emergency medicine — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What residency topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any residency topic: USMLE Step 3 (biostats, preventive medicine, ethics, CCS clinical cases), internal medicine (cardiology, pulmonology, nephrology, GI, ID, rheumatology), emergency medicine (ACLS protocols, tox, trauma), surgery (pre/post-op management, acute abdomen), pediatrics (developmental milestones, pediatric emergencies), obstetrics/gynecology, neurology, and specialty board prep (ABIM, ABEM, ABS, ABP).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with USMLE Step 3 prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'USMLE Step 3 tests clinical decision-making, management, and patient follow-up — not just knowledge recall. Type any Step 3 topic — "next best step chest pain management", "ACLS pulseless VT algorithm", "sepsis bundle 6-hour", "when to transfuse RBCs" — and Esli generates cards focused on the clinical reasoning Step 3 tests. Upload UWorld explanations, First Aid for Step 3, or attending notes PDFs and Esli converts them into a targeted deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do residents use flashcards instead of just practicing clinically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Residency is 60-80 hours per week of clinical work — but boards require systematic knowledge retention across all specialties, not just your current rotation. Spaced repetition keeps knowledge from prior rotations from decaying during long call stretches. Flashcards are also perfect for the 5-10 minute pockets of time residents actually have: between cases, waiting for labs, riding the elevator. Esli works offline and on mobile so it fits into those gaps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for specialty board prep (ABIM, ABEM, ABS)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ABIM (internal medicine boards), ABEM (emergency medicine), ABS (surgery), ABP (pediatrics), and ABOG (ob-gyn) all test clinical reasoning and management algorithms. Type any specialty topic or upload your review materials PDF and Esli generates targeted cards. Spaced repetition builds the long-term retention that months of clinical work doesn\'t automatically provide — especially for subspecialty areas outside your daily practice.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the initial management of sepsis within the first hour (Sepsis-3)?',
    a: 'Hour-1 Bundle (Sepsis-3): (1) Measure lactate — if >2 mmol/L, repeat within 2h. (2) Blood cultures x2 before antibiotics. (3) Broad-spectrum antibiotics immediately. (4) 30 mL/kg crystalloid IV bolus for hypotension or lactate ≥4. (5) Vasopressors (norepinephrine first-line) for MAP <65 after fluids. Key USMLE point: cultures BEFORE antibiotics, but antibiotics within 1 hour of sepsis recognition — don\'t delay antibiotics waiting for cultures.',
  },
  {
    q: 'What are the ACLS algorithm steps for pulseless ventricular tachycardia (VT)?',
    a: 'Pulseless VT = shockable rhythm. (1) CPR until defibrillator ready. (2) Defibrillate: 200J biphasic (360J monophasic). (3) Resume CPR immediately for 2 minutes. (4) Epinephrine 1mg IV/IO every 3-5 minutes. (5) Defibrillate again. (6) Amiodarone 300mg IV (or lidocaine 1-1.5 mg/kg) for refractory VF/VT. (7) Identify and treat reversible causes (H\'s and T\'s). Check pulse every 2 minutes only during rhythm check.',
  },
  {
    q: 'What is the next best step for a patient with new ST-elevation MI (STEMI)?',
    a: 'STEMI management (time = myocardium): (1) Activate cath lab — primary PCI is goal within 90 min of first medical contact (door-to-balloon). (2) Aspirin 325mg chewed immediately. (3) P2Y12 inhibitor (ticagrelor or clopidogrel) loading dose. (4) Anticoagulation (heparin, bivalirudin, or enoxaparin). (5) IV beta-blocker if no contraindications. If PCI not available within 120 min: thrombolytics within 30 min (door-to-needle). Do NOT delay PCI for echo or troponin confirmation.',
  },
  {
    q: 'What are the criteria for acute respiratory distress syndrome (ARDS)?',
    a: 'Berlin Definition (2012): (1) Timing: within 1 week of known clinical insult or new/worsening respiratory symptoms. (2) Chest imaging: bilateral opacities not fully explained by effusions, lobar collapse, or nodules. (3) Origin: not fully explained by cardiac failure or fluid overload. (4) Oxygenation: PaO₂/FiO₂ ratio with PEEP ≥5 cmH₂O — mild: 200-300, moderate: 100-200, severe: <100. Management: lung-protective ventilation (tidal volume 6 mL/kg IBW, plateau pressure <30 cmH₂O), prone positioning for severe ARDS.',
  },
  {
    q: 'What is the next step for a patient with suspected pulmonary embolism (PE)?',
    a: 'Wells Score first: ≤4 = low-moderate probability → D-dimer; if negative, PE excluded. >4 = high probability → CT pulmonary angiography (CTPA) directly. Hemodynamically unstable → systemic thrombolytics (tPA) or surgical embolectomy. Stable, confirmed PE: anticoagulate (LMWH or direct oral anticoagulants). Massive PE with RV strain but stable: consider catheter-directed thrombolytics. Do NOT delay anticoagulation to confirm with imaging in high-probability patients.',
  },
  {
    q: 'What are the indications for red blood cell (RBC) transfusion?',
    a: 'General thresholds (AABB guidelines): Hgb <7 g/dL in stable, non-bleeding hospitalized patients (restrictive strategy). Hgb <8 g/dL in patients with symptomatic coronary artery disease or orthopedic surgery. Symptomatic anemia (tachycardia, hypotension, dyspnea) at any Hgb level. Active bleeding with hemodynamic instability regardless of Hgb. ACS: maintain Hgb >8. Transfuse 1 unit pRBC at a time, recheck Hgb, reassess symptoms — "transfuse to symptoms, not a number."',
  },
]

const benefits = [
  { title: 'Built for residents with no time', body: 'Five minutes between cases is enough. Esli on mobile lets you drill critical management algorithms, board-tested differentials, and clinical reasoning cards in the pockets of time residency actually gives you.' },
  { title: 'USMLE Step 3 CCS and MCQ covered', body: 'Type any Step 3 management algorithm — "next best step", "when to transfuse", "sepsis bundle" — and Esli generates cards that mirror how Step 3 tests clinical decision-making, not just pathophysiology recall.' },
  { title: 'Upload your UWorld notes or rotation materials', body: 'Turn your UWorld explanations, attending handouts, or specialty review book into a targeted flashcard deck. Upload the PDF and Esli does the extraction.' },
  { title: 'Retain across rotations', body: 'SM-2 spaced repetition keeps your cardiology knowledge from evaporating during three months of surgery, and vice versa. Boards test everything — Esli keeps everything in working memory.' },
]

export default function MedicalResidencyFlashcardsPage() {
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
                <span className="text-primary-600">Medical Residents</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate clinical decision flashcards with AI in seconds. USMLE Step 3, internal medicine, emergency medicine, specialty boards — built for residency schedules.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['USMLE Step 3', 'Sepsis Bundle', 'ACLS Algorithms', 'STEMI Management', 'ARDS Criteria', 'PE Workup', 'Transfusion Thresholds', 'Board Prep'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Residency Flashcards Free
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
                Board-ready clinical knowledge in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From sepsis bundles to specialty board algorithms — in the time you have between patients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your clinical topic',
                  body: 'Enter any management algorithm — "ACLS pulseless VT", "ARDS lung protective ventilation", "PE Wells Score next step" — or upload your UWorld notes or board review PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli generates cards focused on the next-best-step clinical reasoning that boards test — not just pathophysiology, but when to do what, in what order, and why.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study in 5-minute pockets',
                  body: 'SM-2 spaced repetition on mobile. Between cases, on call, waiting for labs. Retain clinical knowledge across all rotations and build toward boards every day.',
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
                Example residency flashcards
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
                Generate Your Residency Deck Free
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
                Why residents choose Esli
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
                Medical residency flashcard FAQs
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
              Ready to ace your boards during residency?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate clinical decision flashcards with AI — USMLE Step 3, IM, EM, surgery — free, with spaced repetition. Study in 5-minute pockets, retain across rotations.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Residency Flashcards Free
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
              <a href="/flashcards/nclex" className="hover:text-white transition-colors no-underline">NCLEX Flashcards</a>
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">Medical Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
