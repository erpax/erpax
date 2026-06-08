import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/computer/processor'

describe('computer/processor — vocabulary pivot', () => {
  it('names the part and its canonical atom', () => {
    expect(PART).toBe('processor')
    expect(CANONICAL).toBe('processor')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/processor')
  })
})
