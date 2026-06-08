import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/physician'

describe('medical/physician — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('physician')
    expect(CANONICAL).toBe('physician')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/physician')
  })
})
