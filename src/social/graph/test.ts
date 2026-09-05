import { describe, it, expect } from 'vitest'
import { isReciprocal, resolveReciprocity } from '@/social/graph'

describe('social-graph reciprocity — real behaviour on the universal edge', () => {
  it('opposite-direction same-context edges are reciprocal', () => {
    expect(isReciprocal({ from: 'a', to: 'b', context: 'follow' }, { from: 'b', to: 'a', context: 'follow' })).toBe(true)
  })

  it('same direction is NOT reciprocal', () => {
    expect(isReciprocal({ from: 'a', to: 'b', context: 'follow' }, { from: 'a', to: 'b', context: 'follow' })).toBe(false)
  })

  it('different context is NOT reciprocal', () => {
    expect(isReciprocal({ from: 'a', to: 'b', context: 'follow' }, { from: 'b', to: 'a', context: 'block' })).toBe(false)
  })

  it('a self-loop is never reciprocal', () => {
    expect(isReciprocal({ from: 'a', to: 'a', context: 'follow' }, { from: 'a', to: 'a', context: 'follow' })).toBe(false)
  })

  it('mutual follow upgrades to friend; one-way follow stays follow', () => {
    const mutual = resolveReciprocity({ from: 'a', to: 'b', context: 'follow' }, [{ from: 'b', to: 'a', context: 'follow' }])
    expect(mutual).toEqual({ reciprocal: true, context: 'friend' })

    const oneWay = resolveReciprocity({ from: 'a', to: 'b', context: 'follow' }, [])
    expect(oneWay).toEqual({ reciprocal: false, context: 'follow' })
  })
})
