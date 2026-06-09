import { describe, it, expect } from 'vitest'
import { WORD, atomPath } from './index'

describe('eu', () => {
  it('hub constants', () => {
    expect(WORD).toBe('eu')
    expect(atomPath).toBe('eu')
  })
})
