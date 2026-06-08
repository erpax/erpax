import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/hospital'

describe('medical/hospital — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('hospital')
    expect(CANONICAL).toBe('hospital')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/hospital')
  })
})
