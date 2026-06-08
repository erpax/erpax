import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/prescription'

describe('medical/prescription — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('prescription')
    expect(CANONICAL).toBe('prescription')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/prescription')
  })
})
