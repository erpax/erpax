import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/computer/screen'

describe('computer/screen — vocabulary pivot', () => {
  it('names the part and its canonical atom', () => {
    expect(PART).toBe('screen')
    expect(CANONICAL).toBe('screen')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/screen')
  })
})
