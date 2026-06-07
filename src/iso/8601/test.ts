import { describe, it, expect } from 'vitest'
import { isIso8601, toIso8601, formatDateTime } from '@/iso/8601'

describe('iso/8601 — validate / coerce / format', () => {
  describe('isIso8601 — shape + parse + calendar round-trip', () => {
    it('accepts a calendar date and a full date-time', () => {
      expect(isIso8601('2026-06-07')).toBe(true)
      expect(isIso8601('2026-06-07T12:30:00Z')).toBe(true)
      expect(isIso8601('2026-06-07T12:30:00.123+02:00')).toBe(true)
    })

    it('rejects a calendar-invalid date that silently rolls over', () => {
      expect(isIso8601('2026-02-30')).toBe(false)
    })

    it('rejects free-form / non-string input', () => {
      expect(isIso8601('07/06/2026')).toBe(false)
      expect(isIso8601('not a date')).toBe(false)
      expect(isIso8601(20260607 as unknown)).toBe(false)
    })
  })

  describe('toIso8601 — coerce date-ish input to canonical UTC, else null', () => {
    it('coerces Date, ISO string, and epoch number', () => {
      expect(toIso8601(new Date(0))).toBe('1970-01-01T00:00:00.000Z')
      expect(toIso8601('2026-06-07T00:00:00Z')).toBe('2026-06-07T00:00:00.000Z')
      expect(toIso8601(0)).toBe('1970-01-01T00:00:00.000Z')
    })

    it('returns null for null/undefined, invalid input, and non-date types', () => {
      expect(toIso8601(null)).toBe(null)
      expect(toIso8601(undefined)).toBe(null)
      expect(toIso8601('not a date')).toBe(null)
      expect(toIso8601(new Date('nope'))).toBe(null)
      expect(toIso8601({} as unknown)).toBe(null)
    })
  })

  describe('formatDateTime — legacy MM/DD/YYYY display', () => {
    it('formats a timestamp as zero-padded MM/DD/YYYY (local fields)', () => {
      const d = new Date(2026, 0, 5) // local Jan 5 2026
      expect(formatDateTime(d.toISOString())).toBe('01/05/2026')
    })
  })
})
