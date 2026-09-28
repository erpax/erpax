import { describe, it, expect } from 'vitest'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { forgetMemos, inputKey, memoCensus, memoized, timeTwice } from './index'

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
    // The clock is injected, so this asserts the CLASSIFICATION and not the runner. Timing the real
    // thing made it a test about the machine: a CI box finished 12M iterations under the 5 ms floor and
    // landed in `unmeasured`, red on three pushes, with nothing wrong in the code it was guarding.
    const ticks = [0, 100, 100, 200] // first ask 100ms, second ask 100ms
    let i = 0
    const v = timeTwice('burn', () => undefined, () => ticks[i++] ?? 0)
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
    // Half is the floor, not a pass: predicted c₀/2 against a measured c₀ per answer. Clock injected —
    // the arithmetic is the claim, and timing a loop makes it a claim about the runner instead.
    const t = [0, 100, 100, 200]
    let k = 0
    const v = timeTwice('burn', () => undefined, () => t[k++] ?? 0)
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
    const t2 = [0, 50, 50, 250] // first 50ms, second 200ms — a ratio above 1, stated not timed
    let k2 = 0
    const v = timeTwice('colder', colder, () => t2[k2++] ?? 0)
    expect(v.reaskRatio).toBeGreaterThan(1)
    expect(v.shape).toBe('rederives')
  })
})

describe('quantum/ftl/memo — the census', () => {
  it('splits the operations and bills the cost of one extra ask', () => {
    let cached: number | null = null
    // 4 ticks per ask, in census order: rederives 100/100, memoized 100/0.
    const t = [0, 100, 100, 200, 200, 300, 300, 300]
    let k = 0
    const c = memoCensus(
      [
        ['rederives', burn(1)],
        ['memoized', () => (cached ??= 1)],
      ],
      () => t[k++] ?? 300,
    )
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

/**
 * A memo's correctness is its INVALIDATION. A key that can miss an edit returns a stale verdict, and
 * a wrong gate is worse than a slow one — so this is the test that matters most here.
 */
describe('quantum/ftl/memo — the input address', () => {
  const probe = join(process.cwd(), 'src/quantum/ftl/memo/index.ts')

  it('an edit MOVES the key, so the answer is recomputed', () => {
    const before = inputKey(process.cwd(), 'ts')
    const original = readFileSync(probe, 'utf8')
    try {
      writeFileSync(probe, `${original}\n// memo soundness probe\n`)
      forgetMemos()
      expect(inputKey(process.cwd(), 'ts')).not.toBe(before)
    } finally {
      writeFileSync(probe, original)
      forgetMemos()
    }
    // Restoring the BYTES does not restore the address, because mtime moved — and that is the
    // property, not a defect. A stat key is CONSERVATIVE: it can report a change where the content is
    // identical (a touch, a checkout, a restore), so it errs toward an extra recompute and never
    // toward a stale answer. A content key would be exact here and is what a cross-process memo on
    // disk needs; in-process it could not see the edit at all, which is why this one is stat.
    expect(inputKey(process.cwd(), 'ts')).not.toBe(before)
  })

  it('is stable while nothing changes — otherwise every ask would recompute', () => {
    expect(inputKey(process.cwd(), 'ts')).toBe(inputKey(process.cwd(), 'ts'))
  })

  it('the two surfaces are different addresses, because they cover different files', () => {
    expect(inputKey(process.cwd(), 'ts')).not.toBe(inputKey(process.cwd(), 'src'))
  })

  it('a label is part of the address, so two gates under one key do not collide', () => {
    const k = 'fixed-key'
    expect(memoized('gateA', k, () => 'a')).toBe('a')
    expect(memoized('gateB', k, () => 'b')).toBe('b')
    expect(memoized('gateA', k, () => 'CHANGED')).toBe('a') // sealed under its own label
    forgetMemos()
  })
})
