import { describe, it, expect } from 'vitest'
import { credit } from './index'

describe('credit', () => {
  it('exports canonical vocabulary face', () => {
    expect(credit).toBe('credit')
  })
})
