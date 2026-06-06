import { describe, it, expect } from 'vitest'
import { isReciprocal, reciprocate, entangled } from '@/quantum/graph'
import { graph } from '@/graph'

describe('quantum/graph — edges as symmetric entanglement', () => {
  const directed = graph([
    ['a', 'b'],
    ['b', 'c'],
  ])

  it('a one-directional graph is not reciprocal (it has a directional gap)', () => {
    expect(isReciprocal(directed)).toBe(false)
  })
  it('reciprocate closes every edge in both directions', () => {
    const r = reciprocate(directed)
    expect(isReciprocal(r)).toBe(true)
  })
  it('entangled is the connected component (reachable once reciprocated)', () => {
    // c can only reach a and b through the reversed edges
    expect(entangled(directed, 'c')).toEqual(new Set(['a', 'b', 'c']))
  })
})
