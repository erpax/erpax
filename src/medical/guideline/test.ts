import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/guideline'

describe('medical/guideline — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('guideline')
    expect(CANONICAL).toBe('guideline')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/guideline')
  })
})
