import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/scholarly'

describe('medical/scholarly — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('scholarly')
    expect(CANONICAL).toBe('scholarly')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/scholarly')
    expect(reexportFrom).toBe('@/scholarly')
  })
})
