import { describe, it, expect } from 'vitest'
import { atomPath } from './index'

describe('cross/index', () => {
  it('reciprocal cross path', () => {
    expect(atomPath).toBe('cross/index')
  })
})
