/**
 * SEO Landing Page: Make Flashcards from PDF
 * Route: /use-case/pdf-to-flashcards
 * Meta title: Make Flashcards from PDF Free — AI | Esli (46 chars)
 * Meta description: Upload any PDF and Esli's AI turns it into study-ready flashcards in seconds. Free, spaced repetition. No signup needed. (120 chars)
 * Target keywords: make flashcards from PDF, PDF to flashcards, AI flashcards from PDF, convert PDF to flashcards, upload PDF make flashcards
 * Week: 2026-W38
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, Upload, FileText, Zap } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I make flashcards from a PDF on Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF on the Esli app (no account required). The AI reads the document, identifies the key concepts, definitions, and facts, and generates a complete deck of question-and-answer flashcards. The whole process takes under a minute for a typical textbook chapter.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kinds of PDFs does Esli work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any study-relevant PDF: textbook chapters, lecture slides exported as PDF, professor notes, research paper abstracts, study guides, exam review packets, legal briefs, medical case studies, MCAT prep books, bar exam outlines, and more. The AI handles both dense academic text and formatted slides.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is making flashcards from a PDF free on Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. PDF upload and AI flashcard generation is free on Esli. No credit card required, no signup wall. Just upload your PDF and get your deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from ChatGPT for making flashcards from a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT can read a PDF and suggest flashcard content, but it has no built-in study interface, no spaced repetition scheduling, no deck storage, and no progress tracking. With Esli, the cards go straight into a study-ready deck with SM-2 spaced repetition so you actually retain what you generated — not just see it once in a chat window.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit the flashcards Esli generates from my PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every card is fully editable after generation. You can add, remove, or modify any card. Esli also has a rich text editor with KaTeX math support, so you can include formulas and equations in your cards.',
      },
    },
  ],
}

const useCases = [
  { label: 'Textbook chapters', example: 'Upload Chapter 7 of your organic chemistry textbook — get 25 Q&A cards on reaction mechanisms.' },
  { label: 'Lecture slides (PDF export)', example: 'Export your professor\'s slides as PDF — Esli pulls every key term, concept, and definition.' },
  { label: 'Study guides & review packets', example: 'Upload your MCAT, NCLEX, or bar exam review PDF — get a ready-to-study deck in seconds.' },
  { label: 'Research papers & abstracts', example: 'Turn a dense journal article into bite-sized cards covering methodology, findings, and vocabulary.' },
  { label: 'Legal briefs & case summaries', example: 'Upload case law PDFs — AI extracts holdings, rules, and procedural facts for law school studying.' },
  { label: 'Medical case studies', example: 'Convert clinical case PDFs into diagnosis, treatment, and pathophysiology flashcards.' },
]

const benefits = [
  { title: 'Any PDF, any subject', body: 'Textbooks, lecture slides, study guides, case studies, review packets — if it\'s a PDF with text content, Esli can turn it into flashcards.' },
  { title: 'No manual card creation', body: 'The average textbook chapter takes 2-3 hours to convert into Anki cards manually. Esli does it in under a minute.' },
  { title: 'Smart AI extraction', body: 'The AI identifies what\'s worth memorizing — key terms, definitions, principles, formulas — not just every sentence in the PDF.' },
  { title: 'Study immediately', body: 'Cards go straight into a spaced repetition deck. No export, no import, no formatting. Just upload and start studying.' },
]

export default function PDFToFlashcardsPage() {
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
                Make Flashcards from{' '}
                <span className="text-primary-600">Any PDF</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Upload a textbook chapter, lecture slides, or study guide. Esli's AI extracts the key concepts and generates a complete flashcard deck in seconds — ready to study with spaced repetition.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  <Upload size={18} />
                  Upload a PDF Free
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                PDF to flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Under a minute from upload to studying.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Upload,
                  num: '01',
                  title: 'Upload your PDF',
                  body: 'Drag and drop any PDF — textbook chapter, lecture slides, study guide, review packet, or research paper. No account required to start.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI reads and extracts',
                  body: 'The AI identifies key concepts, definitions, principles, and facts worth remembering — then formats them as Q&A flashcards tailored to the content.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Your deck is instantly ready in Esli\'s SM-2 spaced repetition system. Cards resurface at the optimal moment before you forget them.',
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

        {/* Use Cases Grid */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Works for any kind of PDF
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From intro courses to professional exams — if you study from a PDF, Esli can build the deck.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {useCases.map((uc, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={16} className="text-primary-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-900">{uc.label}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{uc.example}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Upload Your PDF Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* vs Manual Creation */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Stop spending hours making cards manually
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Esli turns what used to be a 2-3 hour task into a 30-second one.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Without Esli</p>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    'Read the chapter once to understand it',
                    'Read again, highlighting key concepts',
                    'Open Anki or a blank document',
                    'Type each Q&A pair manually',
                    'Format and proofread cards',
                    'Repeat for every chapter — 2-3 hours total',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-300 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-primary-50 rounded-2xl border border-primary-200">
                <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-4">With Esli</p>
                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    'Upload the PDF (drag and drop)',
                    'AI reads and extracts key concepts',
                    'Complete deck ready in under a minute',
                    'Edit any card if needed',
                    'Start studying with spaced repetition',
                    'Done — move on to the next chapter',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Zap size={14} className="text-primary-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why students use Esli for PDF flashcards
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
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
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                PDF flashcard FAQs
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

        {/* CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Upload a PDF. Get flashcards instantly.
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Free. No signup required. Works with any textbook, notes, or study guide.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              <Upload size={18} />
              Upload Your PDF Free
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
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">For Medical Students</a>
              <a href="/use-case/self-study" className="hover:text-white transition-colors no-underline">Self-Study</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
