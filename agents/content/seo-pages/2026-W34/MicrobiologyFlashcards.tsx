/**
 * SEO Landing Page: Microbiology Flashcards
 * Route: /flashcards/microbiology
 * Meta title: Microbiology Flashcards Free — AI Generator | Esli
 * Meta description: Generate microbiology flashcards with AI. Bacteria, viruses, fungi, immune response — free, spaced repetition. No signup needed.
 * Target keywords: microbiology flashcards, bacteria vs virus flashcards, microbiology exam prep,
 *   microbiology study cards, clinical microbiology flashcards, microbiology for nursing
 * Week: 2026-W34
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
      name: 'Are microbiology flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited microbiology flashcards with AI, study with spaced repetition, and access every feature — no credit card, no signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What microbiology topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli covers all microbiology areas: bacteriology (gram stain, cell wall, virulence factors), virology (replication cycles, antiviral drugs), mycology, parasitology, immunology, and clinical microbiology (bugs and drugs, antibiotic mechanisms). Just type any topic or upload a textbook chapter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my microbiology textbook PDF and get flashcards from it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Murray\'s Medical Microbiology, Tortora\'s Microbiology, your professor\'s lecture slides — and Esli\'s AI extracts key organisms, mechanisms, and clinical correlations, turning them into study-ready flashcards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with the "bugs and drugs" section of USMLE/NCLEX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type "bacteria and their antibiotics" or "antibiotic mechanisms of action" and Esli generates cards pairing organisms with first-line treatments, drug class, and mechanism. Spaced repetition ensures the high-yield associations stay sharp for exam day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for nursing microbiology courses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Nursing microbiology focuses on clinical relevance — infection control, common pathogens, antibiotic stewardship. Type "nursing microbiology infection control flashcards" and Esli generates cards tuned to clinical nursing contexts, not just research-level detail.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between gram-positive and gram-negative bacteria? Why does it matter clinically?',
    a: 'Gram-positive: thick peptidoglycan, no outer membrane — stains purple. Gram-negative: thin peptidoglycan + outer membrane with LPS endotoxin — stains pink. Clinically: gram-negative bacteria more virulent due to endotoxin; different antibiotic coverage needed. Beta-lactams penetrate gram-positives better; gram-negatives require agents that cross the outer membrane.',
  },
  {
    q: 'Describe the lytic vs. lysogenic viral replication cycles.',
    a: 'Lytic: virus hijacks host immediately → replicates → lyses cell to release virions. Results in cell death. Lysogenic: viral DNA integrates into host genome (provirus) → replicates silently with host → can switch to lytic cycle under stress (UV, chemicals). Examples: HIV (lysogenic), influenza (lytic).',
  },
  {
    q: 'What are the virulence factors of Staphylococcus aureus?',
    a: 'Protein A (binds IgG Fc, blocks opsonization); Panton-Valentine Leukocidin (PVL, lyses WBCs); coagulase (converts fibrinogen → fibrin, forms protective clot); TSST-1 (superantigen → toxic shock); biofilm formation. MRSA adds beta-lactam resistance via PBP2a (mecA gene).',
  },
  {
    q: 'What is the mechanism of penicillin and what bacteria are resistant to it and why?',
    a: 'Penicillin inhibits transpeptidase (PBP), blocking cross-linking of peptidoglycan — bacteria cannot form a stable cell wall and lyse. Resistance: 1) Beta-lactamase production (hydrolysis of beta-lactam ring) — most gram-negatives; 2) Altered PBPs — MRSA; 3) Reduced permeability — gram-negatives (porin loss). Overcome with beta-lactamase inhibitors (clavulanate) or new-generation agents.',
  },
  {
    q: 'Explain the complement system — classical vs. alternative pathway.',
    a: 'Classical: triggered by antibody-antigen complexes (C1q binds IgG/IgM). Alternative: triggered by foreign surfaces (bacterial polysaccharides, LPS) — no antibody needed. Both converge at C3 convertase → C3b (opsonization) + C3a (inflammation) → MAC (C5b-9) formation → cell lysis. Lectin pathway: triggered by mannose-binding lectin on pathogen surfaces.',
  },
  {
    q: 'What are the ESKAPE pathogens and why are they clinically important?',
    a: 'Enterococcus faecium, Staphylococcus aureus (MRSA), Klebsiella pneumoniae, Acinetobacter baumannii, Pseudomonas aeruginosa, Enterobacter spp. All exhibit multi-drug resistance and are leading causes of hospital-acquired infections. "ESKAPE" mnemonically captures the pathogens that most "escape" antibiotic treatment in ICU settings.',
  },
]

const benefits = [
  {
    title: 'Covers pre-med, nursing, and graduate micro',
    body: 'From introductory bacteriology to advanced clinical microbiology and immunology — AI generates cards matched to your exact course level.',
  },
  {
    title: 'Organism-by-organism card format',
    body: 'Cards structured by pathogen: gram stain, shape, virulence factors, disease, treatment. The same pattern your professors test — not loose definitions.',
  },
  {
    title: 'Upload lecture slides or textbook chapters',
    body: 'Turn Murray, Tortora, or your professor\'s PowerPoint into a complete flashcard deck automatically — no manual typing.',
  },
  {
    title: 'Spaced repetition for high-yield associations',
    body: '"Bugs and drugs" pairings need to be instant recall on USMLE/NCLEX. SM-2 repetition makes them automatic before exam day.',
  },
]

export default function MicrobiologyFlashcardsPage() {
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
                <span className="text-primary-600">Microbiology Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any microbiology topic — gram stain, viral cycles, bugs and drugs, immune response — and get a complete flashcard deck in seconds. Spaced repetition included. No signup needed.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Gram Stain', 'Bacteria vs. Virus', 'Virulence Factors', 'Antibiotics', 'Immune Response', 'ESKAPE Pathogens', 'Fungal Infections', 'USMLE/NCLEX Micro'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Microbiology Flashcards Free
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
                Microbiology mastery in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From textbook chapter to a full study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your micro topic',
                  body: 'Enter "gram-positive cocci virulence factors", "antibiotic mechanisms of action", or "HIV replication cycle" — or upload your textbook PDF chapter directly.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'AI generates organism-focused cards: gram stain, shape, toxins, clinical disease, treatment — the exact format that shows up on shelf exams and USMLE.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces tricky pathogens and drug associations at the right interval. High-yield micro becomes reflex knowledge.',
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
                Example microbiology flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
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
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCard === i ? '[transform:rotateY(180deg)]' : ''}`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-relaxed">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-relaxed">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your Own Microbiology Deck
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
                Why students use Esli for microbiology
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Check className="text-primary-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Frequently asked questions
            </h2>

            <div className="divide-y divide-slate-200">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i}>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to ace your microbiology exam?
            </h2>
            <p className="text-lg text-primary-100 mb-10">
              Generate your first microbiology deck in under a minute — free, no account needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Microbiology Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500 mb-6">Related study tools</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'MCAT Flashcards', href: '/flashcards/mcat' },
                { label: 'NCLEX Flashcards', href: '/flashcards/nclex' },
                { label: 'Anatomy & Physiology Flashcards', href: '/flashcards/anatomy-physiology' },
                { label: 'AI Flashcards for Medical Students', href: '/use-case/medical-students' },
                { label: 'Pharmacology Flashcards', href: '/flashcards/pharmacology' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-primary-300 hover:text-primary-700 transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="https://esli.app" className="flex items-center gap-2 no-underline">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Esli</span>
            </a>
            <p className="text-sm text-slate-400">Free AI flashcard generator with spaced repetition.</p>
            <div className="flex gap-6">
              <a href="https://esli.app" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Home</a>
              <a href={`${APP_URL}/register`} className="text-sm text-slate-500 hover:text-slate-800 no-underline">Get Started</a>
              <a href="https://esli.app/pricing" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Pricing</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
