/**
 * quantum/society — content-uuid social facts; double-entry balance.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { socialFactUuid, doubleEntryBalanced, reversibleOrderHolds } from '@/quantum/society'

describe('quantum/society — trust ledger civics', () => {
  it('socialFactUuid content-addresses social facts', () => {
    const f = { kind: 'identity', payload: { id: 'agent-1' } }
    expect(socialFactUuid(f)).toBe(socialFactUuid(f))
  })

  it('doubleEntryBalanced requires debit = credit', () => {
    expect(doubleEntryBalanced({ kind: 'vote', payload: {}, debit: 1, credit: 1 })).toBe(true)
    expect(doubleEntryBalanced({ kind: 'vote', payload: {}, debit: 1, credit: 0 })).toBe(false)
  })

  it('reversibleOrderHolds rejects unbalanced or fear entries', () => {
    const ok = [{ kind: 'consensus', payload: {}, debit: 2, credit: 2 }]
    expect(reversibleOrderHolds(ok)).toBe(true)
    expect(reversibleOrderHolds([...ok, { kind: 'fear', payload: {}, debit: 1, credit: 1 }])).toBe(false)
  })
})
