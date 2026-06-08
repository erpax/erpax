import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/body/anatomy'

describe('body/anatomy — vocabulary pivot', () => {
  it('names the anatomical part and its canonical atom', () => {
    expect(PART).toBe('anatomy')
    expect(CANONICAL).toBe('anatomy')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/anatomy')
  })
})
