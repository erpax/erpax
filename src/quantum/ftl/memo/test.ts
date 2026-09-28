import { describe, it, expect } from 'vitest'
import { memoCensus, timeTwice } from './index'

// The thresholds are stated HERE, not imported: reading them back from the module would assert its
// own literal ([[rules]]/mirror). These are the behaviours they are supposed to produce.
const FREE_ENOUGH = 0.05
const TOO_FAST_TO_JUDGE_MS = 5

/** Burn a measurable, non-memoized amount of time — the same work on every call. */
const burn = (n: number) => (): number => {
  let s = 0
  for (let i = 0; i < n; i++) s += i
  return s
}

describe('quantum/ftl/memo — asking twice', () => {
  it('a re-derived answer is named as such: the second ask costs about the first', () => {
    const v = timeTwice('burn', burn(12_000_000))
    expect(v.firstMs).toBeGreaterThanOrEqual(TOO_FAST_TO_JUDGE_MS)
    expect(v.shape).toBe('rederives')
    expect(v.reaskRatio).toBeGreaterThan(0.5)
  })

  it('a memoized answer realises the amortisation the model promises', () => {
    let calls = 0
    let cached: number | null = null
    const once = (): number => {
      if (cached === null) {
        calls++
        cached = burn(12_000_000)()
      }
      return cached
    }
    const v = timeTwice('memo', once)
    expect(calls).toBe(1) // the second ask really did not recompute
    expect(v.shape).toBe('memoized')
    expect(v.reaskRatio).toBeLessThan(FREE_ENOUGH)
    // c₀/(m+1) with one reuse is c₀/2, and (first+second)/2 ≈ c₀/2 when the second is free.
    expect(v.realisedAmortisation).toBeGreaterThan(0.9)
  })

  it('realised amortisation sits at the FLOOR when no reuse happens at all', () => {
    // Half is the floor, not a pass: predicted c₀/2 against a measured c₀ per answer.
    const v = timeTwice('burn', burn(12_000_000))
    expect(v.realisedAmortisation).toBeGreaterThan(0.4)
    expect(v.realisedAmortisation).toBeLessThan(0.6)
  })

  it('too fast to judge is UNMEASURED, never a pass', () => {
    // A trivially cached lookup once measured 6 % purely because both asks rounded near zero, and
    // reporting that as "partial reuse" would be answering a question that could not be asked.
    const n = 1
    const v = timeTwice('trivial', () => n)
    expect(v.firstMs).toBeLessThan(TOO_FAST_TO_JUDGE_MS)
    expect(v.shape).toBe('unmeasured')
  })

  it('a re-ask that costs MORE is not partial reuse — it lands with the re-derivers', () => {
    // JIT and GC can make the second pass slower; a ratio above 1 is noise, never a receipt.
    let first = true
    const colder = (): number => {
      const n = first ? 4_000_000 : 16_000_000
      first = false
      return burn(n)()
    }
    const v = timeTwice('colder', colder)
    expect(v.reaskRatio).toBeGreaterThan(1)
    expect(v.shape).toBe('rederives')
  })
})

describe('quantum/ftl/memo — the census', () => {
  it('splits the operations and bills the cost of one extra ask', () => {
    let cached: number | null = null
    const c = memoCensus([
      ['rederives', burn(12_000_000)],
      ['memoized', () => (cached ??= burn(12_000_000)())],
    ])
    expect(c.rederives).toEqual(['rederives'])
    expect(c.memoized).toEqual(['memoized'])
    expect(c.reaskCostMs).toBeGreaterThan(0)
    expect(c.rows[0]!.secondMs).toBeGreaterThanOrEqual(c.rows[c.rows.length - 1]!.secondMs) // dearest first
  })

  it('an unmeasured row is reported separately, not counted as memoized', () => {
    const n = 1
    const c = memoCensus([['trivial', () => n]])
    expect(c.unmeasured).toEqual(['trivial'])
    expect(c.memoized).toEqual([])
  })
})
