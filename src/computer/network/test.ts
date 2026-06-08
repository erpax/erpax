import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/computer/network'

describe('computer/network — vocabulary pivot', () => {
  it('names the part and its canonical atom', () => {
    expect(PART).toBe('network')
    expect(CANONICAL).toBe('network')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/network')
  })
})
