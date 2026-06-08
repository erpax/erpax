import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/contraindication'

describe('medical/contraindication — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('contraindication')
    expect(CANONICAL).toBe('contraindication')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/contraindication')
  })
})
