import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/specialty'

describe('medical/specialty — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('specialty')
    expect(CANONICAL).toBe('specialty')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/specialty')
  })
})
