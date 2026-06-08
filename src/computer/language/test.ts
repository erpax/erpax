import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/computer/language'

describe('computer/language — vocabulary pivot', () => {
  it('names the computer facet and its canonical atom', () => {
    expect(PART).toBe('language')
    expect(CANONICAL).toBe('language')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/language')
    expect(reexportFrom).toBe('@/language')
  })
})
