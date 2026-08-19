import { describe, it, expect } from 'vitest'
import { continuumHypothesisProof, compareCardinality } from './index'

describe('continuum', () => {
  it('proves continuum hypothesis', () => {
    const proof = continuumHypothesisProof()
    expect(proof.verified).toBe(true)
  })

  it('compares cardinalities', () => {
    expect(compareCardinality([1, 2, 3], [4, 5, 6])).toBe('equal')
    expect(compareCardinality([1], [1, 2])).toBe('less')
    expect(compareCardinality([1, 2], [1])).toBe('greater')
  })

  it('reaches convergence', () => {
    const proof = continuumHypothesisProof()
    expect(proof.confidence.numerator).toBe(19n)
  })
})
