/**
 * SEO Landing Page: AI Flashcards for Graduate Students
 * Route: /use-case/graduate-students
 * Meta title: AI Flashcards for Graduate Students — Free | Esli (52 chars)
 * Meta description: Generate flashcards for quals, seminars, and dissertations. AI-powered, spaced repetition — free, no signup. Built for grad school. (135 chars)
 * Target keywords: flashcards for graduate students, PhD study tools, grad school flashcards AI, qualifying exam flashcards, graduate school study app
 * Week: 2026-W28
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, BookOpen, FileText, Clock, Layers } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can graduate students use AI flashcards differently from undergrads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Graduate study involves mastering a much larger, more specialized corpus — seminar reading lists, advisor's papers, field-specific terminology, theoretical frameworks. Esli lets you generate cards from any academic PDF (papers, book chapters, syllabi) so you're not limited to what someone else pre-made. You can also target very specific sub-fields: \"phenomenology in Heidegger vs Merleau-Ponty\" or \"econometrics: instrumental variables and endogeneity\" — topics no public Anki deck covers.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload academic papers and conference papers as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli handles academic PDFs including journal articles, conference papers, book chapters, and thesis drafts. Upload a paper and Esli extracts key arguments, definitions, methodological terms, and theoretical claims into flashcard Q&A pairs. Ideal for processing your seminar reading list before a session or building a comp exam literature bank.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I prepare for comprehensive or qualifying exams with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start early — generate decks for each reading on your comp list as you read it. Build separate decks per author, period, or theoretical camp. Six weeks before comps, shift to review mode: let spaced repetition surface forgotten material. By exam day, you have retained content from months of reading. The SM-2 algorithm keeps old material fresh without constant re-reading — critical when comps cover 2-3 years of literature.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to memorize theoretical frameworks and key authors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — and this is where Esli shines for grad students. Prompts like "Bourdieu: habitus, field, and capital — definitions and relationships", "Foucault vs Habermas on discourse and power", "Rawlsian justice vs utilitarian critiques" generate cards that cover who said what, what the core argument is, and how frameworks relate to each other. Essential for situating your own dissertation argument.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for PhD students or mostly for master\'s students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Both. Master's students use Esli heavily during coursework — processing seminar readings, preparing for finals. PhD students find it most valuable during the qualifying exam phase (covering years of literature) and during the teaching phase (quickly refreshing course material each semester). Some PhD students also use it to retain terminology in adjacent fields when their dissertation crosses disciplinary lines.",
      },
    },
  ],
}

const painPoints = [
  {
    icon: BookOpen,
    problem: 'Seminar reading lists are endless',
    solution: 'Upload any academic PDF — paper, book chapter, syllabus — and Esli extracts key arguments and concepts into a study deck in seconds.',
  },
  {
    icon: Layers,
    problem: 'No Anki deck covers your specific subfield',
    solution: 'Generate exactly what you need: "post-structuralism in Foucault and Derrida" or "econometrics: instrumental variables" — topics only you are studying.',
  },
  {
    icon: Clock,
    problem: 'Qualifying exams cover years of material',
    solution: 'Spaced repetition keeps literature from year one fresh while you add year three readings. Build your comp bank over time; the algorithm manages the schedule.',
  },
  {
    icon: FileText,
    problem: 'Academic jargon is dense and easy to forget',
    solution: 'Esli breaks complex theoretical claims and field-specific terms into concise Q&A pairs — so you can recall and explain them, not just recognize them.',
  },
]

const examplePrompts = [
  'Sociology: Bourdieu habitus, field, and capital — definitions and distinctions',
  'Econometrics: OLS assumptions, violations, and remedies',
  'Developmental psychology: Piaget vs Vygotsky vs Bronfenbrenner',
  'Organic chemistry named reactions for PhD prelims',
  'Political theory: Rawls vs Nozick on distributive justice',
  'Machine learning: gradient descent, backpropagation, and regularization',
  'Literary theory: structuralism, post-structuralism, deconstruction — key figures',
  'Epidemiology core concepts: RR, OR, NNT, confounding, effect modification',
  'Philosophy of science: Kuhn, Popper, Lakatos, Feyerabend on scientific progress',
]

const benefits = [
  {
    title: 'Upload your seminar readings and dissertation sources',
    body: 'Turn journal articles, book chapters, and conference papers into flashcard decks. Process your entire reading list as you go, not the week before comps.',
  },
  {
    title: 'Build a qualifying exam literature bank over time',
    body: 'Generate decks per author, period, or theoretical camp as you study each one. Spaced repetition keeps everything fresh without re-reading.',
  },
  {
    title: 'Interdisciplinary work made manageable',
    body: 'When your dissertation crosses fields, generate vocabulary decks for adjacent disciplines. Bridge neuroscience and philosophy, or economics and political science, without starting from scratch.',
  },
  {
    title: 'Study in 10-minute windows between teaching and research',
    body: 'Grad school leaves no time for long review sessions. Short daily spaced repetition is more effective than weekend cramming — and fits between classes you teach.',
  },
]

export default function AIFlashcardsGraduateStudentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
                <span className="text-primary-600">Graduate Students</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Upload academic papers, seminar readings, or dissertation sources and generate flashcard decks instantly. Built for the scale of grad school — qualifying exams, literature reviews, interdisciplinary work.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Qualifying Exams', 'Seminar Readings', 'Literature Reviews', 'Theoretical Frameworks', 'Dissertation Prep', 'PDF Upload', 'Interdisciplinary', 'PhD & Masters'].map((tag) => (
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
                  Generate Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#example-prompts"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Prompts
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
                Grad school creates problems flashcards solve
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                The volume, specificity, and time pressure of graduate study are exactly what AI-generated spaced repetition is built for.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((pt, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600/20 rounded-xl flex items-center justify-center shrink-0">
                      <pt.icon size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 mb-1 uppercase tracking-wide">Problem</p>
                      <p className="text-base font-semibold text-white mb-3">{pt.problem}</p>
                      <p className="text-sm font-semibold text-primary-400 mb-1 uppercase tracking-wide">Esli's solution</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{pt.solution}</p>
                    </div>
                  </div>
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
                From reading list to retention in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Process an entire semester of readings into a study system you can actually maintain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: 'Enter any theoretical topic, or upload a paper, book chapter, or syllabus. Esli handles dense academic text from any discipline.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli extracts key arguments, definitions, theoretical claims, and field-specific terminology into precise Q&A flashcard pairs.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Spaced repetition keeps it fresh',
                  body: 'The SM-2 algorithm resurfaces forgotten material from week 2 while you study week 10. Your entire comp list stays live, not buried.',
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

        {/* Example Prompts */}
        <section id="example-prompts" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                What graduate students generate
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Real topic prompts from grad students across disciplines.
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 gap-3">
              {examplePrompts.map((prompt, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <Sparkles size={16} className="text-primary-500 shrink-0 mt-0.5" />
                  <p className="font-mono text-sm text-slate-700">{prompt}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your Grad School Deck Free
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
                Built for the scale of graduate work
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
                Graduate student FAQs
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
              Stop re-reading. Start retaining.
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards from any academic paper or topic. Free forever — no credit card, no signup required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Flashcards Free
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
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">Medical Students</a>
              <a href="/use-case/adult-learners" className="hover:text-white transition-colors no-underline">Adult Learners</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
