import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/recommendation'

describe('medical/recommendation — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('recommendation')
    expect(CANONICAL).toBe('recommendation')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/recommendation')
    expect(reexportFrom).toBe('@/recommendation')
  })
})
