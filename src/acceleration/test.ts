import { describe, it, expect } from 'vitest'
import { acceleration, atomPath } from '@/acceleration'

describe('acceleration — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(acceleration).toBe('acceleration')
    expect(atomPath).toBe('acceleration')
  })
})
