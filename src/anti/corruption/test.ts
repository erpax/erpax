import { describe, it, expect } from 'vitest'
import {
  detectTamper,
  detectSodViolation,
  detectImbalance,
  detectIllegalErasure,
  scanTransaction,
} from '@/anti/corruption'

// The four architectural impossibilities, each proven to CATCH a concrete
// corruption attempt (the SKILL law: fraud is a contradiction that fails a
// pure check, never a record trusted-then-audited).
describe('anti-corruption — four invariants foreclose corruption by construction', () => {
  describe('1 · content-uuid immutability (detectTamper)', () => {
    it('matching uuids are untampered', () => {
      expect(detectTamper('uuid-x', 'uuid-x')).toEqual({ tampered: false })
    })
    it('a recomputed uuid that differs from stored is tamper', () => {
      expect(detectTamper('stored', 'recomputed').tampered).toBe(true)
    })
  })

  describe('2 · segregation of duties (detectSodViolation)', () => {
    const mustDiffer = [['creator', 'approver'] as const, ['approver', 'payer'] as const]

    it('three distinct actors satisfy four-eyes', () => {
      const r = detectSodViolation(
        { creator: 'alice', approver: 'bob', payer: 'carol' },
        mustDiffer,
      )
      expect(r.violation).toBe(false)
      expect(r.conflicts).toEqual([])
    })
    it('same actor on a must-differ pair is a conflict', () => {
      const r = detectSodViolation(
        { creator: 'alice', approver: 'alice', payer: 'carol' },
        mustDiffer,
      )
      expect(r.violation).toBe(true)
      expect(r.conflicts).toContainEqual(['creator', 'approver'])
    })
    it('an unassigned role defeats four-eyes just as the same actor does', () => {
      const r = detectSodViolation(
        { creator: 'alice', approver: null, payer: 'carol' },
        mustDiffer,
      )
      expect(r.violation).toBe(true)
      expect(r.conflicts).toContainEqual(['creator', 'approver'])
    })
  })

  describe('3 · double-entry balance (detectImbalance)', () => {
    it('Σdebit = Σcredit nets to a balanced posting', () => {
      const r = detectImbalance([{ debit: 100 }, { credit: 100 }])
      expect(r.balanced).toBe(true)
      expect(r.debit).toBe(100)
      expect(r.credit).toBe(100)
      expect(r.delta).toBe(0)
      expect(r.dualLines).toEqual([])
    })
    it('Σdebit ≠ Σcredit is an imbalance with a nonzero delta', () => {
      const r = detectImbalance([{ debit: 100 }, { credit: 90 }])
      expect(r.balanced).toBe(false)
      expect(r.delta).toBe(10)
    })
    it('a line carrying both debit and credit is malformed — never balanced', () => {
      const r = detectImbalance([{ debit: 50, credit: 50 }])
      expect(r.balanced).toBe(false)
      expect(r.dualLines).toEqual([0])
    })
    it('null/missing sides count as zero', () => {
      const r = detectImbalance([{ debit: null }, { credit: undefined }])
      expect(r.debit).toBe(0)
      expect(r.credit).toBe(0)
      expect(r.balanced).toBe(true)
    })
  })

  describe('4 · no-delete / reversal-only (detectIllegalErasure)', () => {
    it('deleting a posted record is always illegal', () => {
      const r = detectIllegalErasure('delete', true)
      expect(r.illegal).toBe(true)
      expect(r.reason).toContain('reversal-only')
    })
    it('a content-mutating update of a posted record is illegal', () => {
      expect(detectIllegalErasure('update', true, true).illegal).toBe(true)
    })
    it('a non-mutating update of a posted record stays legal (reversal-as-update)', () => {
      expect(detectIllegalErasure('update', true, false)).toEqual({ illegal: false })
    })
    it('create is always legal; delete of an unposted record is legal', () => {
      expect(detectIllegalErasure('create', true, true).illegal).toBe(false)
      expect(detectIllegalErasure('delete', false).illegal).toBe(false)
    })
  })

  describe('scanTransaction — all four run at once; any finding is a corruption signal', () => {
    const cleanTx = {
      storedUuid: 'u1',
      recomputedUuid: 'u1',
      assignments: { creator: 'alice', approver: 'bob', payer: 'carol' },
      mustDiffer: [['creator', 'approver'] as const, ['approver', 'payer'] as const],
      lines: [{ debit: 100 }, { credit: 100 }],
    }

    it('a clean transaction yields no findings', () => {
      const r = scanTransaction(cleanTx)
      expect(r.clean).toBe(true)
      expect(r.findings).toEqual([])
    })

    it('a tampered + SoD-breached + unbalanced tx surfaces all three findings', () => {
      const r = scanTransaction({
        storedUuid: 'u1',
        recomputedUuid: 'u2',
        assignments: { creator: 'alice', approver: 'alice', payer: 'carol' },
        mustDiffer: [['creator', 'approver'] as const, ['approver', 'payer'] as const],
        lines: [{ debit: 100 }, { credit: 90 }],
      })
      expect(r.clean).toBe(false)
      expect(r.findings).toHaveLength(3)
      expect(r.findings.some((f) => f.includes('content-uuid mismatch'))).toBe(true)
      expect(r.findings.some((f) => f.includes('segregation-of-duties'))).toBe(true)
      expect(r.findings.some((f) => f.includes('unbalanced posting'))).toBe(true)
    })
  })
})
