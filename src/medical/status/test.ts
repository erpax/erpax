import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/status'

describe('medical/status — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('status')
    expect(CANONICAL).toBe('status')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/status')
    expect(reexportFrom).toBe('@/status')
  })
})
