import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { atomPath, planSuites } from '@/receipt/gate'

describe('receipt/gate — the reciprocal face', () => {
  it('names its path and reaches the plan in one hop', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    expect(planSuites([])).toEqual({ changed: [], covered: [] })
  })
})
