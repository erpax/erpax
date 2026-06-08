import { describe, it, expect } from 'vitest'
import { accommodation, atomPath } from '@/accommodation'

describe('accommodation — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(accommodation).toBe('accommodation')
    expect(atomPath).toBe('accommodation')
  })
})
