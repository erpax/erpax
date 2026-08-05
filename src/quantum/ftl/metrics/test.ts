import { describe, it, expect } from 'vitest'
import { amortize } from './index'

describe('quantum/ftl/metrics', () => {
  it('amortize with 0 tokens scales to infinity', () => {
    const a = amortize(1, 0)
    expect(a.scalesToInfinity).toBe(true)
  })
})
