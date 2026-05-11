/**
 * ISO 8601 date-time validator + coercer tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-8601-1:2019 date-time
 * @see src/standards/iso-8601/validate.ts
 * @see src/standards/iso-8601/coerce.ts
 */

import { describe, it, expect } from 'vitest'
import { isIso8601, toIso8601 } from '@/standards/iso-8601'

describe('ISO 8601 dates', () => {
  it('accepts date-only YYYY-MM-DD', () => {
    expect(isIso8601('2026-01-15')).toBe(true)
  })
  it('accepts full timestamp with Z', () => {
    expect(isIso8601('2026-01-15T10:30:00Z')).toBe(true)
  })
  it('accepts timestamp with timezone offset', () => {
    expect(isIso8601('2026-01-15T10:30:00+02:00')).toBe(true)
    expect(isIso8601('2026-01-15T10:30:00-05:00')).toBe(true)
  })
  it('accepts millisecond precision', () => {
    expect(isIso8601('2026-01-15T10:30:00.123Z')).toBe(true)
  })
  it('rejects MM/DD/YYYY style', () => {
    expect(isIso8601('01/15/2026')).toBe(false)
  })
  it('rejects calendar-invalid dates', () => {
    expect(isIso8601('2026-13-01')).toBe(false)
    expect(isIso8601('2026-02-30')).toBe(false)
  })
})

describe('toIso8601 coercer', () => {
  it('passes through Date instances', () => {
    expect(toIso8601(new Date('2026-01-15T00:00:00Z'))).toBe('2026-01-15T00:00:00.000Z')
  })
  it('parses ISO strings', () => {
    expect(toIso8601('2026-01-15')).toBe('2026-01-15T00:00:00.000Z')
  })
  it('returns null for invalid input', () => {
    expect(toIso8601('not a date')).toBe(null)
    expect(toIso8601(undefined)).toBe(null)
    expect(toIso8601(null)).toBe(null)
  })
  it('returns null for invalid Date', () => {
    expect(toIso8601(new Date('invalid'))).toBe(null)
  })
})
