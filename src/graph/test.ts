import { describe, it, expect } from 'vitest'
import { graph, neighbors, reachable } from '@/graph'

describe('graph — directed nodes + edges (the corpus shape)', () => {
  const g = graph([
    ['a', 'b'],
    ['b', 'c'],
    ['a', 'd'],
  ])
  it('infers nodes from the edge endpoints', () => {
    expect(g.nodes).toEqual(new Set(['a', 'b', 'c', 'd']))
  })
  it('neighbors are the direct successors', () => {
    expect(neighbors(g, 'a').sort()).toEqual(['b', 'd'])
    expect(neighbors(g, 'c')).toEqual([])
  })
  it('reachable is the transitive closure (inclusive of start)', () => {
    expect(reachable(g, 'a')).toEqual(new Set(['a', 'b', 'c', 'd']))
    expect(reachable(g, 'c')).toEqual(new Set(['c']))
  })
})
