import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/surgery'

describe('medical/surgery — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('surgery')
    expect(CANONICAL).toBe('surgery')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/surgery')
  })
})
