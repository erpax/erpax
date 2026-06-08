import { describe, it, expect } from 'vitest'
import { cover } from './index'

describe('cover', () => {
  it('exports canonical vocabulary face', () => {
    expect(cover).toBe('cover')
  })
})
