import { describe, it, expect } from 'vitest'
import { abdomen, atomPath } from '@/abdomen'

describe('abdomen — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(abdomen).toBe('abdomen')
    expect(atomPath).toBe('abdomen')
  })
})
