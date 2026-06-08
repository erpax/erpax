import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/body/leg'

describe('body/leg — vocabulary pivot', () => {
  it('names the anatomical part and its canonical atom', () => {
    expect(PART).toBe('leg')
    expect(CANONICAL).toBe('leg')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/leg')
  })
})
