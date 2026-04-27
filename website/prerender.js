import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

const routes = [
  {
    path: '/',
    title: 'Esli — Master Anything with Smart Flashcards',
    description: 'AI-powered flashcards with spaced repetition. Create, study, and share flashcards — free forever.',
    canonical: 'https://esli.app/',
  },
  {
    path: '/flashcards/mcat',
    title: 'MCAT Flashcards Free — AI Generator | Esli',
    description: 'Generate MCAT flashcards instantly with AI. Type any MCAT topic and get study-ready cards in seconds. Free, with spaced repetition. Start now.',
    canonical: 'https://esli.app/flashcards/mcat',
  },
  {
    path: '/flashcards/japanese-vocabulary',
    title: 'Japanese Vocabulary Flashcards — AI Generator | Esli',
    description: 'Generate Japanese vocabulary flashcards with AI. JLPT N5, N3, kanji, grammar — get cards instantly. Free, spaced repetition, 14 languages.',
    canonical: 'https://esli.app/flashcards/japanese-vocabulary',
  },
  {
    path: '/flashcards/aws-certification',
    title: 'AWS Certification Flashcards — AI Generator | Esli',
    description: 'Generate AWS certification flashcards with AI. Type any AWS service or exam topic and get study cards instantly. Free, with spaced repetition.',
    canonical: 'https://esli.app/flashcards/aws-certification',
  },
  {
    path: '/compare/anki',
    title: 'Esli vs Anki — Which Flashcard App Is Better?',
    description: 'Esli vs Anki compared honestly. Both use spaced repetition — but Esli adds AI generation so you never make cards manually again. Free.',
    canonical: 'https://esli.app/compare/anki',
  },
  {
    path: '/use-case/medical-students',
    title: 'AI Flashcards for Medical Students — Free | Esli',
    description: 'Esli generates medical flashcards instantly from any topic or PDF. USMLE, MCAT, anatomy, pharmacology — study smarter with AI + spaced repetition.',
    canonical: 'https://esli.app/use-case/medical-students',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Esli',
    description: 'How Esli collects, uses, and protects your information when you use the Esli web app, landing site, and browser extension.',
    canonical: 'https://esli.app/privacy',
  },
  {
    path: '/terms',
    title: 'Terms of Service | Esli',
    description: 'The terms governing your use of Esli — accounts, subscriptions, acceptable use, and limitations of liability.',
    canonical: 'https://esli.app/terms',
  },
  {
    path: '/refund',
    title: 'Refund Policy | Esli',
    description: 'Esli refund policy — 14-day money-back guarantee on new subscriptions, how renewals work, and how to request a refund.',
    canonical: 'https://esli.app/refund',
  },
]

function injectMeta(template, route, html) {
  let out = template

  // Inject SSR content
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  // Replace title
  out = out.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`,
  )

  // Replace meta description
  out = out.replace(
    /<meta name="description" content=".*?".*?\/>/,
    `<meta name="description" content="${route.description}" />`,
  )

  // Replace canonical
  out = out.replace(
    /<link rel="canonical" href=".*?".*?\/>/,
    `<link rel="canonical" href="${route.canonical}" />`,
  )

  // Replace og:title
  out = out.replace(
    /<meta property="og:title" content=".*?".*?\/>/,
    `<meta property="og:title" content="${route.title}" />`,
  )

  // Replace og:description
  out = out.replace(
    /<meta property="og:description" content=".*?".*?\/>/,
    `<meta property="og:description" content="${route.description}" />`,
  )

  // Replace og:url
  out = out.replace(
    /<meta property="og:url" content=".*?".*?\/>/,
    `<meta property="og:url" content="${route.canonical}" />`,
  )

  // Replace twitter:title
  out = out.replace(
    /<meta name="twitter:title" content=".*?".*?\/>/,
    `<meta name="twitter:title" content="${route.title}" />`,
  )

  // Replace twitter:description
  out = out.replace(
    /<meta name="twitter:description" content=".*?".*?\/>/,
    `<meta name="twitter:description" content="${route.description}" />`,
  )

  return out
}

async function prerender() {
  // Build the SSR bundle
  const { build } = await import('vite')
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist/server',
      rollupOptions: {
        output: { format: 'es' },
      },
    },
    logLevel: 'warn',
  })

  const { render } = await import(path.resolve(distDir, 'server/entry-server.js'))
  const baseTemplate = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  for (const route of routes) {
    const html = render(route.path)
    const output = injectMeta(baseTemplate, route, html)

    if (route.path === '/') {
      fs.writeFileSync(path.resolve(distDir, 'index.html'), output)
      console.log('Pre-rendered /')
    } else {
      const routeDir = path.resolve(distDir, route.path.slice(1))
      fs.mkdirSync(routeDir, { recursive: true })
      fs.writeFileSync(path.resolve(routeDir, 'index.html'), output)
      console.log(`Pre-rendered ${route.path}`)
    }
  }

  // Clean up server build
  fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true })

  console.log(`\nPre-rendered ${routes.length} routes successfully`)
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
