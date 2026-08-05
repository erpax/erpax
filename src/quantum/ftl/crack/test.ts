import { describe, it, expect } from 'vitest'
import { boundary } from './index'

describe('quantum/ftl/crack', () => {
  it('empty boundary is empty', () => {
    const b = boundary([])
    expect(b.empty).toBe(true)
  })
})
