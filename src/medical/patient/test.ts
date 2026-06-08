import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/patient'

describe('medical/patient — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('patient')
    expect(CANONICAL).toBe('patient')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/patient')
  })
})
