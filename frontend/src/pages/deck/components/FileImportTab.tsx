import { useState, useRef, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '@/shared/lib/analytics'
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import {
  parseSpreadsheetFile,
  autoDetectColumns,
  type ParseResult,
} from '@/features/decks/utils/parseSpreadsheet'
import type { CreateCardInput } from '@/features/decks/types'
import type { Card } from '@/features/decks/types'
import { Button } from '@/shared/ui/Button'
import { labelCls } from './deckStyles'

const MAX_CARD_CHARS = 5000
const BATCH_SIZE = 500

type ImportStep = 'upload' | 'preview' | 'importing' | 'done'

interface FileImportTabProps {
  deckId: string
  onImportBatch: (args: {
    deckId: string
    cards: CreateCardInput[]
  }) => Promise<Card[]>
  isPending: boolean
  onClose: () => void
}

export function FileImportTab({
  deckId,
  onImportBatch,
  isPending,
  onClose,
}: FileImportTabProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState<ImportStep>('upload')
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [frontCol, setFrontCol] = useState(-1)
  const [backCol, setBackCol] = useState(-1)
  const [importProgress, setImportProgress] = useState(0)
  const [importTotal, setImportTotal] = useState(0)
  const [importedCount, setImportedCount] = useState(0)
  const [importError, setImportError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    const validExtensions = ['.xlsx', '.xls', '.csv']
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

    if (!validExtensions.includes(ext)) {
      setParseError(t('fileImport.invalidFileType'))
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setParseError(t('fileImport.fileTooLarge'))
      return
    }

    setParseError(null)
    try {
      const result = await parseSpreadsheetFile(file)
      setParseResult(result)
      const detected = autoDetectColumns(result.headers)
      setFrontCol(detected.frontCol)
      setBackCol(detected.backCol)
      setStep('preview')
    } catch (err) {
      setParseError(
        err instanceof Error ? err.message : t('fileImport.failedToParse'),
      )
    }
  }, [t])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  // Build valid cards from parsed data
  const { validCards, skippedCount } = useMemo(() => {
    if (!parseResult || frontCol === -1 || backCol === -1) {
      return { validCards: [] as CreateCardInput[], skippedCount: 0 }
    }

    const headers = parseResult.headers
    const cards: CreateCardInput[] = []
    let skipped = 0

    for (const row of parseResult.rows) {
      const front = (row[headers[frontCol]] || '').slice(0, MAX_CARD_CHARS)
      const back = (row[headers[backCol]] || '').slice(0, MAX_CARD_CHARS)

      if (!front && !back) {
        skipped++
        continue
      }

      cards.push({
        frontText: front || undefined,
        backText: back || undefined,
      })
    }

    return { validCards: cards, skippedCount: skipped }
  }, [parseResult, frontCol, backCol])

  const handleImport = useCallback(async () => {
    if (validCards.length === 0) return

    setImportError(null)
    setImportTotal(validCards.length)
    setImportProgress(0)
    setStep('importing')

    try {
      let imported = 0
      for (let i = 0; i < validCards.length; i += BATCH_SIZE) {
        const chunk = validCards.slice(i, i + BATCH_SIZE)
        await onImportBatch({ deckId, cards: chunk })
        imported += chunk.length
        setImportProgress(imported)
      }
      setImportedCount(imported)
      trackEvent('card.add', { method: 'file' })
      setStep('done')
    } catch (err) {
      setImportError(
        err instanceof Error ? err.message : t('fileImport.failedToParse'),
      )
      setStep('preview')
    }
  }, [validCards, deckId, onImportBatch, t])

  const resetToUpload = () => {
    setStep('upload')
    setParseResult(null)
    setParseError(null)
    setFrontCol(-1)
    setBackCol(-1)
    setImportProgress(0)
    setImportTotal(0)
    setImportedCount(0)
    setImportError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ---- Upload step ----
  if (step === 'upload') {
    return (
      <div>
        <div
          role="button"
          tabIndex={0}
          aria-label={t('fileImport.dropHere')}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              fileInputRef.current?.click()
            }
          }}
          className={`flex flex-col items-center justify-center gap-3 p-8 sm:p-12 rounded-[18px] border-[2.5px] border-dashed cursor-pointer transition-[background-color,border-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
            isDragging
              ? 'border-edge bg-sky/25'
              : 'border-edge/60 hover:border-edge hover:bg-fg/[0.04] active:bg-fg/[0.07]'
          }`}
        >
          <div className={`sticker !shadow-sticker-sm !rounded-full p-3 -rotate-3 ${isDragging ? 'bg-sky' : 'bg-bubblegum'}`}>
            <Upload className="w-6 h-6 text-ink" aria-hidden />
          </div>
          <p className="text-center text-sm font-bold text-fg">
            {t('fileImport.dropHere')}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        {parseError && (
          <div role="alert" className="mt-3 flex items-center gap-2 text-sm font-medium text-again">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
            {parseError}
          </div>
        )}

        <div className="flex items-center justify-end pt-4 mt-4 border-t-2 border-line">
          <Button variant="ghost" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    )
  }

  // ---- Preview step ----
  if (step === 'preview') {
    const headers = parseResult?.headers ?? []
    const previewRows = parseResult?.rows.slice(0, 20) ?? []
    const hasMore = (parseResult?.rows.length ?? 0) > 20

    return (
      <div>
        {/* Column mapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="file-import-front-col" className={labelCls}>
              {t('fileImport.frontColumn')}
            </label>
            <select
              id="file-import-front-col"
              value={frontCol}
              onChange={(e) => setFrontCol(Number(e.target.value))}
              className="field cursor-pointer"
            >
              <option value={-1} disabled>
                {t('import.selectColumn', 'Select column…')}
              </option>
              {headers.map((h, i) => (
                <option key={i} value={i} disabled={i === backCol}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="file-import-back-col" className={labelCls}>
              {t('fileImport.backColumn')}
            </label>
            <select
              id="file-import-back-col"
              value={backCol}
              onChange={(e) => setBackCol(Number(e.target.value))}
              className="field cursor-pointer"
            >
              <option value={-1} disabled>
                {t('import.selectColumn', 'Select column…')}
              </option>
              {headers.map((h, i) => (
                <option key={i} value={i} disabled={i === frontCol}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preview table */}
        <div className="rounded-[18px] border-2 border-edge/80 overflow-hidden mb-4">
          <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-sheet sticky top-0 border-b-2 border-line">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-bold text-muted w-8">
                    #
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-fg">
                    {t('deck.frontLabel')}
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-fg">
                    {t('deck.backLabel')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {previewRows.map((row, i) => {
                  const front = row[headers[frontCol]] || ''
                  const back = row[headers[backCol]] || ''
                  const isEmpty = !front && !back
                  return (
                    <tr key={i} className={isEmpty ? 'bg-again/10' : undefined}>
                      <td className="px-3 py-2 text-xs text-muted tabular-nums">
                        {i + 1}
                      </td>
                      <td className="px-3 py-2 font-medium text-fg max-w-[200px] truncate">
                        {front || (
                          <span className="text-muted italic">{t('fileImport.empty')}</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-fg max-w-[200px] truncate">
                        {back || (
                          <span className="text-muted italic">{t('fileImport.empty')}</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {hasMore && (
            <div className="px-3 py-2 text-xs text-muted text-center border-t-2 border-line">
              ...{t('fileImport.andMoreRows', { count: (parseResult?.rows.length ?? 0) - 20 })}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm">
          <span className="flex items-center gap-1.5 text-fg">
            <FileSpreadsheet className="w-4 h-4 text-muted" aria-hidden />
            <strong className="font-extrabold">{validCards.length}</strong> {t('fileImport.validCards')}
          </span>
          {skippedCount > 0 && (
            <span className="flex items-center gap-1.5 text-muted">
              <AlertTriangle className="w-4 h-4 text-again" aria-hidden />
              {skippedCount} {t('fileImport.emptyRowsSkipped')}
            </span>
          )}
          {validCards.length === 0 && (frontCol === -1 || backCol === -1) && (
            <span className="flex items-center gap-1.5 text-fg font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0 text-again" aria-hidden />
              {t('import.columnsUnsetHint', 'Choose the front and back columns above to see which cards will be imported.')}
            </span>
          )}
        </div>

        {importError && (
          <div role="alert" className="mb-4 flex items-center gap-2 text-sm font-medium text-again">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
            {importError}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-line">
          <Button variant="ghost" size="sm" onClick={resetToUpload} className="-ml-3 text-muted">
            {t('fileImport.chooseDifferentFile')}
          </Button>
          <div className="flex gap-3 ml-auto">
            <Button variant="ghost" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <button
              type="button"
              onClick={handleImport}
              disabled={isPending || validCards.length === 0}
              className="btn-ink min-h-[46px] px-5 text-[15px]"
            >
              <Upload className="w-4 h-4" aria-hidden />
              {t('fileImport.importCards', { count: validCards.length })}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---- Importing step ----
  if (step === 'importing') {
    const percent = importTotal > 0 ? Math.round((importProgress / importTotal) * 100) : 0

    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-fg" aria-hidden />
        <p className="text-sm font-bold text-fg">
          {t('fileImport.importingCards', { imported: importProgress, total: importTotal })}
        </p>
        <div
          className="w-full max-w-xs h-3 overflow-hidden rounded-full border-2 border-ink bg-white"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div
            className="h-full w-full origin-left bg-grass transition-transform duration-300"
            style={{ transform: `scaleX(${percent / 100})` }}
          />
        </div>
      </div>
    )
  }

  // ---- Done step ----
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="sticker !shadow-sticker-sm bg-mint !rounded-full p-3 -rotate-3">
        <CheckCircle2 className="w-8 h-8 text-ink" aria-hidden />
      </div>
      <p className="font-display text-xl text-fg">
        {t('fileImport.successfullyImported', { count: importedCount })}
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <Button variant="secondary" onClick={resetToUpload}>
          {t('fileImport.importAnotherFile')}
        </Button>
        <button type="button" onClick={onClose} className="btn-ink min-h-[46px] px-5 text-[15px]">
          {t('common.done')}
        </button>
      </div>
    </div>
  )
}
