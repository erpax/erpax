import { describe, it, expect } from 'vitest'
import {
  harmonyOfBookIndex,
  isHarmonicIndex,
  indexVolumes,
  bookOfBooksIndexPivotLine,
} from './index'
import { formatBookIndexReport, runBookCli } from './cli'
import { renderBookIndexMarkdown, computeBookIndex } from './compute/index'

/*
 * EXPLICIT TIMEOUTS. The module-level `harmonyOfBookIndex()` / `computeBookIndex()` are
 * corpus-wide folds — measured 2026-09-07 at ~18s and ~22s across 3,582 atoms — and the default
 * 30s leaves nothing for the assertions themselves. Two of these suites started timing out in CI
 * once the graph grew by 1,920 edges.
 *
 * One real defect was found and fixed rather than papered over: `seqVsAlpha` ran `alpha.indexOf()`
 * on both sides of a nested pair loop, an O(n³) scan, now a rank map (25s -> 18s). The remainder
 * is honest work — walking every atom — not a hidden quadratic, and the number is stated here so
 * it can be argued with.
 */
describe('book — book-of-books index harmony', () => {
  // Computed ONCE. Every call walks the whole corpus (harmony → planVocabularyFold →
  // wordWithoutLogicViolations), and calling it per assertion took this suite past the 30s
  // timeout on a CI runner while passing locally.
  const harmony = harmonyOfBookIndex()
  const index = computeBookIndex()
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
    // Fold candidates come through planVocabularyFold → wordWithoutLogicViolations, which reads the
    // tracked SKILL.md — so the count is the same on a working tree and a clean checkout (396 on both,
    // 2026-09-11). This branched on README.md and pinned 0 for CI: the old blind spot, asserted.
    expect(h.foldCandidates).toBeGreaterThan(0)
  })

  it('isHarmonicIndex matches harmonyOfBookIndex verdict', { timeout: 120_000 }, () => {
    const full = harmony
    const verdict = isHarmonicIndex()
    expect(verdict.harmonic).toBe(full.harmonic)
    expect(verdict.score).toBe(full.score)
    expect(verdict.impurities).toEqual(full.impurities)
  })

  it('bookOfBooksIndexPivotLine embeds volume count and harmony score', { timeout: 120_000 }, () => {
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
