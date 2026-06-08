import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/diagnosis'

describe('medical/diagnosis — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('diagnosis')
    expect(CANONICAL).toBe('diagnosis')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/diagnosis')
  })
})
