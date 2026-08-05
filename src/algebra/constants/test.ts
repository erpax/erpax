import { describe, it, expect } from 'vitest'
import { THEOREMS } from './index'

describe('algebra/constants', () => {
  it('THEOREMS has doubling and additive', () => {
    expect(THEOREMS).toHaveLength(2)
    expect(THEOREMS[0]?.name).toBe('doubling')
    expect(THEOREMS[1]?.name).toBe('additive')
  })
})
