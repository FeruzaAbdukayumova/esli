import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Mathematics from '@tiptap/extension-mathematics'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code2,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Palette,
  Sigma,
  Unlink,
  RowsIcon,
  ColumnsIcon,
  Trash2,
  Plus,
} from 'lucide-react'
import 'katex/dist/katex.min.css'
import './rich-text.css'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  maxLength?: number
  compact?: boolean
  className?: string
}

const TEXT_COLORS = [
  '#000000', '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280',
]

export function RichTextEditor({
  content,
  onChange,
  placeholder = '',
  maxLength = 5000,
  compact = false,
  className = '',
}: RichTextEditorProps) {
  const { t } = useTranslation()
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showTableMenu, setShowTableMenu] = useState(false)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const initialContentRef = useRef(content)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { HTMLAttributes: { class: 'code-block' } },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
      }),
      Image.configure({ inline: true, allowBase64: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TextStyle,
      Color,
      CharacterCount.configure({ limit: maxLength, mode: 'textSize' }),
      Placeholder.configure({ placeholder }),
      Mathematics,
    ],
    content: initialContentRef.current,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: compact ? 'ProseMirror compact' : 'ProseMirror',
      },
    },
  })

  // Sync content from parent when it changes externally (e.g. form reset)
  const prevContentRef = useRef(content)
  useEffect(() => {
    if (!editor) return
    if (content !== prevContentRef.current) {
      const currentHtml = editor.getHTML()
      if (content !== currentHtml) {
        editor.commands.setContent(content, { emitUpdate: false })
      }
      prevContentRef.current = content
    }
  }, [content, editor])

  // Update prevContentRef when editor changes
  useEffect(() => {
    if (!editor) return
    const handler = () => {
      prevContentRef.current = editor.getHTML()
    }
    editor.on('update', handler)
    return () => {
      editor.off('update', handler)
    }
  }, [editor])

  const insertLink = useCallback(() => {
    if (!editor || !linkUrl.trim()) return
    const url = linkUrl.trim().startsWith('http') ? linkUrl.trim() : `https://${linkUrl.trim()}`
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    setLinkUrl('')
    setShowLinkInput(false)
  }, [editor, linkUrl])

  const removeLink = useCallback(() => {
    if (!editor) return
    editor.chain().focus().unsetLink().run()
    setShowLinkInput(false)
  }, [editor])

  const insertImage = useCallback(() => {
    if (!editor || !imageUrl.trim()) return
    editor.chain().focus().setImage({ src: imageUrl.trim() }).run()
    setImageUrl('')
    setShowImageInput(false)
  }, [editor, imageUrl])

  const insertTable = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    setShowTableMenu(false)
  }, [editor])

  useEffect(() => {
    if (showLinkInput && linkInputRef.current) linkInputRef.current.focus()
  }, [showLinkInput])

  useEffect(() => {
    if (showImageInput && imageInputRef.current) imageInputRef.current.focus()
  }, [showImageInput])

  if (!editor) return null

  const charCount = editor.storage.characterCount.characters()

  const ToolbarButton = ({
    onClick,
    isActive = false,
    title,
    children,
  }: {
    onClick: () => void
    isActive?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1 rounded transition-colors ${
        isActive
          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  )

  const iconSize = compact ? 14 : 16

  return (
    <div className={`border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-800 ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title={t('editor.bold')}
        >
          <Bold size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title={t('editor.italic')}
        >
          <Italic size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title={t('editor.underline')}
        >
          <UnderlineIcon size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title={t('editor.strikethrough')}
        >
          <Strikethrough size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-500 mx-0.5" />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title={t('editor.heading1')}
        >
          <Heading1 size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title={t('editor.heading2')}
        >
          <Heading2 size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title={t('editor.heading3')}
        >
          <Heading3 size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-500 mx-0.5" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title={t('editor.bulletList')}
        >
          <List size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title={t('editor.orderedList')}
        >
          <ListOrdered size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-500 mx-0.5" />

        {/* Code & Quote */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title={t('editor.codeBlock')}
        >
          <Code2 size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title={t('editor.blockquote')}
        >
          <Quote size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-500 mx-0.5" />

        {/* Color picker */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              setShowColorPicker(!showColorPicker)
              setShowLinkInput(false)
              setShowImageInput(false)
              setShowTableMenu(false)
            }}
            title={t('editor.textColor')}
          >
            <Palette size={iconSize} />
          </ToolbarButton>
          {showColorPicker && (
            <div className="absolute top-full left-0 z-10 mt-1 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg flex gap-1 flex-wrap w-[140px]">
              {TEXT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setColor(color).run()
                    setShowColorPicker(false)
                  }}
                  className="w-5 h-5 rounded border border-slate-300 dark:border-slate-500 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run()
                  setShowColorPicker(false)
                }}
                className="w-5 h-5 rounded border border-slate-300 dark:border-slate-500 hover:scale-110 transition-transform text-xs flex items-center justify-center"
                title="Default"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Link */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              if (editor.isActive('link')) {
                removeLink()
              } else {
                setShowLinkInput(!showLinkInput)
                setShowColorPicker(false)
                setShowImageInput(false)
                setShowTableMenu(false)
              }
            }}
            isActive={editor.isActive('link')}
            title={editor.isActive('link') ? t('editor.linkRemove') : t('editor.link')}
          >
            {editor.isActive('link') ? <Unlink size={iconSize} /> : <LinkIcon size={iconSize} />}
          </ToolbarButton>
          {showLinkInput && (
            <div className="absolute top-full left-0 z-10 mt-1 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg flex gap-1">
              <input
                ref={linkInputRef}
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); insertLink() }
                  if (e.key === 'Escape') setShowLinkInput(false)
                }}
                placeholder={t('editor.linkUrl')}
                className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-500 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 w-48"
              />
              <button
                type="button"
                onClick={insertLink}
                className="px-2 py-1 text-xs bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                {t('editor.linkInsert')}
              </button>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              setShowImageInput(!showImageInput)
              setShowColorPicker(false)
              setShowLinkInput(false)
              setShowTableMenu(false)
            }}
            title={t('editor.image')}
          >
            <ImageIcon size={iconSize} />
          </ToolbarButton>
          {showImageInput && (
            <div className="absolute top-full right-0 z-10 mt-1 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg flex gap-1">
              <input
                ref={imageInputRef}
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); insertImage() }
                  if (e.key === 'Escape') setShowImageInput(false)
                }}
                placeholder={t('editor.imageUrl')}
                className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-500 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 w-48"
              />
              <button
                type="button"
                onClick={insertImage}
                className="px-2 py-1 text-xs bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                {t('editor.imageInsert')}
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              setShowTableMenu(!showTableMenu)
              setShowColorPicker(false)
              setShowLinkInput(false)
              setShowImageInput(false)
            }}
            isActive={editor.isActive('table')}
            title={t('editor.table')}
          >
            <TableIcon size={iconSize} />
          </ToolbarButton>
          {showTableMenu && (
            <div className="absolute top-full right-0 z-10 mt-1 p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg min-w-[160px]">
              {!editor.isActive('table') ? (
                <button
                  type="button"
                  onClick={insertTable}
                  className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                >
                  <Plus size={14} />
                  {t('editor.tableInsert')}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false) }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  >
                    <RowsIcon size={14} />
                    {t('editor.tableAddRow')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false) }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  >
                    <ColumnsIcon size={14} />
                    {t('editor.tableAddColumn')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false) }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-red-600 dark:text-red-400"
                  >
                    <RowsIcon size={14} />
                    {t('editor.tableDeleteRow')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false) }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-red-600 dark:text-red-400"
                  >
                    <ColumnsIcon size={14} />
                    {t('editor.tableDeleteColumn')}
                  </button>
                  <hr className="my-1 border-slate-200 dark:border-slate-600" />
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteTable().run(); setShowTableMenu(false) }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-red-600 dark:text-red-400"
                  >
                    <Trash2 size={14} />
                    {t('editor.tableDelete')}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Math */}
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().insertContent('$E = mc^2$').run()
          }}
          title={t('editor.math')}
        >
          <Sigma size={iconSize} />
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      {/* Character count */}
      <div className="flex justify-end px-2 py-1 border-t border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
        <span className={`text-xs ${charCount > maxLength * 0.9 ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
          {charCount} / {maxLength}
        </span>
      </div>
    </div>
  )
}
