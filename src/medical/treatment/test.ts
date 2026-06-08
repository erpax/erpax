import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/treatment'

describe('medical/treatment — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('treatment')
    expect(CANONICAL).toBe('treatment')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/treatment')
  })
})
