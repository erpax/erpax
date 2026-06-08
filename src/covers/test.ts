import { describe, it, expect } from 'vitest'
import { cover } from '@/cover'

describe('covers — fold into cover', () => {
  it('re-exports cover matter', () => {
    expect(cover).toBe('cover')
  })
})
