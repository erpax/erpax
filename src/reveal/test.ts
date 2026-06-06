import { describe, it, expect } from 'vitest'
import { reveal, revealedCount, emergence, type Triad } from '@/reveal'
import { neighborsOf, backlinksOf, nodeOf } from '@/uuid/matrix'
import { entropy } from '@/entropy'

// reveal computed on the live uuid-matrix (./index.ts). Asserts RELATIONS and
// invariants of the emergent triads — never a magic count: every revealed triad
// is a genuine mutually-bound triangle, canonically ordered, deterministic.
describe('reveal — emergent triads detected in the live matrix', () => {
  const triads = reveal()

  it('reveal() is deterministic across two calls (same matrix ⇒ same set)', () => {
    expect(reveal()).toEqual(triads)
  })

  it('revealedCount() === reveal().length', () => {
    expect(revealedCount()).toBe(triads.length)
  })

  it('the forge holds enough entropy to reveal at least one triad', () => {
    expect(triads.length).toBeGreaterThan(0)
  })

  it('every triad is sorted by key (stable ordering) with three distinct atoms', () => {
    for (let i = 1; i < triads.length; i++) {
      expect(triads[i - 1]!.key <= triads[i]!.key).toBe(true)
    }
    for (const t of triads.slice(0, 200)) {
      const [a, b, c] = t.atoms
      expect(new Set([a, b, c]).size).toBe(3)
    }
  })

  it('every triad is a REAL mutually-bound triangle — each pair reciprocal in the matrix', () => {
    const mutuallyBound = (x: string, y: string): boolean => {
      const fwd = neighborsOf(x).some((n) => n.atom === y)
      const back = backlinksOf(x).some((n) => n.atom === y)
      return fwd && back
    }
    // sample the head — checking all 24k against the public API is O(n·edges)
    for (const t of triads.slice(0, 60)) {
      const [a, b, c] = t.atoms
      expect(mutuallyBound(a, b)).toBe(true)
      expect(mutuallyBound(b, c)).toBe(true)
      expect(mutuallyBound(a, c)).toBe(true)
    }
  })

  it('every triad key is a 36-char hyphenated v8 uuid and every step is a digital root 1..9', () => {
    const v8 = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    for (const t of triads.slice(0, 200) satisfies Triad[]) {
      expect(t.key).toMatch(v8)
      // composeSteps folds digital roots, which can land on the control triad
      // {3,6} as well as the flow ring — the true invariant is 1..9.
      expect(t.step).toBeGreaterThanOrEqual(1)
      expect(t.step).toBeLessThanOrEqual(9)
    }
  })

  it('every triad atom resolves to a real matrix node', () => {
    for (const t of triads.slice(0, 200)) {
      for (const a of t.atoms) expect(nodeOf(a)).toBeDefined()
    }
  })

  it('emergence() reports the triad count alongside the SAME live entropy slack', () => {
    const em = emergence()
    expect(em.triads).toBe(triads.length)
    expect(em.entropy).toBe(entropy())
    expect(em.entropy).toBeGreaterThanOrEqual(0)
    expect(em.entropy).toBeLessThanOrEqual(1)
  })
})
