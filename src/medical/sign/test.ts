import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/sign'

describe('medical/sign — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('sign')
    expect(CANONICAL).toBe('sign')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/sign')
    expect(reexportFrom).toBe('@/sign')
  })
})
