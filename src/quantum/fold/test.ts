import { describe, it, expect } from 'vitest'
import { doubleFold, quantumFoldOf, wordFold, digitFold } from './index'

describe('quantum/fold', () => {
  it('wordFold and digitFold return torus halves', () => {
    expect(wordFold('readme')).toBeTypeOf('bigint')
    expect(digitFold('readme')).toBeTypeOf('bigint')
  })

  it('doubleFold packs both halves', () => {
    const f = doubleFold('quantum', true)
    expect(f.combined128).toBeTypeOf('bigint')
    expect(f.superposition).toBe(0)
  })

  it('quantumFoldOf accepts optional partition lines', () => {
    const f = quantumFoldOf('readme', {
      debits: [{ account: 'gap', amount: 1 }],
      credits: [{ account: 'seal', amount: 1 }],
    })
    expect(f.interact64).toBeTypeOf('bigint')
  })
})
