import { describe, it, expect } from 'vitest'
import { detectTamper, detectSodViolation, detectImbalance, detectIllegalErasure, scanTransaction } from './index'

describe('anti-corruption — the architecture forecloses corruption (proven)', () => {
  it('1 · tampering is DETECTED: altered content ⇒ content-uuid no longer matches', () => {
    expect(detectTamper('abc', 'abc').tampered).toBe(false)
    expect(detectTamper('abc', 'abc-after-edit').tampered).toBe(true) // someone changed the record
  })

  it('2 · self-approval is CAUGHT: creator = approver breaks four-eyes', () => {
    const clean = detectSodViolation({ creator: 'u1', approver: 'u2', payer: 'u3' }, [['creator', 'approver'], ['approver', 'payer']])
    expect(clean.violation).toBe(false)
    const corrupt = detectSodViolation({ creator: 'u1', approver: 'u1', payer: 'u3' }, [['creator', 'approver']])
    expect(corrupt.violation).toBe(true)
    expect(corrupt.conflicts).toEqual([['creator', 'approver']])
  })

  it('3 · fabricated value is CAUGHT: Σdebit ≠ Σcredit', () => {
    expect(detectImbalance([{ debit: 100 }, { credit: 100 }]).balanced).toBe(true)
    const fab = detectImbalance([{ debit: 100 }, { credit: 90 }]) // 10 conjured from nothing
    expect(fab.balanced).toBe(false)
    expect(fab.delta).toBe(10)
  })

  it('4 · erasing history is FORBIDDEN: a posted record is reversal-only', () => {
    expect(detectIllegalErasure('delete', true).illegal).toBe(true)
    expect(detectIllegalErasure('delete', false).illegal).toBe(false) // unposted draft may be deleted
    expect(detectIllegalErasure('update', true).illegal).toBe(false) // correction via reversal, an update path
  })

  it('2b · unassigned-role bypass is CAUGHT: a missing actor on a must-differ duty defeats four-eyes', () => {
    // approver never assigned ⇒ the gate was never manned ⇒ conflict
    const r = detectSodViolation({ creator: 'u1', approver: null, payer: 'u3' }, [['creator', 'approver'], ['approver', 'payer']])
    expect(r.violation).toBe(true)
    expect(r.conflicts).toEqual([['creator', 'approver'], ['approver', 'payer']])
    // undefined (key absent) is treated identically
    expect(detectSodViolation({ creator: 'u1' }, [['creator', 'approver']]).violation).toBe(true)
  })

  it('3b · a line carrying BOTH debit and credit violates double-entry (never balanced)', () => {
    const dual = detectImbalance([{ debit: 100, credit: 100 }]) // self-nets to delta 0, yet malformed
    expect(dual.delta).toBe(0)
    expect(dual.balanced).toBe(false)
    expect(dual.dualLines).toEqual([0])
    // a clean exclusive-side posting reports no dual lines
    expect(detectImbalance([{ debit: 100 }, { credit: 100 }]).dualLines).toEqual([])
  })

  it('4b · UPDATE-in-place of a posted record is FORBIDDEN when it mutates content', () => {
    expect(detectIllegalErasure('update', true, true).illegal).toBe(true) // rewriting posted content
    expect(detectIllegalErasure('update', true, false).illegal).toBe(false) // reversal-link/status flip path
    expect(detectIllegalErasure('update', false, true).illegal).toBe(false) // unposted draft is freely editable
  })

  it('a corrupt transaction (tampered + self-approved + unbalanced) trips every invariant', () => {
    const r = scanTransaction({
      storedUuid: 'X', recomputedUuid: 'Y',
      assignments: { creator: 'boss', approver: 'boss', payer: 'boss' },
      mustDiffer: [['creator', 'approver'], ['approver', 'payer']],
      lines: [{ debit: 1_000_000 }, { credit: 0 }],
    })
    expect(r.clean).toBe(false)
    expect(r.findings.length).toBe(3) // tamper + SoD + imbalance, all caught
  })

  it('a clean transaction passes', () => {
    const r = scanTransaction({
      storedUuid: 'Z', recomputedUuid: 'Z',
      assignments: { creator: 'a', approver: 'b', payer: 'c' },
      mustDiffer: [['creator', 'approver'], ['approver', 'payer']],
      lines: [{ debit: 500 }, { credit: 500 }],
    })
    expect(r.clean).toBe(true)
  })
})
