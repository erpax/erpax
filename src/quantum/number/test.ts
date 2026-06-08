/**
 * quantum/number — rational dot collapses; irrational streams forever.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { decimalTerminates, dotCollapses, irrationalStreamRuns } from '@/quantum/number'

describe('quantum/number — dot collapse law', () => {
  it('decimalTerminates for dyadic-decimal rationals only', () => {
    expect(decimalTerminates(1, 2)).toBe(true)
    expect(decimalTerminates(3, 4)).toBe(true)
    expect(decimalTerminates(1, 3)).toBe(false)
    expect(decimalTerminates(1, 7)).toBe(false)
  })

  it('dotCollapses for all rationals with nonzero denominator', () => {
    expect(dotCollapses(1, 2)).toBe(true)
    expect(dotCollapses(1, 3)).toBe(true)
    expect(dotCollapses(22, 7)).toBe(true)
    expect(dotCollapses(1, 0)).toBe(false)
  })

  it('irrationalStreamRuns — π-class streams never settle (honest model flag)', () => {
    expect(irrationalStreamRuns()).toBe(true)
  })
})
