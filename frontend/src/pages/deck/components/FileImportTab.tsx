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
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 p-8 sm:p-12 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            isDragging
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-700/30'
          }`}
        >
          <div
            className={`p-3 rounded-full ${isDragging ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-slate-100 dark:bg-slate-700'}`}
          >
            <Upload
              className={`w-6 h-6 ${isDragging ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'}`}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('fileImport.dropHere')}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        {parseError && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {parseError}
          </div>
        )}

        <div className="flex items-center justify-end pt-4 mt-4 border-t border-slate-200 dark:border-slate-600">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {t('common.cancel')}
          </button>
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('fileImport.frontColumn')}
            </label>
            <select
              value={frontCol}
              onChange={(e) => setFrontCol(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {headers.map((h, i) => (
                <option key={i} value={i} disabled={i === backCol}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('fileImport.backColumn')}
            </label>
            <select
              value={backCol}
              onChange={(e) => setBackCol(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {headers.map((h, i) => (
                <option key={i} value={i} disabled={i === frontCol}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preview table */}
        <div className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden mb-4">
          <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-8">
                    #
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    {t('deck.frontLabel')}
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    {t('deck.backLabel')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                {previewRows.map((row, i) => {
                  const front = row[headers[frontCol]] || ''
                  const back = row[headers[backCol]] || ''
                  const isEmpty = !front && !back
                  return (
                    <tr
                      key={i}
                      className={
                        isEmpty
                          ? 'bg-red-50/50 dark:bg-red-900/10'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                      }
                    >
                      <td className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500">
                        {i + 1}
                      </td>
                      <td className="px-3 py-2 text-slate-800 dark:text-slate-100 max-w-[200px] truncate">
                        {front || (
                          <span className="text-slate-400 italic">{t('fileImport.empty')}</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-700 dark:text-slate-200 max-w-[200px] truncate">
                        {back || (
                          <span className="text-slate-400 italic">{t('fileImport.empty')}</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {hasMore && (
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center border-t border-slate-200 dark:border-slate-600">
              ...{t('fileImport.andMoreRows', { count: (parseResult?.rows.length ?? 0) - 20 })}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <FileSpreadsheet className="w-4 h-4 text-primary-500" />
            <strong>{validCards.length}</strong> {t('fileImport.validCards')}
          </span>
          {skippedCount > 0 && (
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              {skippedCount} {t('fileImport.emptyRowsSkipped')}
            </span>
          )}
        </div>

        {importError && (
          <div className="mb-4 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {importError}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
          <button
            type="button"
            onClick={resetToUpload}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            {t('fileImport.chooseDifferentFile')}
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={isPending || validCards.length === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4" />
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
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t('fileImport.importingCards', { imported: importProgress, total: importTotal })}
        </p>
        <div className="w-full max-w-xs bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    )
  }

  // ---- Done step ----
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
      </div>
      <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
        {t('fileImport.successfullyImported', { count: importedCount })}
      </p>
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={resetToUpload}
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {t('fileImport.importAnotherFile')}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white transition-colors"
        >
          {t('common.done')}
        </button>
      </div>
    </div>
  )
}
