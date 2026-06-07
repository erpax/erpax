import { describe, it, expect } from 'vitest'
import { IntercompanyReconciliation } from '@/intercompany/consolidation'

// Intercompany consolidation (ASC 810-10-45 / IFRS-10): a payable in one entity must
// equal the matching receivable in the other (the IC balance nets to zero), and only
// then can the group consolidate. Unreconciled balances spawn elimination entries
// (payable + receivable sides) that must be approved before posting. The readiness
// verdict is content-addressed (chainLeafUuid) so the consolidation proof is tamper-evident.
describe('intercompany/consolidation — IntercompanyReconciliation: payable=receivable nets to zero', () => {
  it('a balance reconciles iff payable equals receivable within tolerance', () => {
    const ok = IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'EUR', 1000, 1000)
    expect(ok.isReconciled).toBe(true)
    expect(ok.difference).toBe(0)
    expect(ok.reconciledDate).toBeTruthy()

    const off = IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'EUR', 1000, 950)
    expect(off.isReconciled).toBe(false)
    expect(off.difference).toBe(50)
    expect(off.reconciledDate).toBeUndefined()
  })

  it('elimination entries are prepared only for unreconciled balances, two sides each', () => {
    const balances = [
      IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'EUR', 1000, 1000), // reconciled
      IntercompanyReconciliation.validateIntercompanyBalance('A', 'C', 'EUR', 500, 400), // unreconciled
    ]
    const elims = IntercompanyReconciliation.prepareEliminationEntries(balances, '2026-05-31')
    // only the unreconciled A↔C pair yields eliminations: one payable + one receivable
    expect(elims).toHaveLength(2)
    expect(elims.map((e) => e.accountType).sort()).toEqual(['payable', 'receivable'])
    expect(elims[0].eliminationAmount).toBe(500) // payable side
    expect(elims[1].eliminationAmount).toBe(400) // receivable side
    expect(elims.every((e) => e.preparedDate === '2026-05-31')).toBe(true)
    // sequence numbers are distinct and 1-indexed
    expect(elims.map((e) => e.sequenceNumber)).toEqual([1, 2])
  })

  it('a fully reconciled set produces no elimination entries', () => {
    const balances = [
      IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'EUR', 1000, 1000),
    ]
    expect(IntercompanyReconciliation.prepareEliminationEntries(balances, '2026-05-31')).toHaveLength(0)
  })

  it('consolidation is ready only when every entity is closed AND every IC balance reconciles', () => {
    const ready = IntercompanyReconciliation.assessConsolidationReadiness(
      [
        { entityId: 'A', closingStatus: 'finalized' },
        { entityId: 'B', closingStatus: 'posted' },
      ],
      [IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'EUR', 1000, 1000)],
    )
    expect(ready.allEntitiesClosed).toBe(true)
    expect(ready.allIntercompanyReconciled).toBe(true)
    expect(ready.unreconciledCount).toBe(0)
    expect(ready.errors).toHaveLength(0)
    expect(ready.eliminationEntries).toHaveLength(0)
    expect(ready.chainLeafUuid).toBeTruthy()
  })

  it('an unclosed entity OR an unreconciled balance blocks readiness with errors', () => {
    const notReady = IntercompanyReconciliation.assessConsolidationReadiness(
      [
        { entityId: 'A', closingStatus: 'finalized' },
        { entityId: 'B', closingStatus: 'in-progress' }, // not closed
      ],
      [IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'EUR', 1000, 900)], // not reconciled
    )
    expect(notReady.allEntitiesClosed).toBe(false)
    expect(notReady.allIntercompanyReconciled).toBe(false)
    expect(notReady.unreconciledCount).toBe(1)
    expect(notReady.errors.some((e) => e.includes('Unclosed entities'))).toBe(true)
    expect(notReady.errors.some((e) => e.includes('Unreconciled intercompany'))).toBe(true)
    // the unreconciled pair spawns elimination entries (payable + receivable)
    expect(notReady.eliminationEntries).toHaveLength(2)
  })

  it('matchIntercompanyTransactions pairs equal amounts on the same entity pair (either direction)', () => {
    const { matchedPairs, unmatchedPayables, unmatchedReceivables } =
      IntercompanyReconciliation.matchIntercompanyTransactions(
        [
          { fromEntity: 'A', toEntity: 'B', amount: 1000, date: '2026-05-01' },
          { fromEntity: 'A', toEntity: 'C', amount: 250, date: '2026-05-02' },
        ],
        [
          // reverse direction, same amount ⇒ matches the A→B payable
          { fromEntity: 'B', toEntity: 'A', amount: 1000, date: '2026-05-01' },
        ],
      )
    expect(matchedPairs).toHaveLength(1)
    expect(matchedPairs[0].payable.amount).toBe(1000)
    // the unmatched A→C payable remains, no receivable left
    expect(unmatchedPayables).toHaveLength(1)
    expect(unmatchedPayables[0].toEntity).toBe('C')
    expect(unmatchedReceivables).toHaveLength(0)
  })

  it('readiness verdict is content-addressed — same verdict ⇒ same leaf, different verdict ⇒ different leaf', () => {
    const bals = [IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'EUR', 1, 1)]
    const ready = IntercompanyReconciliation.assessConsolidationReadiness(
      [{ entityId: 'A', closingStatus: 'finalized' }],
      bals,
    )
    const readyAgain = IntercompanyReconciliation.assessConsolidationReadiness(
      [{ entityId: 'A', closingStatus: 'finalized' }],
      bals,
    )
    expect(readyAgain.chainLeafUuid).toBe(ready.chainLeafUuid)
    // a not-closed entity flips allEntitiesClosed ⇒ a different content fingerprint
    const notReady = IntercompanyReconciliation.assessConsolidationReadiness(
      [{ entityId: 'A', closingStatus: 'in-progress' }],
      bals,
    )
    expect(notReady.chainLeafUuid).not.toBe(ready.chainLeafUuid)
  })
})
