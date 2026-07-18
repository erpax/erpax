import { describe, it, expect } from 'vitest'
import { atomPath, trendOf, sequenceOf } from '@/wave/audit'

describe('wave/audit — the reciprocal face', () => {
  it('names its path and carries the audit-wave surface', () => {
    expect(atomPath).toBe('wave/audit')
    expect(trendOf(2, 1)).toBe('improving')
    expect(sequenceOf([])).toEqual([])
  })
})
