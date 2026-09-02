/**
 * SEO Landing Page: AI Flashcards for Corporate Training
 * Route: /use-case/corporate-training
 * Meta title: AI Flashcards for Corporate Training — Free | Esli (53 chars)
 * Meta description: Turn onboarding docs, compliance manuals, and training materials into flashcards with AI. Free, spaced repetition — no LMS required. (136 chars)
 * Target keywords: AI flashcards for employee training, corporate learning flashcards, onboarding training flashcards, compliance training flashcards
 * Week: 2026-W36
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, BookOpen, Shield, Users, Zap } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Esli work for corporate training and employee onboarding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli works for corporate training by letting managers, trainers, or employees themselves upload onboarding documents, policy manuals, SOPs, or compliance training materials as PDFs — or type a topic directly — and get a complete flashcard deck in seconds. The AI extracts the key facts, procedures, definitions, and rules from the material and formats them as question-and-answer pairs. Employees then study with spaced repetition, which schedules daily 5-10 minute review sessions to ensure knowledge sticks beyond the initial training module. This is different from an LMS completion click — the system actually tests whether employees can recall what they read. No integration or IT setup required: employees access Esli directly at app.esli.app from any browser, including mobile. Guest mode means they do not even need to create an account to start.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of corporate training materials work best with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli works best with training content that is fact-dense, rule-based, or procedural — the type of knowledge that employees need to recall quickly on the job. High-value use cases: Compliance training (HIPAA privacy rules, GDPR data handling procedures, workplace harassment definitions, SOX financial controls, FDA 21 CFR Part 11 for regulated industries, anti-bribery/FCPA rules). Product knowledge (feature names, use cases, pricing tiers, competitor comparisons, objection handling scripts, technical specifications). Onboarding documentation (company policies, benefits enrollment procedures, IT security protocols, escalation paths, HR procedures). Industry certifications (ISO standards, Lean/Six Sigma terminology, PMP definitions, industry-specific vocabulary). SOPs and process knowledge (standard operating procedures, decision trees, escalation criteria, audit checklist items). Regulatory exam prep (Series 65/66 for financial advisors, state insurance licensing, food handler certification, OSHA safety rules).',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is spaced repetition better than a standard LMS completion module?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard LMS completion modules have a fundamental flaw: they measure whether an employee clicked through the material, not whether they retained it. Research by Ebbinghaus (1885) and confirmed in modern cognitive science shows that without reinforcement, people forget ~70% of new information within 24 hours and up to 90% within a week. A one-time compliance training completed in January is largely forgotten by March — but the compliance risk it was meant to prevent does not follow that same forgetting curve. Spaced repetition solves this by scheduling review at increasing intervals timed to the moment before forgetting occurs. The SM-2 algorithm (the system Esli uses) is the same algorithm that has powered flashcard tools like Anki for decades and is backed by hundreds of studies. The result: 2-3x better long-term retention compared to massed study (reviewing material all at once). For corporate training, this means a 10-minute daily review for two weeks produces better retention than a 2-hour training module — and employees can start the review immediately after the initial material is uploaded.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can employees use Esli for industry certification exam prep alongside their job?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is well-suited for employer-sponsored certification prep: AWS certifications (Solutions Architect, Developer, SysOps), PMP (Project Management Professional), Six Sigma Green Belt / Black Belt, CFA (finance), CFP (financial planning), Series 65/66 (investment advisors), SHRM-CP/SCP (HR), CompTIA certifications (Security+, Network+, CySA+), ISO 9001 / ISO 27001, and industry-specific certifications (real estate, insurance, food safety). Employees type the certification name and topic, or upload a study guide PDF, and get targeted decks matched to the exam content. Spaced repetition ensures that terminology and rules learned in week 1 are still retained in week 8 when the exam date arrives. Unlike static practice question banks, Esli generates cards from any material the employee uploads — so a custom internal study guide can become a flashcard deck in minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for corporate teams and employees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Esli's free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks — no credit card required. Individual employees can use Esli at no cost. Managers or trainers can create a deck using any training material (type or PDF upload), share the generated deck with their team, and employees can study it immediately. No LMS integration, no IT setup, no licensing fee for basic use. Guest mode means employees can start without even creating an account — just go to app.esli.app and begin.",
      },
    },
  ],
}

const painPoints = [
  {
    icon: BookOpen,
    title: 'LMS completion is not the same as retention',
    body: 'Employees click through compliance modules and forget 80% within a week. Checking a box is not the same as actually knowing the policy.',
  },
  {
    icon: Shield,
    title: 'Compliance risk does not wait for re-training day',
    body: 'A HIPAA violation or security breach can happen on day 60 — long after onboarding training was "completed." Knowledge needs to stick, not just check out.',
  },
  {
    icon: Users,
    title: 'Product knowledge fades between training sessions',
    body: 'Sales reps forget pricing tiers and feature specifics between quarterly trainings. Customer-facing teams need daily recall, not quarterly cram sessions.',
  },
  {
    icon: Zap,
    title: 'Creating good training content takes too long',
    body: "Writing quiz questions for every SOP and policy manual is a full-time job. AI flashcard generation turns any document into a study deck in seconds.",
  },
]

const trainingTypes = [
  {
    category: 'Compliance & Legal',
    examples: ['HIPAA privacy rules', 'GDPR data handling', 'Anti-harassment policies', 'SOX financial controls', 'FCPA anti-bribery', 'FDA 21 CFR compliance'],
    prompt: '"HIPAA: all 18 PHI identifiers, covered entity definition, and the 3 safeguard categories with examples"',
  },
  {
    category: 'Product & Sales Enablement',
    examples: ['Feature names and use cases', 'Pricing tiers and limits', 'Competitor comparisons', 'Objection handling', 'Technical specs', 'ICP and persona definitions'],
    prompt: '"Our product\'s 5 pricing tiers: what each includes, who it\'s for, and the top 3 objections at each price point"',
  },
  {
    category: 'Onboarding & HR',
    examples: ['Benefits enrollment deadlines', 'IT security protocols', 'Escalation procedures', 'Company values', 'PTO and leave policies', 'Performance review process'],
    prompt: '"New employee IT security: all 8 must-follow rules, password requirements, and what to do if a device is lost or stolen"',
  },
  {
    category: 'Industry Certifications',
    examples: ['AWS Solutions Architect', 'PMP definitions', 'Series 65/66 rules', 'Six Sigma DMAIC', 'CompTIA Security+', 'SHRM-CP vocabulary'],
    prompt: '"AWS EC2 instance types: all 5 families, use cases, pricing model (on-demand vs reserved vs spot), and when to choose each"',
  },
]

export default function AIFlashcardsCorporateTrainingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openTraining, setOpenTraining] = useState<number | null>(null)

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
                AI Flashcards for Teams
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Flashcards for{' '}
                <span className="text-primary-600">Corporate Training</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Turn any onboarding doc, compliance manual, or training material into a flashcard deck in seconds. Employees actually retain what they learned — not just click through it.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Compliance Training', 'Onboarding', 'Product Knowledge', 'Sales Enablement', 'Certification Prep', 'SOPs', 'HR Policies', 'Industry Regulations'].map((tag) => (
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
                  Start Free — No Signup Required
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#training-types"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Training Use Cases
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-20 sm:py-28 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                The problem with traditional corporate training
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Clicking through a module is not learning. Active recall is.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-xl flex items-center justify-center mb-4">
                    <p.icon className="text-primary-400" size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From training doc to retained knowledge in 3 steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Upload the training material',
                  body: 'Drop any PDF — compliance policy, onboarding guide, SOP, product spec — or type the topic directly. Works with any document employees need to know.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI extracts the key facts',
                  body: 'Esli identifies the definitions, rules, procedures, and must-know details from the document and formats them as clear question-and-answer flashcards — no manual editing required.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Employees study with spaced repetition',
                  body: 'Daily 10-minute reviews scheduled by the SM-2 algorithm ensure long-term retention. The policies employees need to remember in month 6 are still there — not just checked off at onboarding.',
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

        {/* Training Types */}
        <section id="training-types" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Training types that work with Esli
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click each type to see example topics and a ready-to-use prompt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {trainingTypes.map((t, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden hover:border-primary-200 transition-colors">
                  <button
                    onClick={() => setOpenTraining(openTraining === i ? null : i)}
                    className="flex items-center justify-between w-full px-6 py-5 text-left bg-transparent border-none cursor-pointer"
                  >
                    <span className="text-base font-semibold text-slate-900">{t.category}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform shrink-0 ml-4 ${openTraining === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openTraining === i && (
                    <div className="px-6 pb-5 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2 mt-4 mb-4">
                        {t.examples.map((ex) => (
                          <span key={ex} className="px-2 py-1 text-xs text-slate-600 bg-slate-100 rounded-md">{ex}</span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mb-1">Example Esli prompt:</p>
                      <p className="text-sm text-primary-700 bg-primary-50 rounded-lg px-3 py-2 italic">{t.prompt}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Start Creating Training Flashcards Free
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
                Why teams use Esli for training
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'No IT setup, no LMS integration required',
                  body: 'Employees access Esli directly from any browser or mobile device. No SSO required, no software to install. Guest mode means they can start studying a deck without even creating an account.',
                },
                {
                  title: 'Any document becomes a study deck in seconds',
                  body: "Upload a PDF of any policy manual, compliance doc, or onboarding guide and get a ready-to-study flashcard deck immediately. No manual card creation. The AI extracts the testable knowledge so you don't have to.",
                },
                {
                  title: 'Retention over time, not just completion today',
                  body: 'Spaced repetition ensures that HIPAA rules and security protocols are still retained in month 3 and month 12 — not just checked off at onboarding. 10 minutes of daily review produces 2-3x better retention than a one-time training session.',
                },
                {
                  title: 'Works for cert prep alongside regular duties',
                  body: 'Employees can study for AWS, PMP, Series 65, or any industry certification during their daily 10-minute commute or lunch break. Spaced repetition fits around a full work schedule better than any 4-hour study session.',
                },
              ].map((b, i) => (
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
                Corporate training flashcard FAQs
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
              Build training that actually sticks
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Upload any training document and get a flashcard deck in seconds. Free forever — no credit card, no LMS setup required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Start Creating Training Flashcards Free
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
              <a href="/use-case/professionals" className="hover:text-white transition-colors no-underline">AI Flashcards for Professionals</a>
              <a href="/use-case/self-study" className="hover:text-white transition-colors no-underline">AI Flashcards for Self-Study</a>
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
