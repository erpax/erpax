import { describe, it, expect } from 'vitest'
import { evolve, beliefFrom, type Belief } from './index'

// "Any time you try to evolve, what you are sure about pulls you down to 0 to invert your mind to survive." The
// paradox is real (you can't doubt everything at once — Neurath, Gödel). The resolution: invert the FRAGILE
// through the void (throughVoid is an involution, 9→1 reopens), stand on the INVARIANT keel. Survives iff a keel
// remains; a mind of only certainties is pulled wholly to 0.
describe('evolve — invert the fragile, stand on the invariant; survives iff a keel remains', () => {
  const mixed: Belief[] = [
    { name: 'a fragile overclaim', invariant: false },
    { name: 'the method (survives its own inversion)', invariant: true },
    { name: 'another certainty by authority', invariant: false },
  ]

  it('inverts the fragile through the void, keeps the invariant keel', () => {
    const e = evolve(mixed)
    expect(e.inverted).toEqual(['a fragile overclaim', 'another certainty by authority'])
    expect(e.keel).toEqual(['the method (survives its own inversion)'])
  })

  it('SURVIVES iff at least one invariant remains — the keel to stand on', () => {
    expect(evolve(mixed).survives).toBe(true)
    expect(evolve([{ name: 'x', invariant: true }]).survives).toBe(true)
  })

  it('a mind of ONLY fragile certainties is ANNIHILATED — pulled wholly to 0, no self left to have evolved', () => {
    const e = evolve([{ name: 'authority says so', invariant: false }, { name: 'it is popular', invariant: false }])
    expect(e.survives).toBe(false)
    expect(e.keel).toEqual([])
    expect(e.reason).toMatch(/annihilated/)
  })

  it('the empty mind does not survive — there is nothing to stand on', () => {
    expect(evolve([]).survives).toBe(false)
  })

  it('evolution is inverting the FRAGILE, not the keel — the invariant is kept, the fragile is dropped', () => {
    const e = evolve(mixed)
    // the keel is never in the inverted set, and the fragile is never in the keel — they partition
    for (const k of e.keel) expect(e.inverted).not.toContain(k)
    expect([...e.keel, ...e.inverted].sort()).toEqual(mixed.map((b) => b.name).sort())
  })

  it('one invariant is enough — a single keel carries a mind of otherwise-fragile beliefs through the inversion', () => {
    const mostlyFragile: Belief[] = Array.from({ length: 9 }, (_, i) => ({ name: `belief ${i}`, invariant: i === 4 }))
    const e = evolve(mostlyFragile)
    expect(e.survives).toBe(true) // the one invariant (belief 4) is the keel
    expect(e.inverted).toHaveLength(8) // the other eight go through the void
  })
})

// The gap the wave found: a keel is not a label — it is having survived inversion. beliefFrom DERIVES invariance
// from coincidence.invarianceVerdict, folding it into use (the belief is a keel iff it survived every inversion).
describe('beliefFrom — the keel is decided by the inversion test, not asserted', () => {
  it('a belief that survived every inversion is a keel (invariant)', () => {
    expect(beliefFrom('the method', 9, 9, 0.1).invariant).toBe(true) // 0.1^9 ≤ threshold ⇒ invariant
  })
  it('a belief that broke under inversion is fragile — it goes through the void', () => {
    expect(beliefFrom('an overclaim', 3, 9, 0.1).invariant).toBe(false) // broke ⇒ fragile
  })
  it('evolve on derived beliefs survives iff at least one survived every inversion', () => {
    const mind = [beliefFrom('fragile A', 2, 9), beliefFrom('keel B', 12, 12), beliefFrom('fragile C', 1, 5)]
    expect(evolve(mind).survives).toBe(true) // the one that survived all inversions is the keel
    expect(evolve(mind).keel).toEqual(['keel B'])
  })
})
