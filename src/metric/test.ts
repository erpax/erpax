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
