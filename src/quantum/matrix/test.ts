import { describe, it, expect } from 'vitest'
import { cross, bidirectionalCross, adjacencyDensity, reciprocity, centrality, centralityRank, isAdjacent, dimensions, torusComplete } from '@/quantum/matrix'
import { entangle } from '@/quantum'
import { nodeOf, verifyRoot } from '@/uuid/matrix'
import { massOf, well } from '@/gravity'
import { reciprocity as edgeReciprocity } from '@/entanglement'

// The cross-product / entanglement adjacency, computed on the live matrix.
describe('quantum/matrix — the cross-product / entanglement adjacency', () => {
  it('cross is symmetric — one binding-uuid regardless of argument order', () => {
    expect(cross('access', 'all')).toBe(cross('all', 'access'))
  })
  it('cross delegates to the canonical sorted-pair law (entangle over the uuids)', () => {
    const ua = nodeOf('access')!.uuid
    const ub = nodeOf('all')!.uuid
    expect(cross('access', 'all')).toBe(entangle(ua, ub))
  })
  it('cross of an unknown atom is empty', () => {
    expect(cross('__nonexistent__', 'all')).toBe('')
  })
  it('adjacencyDensity is the sparse N² occupancy', () => {
    const d = adjacencyDensity()
    expect(d.potential).toBe(d.nodes * d.nodes)
    expect(d.density).toBeCloseTo(d.edges / (d.nodes * d.nodes), 9)
    expect(d.density).toBeGreaterThan(0)
    expect(d.density).toBeLessThan(0.05)
  })
  it('reciprocity is the maximal-entanglement scalar in [0,1] and equals @/entanglement', () => {
    expect(reciprocity()).toBe(edgeReciprocity())
    expect(reciprocity()).toBeGreaterThanOrEqual(0)
    expect(reciprocity()).toBeLessThanOrEqual(1)
  })
  it('centrality = in-degree (massOf); the top of the rank is the singularity (the well)', () => {
    expect(centrality('merge')).toBe(massOf('merge'))
    expect(centrality('__nonexistent__')).toBe(0)
    expect(centralityRank(1)[0]!.atom).toBe(well().atom)
  })
  it('isAdjacent + bidirectionalCross: a non-edge is false; reciprocity 1 ⇒ realized edges are bidirectional', () => {
    expect(isAdjacent('__nonexistent__', 'all')).toBe(false)
    expect(bidirectionalCross('access', 'all')).toBe(bidirectionalCross('all', 'access')) // symmetric
    if (isAdjacent('access', 'all')) expect(bidirectionalCross('access', 'all')).toBe(true)
  })
})

// The test-coverage law: prove the COMPLETE double-torus across all uuid-chain dimensions, no gaps.
describe('quantum/matrix — the complete double-torus in all dimensions (uuid-chain data features)', () => {
  it('every node closes its ring (prev AND next bound) — the torus has no gap in any dimension', () => {
    const t = torusComplete()
    expect(t.nodes).toBeGreaterThan(0)
    expect(t.ringComplete).toBe(t.nodes)
    expect(t.complete).toBe(true)
  })
  it('a node reports its dimensions; the ring (prev/next) is always present', () => {
    const d = dimensions('merge')
    expect(d.prev).toBe(true)
    expect(d.next).toBe(true)
  })
  it('the double-torus folds to one root (collapse) and the entanglement is whole (reciprocity 1)', () => {
    expect(verifyRoot().ok).toBe(true)
    expect(reciprocity()).toBe(1)
  })
})
