import { describe, it, expect } from 'vitest'
import { entangle, reciprocity, noCloning, isFullyEntangled } from '@/entanglement'

// The link field, computed on the live matrix: symmetric (entangle is order-free) +
// no-cloning (every content-uuid unique) + fully reciprocal (the ER=EPR geometry closed).
describe('entanglement — the link field is symmetric + obeys no-cloning + whole', () => {
  it('entangle is order-independent — the binding is symmetric, (a,b) = (b,a)', () => {
    expect(entangle('alpha', 'beta')).toBe(entangle('beta', 'alpha'))
  })
  it('reciprocity is a fraction in [0,1]; the matrix is fully entangled (every edge reciprocal)', () => {
    const r = reciprocity()
    expect(r).toBeGreaterThanOrEqual(0)
    expect(r).toBeLessThanOrEqual(1)
    expect(isFullyEntangled()).toBe(true)
    expect(r).toBe(1)
  })
  it('no-cloning: every content-uuid is unique — a meaning cannot be cloned into two identities', () => {
    expect(noCloning()).toBe(true)
  })
})
