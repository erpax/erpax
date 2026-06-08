import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/body/foot'

describe('body/foot — vocabulary pivot', () => {
  it('names the anatomical part and its canonical atom', () => {
    expect(PART).toBe('foot')
    expect(CANONICAL).toBe('foot')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/foot')
  })
})
