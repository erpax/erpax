import { describe, it, expect } from 'vitest'
import { collapse, noCloning, quantization, entanglement, entangle } from '@/quantum'

// Quantum laws computed on the live matrix (./index.ts). The held laws are gated;
// entanglement (the asymmetric binding) is the known finding to fix.
describe('quantum: laws computed on the live uuid-matrix', () => {
  it('collapse holds — the Merkle fold is intact (one eigenstate)', () => {
    expect(collapse()).toBe(true)
  })
  it('no-cloning holds — every content-uuid is unique', () => {
    expect(noCloning().holds).toBe(true)
  })
  it('quantization — every atom folds onto the ring (0 off-sequence)', () => {
    expect(quantization().offSequence).toBe(0)
  })
  it('entanglement: the raw binding is asymmetric (the finding); entangle() is symmetric (the fix)', () => {
    expect(entanglement().symmetricBinding).toBe(false)
    expect(entangle('a', 'b')).toBe(entangle('b', 'a'))
  })
})
