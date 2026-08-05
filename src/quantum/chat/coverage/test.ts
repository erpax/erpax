import { describe, it, expect } from 'vitest'
import { coverage } from './index'

describe('quantum/chat/coverage', () => {
  it('coverage on empty candidates is 1', () => {
    expect(coverage([], [])).toBe(1)
  })
})
