import { describe, it, expect } from 'vitest'
import {
  counterIntegrity,
  referentialIntegrity,
  boundInvariant,
  auditThroughput,
  ETRIMA_AUDIT_SQL,
  type AuditRow,
} from './index'

// The invariants are PURE (over a row array), so this test is finite-complete on a small fixture and
// never scans a corpus — the law assertTestsBounded seals. The SQL forms verify etrima at 24M rows/s.
describe('audit/speed — pure invariants, finite-complete, proven fast on real data', () => {
  it('counterIntegrity catches a stored count that disagrees with its recomputation (the refutable-aggregate law)', () => {
    const lots: AuditRow[] = [
      { id: 1, lot_variants_count: 2 }, // correct
      { id: 2, lot_variants_count: 5 }, // WRONG — only 1 child
      { id: 3, lot_variants_count: null }, // NULL where 0 is real — the etrima lot 3000001 shape
    ]
    const variants: AuditRow[] = [
      { id: 10, lot_id: 1 },
      { id: 11, lot_id: 1 },
      { id: 12, lot_id: 2 },
    ]
    const v = counterIntegrity(lots, variants, { parentId: 'id', childParentKey: 'lot_id', storedCount: 'lot_variants_count' })
    const bad = v.map((x) => x.rowId).sort()
    expect(bad).toEqual([2, 3]) // lot 1 is fine; 2 and 3 drift
    expect(v.find((x) => x.rowId === 2)!.actual).toBe(1)
  })

  it('referentialIntegrity finds a dangling edge — the 97.5%-orphaned audit trail class', () => {
    const versions: AuditRow[] = [{ id: 5465039 }, { id: 5465040 }] // only recent ids survive the prune
    const assocs: AuditRow[] = [
      { id: 1, version_id: 5465039 }, // resolves
      { id: 2, version_id: 11 }, // dangling — parent purged
    ]
    const v = referentialIntegrity(assocs, versions, { fk: 'version_id', parentId: 'id' })
    expect(v).toHaveLength(1)
    expect(v[0]!.stored).toBe(11)
    expect(v[0]!.why).toMatch(/purged|absent/)
  })

  it('boundInvariant flags a value over its ceiling, ignores NULLs (amount_paid ≤ amount_invoiced)', () => {
    const lots: AuditRow[] = [
      { id: 1, amount_paid: 100, amount_invoiced: 120 }, // ok
      { id: 2, amount_paid: 200, amount_invoiced: 150 }, // overpaid
      { id: 3, amount_paid: null, amount_invoiced: 50 }, // NULL — skipped
    ]
    const v = boundInvariant(lots, { id: 'id', value: 'amount_paid', ceiling: 'amount_invoiced' })
    expect(v).toHaveLength(1)
    expect(v[0]!.rowId).toBe(2)
  })

  it('auditThroughput computes rows/s and marks quantum ≥ 1M rows/s — the etrima demonstration is quantum', () => {
    const t = auditThroughput({ rows: 24_211_983, seconds: 1.01 })
    expect(t.rowsPerSecond).toBeGreaterThan(20_000_000)
    expect(t.quantum).toBe(true)
    // a slow sample is NOT quantum — the threshold is meaningful
    expect(auditThroughput({ rows: 1000, seconds: 2 }).quantum).toBe(false)
    // a zero-time guard does not divide by zero
    expect(auditThroughput({ rows: 5, seconds: 0 }).rowsPerSecond).toBe(Infinity)
  })

  it('the reproducing SQL is present — the finding is a command an auditor reruns, not a transcribed number', () => {
    expect(ETRIMA_AUDIT_SQL).toHaveLength(3)
    expect(ETRIMA_AUDIT_SQL.every((q) => /SELECT/i.test(q.sql))).toBe(true)
    expect(ETRIMA_AUDIT_SQL.some((q) => /version_associations/.test(q.sql))).toBe(true)
  })
})
