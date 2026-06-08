import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/computer/hardware'

describe('computer/hardware — vocabulary pivot', () => {
  it('names the part and its canonical atom', () => {
    expect(PART).toBe('hardware')
    expect(CANONICAL).toBe('hardware')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/hardware')
  })
})
