import { describe, it, expect } from 'vitest'
import { forward, backward, digitsOf, pathValue, balanced } from '@/mirror'

describe('mirror — the horo as path read both ways', () => {
  it('forward and backward are different paths (different word-order)', () => {
    expect(forward('dual/torus/fusion')).toEqual(['dual', 'torus', 'fusion'])
    expect(backward('dual/torus/fusion')).toEqual(['fusion', 'torus', 'dual'])
    expect(forward('a/b/c')).not.toEqual(backward('a/b/c'))
  })
  it('the path VALUE is direction-invariant — same L→R and R→L (the sum commutes)', () => {
    for (const p of ['dual/torus/fusion', 'quantum/cross', 'device/vitepress/payload/db']) {
      expect(balanced(p)).toBe(true)
      expect(pathValue(p)).toBe(pathValue(backward(p).join('/')))
    }
  })
  it('the value is a digital root (1..9)', () => {
    const v = pathValue('dual/torus/fusion')
    expect(v).toBeGreaterThanOrEqual(1)
    expect(v).toBeLessThanOrEqual(9)
  })
  it('the digit-path reverses with the word-path', () => {
    const f = digitsOf(forward('a/b/c'))
    expect(digitsOf(backward('a/b/c'))).toEqual([...f].reverse())
  })
})
