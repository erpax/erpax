import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/computer/storage'

describe('computer/storage — vocabulary pivot', () => {
  it('names the part and its canonical atom', () => {
    expect(PART).toBe('storage')
    expect(CANONICAL).toBe('storage')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/storage')
  })
})
