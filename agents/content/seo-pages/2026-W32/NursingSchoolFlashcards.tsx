/**
 * SEO Landing Page: Nursing School Flashcards
 * Route: /flashcards/nursing-school
 * Meta title: Nursing School Flashcards Free — AI Generator | Esli (55 chars)
 * Meta description: Generate nursing school flashcards with AI. ATI, HESI, NCLEX prep, med-surg, pharm — free, spaced repetition. No signup. (126 chars)
 * Target keywords: nursing school flashcards, ATI TEAS flashcards, HESI exam flashcards, nursing study cards, nursing school study app
 * Week: 2026-W32
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
      name: 'What nursing school topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates nursing school flashcards for every course and exam: ATI TEAS (reading, math, science, English), HESI A2 (anatomy, physiology, biology, chemistry), fundamentals (nursing process, ADPIE, vital signs, SBAR), med-surg (cardiac, respiratory, GI, renal, neuro), pharmacology (drug classes, MOA, side effects, nursing considerations), OB/maternity (labor stages, postpartum complications, newborn assessment), pediatrics (growth milestones, common illnesses, immunizations), mental health (therapeutic communication, DSM disorders, medications), and leadership/management (delegation, chain of command, quality improvement). Upload any textbook chapter or study guide PDF for instant decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with ATI and HESI exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ATI and HESI exams test specific content knowledge under time pressure — the exact scenario where spaced repetition flashcards excel. Generate targeted decks: "ATI TEAS science: human body systems and cell biology", "HESI A2: anatomy and physiology major systems", "ATI pharmacology: priority drug classes and nursing actions". The AI creates cards at the right depth — not too shallow, not overwhelming — and spaced repetition surfaces the concepts you keep missing. Students who study 15-20 minutes daily for 3-4 weeks consistently outperform those who cram the night before.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload nursing textbooks and syllabi as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any nursing resource — your Fundamentals of Nursing textbook (Taylor, Kozier), Pharmacology and the Nursing Process (Lilley), your professor's PowerPoint slides exported as PDF, or ATI study modules — and Esli extracts key concepts, drug names, nursing interventions, and critical safety information into a flashcard deck. This is especially useful for pharmacology chapters with dozens of drug class tables, and for NCLEX-style priority frameworks that need to become instinctive.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best nursing school flashcard prompts to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value nursing school prompts: 'NCLEX priority frameworks: ABCs, Maslow, safety — when to apply each in triage questions', 'Med-surg cardiac: heart failure signs, symptoms, medications, and nursing interventions', 'Pharmacology: top 50 NCLEX drugs — drug class, mechanism, key side effects, patient teaching', 'OB: four stages of labor with expected duration, nursing assessment, and complications to watch for', 'Delegation rules: what can and cannot be delegated to LPN/LVN vs NAP vs RN', 'Lab values: critical vs normal ranges — sodium, potassium, glucose, ABGs, CBC — and nursing actions'. Specific topic prompts produce better cards than generic prompts like 'nursing'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for nursing students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition scheduling, and access to community decks — no credit card required. Whether you are in your first semester fundamentals course or preparing for NCLEX after graduation, you can generate unlimited nursing school decks at no cost. Guest mode lets you start immediately without even creating an account, which is helpful when you need cards fast before an exam.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the nursing process (ADPIE) and what happens at each step?',
    a: 'ADPIE: the systematic framework for clinical decision-making. Assessment: collect subjective (patient reports) and objective (vitals, labs, physical exam) data. Diagnosis: identify actual and risk nursing diagnoses using NANDA format (problem + related to + as evidenced by). Planning: set SMART goals with the patient; prioritize using Maslow and ABCs. Implementation: carry out the plan — administer meds, perform interventions, educate patient. Evaluation: compare outcomes to goals; revise the plan if goals unmet. Ongoing and cyclical, not linear. Priority order on NCLEX: always assess before intervening, and always implement ABCs before psychosocial needs.',
  },
  {
    q: 'What is the SBAR communication framework in nursing?',
    a: 'SBAR: standardized communication tool for handoff, physician calls, and urgent situations. Situation: what is happening right now? ("Mr. Chen in Rm 4 is in acute respiratory distress.") Background: relevant history and context ("He is a 67-year-old post-op day 2 cholecystectomy, COPD history, on 2L O2 at baseline.") Assessment: your clinical interpretation ("His O2 sat has dropped to 88% on 4L NC, RR 28, using accessory muscles — I think he may be developing pneumonia or PE.") Recommendation: what you need ("I need you to come evaluate him now; I am requesting a CXR and ABG, and considering escalating to non-rebreather mask.") Practice SBAR until it is automatic — improves patient safety and physician responsiveness.',
  },
  {
    q: 'What are the 8 rights of medication administration?',
    a: 'The 8 Rights (expanded from original 5): 1. Right patient — verify 2 identifiers (name + DOB or MRN). 2. Right drug — check 3 times: when removing from storage, when preparing, before administering. 3. Right dose — calculate independently; question if it seems unusual. 4. Right route — oral, IV, IM, SQ, topical, etc.; route matters for absorption and safety. 5. Right time — check frequency and last dose; some drugs have strict timing (anticoagulants, insulin). 6. Right documentation — chart immediately after giving, never before. 7. Right reason — know why the patient is receiving this medication. 8. Right response — assess expected and adverse effects after administration. NEVER administer a med you did not prepare yourself.',
  },
  {
    q: 'Explain Maslow\'s hierarchy of needs in a nursing priority context.',
    a: "Maslow's hierarchy applied to nursing priority (bottom = highest priority): 1. Physiological — oxygenation (airway, breathing), circulation, fluids/electrolytes, nutrition, elimination, pain management. ALWAYS the first priority. 2. Safety — fall prevention, infection control, medication safety, environmental hazards. 3. Love/Belonging — therapeutic relationship, family visitation, isolation prevention. 4. Esteem — patient autonomy, dignity, preserving independence, education. 5. Self-actualization — meaning, purpose, end-of-life goals, spiritual care. NCLEX tip: if a patient has both a physiological AND psychosocial need, always address the physiological first — unless the physiological need is already stable, in which case move to safety. Exception: imminent safety threats (fall risk, suicidal ideation) can override stable physiological needs.",
  },
  {
    q: 'What can and cannot be delegated to an NAP (nursing assistant/patient care tech)?',
    a: "Delegation 5 rights: right task, right circumstance, right person, right directions, right supervision. CAN delegate to NAP: ADLs (bathing, oral care, ambulation assistance), vital sign collection for stable patients, measuring I&O, repositioning, feeding assistance for patients without dysphagia risk. CANNOT delegate to NAP: assessment (the RN always assesses, even if NAP collected data), nursing diagnosis, care planning, patient education, medication administration, care for unstable/newly admitted patients, tasks requiring clinical judgment. Key principle: delegate tasks, never responsibility — the RN remains accountable for the outcome. When in doubt: if it requires nursing judgment, it stays with the RN.",
  },
  {
    q: 'What are the classic signs/symptoms of heart failure (left vs right sided)?',
    a: "Left-sided heart failure (most common; back up into pulmonary circulation): dyspnea on exertion, orthopnea (can't breathe lying flat), paroxysmal nocturnal dyspnea, crackles (rales) in lung bases, pink frothy sputum (pulmonary edema), S3 gallop, decreased O2 sat, fatigue. Mnemonic: LEFT = Lungs, Exertional dyspnea, Frothy sputum, Tired. Right-sided heart failure (backs up into systemic venous circulation): peripheral pitting edema (ankles, sacrum), JVD (jugular venous distension), hepatomegaly, splenomegaly, ascites, weight gain. Mnemonic: RIGHT = Right, I Got Heavy Trunk. Most patients have biventricular failure. Nursing priorities: monitor I&O, daily weights (1kg gain = ~1L fluid), low-sodium diet teaching, diuretics (furosemide), position HOB 30-45°.",
  },
]

const benefits = [
  {
    title: 'ATI, HESI, and NCLEX prep in one place',
    body: 'Generate targeted decks for each exam stage: ATI TEAS science, HESI A2 anatomy, fundamentals ATI, and finally NCLEX-style priority questions. Build content knowledge first, then layer in clinical judgment — the progression every nursing student needs.',
  },
  {
    title: 'Upload your textbook chapters and professor notes as PDFs',
    body: "Drop pharmacology drug tables, your professor's med-surg PowerPoints, or ATI study guide PDFs and get flashcard decks in seconds. Stop manually re-typing notes — let AI do the extraction while you study.",
  },
  {
    title: 'Build instinctive clinical recall before clinicals',
    body: 'Spaced repetition makes priority frameworks, lab value ranges, and delegation rules automatic. When you are in clinical and a patient deteriorates, you need the ABCs and SBAR to fire instantly — not require a mental search.',
  },
  {
    title: 'Study by unit as your semester progresses',
    body: 'Generate a new deck for each unit: fundamentals now, med-surg cardiac later, OB the week before that rotation. Decks stay organized by topic and the SRS algorithm keeps older content fresh without requiring manual review scheduling.',
  },
]

export default function NursingSchoolFlashcardsPage() {
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
                <span className="text-primary-600">Nursing School</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any nursing topic — ATI TEAS, HESI, fundamentals, med-surg, pharmacology — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['ATI TEAS', 'HESI A2', 'Fundamentals', 'Med-Surg', 'Pharmacology', 'OB/Maternity', 'Pediatrics', 'NCLEX Prep'].map((tag) => (
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
                  Generate Nursing Flashcards Free
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
                From ATI to NCLEX in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Build clinical recall one deck at a time — fundamentals now, specialty courses later.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your nursing topic',
                  body: 'Enter "ADPIE nursing process with examples", "cardiac med-surg priority nursing interventions", or upload a pharmacology chapter PDF from your textbook.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering definitions, clinical rationale, priority frameworks, and NCLEX-style distinctions — exactly the depth nursing exams test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules daily reviews at optimal intervals. Concepts you miss appear more often, building the clinical instincts your patients depend on.',
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
                Example nursing school flashcards
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
                Generate Your Nursing Deck Free
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
                Why nursing students choose Esli
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
                Nursing school flashcard FAQs
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
              Start building clinical recall today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate nursing school flashcards for any topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Nursing Flashcards Free
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
              <a href="/flashcards/nclex" className="hover:text-white transition-colors no-underline">NCLEX Flashcards</a>
              <a href="/flashcards/anatomy" className="hover:text-white transition-colors no-underline">Anatomy Flashcards</a>
              <a href="/flashcards/pharmacology" className="hover:text-white transition-colors no-underline">Pharmacology Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
