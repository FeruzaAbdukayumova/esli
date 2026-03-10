import { useEffect } from 'react'

interface PageMeta {
  title: string
  description?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | null
}

const SITE_NAME = 'Esli'
const BASE_URL = 'https://app.esli.app'
const JSON_LD_ID = 'page-jsonld'

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (el) {
    el.content = content
  } else {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.content = content
    document.head.appendChild(el)
  }
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (el) {
    el.href = url
  } else {
    el = document.createElement('link')
    el.rel = 'canonical'
    el.href = url
    document.head.appendChild(el)
  }
}

function setJsonLd(data: Record<string, unknown> | null) {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = JSON_LD_ID
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = meta.title ? `${meta.title} | ${SITE_NAME}` : SITE_NAME

    if (meta.description) {
      setMetaTag('name', 'description', meta.description)
    }

    if (meta.canonical) {
      setCanonical(`${BASE_URL}${meta.canonical}`)
      setMetaTag('property', 'og:url', `${BASE_URL}${meta.canonical}`)
    }

    const title = meta.ogTitle || meta.title || SITE_NAME
    setMetaTag('property', 'og:title', title)
    setMetaTag('name', 'twitter:title', title)

    if (meta.ogDescription || meta.description) {
      const desc = (meta.ogDescription || meta.description)!
      setMetaTag('property', 'og:description', desc)
      setMetaTag('name', 'twitter:description', desc)
    }

    if (meta.noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow')
    } else {
      const el = document.querySelector('meta[name="robots"]')
      if (el) el.remove()
    }

    if (meta.jsonLd !== undefined) {
      setJsonLd(meta.jsonLd)
    }

    return () => {
      document.title = prevTitle
      setJsonLd(null)
    }
  }, [meta.title, meta.description, meta.canonical, meta.ogTitle, meta.ogDescription, meta.noIndex, meta.jsonLd])
}
