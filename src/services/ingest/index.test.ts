import { describe, it, expect } from 'vitest'
import { planIngest, type AddressedRecord } from './index'

const rec = (uuid: string): AddressedRecord => ({ uuid, target: 'messages', record: { subject: uuid } })

describe('ingest — idempotent, content-addressed (re-fetch is a no-op)', () => {
  it('upserts unseen records, skips seen ones', () => {
    const plan = planIngest([rec('a'), rec('b'), rec('c')], new Set(['b']))
    expect(plan.upsert.map((r) => r.uuid)).toEqual(['a', 'c'])
    expect(plan.skip.map((r) => r.uuid)).toEqual(['b'])
  })

  it('is idempotent — re-running with all-seen yields all skip (no duplicates)', () => {
    const plan = planIngest([rec('a'), rec('b')], new Set(['a', 'b']))
    expect(plan.upsert).toEqual([])
    expect(plan.skip.map((r) => r.uuid)).toEqual(['a', 'b'])
  })

  it('dedups within the batch — the same uuid twice upserts once', () => {
    const plan = planIngest([rec('a'), rec('a'), rec('b')], new Set())
    expect(plan.upsert.map((r) => r.uuid)).toEqual(['a', 'b']) // 'a' collapses to one
    expect(plan.skip).toEqual([])
  })
})
