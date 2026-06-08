import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/body/abdomen'

describe('body/abdomen — vocabulary pivot', () => {
  it('names the anatomical part and its canonical atom', () => {
    expect(PART).toBe('abdomen')
    expect(CANONICAL).toBe('abdomen')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/abdomen')
  })
})
