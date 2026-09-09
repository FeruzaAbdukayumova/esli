/**
 * SEO Landing Page: Biology Flashcards
 * Route: /flashcards/biology
 * Meta title: Biology Flashcards Free — AI Generator | Esli (52 chars)
 * Meta description: Generate biology flashcards with AI. Cell biology, genetics, evolution, ecology — free, spaced repetition. No signup. (123 chars)
 * Target keywords: biology flashcards, biology flashcards free, make biology flashcards, biology study cards, free biology flashcards
 * Week: 2026-W37
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
      name: 'What biology topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates biology flashcards across every major area: Cell Biology (cell organelles and functions, prokaryotic vs eukaryotic cells, cell membrane structure and transport — active, passive, facilitated diffusion, osmosis — cell cycle, mitosis and meiosis phases, cellular respiration and photosynthesis). Genetics (Mendelian inheritance, dominant and recessive alleles, Punnett squares, codominance and incomplete dominance, sex-linked traits, DNA replication, transcription, translation, gene regulation, mutations and their effects). Evolution and Ecology (natural selection, Hardy-Weinberg equilibrium, speciation, phylogenetics, ecological relationships — predation, competition, mutualism, commensalism, parasitism — food webs, nutrient cycles — carbon, nitrogen, phosphorus — population dynamics, biomes). Human Biology (digestive, circulatory, respiratory, immune, nervous, endocrine, muscular, and skeletal systems). Microbiology (bacteria vs viruses vs fungi vs protists, bacterial reproduction, viral replication cycles, immune response). Works for high school biology, AP Biology, college intro biology, and MCAT biology prep.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use biology flashcards effectively for exams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective biology flashcard strategy matches the question style of your specific exam. For high school and AP Biology: generate cards that pair each organelle with its function, structure, and a real-world analogy ("the mitochondria — function: ATP production via cellular respiration, structure: double membrane with cristae, analogy: the powerhouse"). For genetics: generate Punnett square card patterns ("monohybrid cross — two heterozygous parents Aa × Aa — expected offspring ratios for phenotype and genotype"). For MCAT biology: focus on process cards that chain mechanisms ("describe the complete sequence from DNA to protein: transcription in nucleus — pre-mRNA — RNA splicing — mature mRNA — nuclear pore export — ribosome — translation — post-translational modification"). Use Esli\'s spaced repetition to drill the concepts that come up wrong on your practice tests, not the ones you already know.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli good for AP Biology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Esli works well for AP Biology. The AP Biology exam tests four Big Ideas: Information Storage and Transmission (genetics, DNA, evolution), Cell Communication and Cell Cycle, Energetics (cellular respiration and photosynthesis), and Natural Selection. For each Big Idea, you can generate targeted decks: "AP Biology cellular respiration — all stages, reactants, products, and ATP yield with comparison to fermentation." Esli also handles AP Biology vocabulary cards (operons, lac operon, trp operon, Hardy-Weinberg conditions, carrying capacity K vs r strategies) and process diagrams described in text form. Upload a chapter from Campbell Biology or your AP review book PDF and get a custom deck in seconds. Cross-reference with the dedicated AP Biology page at /flashcards/ap-biology for more exam-specific guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best biology flashcard prompts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-yield biology prompts: Cell Biology — 'All organelles found only in plant cells vs only in animal cells vs in both — include function for each', 'The 5 types of cell membrane transport — name, whether it requires energy, direction relative to gradient, and a carrier protein or not'. Genetics — 'Mitosis vs meiosis — number of divisions, starting cell ploidy, ending cell ploidy, end product cell type, purpose in organism', 'All 4 types of chromosomal mutations — deletion, duplication, inversion, translocation — definition and a disease example each'. Evolution — 'Hardy-Weinberg equilibrium — the 5 conditions for no evolution, the 2 equations (p+q=1; p²+2pq+q²=1), and what each term represents'. Ecology — 'The 4 biogeochemical cycles — carbon, nitrogen, phosphorus, water — key reservoir, key biological process, key human disruption'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for biology students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free with no credit card required. The free plan gives you unlimited AI flashcard generation, spaced repetition scheduling, and community decks. Guest mode lets you start without an account — just type a biology topic and get flashcards instantly. Whether you are studying for a high school final, AP Biology, an introductory college biology course, or the MCAT, you can generate as many biology decks as you need at no cost.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the key differences between mitosis and meiosis? What does each produce?',
    a: 'MITOSIS: Purpose — growth, repair, asexual reproduction. Divisions — 1. Starting cell — diploid (2n). Ending cells — 2 diploid (2n) daughter cells. Genetically identical to parent. Phases: Prophase, Metaphase, Anaphase, Telophase (PMAT). MEIOSIS: Purpose — sexual reproduction (gamete production). Divisions — 2 (Meiosis I + Meiosis II). Starting cell — diploid (2n). Ending cells — 4 haploid (n) gametes. Genetically unique (crossing over in Prophase I). Key Meiosis I events: Homologous chromosomes pair up (synapsis), crossing over occurs (genetic recombination), homologs separate. Key Meiosis II events: identical to mitosis — sister chromatids separate. Memory trick: Mitosis = Making identical copies. Meiosis = Making eggs/sperm (sex cells). Errors in meiosis (nondisjunction) lead to trisomy (Down syndrome = trisomy 21) or monosomy.',
  },
  {
    q: 'Describe the structure and function of the cell membrane. What is the fluid mosaic model?',
    a: 'The fluid mosaic model (Singer & Nicolson, 1972): the cell membrane is a dynamic, flexible bilayer of phospholipids with embedded proteins. PHOSPHOLIPID BILAYER: Each phospholipid has a hydrophilic (water-loving) head (glycerol + phosphate) and two hydrophobic (water-fearing) fatty acid tails. Tails point inward, heads point outward toward water. "Fluid" — the membrane can move laterally; phospholipids and proteins can diffuse. MEMBRANE PROTEINS: Integral proteins (transmembrane) — span the bilayer; include channel proteins, carrier proteins, receptor proteins. Peripheral proteins — sit on surface; structural or signaling roles. CHOLESTEROL: Embedded in bilayer; stabilizes membrane fluidity (prevents too rigid at low temp, prevents too fluid at high temp). OTHER COMPONENTS: Glycoproteins (proteins + carbohydrates) — cell recognition, immune function. Glycolipids — cell identity markers. FUNCTIONS: selective permeability, cell communication, cell adhesion, enzyme activity.',
  },
  {
    q: 'What is the central dogma of molecular biology? Explain each step.',
    a: 'Central Dogma: DNA → RNA → Protein (Crick, 1958). Three processes: 1. DNA REPLICATION (DNA → DNA): DNA makes a copy of itself. Occurs in nucleus (eukaryotes). Semi-conservative — each new double helix has one original strand + one new strand. Key enzymes: helicase (unwinds double helix), DNA polymerase (adds complementary nucleotides 5\'→3\'), ligase (joins Okazaki fragments on lagging strand). 2. TRANSCRIPTION (DNA → mRNA): Occurs in nucleus. RNA polymerase reads template strand 3\'→5\', builds mRNA 5\'→3\'. Product: pre-mRNA → splicing removes introns, keeps exons → mature mRNA exits nucleus. 3. TRANSLATION (mRNA → Protein): Occurs at ribosomes (in cytoplasm or RER). tRNA brings amino acids matching mRNA codons. Ribosome moves along mRNA, peptide bonds form between amino acids. 3-nucleotide codons → 20 amino acids. Start codon: AUG (Met). Stop codons: UAA, UAG, UGA. Exception: reverse transcriptase (retroviruses, HIV) copies RNA → DNA, reversing the flow.',
  },
  {
    q: 'What are the 5 conditions required for Hardy-Weinberg equilibrium?',
    a: 'Hardy-Weinberg equilibrium: allele frequencies in a population remain constant from generation to generation IF — and only if — all 5 conditions are met: 1. NO MUTATION — alleles do not change into new alleles. 2. NO GENE FLOW — no migration of individuals into or out of the population (no alleles added or removed). 3. RANDOM MATING — individuals mate randomly, not choosing partners based on genotype. 4. NO NATURAL SELECTION — all genotypes have equal survival and reproductive success (no fitness differences). 5. LARGE POPULATION SIZE — no genetic drift (random changes in allele frequency due to chance sampling). The equations: p + q = 1 (where p = frequency of dominant allele A, q = frequency of recessive allele a). p² + 2pq + q² = 1 (where p² = AA frequency, 2pq = Aa frequency, q² = aa frequency). REAL WORLD: These conditions are almost never all met simultaneously — Hardy-Weinberg is the null hypothesis, and deviations from it signal evolution is occurring.',
  },
  {
    q: 'Describe cellular respiration. What are the 3 stages and how much ATP does each produce?',
    a: 'Cellular respiration: C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP. Three stages: 1. GLYCOLYSIS (cytoplasm): Glucose (6C) → 2 pyruvate (3C each). Net yield: 2 ATP (substrate-level), 2 NADH. No oxygen required (anaerobic). If oxygen available → pyruvate enters mitochondria. If not → fermentation. 2. KREBS CYCLE / CITRIC ACID CYCLE (mitochondrial matrix): Acetyl-CoA (from pyruvate dehydrogenase complex) enters cycle. Per turn: 3 NADH, 1 FADH2, 1 ATP (GTP). 2 turns per glucose → 6 NADH, 2 FADH2, 2 ATP total. 3. OXIDATIVE PHOSPHORYLATION / ETC (inner mitochondrial membrane): NADH and FADH2 donate electrons to the electron transport chain. Electrons flow through Complexes I-IV, pumping H+ across membrane, creating proton gradient. ATP synthase uses gradient to make ATP (chemiosmosis). Each NADH → ~2.5 ATP. Each FADH2 → ~1.5 ATP. Total yield from 10 NADH + 2 FADH2: ~30-32 ATP. Grand total per glucose: ~30-32 ATP (modern estimate; old textbook: 36-38).',
  },
  {
    q: 'What are the types of ecological relationships? Give an example and whether each species benefits (+), is harmed (-), or unaffected (0).',
    a: 'Ecological relationships between two species: MUTUALISM (+/+): both benefit. Example — clownfish and sea anemone (clownfish protected by anemone, clownfish cleans and feeds anemone). Also: mycorrhizal fungi and plant roots (fungi absorb nutrients, plant provides sugar). COMMENSALISM (+/0): one benefits, other unaffected. Example — barnacles on a whale (barnacles get transport and access to food, whale unaffected). Debated: most commensalisms on close examination show a small benefit or cost. PARASITISM (+/-): parasite benefits, host harmed. Example — tapeworm in intestine. Includes ectoparasites (fleas, ticks) and endoparasites (Plasmodium causing malaria). PREDATION (+/-): predator benefits, prey dies. Example — lion eats zebra. Drives coevolution (prey evolves defenses, predator evolves better hunting). COMPETITION (-/-): both species harmed by sharing a limiting resource. Interspecific (between species) — leads to competitive exclusion or niche partitioning. Intraspecific (within same species) — limits population growth.',
  },
]

const benefits = [
  {
    title: 'Every biology topic — from cell organelles to ecosystems',
    body: 'Generate targeted decks for any biology concept: cell structure, genetics and heredity, evolution, ecology, human body systems. Depth-matched to your level — high school, AP Biology, or college intro.',
  },
  {
    title: 'Upload your biology textbook or class notes as a PDF',
    body: 'Drop in a chapter from Campbell Biology, your AP Biology review book, or your professor\'s slides and get a custom flashcard deck in seconds. Turn 60 pages of reading into a 20-minute daily drill.',
  },
  {
    title: 'Spaced repetition schedules the concepts you keep forgetting',
    body: 'The SM-2 algorithm tracks which biology concepts you get wrong — meiosis phases, Hardy-Weinberg conditions, membrane transport types — and shows them more often until they stick.',
  },
  {
    title: 'Start without an account — no signup required',
    body: 'Guest mode means you can generate biology flashcards immediately without creating an account or entering an email. Free forever, with 14 interface languages for international students.',
  },
]

export default function BiologyFlashcardsPage() {
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
                <span className="text-primary-600">Biology</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any biology topic — cell biology, genetics, evolution, ecology, human body systems — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'DNA & RNA', 'Human Anatomy', 'Photosynthesis', 'Cellular Respiration'].map((tag) => (
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
                  Generate Biology Flashcards Free
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
                Master biology in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From cell organelles to ecosystems — generate, study, and build automatic recall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic or upload a PDF',
                  body: 'Enter "mitosis vs meiosis for AP Biology" or "ecological relationships with examples", or upload your textbook chapter for a deck that matches what your class or exam actually tests.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering concepts, processes, definitions, comparisons, and diagrams described in text — with the depth your biology course requires.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: "The SM-2 algorithm surfaces concepts you keep forgetting — cell cycle phases, inheritance patterns — more often, building the automatic recall exams demand.",
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
                Example biology flashcards
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
                Generate Your Biology Deck Free
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
                Biology flashcard FAQs
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
              Start studying biology smarter today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any biology topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Biology Flashcards Free
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
              <a href="/flashcards/genetics" className="hover:text-white transition-colors no-underline">Genetics Flashcards</a>
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
