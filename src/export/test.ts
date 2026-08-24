import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of export and forbade nothing. What export actually owes its
// callers is its FACE: import { X } from '@/export' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "ExportMetadata",
  "ExportOptions",
  "ExportResult",
  "FinancialStatement",
  "FinancialStatementRow",
  "FinancialStatementSection",
  "StandardsExportFormat",
  "StandardsExportRequest",
  "StandardsExportResult",
  "StandardsImportFormat",
  "StandardsImportRequest",
  "StandardsImportResult",
  "exportStandards",
  "importStandards",
  "mimeTypeFor"
] as const

describe('export — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('export'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 15 name(s) — a silent drop changes the count', () => {
    expect(faceOf('export').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('export')
    expect(new Set(live).size).toBe(live.length)
  })
})
