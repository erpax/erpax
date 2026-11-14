import { describe, it, expect } from 'vitest'
import { PeriodLocks } from '@/collections/period-locks'

// Unified-node invariant test for the `period-locks` collection.
describe('period-locks collection node', () => {
  it('exports a valid collection config', () => {
    expect(PeriodLocks.slug).toBe('period-locks')
    expect(Array.isArray(PeriodLocks.fields)).toBe(true)
    expect(PeriodLocks.fields.length).toBeGreaterThan(0)
  })
  it('reads its closing entries through a join on their periodLock — one link, not two stored lists', () => {
    const field = PeriodLocks.fields.find((f) => 'name' in f && f.name === 'relatedClosingEntries')
    expect(field).toMatchObject({ type: 'join', collection: 'closing-entries', on: 'periodLock' })
  })
})
