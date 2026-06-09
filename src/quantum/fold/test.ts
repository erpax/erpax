import { describe, it, expect } from 'vitest'
import { doubleFold } from './index'

describe('quantum/fold', () => {
  it('doubleFold is stable for the same atom path', () => {
    const a = doubleFold('quantum')
    const b = doubleFold('quantum')
    expect(a.wordHalf).toBe(b.wordHalf)
    expect(a.digitHalf).toBe(b.digitHalf)
    expect(a.combined128).toBe(b.combined128)
    expect(a.interact64).toBe(b.interact64)
  })

  it('doubleFold partition superposition is open when unsealed', () => {
    expect(doubleFold('readme', false).superposition).toBe(1)
  })

  it('doubleFold partition superposition collapses when sealed', () => {
    expect(doubleFold('readme', true).superposition).toBe(0)
  })
})
