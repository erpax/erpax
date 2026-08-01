import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/folder'

describe('medical/folder — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('folder')
    expect(CANONICAL).toBe('folder')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/folder')
    expect(reexportFrom).toBe('@/folder')
  })
})
