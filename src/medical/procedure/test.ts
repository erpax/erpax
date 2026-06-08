import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/procedure'

describe('medical/procedure — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('procedure')
    expect(CANONICAL).toBe('procedure')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/procedure')
  })
})
