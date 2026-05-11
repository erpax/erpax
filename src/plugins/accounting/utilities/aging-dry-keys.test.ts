/**
 * Aging — DRY canonical key wiring.
 *
 * Validates that the four aging consumers (bank-rec, parties.aging,
 * receivables.aging, payables.aging) share the same bucket vocabulary
 * via:
 *
 *   • `bucketAgeDays(days)` returning `current | aging | overdue | stale`
 *   • `parties.DEFAULT_AGING_BUCKETS[i].key` carrying the same vocabulary
 *
 * If these drift, this spec breaks — the SOX evidence pack
 * (`AccountReconciliations.externalAdjustments[].agingBucket`) carries
 * the same enum and the auditor's roll-up across systems falls apart.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
 * @see src/plugins/parties/types.ts DEFAULT_AGING_BUCKETS
 * @see src/plugins/accounting/utilities/calculations.ts bucketAgeDays
 */

import { describe, it, expect } from 'vitest'
import {
  bucketAgeDays,
  daysBetween,
  type AgingBucket,
} from '@/plugins/accounting/utilities/calculations'
import {
  DEFAULT_AGING_BUCKETS,
  daysBetween as partiesDaysBetween,
  type AgingBucketKey,
} from '@/plugins/parties'

describe('aging — DRY canonical bucket key', () => {
  it('parties re-exports the calculations daysBetween (single source of truth)', () => {
    // Functional equivalence — same algorithm, same inputs, same output.
    const from = new Date('2026-01-01')
    const to = new Date('2026-04-15')
    expect(partiesDaysBetween(from, to)).toBe(daysBetween(from, to))
  })

  it('parties.AgingBucketKey is the same type as calculations.AgingBucket', () => {
    // TypeScript-level assertion: both names refer to the same union.
    const key: AgingBucketKey = 'overdue'
    const sameKey: AgingBucket = key
    expect(sameKey).toBe('overdue')
  })

  it('DEFAULT_AGING_BUCKETS[].key matches bucketAgeDays() at every boundary', () => {
    // For each canonical bucket, pick a representative day in-range and
    // verify both ends agree.
    const probes: Array<[number, AgingBucketKey]> = [
      [0, 'current'],
      [30, 'current'],
      [31, 'aging'],
      [60, 'aging'],
      [61, 'overdue'],
      [90, 'overdue'],
      [91, 'stale'],
      [365, 'stale'],
    ]
    for (const [days, expected] of probes) {
      expect(bucketAgeDays(days)).toBe(expected)
      const def = DEFAULT_AGING_BUCKETS.find(
        (b) => days >= b.dayMin && days <= b.dayMax,
      )
      expect(def?.key).toBe(expected)
    }
  })

  it('DEFAULT_AGING_BUCKETS covers all canonical keys exactly once', () => {
    const keys = DEFAULT_AGING_BUCKETS.map((b) => b.key)
    expect(keys).toEqual(['current', 'aging', 'overdue', 'stale'])
  })
})
