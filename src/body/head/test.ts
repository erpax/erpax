import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/body/head'

describe('body/head — vocabulary pivot', () => {
  it('names the anatomical part and its canonical atom', () => {
    expect(PART).toBe('head')
    expect(CANONICAL).toBe('head')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/head')
  })
})
