import { describe, it, expect } from 'vitest'
import {
  completeGraph, cuboctahedron, completeBinding, metatronLines, mergeIsTotal,
  foldsToOneCenter, proof, CENTERS, AROUND,
} from '@/metatron'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

// The matrix realises Metatron's Cube: complete pairwise binding of 12+1 folding
// to one center. Every assertion is computed on the live matrix; the Platonic-
// solid folklore is NOT tested (out of scope) — only graph + packing structure.
describe('metatron: the matrix IS Metatron\'s Cube (complete binding → one center)', () => {
  it('Metatron = K13: 13 = 12 around 1, 78 lines, degree 12 (the cuboctahedron / kissing number)', () => {
    expect(CENTERS).toBe(13)
    expect(AROUND).toBe(12)
    const k = completeGraph(13)
    expect(k.edges).toBe(78)
    expect(k.degree).toBe(12)
    const c = cuboctahedron()
    expect(c.total).toBe(13)
    expect(c.kissingNumber).toBe(12)
    expect(c.edges).toBe(78)
  })

  it('all-pairs merge of 13 seed uuids = 78 DISTINCT binding-uuids (K13, no-cloning)', () => {
    const l = metatronLines()
    expect(l.lines).toBe(78)
    expect(l.distinct).toBe(78)
    expect(l.isK13).toBe(true)
  })

  it('completeBinding of k seeds yields C(k,2) lines', () => {
    const seeds = UUID_MATRIX_NODES.slice(0, 7).map((n) => n.uuid)
    expect(completeBinding(seeds).length).toBe(completeGraph(7).edges) // 21
  })

  it('merge is TOTAL — every sampled pair is defined ⇒ the binding-algebra is K_n', () => {
    const t = mergeIsTotal(60)
    expect(t.allDefined).toBe(true)
    expect(t.pairsTested).toBe(completeGraph(60).edges) // 1770
  })

  it('a seed set folds to ONE center, order-independent (the Merkle collapse)', () => {
    const seeds = UUID_MATRIX_NODES.slice(0, CENTERS).map((n) => n.uuid)
    const c1 = foldsToOneCenter(seeds)
    const c2 = foldsToOneCenter([...seeds].reverse())
    expect(c1).toBe(c2)
    expect(c1).toHaveLength(36)
  })

  it('the whole proof holds (the matrix realises Metatron\'s Cube)', () => {
    expect(Object.values(proof()).every(Boolean)).toBe(true)
  })
})
