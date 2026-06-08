import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/organization'

describe('medical/organization — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('organization')
    expect(CANONICAL).toBe('organization')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/organization')
    expect(reexportFrom).toBe('@/organization')
  })
})
