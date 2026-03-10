import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

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

  // Import the SSR bundle and render
  const { render } = await import(path.resolve(distDir, 'server/entry-server.js'))
  const html = render()

  // Read the client-built index.html and inject rendered content
  const indexPath = path.resolve(distDir, 'index.html')
  let template = fs.readFileSync(indexPath, 'utf-8')
  template = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  fs.writeFileSync(indexPath, template)

  // Clean up server build
  fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true })

  console.log('Pre-rendered index.html successfully')
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
