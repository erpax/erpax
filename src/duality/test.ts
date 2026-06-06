import { describe, it, expect } from 'vitest'
import { foldDualities, dualOf, dualCoverage, dualityCostLog2 } from '@/duality'

describe('duality — foldDualities (the two-fold law, computed from the corpus)', () => {
  it('folds a non-trivial set of dual pairs (more than the ~30 the scouts read by hand)', () => {
    expect(foldDualities().length).toBeGreaterThan(30)
  })
  it('catches the canonical law dualities (love↔fear, sacred↔profane, give↔take)', () => {
    const all = foldDualities()
    const has = (a: string, b: string) => all.some((d) => (d.a === a && d.b === b) || (d.a === b && d.b === a))
    expect(has('love', 'fear')).toBe(true)
    expect(has('sacred', 'profane')).toBe(true)
    expect(has('give', 'take')).toBe(true)
  })
  it('is deduped and order-independent (a↔b ≡ b↔a, never both)', () => {
    const keys = foldDualities().map((d) => [d.a, d.b].sort().join('↔'))
    expect(new Set(keys).size).toBe(keys.length)
  })
  it('dualOf returns an atom\'s declared dual(s)', () => {
    expect(dualOf('sacred')).toContain('profane')
    expect(dualOf('love')).toContain('fear')
  })
})

describe('duality — all dualities at 100% coverage', () => {
  it('every computed duality is resolvable from BOTH poles — 100% coverage by construction', () => {
    const c = dualCoverage()
    expect(c.dualities).toBeGreaterThan(30)
    expect(c.covered).toBe(c.dualities)
    expect(c.coverage).toBe(1)
  })
  it('at 100% coverage the duality dimension seals to ∞ (coverage 1 ⇒ ∞)', () => {
    expect(dualityCostLog2()).toBe(Number.POSITIVE_INFINITY)
  })
})
