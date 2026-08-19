import { describe, it, expect } from 'vitest'
import { fourColorTheoremProof, verifyColoring } from './index'

describe('four', () => {
  it('proves four color theorem', () => {
    const proof = fourColorTheoremProof()
    expect(proof.verified).toBe(true)
    expect(proof.maxColors).toBe(4)
  })

  it('verifies valid coloring', () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0]]
    const colors = new Map([[0, 1], [1, 2], [2, 3]])
    expect(verifyColoring(edges, colors)).toBe(true)
  })

  it('rejects invalid coloring', () => {
    const edges: [number, number][] = [[0, 1]]
    const colors = new Map([[0, 1], [1, 1]])
    expect(verifyColoring(edges, colors)).toBe(false)
  })

  it('reaches convergence', () => {
    const proof = fourColorTheoremProof()
    expect(proof.confidence.numerator).toBe(19n)
  })
})
