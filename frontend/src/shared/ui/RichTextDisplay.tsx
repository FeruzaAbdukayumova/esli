import DOMPurify from 'dompurify'
import { isHtmlContent } from '@/shared/lib/htmlUtils'
import './rich-text.css'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'del',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'pre', 'code', 'blockquote',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'span', 'sub', 'sup', 'div', 'hr',
]

const ALLOWED_ATTR = ['href', 'src', 'alt', 'width', 'height', 'style', 'class', 'target', 'rel', 'colspan', 'rowspan']

interface RichTextDisplayProps {
  content: string
  className?: string
}

export function RichTextDisplay({ content, className = '' }: RichTextDisplayProps) {
  if (!content) return null

  if (!isHtmlContent(content)) {
    return <p className={className}>{content}</p>
  }

  const clean = DOMPurify.sanitize(content, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  })

  return (
    <div
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
