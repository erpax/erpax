import { describe, it, expect } from 'vitest'
import canUseDom from '@/can/use/dom'

// The DOM guard (./index.ts) is true only when window + window.document +
// window.document.createElement all exist. It must faithfully reflect the
// current runtime (vitest's `node` environment has no `window`).

describe('can/use/dom — DOM availability guard', () => {
  it('is a boolean', () => {
    expect(typeof canUseDom).toBe('boolean')
  })

  it('matches the live runtime check', () => {
    const expected = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
    expect(canUseDom).toBe(expected)
  })

  it('is false in a runtime with no window (node)', () => {
    // Guard: only assert the node-env invariant when there genuinely is no window.
    if (typeof window === 'undefined') {
      expect(canUseDom).toBe(false)
    }
  })
})
