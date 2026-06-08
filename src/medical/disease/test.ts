import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/disease'

describe('medical/disease — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('disease')
    expect(CANONICAL).toBe('disease')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/disease')
  })
})
