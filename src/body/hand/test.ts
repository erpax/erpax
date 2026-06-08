import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/body/hand'

describe('body/hand — vocabulary pivot', () => {
  it('names the anatomical part and its canonical atom', () => {
    expect(PART).toBe('hand')
    expect(CANONICAL).toBe('hand')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/hand')
  })
})
