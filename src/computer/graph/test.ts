import { describe, it, expect } from 'vitest'
import { adjacencyFromAtom, edgesFromAtom, hasBond, reachableAtoms } from '@/computer/graph'

describe('computer/graph — matrix adjacency', () => {
  it('edgesFromAtom maps matrix out-neighbors to directed edges', () => {
    const edges = edgesFromAtom('merge')
    expect(edges.length).toBeGreaterThan(0)
    expect(edges.every(([from, to]) => from === 'merge' && typeof to === 'string')).toBe(true)
  })

  it('adjacencyFromAtom builds a graph with merge as a node', () => {
    const g = adjacencyFromAtom('merge')
    expect(g.nodes.has('merge')).toBe(true)
    expect(g.edges.length).toBeGreaterThan(0)
  })

  it('reachableAtoms includes the start atom', () => {
    const seen = reachableAtoms('merge')
    expect(seen.has('merge')).toBe(true)
  })

  it('hasBond reflects matrix binding presence', () => {
    const edges = edgesFromAtom('merge')
    if (edges.length > 0) {
      const [, to] = edges[0]!
      expect(hasBond('merge', to)).toBe(true)
    }
    expect(hasBond('merge', '__nonexistent_atom__')).toBe(false)
  })
})
