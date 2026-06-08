import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/computer/software'

describe('computer/software — vocabulary pivot', () => {
  it('names the part and its canonical atom', () => {
    expect(PART).toBe('software')
    expect(CANONICAL).toBe('software')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/software')
  })
})
