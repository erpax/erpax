import { describe, it, expect } from 'vitest'
import { accept } from './index'

describe('accept', () => {
  it('exports canonical vocabulary face', () => {
    expect(accept).toBe('accept')
  })
})
