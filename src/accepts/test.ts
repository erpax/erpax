import { describe, it, expect } from 'vitest'
import { accept } from '@/accept'

describe('accepts — fold into accept', () => {
  it('re-exports accept matter', () => {
    expect(accept).toBe('accept')
  })
})
