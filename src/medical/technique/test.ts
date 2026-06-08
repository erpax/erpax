import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/technique'

describe('medical/technique — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('technique')
    expect(CANONICAL).toBe('technique')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/technique')
  })
})
