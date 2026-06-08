import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/drug'

describe('medical/drug — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('drug')
    expect(CANONICAL).toBe('drug')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/drug')
  })
})
