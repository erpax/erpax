import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/condition'

describe('medical/condition — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('condition')
    expect(CANONICAL).toBe('condition')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/condition')
  })
})
