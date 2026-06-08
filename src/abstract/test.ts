import { describe, it, expect } from 'vitest'
import { abstract, atomPath } from '@/abstract'

describe('abstract — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(abstract).toBe('abstract')
    expect(atomPath).toBe('abstract')
  })
})
