import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/clinic'

describe('medical/clinic — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('clinic')
    expect(CANONICAL).toBe('clinic')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/clinic')
  })
})
