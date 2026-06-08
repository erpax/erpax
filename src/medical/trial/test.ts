import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/trial'

describe('medical/trial — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('trial')
    expect(CANONICAL).toBe('trial')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/trial')
  })
})
