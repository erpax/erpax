import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/allergies'

describe('medical/allergies — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('allergies')
    expect(CANONICAL).toBe('allergies')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/allergies')
  })
})
