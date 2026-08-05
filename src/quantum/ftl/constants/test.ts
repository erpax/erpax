import { describe, it, expect } from 'vitest'
import { atomPath, BOUNDARY } from './index'

describe('quantum/ftl/constants', () => {
  it('atomPath is quantum/ftl', () => {
    expect(atomPath).toBe('quantum/ftl')
  })

  it('BOUNDARY is empty by default', () => {
    expect(BOUNDARY.empty).toBe(true)
  })
})
