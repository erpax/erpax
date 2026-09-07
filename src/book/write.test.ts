import { describe, it, expect } from 'vitest'
import { missingBooks, formatMissingBooksReport, volumeIndexTs } from './write'

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
describe('book/write', () => {
  it('missingBooks lists gaps', { timeout: 120_000 }, () => {
    const r = missingBooks()
    expect(r.entries.length).toBeGreaterThan(0)
    expect(r.entries.length).toBeLessThanOrEqual(40)
  })

  it('volumeIndexTs includes spreadOf', { timeout: 120_000 }, () => {
    expect(volumeIndexTs('atom')).toContain('spreadOf')
  })

  it('formatMissingBooksReport header', { timeout: 120_000 }, () => {
    expect(formatMissingBooksReport()).toContain('missing books')
  })
})
