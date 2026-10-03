import { describe, expect, it } from 'vitest'

import { MILLENNIUM } from '@/millennium'
import { bsdRanks, coverageGaps, datasets, eulerProduct, perspectives, refusals, riemannCounting, testClayData } from './index'

/** The first ten zeros of ζ, as Odlyzko publishes them — a hermetic slice of the public table. */
const ZEROS = ['14.134725142', '21.022039639', '25.010857580', '30.424876126', '32.935061588', '37.586178159', '40.918719012', '43.327073281', '48.005150881', '49.773832478']
  .map((z) => `     ${z}`)
  .join('\n')

const CURVES = (rows: { lmfdb_label: string; rank: number; analytic_rank: number }[]): string =>
  JSON.stringify({ table: 'ec_curvedata', data: rows })

const PRIMES = JSON.stringify([{ number: 40, data: '2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271' }])

describe('millennium/data — every statement is tested on a public dataset or refused with a reason', () => {
  it('coverage is total: no Clay problem is silently neither', () => {
    expect(coverageGaps()).toEqual([])
    expect(new Set([...datasets().map((d) => d.problem), ...refusals().map((r) => r.problem)])).toEqual(new Set(MILLENNIUM.map((p) => p.name)))
  })

  it('Riemann–von Mangoldt holds on the first ten zeros to within 1, and a non-table is refused', () => {
    const w = riemannCounting(ZEROS)
    expect(w.witnesses).toBe(10)
    expect(w.worst).toBeLessThan(1)
    expect(w.holds).toBe(true)
    expect(riemannCounting('3\n2\n1').holds).toBe(false)
  })

  it('BSD on LMFDB: rank equals analytic rank on every sampled curve — and one disagreement is a counterexample, named', () => {
    const ok = bsdRanks(CURVES([{ lmfdb_label: '11.a1', rank: 0, analytic_rank: 0 }, { lmfdb_label: '37.a1', rank: 1, analytic_rank: 1 }, { lmfdb_label: '389.a1', rank: 2, analytic_rank: 2 }]))
    expect(ok.holds).toBe(true)
    expect(ok.witnesses).toBe(3)
    const bad = bsdRanks(CURVES([{ lmfdb_label: '11.a1', rank: 0, analytic_rank: 0 }, { lmfdb_label: 'x.a1', rank: 1, analytic_rank: 0 }]))
    expect(bad.holds).toBe(false)
    expect(bad.note).toContain('x.a1')
    expect(bsdRanks(CURVES([])).holds).toBe(false) // an empty sample witnesses nothing
  })

  it('Euler product over the OEIS primes meets the Dirichlet series within 2/P — no π enters', () => {
    const w = eulerProduct(PRIMES)
    expect(w.witnesses).toBe(58)
    expect(w.worst).toBeLessThanOrEqual(w.bound)
    expect(w.holds).toBe(true)
    expect(eulerProduct(JSON.stringify([{ data: '2,3' }])).holds).toBe(false) // too few primes to witness anything
  })

  it('an unreachable dataset is reported unreachable — never a pass, never a failure of the formula', async () => {
    const rows = await testClayData(async (url) => {
      if (url.includes('lmfdb')) return CURVES([{ lmfdb_label: '11.a1', rank: 0, analytic_rank: 0 }])
      if (url.includes('oeis')) return PRIMES
      throw new Error('offline')
    })
    expect(rows).toHaveLength(datasets().length)
    const riemann = rows.find((r) => r.source.startsWith('Odlyzko'))!
    expect(riemann.reachable).toBe(false)
    expect(riemann.witness).toBeNull()
    expect(riemann.receipt).toBe('')
    const bsd = rows.find((r) => r.problem === 'Birch–Swinnerton-Dyer')!
    expect(bsd.reachable).toBe(true)
    expect(bsd.witness?.holds).toBe(true)
    expect(bsd.receipt).toMatch(/^[0-9a-f-]{36}$/)
  })
})

describe('millennium/data — crossed from every perspective the corpus reads a problem from', () => {
  const views = perspectives()

  it('every problem has a view, and a lensed problem names at least one atom that exists', () => {
    expect(views.map((v) => v.problem)).toEqual(MILLENNIUM.map((p) => p.name))
    for (const v of views) {
      const lensed = MILLENNIUM.find((p) => p.name === v.problem)!.lens.includes('[[')
      if (lensed) expect(v.lensAtoms.length).toBeGreaterThan(0)
      expect(v.danglingLens).toEqual([]) // a lens pointing at a missing atom is a dead citation
    }
  })

  it('every problem is either tested or refused, and the two never overlap', () => {
    for (const v of views) {
      expect(v.tested || v.refused !== null).toBe(true)
      if (v.tested) expect(v.refused).toBeNull()
    }
  })

  it('the referrers are read from the grammar, with the standards each cites', () => {
    const refs = views[0]!.referrers
    expect(refs.length).toBeGreaterThan(0)
    for (const r of refs) {
      expect(r.file.startsWith('src/')).toBe(true)
      expect(Array.isArray(r.standards)).toBe(true)
    }
  })
})

/**
 * The live datasets. Unreachable is a note, never a pass — the canonical precedent: an unasked question
 * is not an answer. Reachable and failing would be a counterexample to a Millennium statement on public
 * data, which is the one outcome this file exists to be able to report.
 */
describe('millennium/data — the public datasets, live', () => {
  it('every reachable dataset holds its formula; every unreachable one says so', async () => {
    const rows = await testClayData()
    for (const row of rows) {
      if (!row.reachable) {
        console.log(`millennium/data — ${row.source} unreachable: ${row.note}`)
        continue
      }
      console.log(`millennium/data — ${row.problem}: ${row.witness!.witnesses} witnesses · worst ${row.witness!.worst} ≤ ${row.witness!.bound} · receipt ${row.receipt}`)
      expect(row.witness!.holds, `${row.problem}: ${row.witness!.note}`).toBe(true)
    }
  }, 120_000)
})
