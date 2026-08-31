import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import {
  harmonyOfBookIndex,
  isHarmonicIndex,
  indexVolumes,
  bookOfBooksIndexPivotLine,
} from './index'
import { formatBookIndexReport, runBookCli } from './cli'
import { renderBookIndexMarkdown, computeBookIndex } from './compute/index'

describe('book — book-of-books index harmony', () => {
  // Computed ONCE. Every call walks the whole corpus (harmony → planVocabularyFold →
  // wordWithoutLogicViolations), and calling it per assertion took this suite past the 30s
  // timeout on a CI runner while passing locally.
  const harmony = harmonyOfBookIndex()
  const index = computeBookIndex()
  /** Generated faces (README.md) are gitignored and absent in CI — a fold candidate is DERIVED
   *  from them (readmeAgentTouched), so the count is 0 there BY CONSTRUCTION, not by defect. */
  const facesPresent = existsSync(join(process.cwd(), 'src', 'law', 'README.md'))
  it('indexVolumes lists top-level volumes excluding vocabulary hub', { timeout: 120_000 }, () => {
    const volumes = indexVolumes()
    expect(volumes.length).toBeGreaterThan(100)
    expect(volumes).not.toContain('vocabulary')
    expect(volumes).toContain('law')
  })

  it('harmonyOfBookIndex returns score in [0,1] and top hubs by bond', { timeout: 120_000 }, () => {
    const h = harmony
    expect(h.score).toBeGreaterThanOrEqual(0)
    expect(h.score).toBeLessThanOrEqual(1)
    expect(h.metrics.volumeCount).toBe(indexVolumes().length)
    expect(h.topHubs.length).toBeGreaterThan(10)
    expect(h.topHubs[0]!.bond).toBeGreaterThanOrEqual(h.topHubs[1]!.bond)
    if (facesPresent) expect(h.foldCandidates).toBeGreaterThan(0)
    else expect(h.foldCandidates).toBe(0) // no faces ⇒ nothing to fold, and that is the shape CI runs
  })

  it('isHarmonicIndex matches harmonyOfBookIndex verdict', () => {
    const full = harmony
    const verdict = isHarmonicIndex()
    expect(verdict.harmonic).toBe(full.harmonic)
    expect(verdict.score).toBe(full.score)
    expect(verdict.impurities).toEqual(full.impurities)
  })

  it('bookOfBooksIndexPivotLine embeds volume count and harmony score', () => {
    const line = bookOfBooksIndexPivotLine()
    expect(line).toMatch(/book of books index:/)
    expect(line).toMatch(/volumes/)
    expect(line).toMatch(/harmony score/)
  })

  it('book index markdown rows use wordFold and digitFold hex, not quantum prose', { timeout: 120_000 }, () => {
    const md = renderBookIndexMarkdown(index, { maxRows: 3 })
    const row = index.rows[0]!
    expect(md).toContain('word⊗digit')
    expect(md).toContain(`${row.quantum.wordFold}⊗${row.quantum.digitFold}`)
    expect(md).not.toMatch(/quantum mentality|quantum host/i)
  })

  it('formatBookIndexReport and runBookCli --index print harmony report', { timeout: 180_000 }, async () => {
    const report = formatBookIndexReport()
    expect(report).toContain('book of books index')
    expect(report).toContain('top 10 hubs by bond')
    expect(report).toContain('vocabulary fold candidates')
    expect(await runBookCli(['--index'])).toBe(0)
  })
})
