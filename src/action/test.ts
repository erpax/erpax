import { describe, it, expect } from 'vitest'
import { action, atomPath } from '@/action'

describe('action — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(action).toBe('action')
    expect(atomPath).toBe('action')
  })
})
