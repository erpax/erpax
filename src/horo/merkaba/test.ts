import { describe, expect, it } from 'vitest'

import {
  MERKABAS,
  affineMaps,
  affineSymmetries,
  digitSymmetries,
  inducedActions,
  merkabaKey,
  merkabaShape,
  sharedTetrahedra,
  tetraKey,
} from './index'

describe('merkaba', () => {
  it('every declared figure has the shape claimed for it — 8 + 2 covering all ten digits', () => {
    for (const m of MERKABAS) {
      const shape = merkabaShape(m)
      expect(shape.union).toBe(8)
      expect(shape.centre).toBe(2)
      expect(shape.cover).toBe(10)
      expect(shape.tetrahedraDisjoint).toBe(true)
      expect(shape.centreDisjoint).toBe(true)
    }
  })

  it('up/down is a labelling, not a fact — the key is the unordered pair', () => {
    const m = MERKABAS[0] as (typeof MERKABAS)[number]
    expect(merkabaKey({ up: m.down, down: m.up })).toBe(merkabaKey(m))
    expect(tetraKey([9, 2, 1, 0])).toBe(tetraKey([0, 1, 2, 9]))
  })

  it('Z/9 CANNOT host these figures — 9 ≡ 0 collapses a tetrahedron to three symbols', () => {
    const dr = (n: number): number => ((n % 9) + 9) % 9
    const collapsed = MERKABAS.filter((m) =>
      [m.up, m.down].some((t) => new Set(t.map(dr)).size < t.length),
    )
    expect(collapsed.map((m) => m.name)).toEqual(['m0', 'm1'])
    // so the horo ring's own AGL(1,Z/9) — order 54 — has no well-defined action here
  })

  it('AGL(1,Z/10) has order 40, and only its identity preserves the merkaba set', () => {
    expect(affineMaps(10)).toHaveLength(40)
    expect(affineSymmetries(10)).toEqual([[1, 0]])
    // 3 does not divide 40, so no orbit of size 3 could have existed in it anyway
    expect(40 % 3).not.toBe(0)
  })

  it('the figures are NOT rigid — 24 digit relabellings preserve the set', () => {
    expect(digitSymmetries()).toHaveLength(24)
  })

  it('but every one of the 24 fixes each figure — the three are never exchanged', () => {
    expect(inducedActions()).toEqual(['0,1,2'])
    // orbit-stabiliser: three orbits of size 1, stabiliser 24 each, 1 × 24 = 24
  })

  it('the incidence is a PATH, not a triangle — m0 is the hinge', () => {
    const shared = sharedTetrahedra()
    expect(shared).toHaveLength(2)
    for (const s of shared) expect(s.figures).toContain('m0')
    expect(shared.flatMap((s) => s.figures).filter((n) => n === 'm0')).toHaveLength(2)
    // m1 and m2 share nothing, so no symmetry can carry one onto the other
  })

  it('four distinct tetrahedra fill six slots — the sharing is what makes them three', () => {
    const distinct = new Set(MERKABAS.flatMap((m) => [tetraKey(m.up), tetraKey(m.down)]))
    expect(distinct.size).toBe(4)
    expect(MERKABAS).toHaveLength(3)
  })

  it('the centres are NOT pairwise disjoint — 4 is the centre of both m0 and m1', () => {
    const centres = MERKABAS.map((m) => m.centre)
    expect(new Set(centres.flat()).size).toBeLessThan(6)
    expect(centres.filter((c) => c.includes(4)).length).toBe(2)
  })
})
