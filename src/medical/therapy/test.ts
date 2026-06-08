import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/therapy'

describe('medical/therapy — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('therapy')
    expect(CANONICAL).toBe('therapy')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/therapy')
  })
})
