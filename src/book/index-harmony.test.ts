import { describe, it, expect } from 'vitest'
import {
  harmonyOfBookIndex,
  isHarmonicIndex,
  indexVolumes,
  bookOfBooksIndexPivotLine,
} from './index'
import { formatBookIndexReport, runBookCli } from './cli'
import { renderBookIndexMarkdown, computeBookIndex } from './compute/index'

describe('book — book-of-books index harmony', () => {
  it('indexVolumes lists top-level volumes excluding vocabulary hub', () => {
    const volumes = indexVolumes()
    expect(volumes.length).toBeGreaterThan(100)
    expect(volumes).not.toContain('vocabulary')
    expect(volumes).toContain('law')
  })

  it('harmonyOfBookIndex returns score in [0,1] and top hubs by bond', () => {
    const h = harmonyOfBookIndex()
    expect(h.score).toBeGreaterThanOrEqual(0)
    expect(h.score).toBeLessThanOrEqual(1)
    expect(h.metrics.volumeCount).toBe(indexVolumes().length)
    expect(h.topHubs.length).toBeGreaterThan(10)
    expect(h.topHubs[0]!.bond).toBeGreaterThanOrEqual(h.topHubs[1]!.bond)
    expect(h.foldCandidates).toBeGreaterThan(0)
  })

  it('isHarmonicIndex matches harmonyOfBookIndex verdict', () => {
    const full = harmonyOfBookIndex()
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

  it('book index markdown rows use wordFold and digitFold hex, not quantum prose', () => {
    const md = renderBookIndexMarkdown(computeBookIndex(), { maxRows: 3 })
    const row = computeBookIndex().rows[0]!
    expect(md).toContain('word⊗digit')
    expect(md).toContain(`${row.quantum.wordFold}⊗${row.quantum.digitFold}`)
    expect(md).not.toMatch(/quantum mentality|quantum host/i)
  })

  it('formatBookIndexReport and runBookCli --index print harmony report', async () => {
    const report = formatBookIndexReport()
    expect(report).toContain('book of books index')
    expect(report).toContain('top 10 hubs by bond')
    expect(report).toContain('vocabulary fold candidates')
    expect(await runBookCli(['--index'])).toBe(0)
  })
})
