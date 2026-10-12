
export interface ParsedRow {
  [columnName: string]: string
}

export interface ParseResult {
  headers: string[]
  rows: ParsedRow[]
  sheetNames: string[]
  activeSheet: number
}

/**
 * Parse an Excel (.xlsx/.xls) or CSV file into rows with column headers.
 */
export async function parseSpreadsheetFile(
  file: File,
  sheetIndex = 0,
): Promise<ParseResult> {
  // Loaded on demand: xlsx is ~400 kB and only needed for spreadsheet import.
  const XLSX = await import('xlsx')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetNames = workbook.SheetNames

        if (sheetIndex >= sheetNames.length) {
          reject(new Error(`Sheet index ${sheetIndex} out of range`))
          return
        }

        const sheet = workbook.Sheets[sheetNames[sheetIndex]]
        const jsonRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
          sheet,
          { defval: '', raw: false },
        )

        if (jsonRows.length === 0) {
          reject(new Error('The file is empty or has no data rows'))
          return
        }

        const headers = Object.keys(jsonRows[0])
        const rows: ParsedRow[] = jsonRows.map((row) => {
          const parsed: ParsedRow = {}
          for (const h of headers) {
            parsed[h] = String(row[h] ?? '').trim()
          }
          return parsed
        })

        resolve({ headers, rows, sheetNames, activeSheet: sheetIndex })
      } catch (err) {
        reject(
          new Error(
            err instanceof Error ? err.message : 'Failed to parse file',
          ),
        )
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

/**
 * Auto-detect which columns map to front and back based on header names.
 * Falls back to columns 0 and 1 if no known headers found.
 */
export function autoDetectColumns(
  headers: string[],
): { frontCol: number; backCol: number } {
  const lower = headers.map((h) => h.toLowerCase().trim())

  const frontPatterns = [
    'front',
    'question',
    'term',
    'word',
    'prompt',
    'q',
    'key',
  ]
  const backPatterns = [
    'back',
    'answer',
    'definition',
    'meaning',
    'response',
    'a',
    'value',
    'translation',
  ]

  let frontCol = -1
  let backCol = -1

  for (let i = 0; i < lower.length; i++) {
    if (frontCol === -1 && frontPatterns.some((p) => lower[i].includes(p))) {
      frontCol = i
    }
    if (backCol === -1 && backPatterns.some((p) => lower[i].includes(p))) {
      backCol = i
    }
  }

  // Fallback: use first two columns
  if (frontCol === -1 && backCol === -1 && headers.length >= 2) {
    frontCol = 0
    backCol = 1
  } else if (frontCol === -1 && headers.length >= 1) {
    frontCol = backCol === 0 ? 1 : 0
  } else if (backCol === -1 && headers.length >= 2) {
    backCol = frontCol === 0 ? 1 : 0
  }

  return { frontCol, backCol }
}
