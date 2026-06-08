import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/body/arm'

describe('body/arm — vocabulary pivot', () => {
  it('names the anatomical part and its canonical atom', () => {
    expect(PART).toBe('arm')
    expect(CANONICAL).toBe('arm')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/arm')
  })
})
