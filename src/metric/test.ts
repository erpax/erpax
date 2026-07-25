import { describe, it, expect } from 'vitest'
import { quantomize, type Reading } from './index'

// "The metrics need to be quantum also. Quantomize and see." The corpus's classical readings, held AT ONCE in one
// coherent superposition — read as one address, coherent iff no instrument disagrees with itself. "Quantum" is
// the superposition overlay, not quantum metrology; coherence is agreement between instruments, not truth.
describe('metric — quantomize: readings held at once, coherent iff none contradict', () => {
  it('distinct readings held at once are COHERENT — no instrument disagrees with itself', () => {
    const q = quantomize([
      { name: 'concentration', value: 0.598 },
      { name: 'residual', value: 1113 },
      { name: 'commits', value: 40 },
    ])
    expect(q.coherent).toBe(true)
    expect(q.count).toBe(3)
    expect(q.decohered).toEqual([])
  })

  it('two readings of ONE name with DIFFERENT values DECOHERE — a metric reported two ways', () => {
    const q = quantomize([
      { name: 'residual', value: 1113 },
      { name: 'residual', value: 0 }, // the same instrument, two values — a contradiction
    ])
    expect(q.coherent).toBe(false)
    expect(q.decohered).toContain('residual')
  })

  it('two readings of one name with the SAME value agree — coherent (redundant, not contradictory)', () => {
    const q = quantomize([{ name: 'well', value: 2778 }, { name: 'well', value: 2778 }])
    expect(q.coherent).toBe(true)
    expect(q.decohered).toEqual([])
  })

  it('the root is order-independent — the same readings in any order fold to the same quantum metric', () => {
    const a = quantomize([{ name: 'x', value: 1 }, { name: 'y', value: 2 }])
    const b = quantomize([{ name: 'y', value: 2 }, { name: 'x', value: 1 }])
    expect(a.root).toBe(b.root)
    expect(a.root).toMatch(/^[0-9a-f-]{36}$/) // the whole state as one address
  })

  it('coherence is AGREEMENT between instruments, not TRUTH — coherent readings can all be wrong', () => {
    const q = quantomize([{ name: 'a', value: 0 }, { name: 'b', value: 0 }, { name: 'c', value: 0 }])
    expect(q.coherent).toBe(true) // no instrument contradicts itself
    // …but every reading could be a broken zero. Coherence means consistent, never correct.
  })

  it('an empty metric is vacuously coherent — nothing to contradict', () => {
    expect(quantomize([]).coherent).toBe(true)
  })
})

import { foldMetrics } from './index'

describe('foldMetrics — a metric may be a combination of metrics (closed under composition)', () => {
  const a = quantomize([{ name: 'gravity.mass', value: 3 }])
  const b = quantomize([{ name: 'proof.residual', value: 0 }])
  const c = quantomize([{ name: 'pool.money', value: 7 }])
  it('folds sub-metrics into one composite whose readings are the union', () => {
    const whole = foldMetrics([a, b, c])
    expect(whole.count).toBe(3)
    expect(whole.coherent).toBe(true)
    expect(whole.readings.map((r) => r.name).sort()).toEqual(['gravity.mass', 'pool.money', 'proof.residual'])
  })
  it('is closed: a fold of metrics is itself a metric, foldable again — same root', () => {
    const nested = foldMetrics([foldMetrics([a, b]), c])
    const flat = foldMetrics([a, b, c])
    expect(nested.root).toBe(flat.root) // grouping-independent (recursive composition)
  })
  it('order-independent — the composite root depends only on the readings', () => {
    expect(foldMetrics([a, b, c]).root).toBe(foldMetrics([c, a, b]).root)
  })
  it('DECOHERES when a part disagrees with another on the same instrument', () => {
    const three = quantomize([{ name: 'gravity.mass', value: 5 }]) // same name, different value than a
    const whole = foldMetrics([a, three])
    expect(whole.coherent).toBe(false)
    expect(whole.decohered).toContain('gravity.mass')
  })
})

import { accuracy } from './index'

describe('accuracy — a metric measured against the reference (the complement of coherence)', () => {
  const m = quantomize([
    { name: 'vat.rate', value: 20 },
    { name: 'pi', value: 3.14 },
    { name: 'unreferenced', value: 99 },
  ])
  it('an exact reading scores accuracy 1; readings without a reference are not counted', () => {
    const a = accuracy(m, { 'vat.rate': 20, pi: 3.14159 })
    expect(a.referenced).toBe(2) // unreferenced excluded
    const vat = a.errors.find((e) => e.name === 'vat.rate')!
    expect(vat.relError).toBe(0) // exact
  })
  it('aggregate accuracy is the mean of (1 − relError), scale-free', () => {
    const a = accuracy(m, { 'vat.rate': 20, pi: 3.14 }) // both exact
    expect(a.accuracy).toBe(1)
    const b = accuracy(m, { 'vat.rate': 25 }) // 20 vs 25 → relError 0.2 → acc 0.8
    expect(b.accuracy).toBeCloseTo(0.8)
  })
  it('coherence ≠ accuracy: a coherent metric can be inaccurate against a reference (the two failures separate)', () => {
    expect(m.coherent).toBe(true) // instruments agree with each other
    expect(accuracy(m, { 'vat.rate': 9 }).accuracy).toBeLessThan(1) // but disagree with the standard
  })
})
