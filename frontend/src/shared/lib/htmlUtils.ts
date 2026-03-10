/** Strip HTML tags and return plain text content */
export function stripHtml(html: string): string {
  if (!html) return ''
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

/** Check if content contains HTML tags (vs plain text) */
export function isHtmlContent(text: string): boolean {
  if (!text) return false
  return /<[a-z][\s\S]*>/i.test(text)
}

/** Escape special HTML characters */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Wrap plain text in paragraph tags for editor compatibility */
export function plainTextToHtml(text: string): string {
  if (!text) return ''
  if (isHtmlContent(text)) return text
  return text
    .split('\n')
    .map((line) => `<p>${escapeHtml(line) || '<br>'}</p>`)
    .join('')
}

/** Check if HTML content has meaningful text (not just empty tags) */
export function hasHtmlContent(html: string | undefined): boolean {
  if (!html) return false
  return stripHtml(html).trim().length > 0
}
