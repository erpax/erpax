import { describe, it, expect } from 'vitest'
import { acceptance, atomPath } from '@/acceptance'

describe('acceptance — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(acceptance).toBe('acceptance')
    expect(atomPath).toBe('acceptance')
  })
})
