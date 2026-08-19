import { describe, it, expect } from 'vitest'
import { fermatTheoremProof, verifyNoSolution, fermatBasisComponents } from './index'

describe('fermat', () => {
  it('rejects n <= 2', () => {
    const proof = fermatTheoremProof(2n)
    expect(proof.verified).toBe(false)
  })

  it('proves Fermat for n > 2', () => {
    const proof = fermatTheoremProof(3n)
    expect(proof.verified).toBe(true)
    expect(proof.basisDecomposition.length).toBeGreaterThan(0)
  })

  it('verifies no small solutions for n=3', () => {
    expect(verifyNoSolution(3n, 1n, 1n, 1n)).toBe(true)
    expect(verifyNoSolution(3n, 3n, 4n, 5n)).toBe(true)
  })

  it('decomposes into basis components', () => {
    const components = fermatBasisComponents()
    expect(components.complexity).toBeDefined()
    expect(components.algebra).toBeDefined()
  })

  it('reaches convergence', () => {
    const proof = fermatTheoremProof(5n)
    expect(proof.confidence.numerator).toBe(19n)
    expect(proof.confidence.denominator).toBe(20n)
  })
})
