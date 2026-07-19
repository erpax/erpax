import { describe, it, expect } from 'vitest'
import { atomPath, planSuites } from '@/receipt/gate'

describe('receipt/gate — the reciprocal face', () => {
  it('names its path and reaches the plan in one hop', () => {
    expect(atomPath).toBe('receipt/gate')
    expect(planSuites([])).toEqual({ changed: [], covered: [] })
  })
})
