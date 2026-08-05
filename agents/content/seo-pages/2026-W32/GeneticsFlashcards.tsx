/**
 * SEO Landing Page: Genetics & Molecular Biology Flashcards
 * Route: /flashcards/genetics
 * Meta title: Genetics Flashcards Free — AI Generator | Esli (50 chars)
 * Meta description: Generate genetics flashcards with AI. DNA replication, Mendelian inheritance, CRISPR, molecular biology — free, spaced repetition. (134 chars)
 * Target keywords: genetics flashcards, molecular biology flashcards, DNA replication flashcards, Mendelian genetics flashcards, AP Biology genetics
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
      name: 'What genetics and molecular biology topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates flashcards for all genetics and molecular biology topics: Mendelian genetics (dominant/recessive, dihybrid crosses, pedigrees), molecular genetics (DNA structure, replication, transcription, translation, gene regulation), population genetics (Hardy-Weinberg equilibrium, genetic drift, natural selection), biotechnology (PCR, gel electrophoresis, CRISPR-Cas9, recombinant DNA, ELISA), genomics (genome sequencing, SNPs, epigenetics, gene expression arrays), developmental genetics (HOX genes, signal transduction, cell differentiation), and genetic diseases (modes of inheritance, chromosomal disorders, mutations). Upload any genetics textbook chapter PDF for instant targeted decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can flashcards help with AP Biology and college genetics courses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "AP Biology genetics questions test specific mechanisms and their logic — not just facts. Generate decks targeting the exact mechanisms the AP exam tests: 'Meiosis: crossing over, independent assortment, and how they generate genetic variation', 'Chi-square test for genetics: null hypothesis, degrees of freedom, interpretation', 'Linked genes vs independent assortment — when to expect deviation from 9:3:3:1'. For college-level genetics, generate decks by lecture topic: 'Lac operon: inducer, repressor, catabolite activator protein — complete regulatory logic', 'Epistasis: recessive vs dominant — ratios and real examples'. Specific prompts build the mechanistic understanding that earns points on FRQs and exams.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload genetics textbook chapters and lab manuals as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any genetics resource — 'Molecular Biology of the Gene' (Watson et al.), 'Genetics: From Genes to Genomes' (Hartwell), your professor's lecture slides, or lab manual PDFs — and Esli extracts key mechanisms, definitions, and conceptual relationships into a flashcard deck. This is especially useful for complex gene regulation chapters (lac operon, trp operon, eukaryotic transcription factors) where multiple interacting components need to be learned as a system, not as isolated facts.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are good genetics flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value genetics prompts: 'DNA replication: enzymes and their roles — helicase, primase, DNA polymerase I/III, ligase, topoisomerase — in order', 'Transcription vs translation — location, machinery, substrates, products, direction', 'Hardy-Weinberg: 5 assumptions, p² + 2pq + q² = 1, how to calculate allele frequencies from genotype data', 'CRISPR-Cas9: guide RNA, PAM sequence, DSB repair via NHEJ vs HDR — steps and applications', 'Pedigree analysis: autosomal dominant vs autosomal recessive vs X-linked — how to distinguish from inheritance pattern', 'Gene expression regulation in eukaryotes: promoters, enhancers, silencers, transcription factors, chromatin remodeling'. Topic-specific prompts produce far better cards than generic prompts.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for biology and genetics students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and community decks — no credit card required. Whether you are taking AP Biology, an introductory genetics course, or an advanced molecular biology seminar, you can generate unlimited genetics flashcard decks at no cost. Guest mode means you can start immediately without signing up, which is useful when you need cards fast before a lab practical or midterm exam.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the key enzymes in DNA replication and what does each do?',
    a: 'DNA replication enzymes (prokaryotic, E. coli model): Helicase: unwinds the double helix by breaking hydrogen bonds at the replication fork (DnaB in prokaryotes). Single-strand binding proteins (SSBPs): stabilize unwound template strands and prevent re-annealing. Topoisomerase (Gyrase): relieves torsional stress ahead of the fork by creating temporary breaks and re-ligating. Primase: synthesizes short RNA primers (5-10 nt) to provide a 3\'-OH for DNA polymerase to extend. DNA Polymerase III: main replicative polymerase; synthesizes new DNA strand 5\'→3\'; proofreads 3\'→5\'. DNA Polymerase I: removes RNA primers and replaces with DNA (5\'→3\' exonuclease activity). DNA Ligase: seals the nick between Okazaki fragments by forming phosphodiester bonds. Key rule: DNA polymerase can only ADD nucleotides to an existing 3\'-OH — it cannot start de novo. This is why RNA primers are required.',
  },
  {
    q: 'What is the central dogma of molecular biology? What are the exceptions?',
    a: 'Central dogma (Crick, 1958): DNA → (transcription) → RNA → (translation) → Protein. Information flows one-way from DNA to protein. Exceptions: Reverse transcription (retroviruses, retrotransposons): RNA → DNA via reverse transcriptase (encoded by retroviruses like HIV). This is how HIV integrates into host genome. RNA replication: RNA → RNA via RNA-dependent RNA polymerase (RdRP) in RNA viruses (influenza, coronavirus, poliovirus). Prion propagation: protein conformational change (PrP^C → PrP^Sc) — no nucleic acid template; protein → protein information transfer. RNA editing: some mRNAs are altered post-transcriptionally (e.g., apolipoprotein B: CAA → UAA creates premature stop codon in intestine). The dogma still holds for normal eukaryotic and prokaryotic cell biology — exceptions occur primarily in viruses and specific cell types.',
  },
  {
    q: 'Explain Mendelian inheritance: the law of segregation and law of independent assortment.',
    a: 'Law of Segregation (1st Law): alleles for a gene separate during meiosis, so each gamete receives exactly one allele. Result: offspring inherit one allele from each parent. Basis: homologous chromosomes separate in meiosis I. Applies to all diploid organisms. Law of Independent Assortment (2nd Law): allele pairs for different genes segregate independently of each other during gamete formation. Result: dihybrid cross of AaBb × AaBb gives 9:3:3:1 phenotypic ratio. Basis: non-homologous chromosomes orient randomly in metaphase I. EXCEPTION: linked genes (on the same chromosome) violate this law — they are NOT inherited independently, and recombination frequency indicates map distance in centiMorgans. Chi-square test: used to determine if observed offspring ratios deviate significantly from expected Mendelian ratios (null hypothesis: no significant difference). Degrees of freedom = number of phenotypic classes - 1.',
  },
  {
    q: 'How does CRISPR-Cas9 work as a gene-editing tool?',
    a: 'CRISPR-Cas9 (Clustered Regularly Interspaced Short Palindromic Repeats): Mechanism: 1. Guide RNA (gRNA): single guide RNA (sgRNA) consists of crRNA (20 nt sequence complementary to target DNA) + tracrRNA (scaffold that recruits Cas9). 2. PAM sequence: Cas9 recognizes a 3-base Protospacer Adjacent Motif (NGG for SpCas9) immediately 3\' of target site — required for Cas9 binding and cleavage. 3. Cas9 unwinds dsDNA; if sgRNA is complementary to one strand and PAM is present, Cas9 creates a blunt-cut double-strand break (DSB) 3 bp upstream of PAM. 4. DSB repair: NHEJ (Non-Homologous End Joining): error-prone, introduces indels → gene knockout. HDR (Homology-Directed Repair): precise, requires a donor template → gene correction or insertion. Applications: gene knockouts (research), gene correction (sickle cell, beta-thalassemia trials), diagnostic tools, agricultural traits. Ethical considerations: germline editing, off-target effects, equity of access.',
  },
  {
    q: 'What is the difference between meiosis and mitosis?',
    a: 'Mitosis: Purpose: growth, repair, asexual reproduction. Produces: 2 genetically identical diploid (2n) daughter cells. Divisions: 1. Stages: PMAT (Prophase, Metaphase, Anaphase, Telophase). Metaphase: sister chromatids align at metaphase plate. Anaphase: sister chromatids separate to opposite poles. No crossing over. Meiosis: Purpose: sexual reproduction (gamete formation). Produces: 4 genetically unique haploid (n) daughter cells. Divisions: 2 (Meiosis I + II). Meiosis I (reductional division): homologous chromosomes separate. Crossing over occurs in Prophase I (chiasmata formation). Independent assortment in Metaphase I. Meiosis II (equatorial division): sister chromatids separate (like mitosis). Key genetic outcomes of meiosis: crossing over (recombination) + independent assortment + random fertilization = enormous genetic diversity. Errors in meiosis: nondisjunction → aneuploidy (trisomy 21, monosomy X).',
  },
  {
    q: 'Explain the lac operon: what is it and how is expression regulated?',
    a: "Lac operon: a prokaryotic gene regulatory system in E. coli that controls lactose metabolism genes (lacZ, lacY, lacA). Components: Promoter (P_lac), Operator (O_lac), Structural genes (lacZ: β-galactosidase, lacY: permease, lacA: transacetylase). Regulation involves TWO independent mechanisms: 1. Negative regulation (repressor): In the ABSENCE of lactose: lac repressor (encoded by lacI) binds operator → blocks RNA polymerase → genes OFF. In the PRESENCE of lactose: allolactose (lactose metabolite) binds repressor → conformational change → repressor leaves operator → genes can be transcribed. 2. Positive regulation (catabolite repression, CAP): When glucose is LOW: cAMP accumulates → binds CAP → CAP-cAMP complex binds CRP site upstream of promoter → enhances RNA polymerase binding → HIGH transcription. When glucose is HIGH: low cAMP → no CAP activation → even with lactose present, transcription is LOW. Net result: lacZ is maximally expressed ONLY when lactose is present AND glucose is absent — the cell preferentially uses glucose when available.",
  },
]

const benefits = [
  {
    title: 'AP Biology to graduate-level molecular genetics',
    body: 'Generate decks matched to your level: AP Biology genetics for high school, intro genetics for college freshmen, or advanced operon regulation and epigenetics for grad courses. The AI adjusts depth to match your prompt specificity.',
  },
  {
    title: 'Upload textbook chapters on dense mechanisms',
    body: "Drop your 'Molecular Biology of the Gene', Griffiths 'Introduction to Genetic Analysis', or professor lecture PDFs and get flashcard decks covering every enzyme, regulatory element, and genetic ratio. No more re-reading — extract and study.",
  },
  {
    title: 'Learn mechanisms, not just definitions',
    body: 'Genetics rewards understanding of WHY — why does crossing over produce recombinant gametes? Why does the lac operon need two control systems? Esli generates cards that teach mechanisms, not just vocabulary, which is what earns FRQ points.',
  },
  {
    title: 'Complements AP Biology and biochemistry pages',
    body: 'Use alongside the AP Biology and biochemistry flashcard sets for complete coverage. Genetics covers inheritance and molecular mechanisms; AP Bio covers ecology, evolution, and cell biology; biochemistry covers metabolic pathways and enzymology.',
  },
]

export default function GeneticsFlashcardsPage() {
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
                <span className="text-primary-600">Genetics</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any genetics or molecular biology topic — DNA replication, Mendelian inheritance, CRISPR, gene regulation — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['DNA Replication', 'Mendelian Genetics', 'CRISPR', 'Meiosis', 'Gene Regulation', 'Molecular Biology', 'Biotechnology', 'Genomics'].map((tag) => (
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
                  Generate Genetics Flashcards Free
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
                Master genetics in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From Mendelian ratios to molecular mechanisms — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your genetics topic',
                  body: 'Enter "meiosis crossing over and independent assortment", "lac operon regulatory logic", or upload a textbook chapter PDF covering DNA replication or gene expression.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: "Esli creates cards covering mechanisms, enzyme roles, inheritance ratios, and conceptual distinctions — the depth genetics exams and AP Biology FRQs actually test.",
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at optimal intervals — complex mechanisms you struggle with appear more often, building the deep recall genetics exams require.',
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
                Example genetics flashcards
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
                Generate Your Genetics Deck Free
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
                Why biology students choose Esli
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
                Genetics flashcard FAQs
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
              Start mastering genetics today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any genetics or molecular biology topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Genetics Flashcards Free
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
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology Flashcards</a>
              <a href="/flashcards/biochemistry" className="hover:text-white transition-colors no-underline">Biochemistry Flashcards</a>
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
