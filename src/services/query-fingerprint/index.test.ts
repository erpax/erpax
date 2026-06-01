/**
 * Query fingerprint — round-trip + canonicalisation tests.
 *
 * Slice KKKKKKKKK-cut2 (2026-05-11). Pins the user's directive 'every
 * db query is a sql string. strings have uuid':
 *
 *   1. Two semantically-identical SQL strings differing only in
 *      whitespace / comments / keyword casing produce the SAME
 *      queryUuid.
 *   2. Different params produce DIFFERENT queryUuids.
 *   3. Different tenants produce DIFFERENT queryUuids for the same
 *      SQL (per-tenant namespace from Slice RRRRR).
 *   4. String-literal content is preserved exactly (spaces inside
 *      'foo  bar' matter and must not collapse).
 *   5. `runWithFingerprint` computes queryUuid + resultUuid + timing
 *      around an arbitrary executor.
 *
 * @standard ISO/IEC 9075-2 SQL/Foundation keyword inventory
 * @standard RFC 8785 JSON Canonicalization Scheme (params)
 * @audit Conservation Law 8 + Law 47 (content uuid at the type level)
 */
import { describe, it, expect } from 'vitest'
import {
  canonicalizeSql,
  computeQueryUuid,
  runWithFingerprint,
} from './index'

describe('canonicalizeSql', () => {
  it('collapses whitespace runs to single spaces (outside string literals)', () => {
    const a = 'select   *\n  from  invoices'
    const b = 'select * from invoices'
    expect(canonicalizeSql(a)).toBe(canonicalizeSql(b))
  })

  it('upper-cases reserved keywords; leaves identifiers untouched', () => {
    const c = canonicalizeSql('select Id, Customer_Name from Invoices where Status = 1')
    expect(c).toBe('SELECT Id, Customer_Name FROM Invoices WHERE Status = 1')
  })

  it('strips line comments and block comments', () => {
    const a = `
      -- top-level comment
      SELECT * /* inline block */ FROM invoices
      /* multi
         line */
      WHERE id = 1
    `
    const b = 'SELECT * FROM invoices WHERE id = 1'
    expect(canonicalizeSql(a)).toBe(canonicalizeSql(b))
  })

  it('preserves whitespace and case INSIDE string literals', () => {
    const a = "select * from t where note = 'Hello   World'"
    const b = "select * from t where note = 'Hello   World'"
    const c1 = canonicalizeSql(a)
    const c2 = canonicalizeSql(b)
    expect(c1).toBe(c2)
    expect(c1).toContain("'Hello   World'")
  })

  it('drops trailing semicolons', () => {
    expect(canonicalizeSql('SELECT 1;')).toBe('SELECT 1')
    expect(canonicalizeSql('SELECT 1 ;;;')).toBe('SELECT 1')
  })
})

describe('computeQueryUuid', () => {
  const tenantId = 'tenant-1'

  it('produces the same uuid for queries that canonicalise to the same form', () => {
    const u1 = computeQueryUuid({
      sql: 'select * from invoices where id = 1',
      tenantId,
    })
    const u2 = computeQueryUuid({
      sql: '  SELECT  *  FROM   invoices\n  WHERE\n    id = 1  -- trailing comment',
      tenantId,
    })
    expect(u1).toBe(u2)
  })

  it('produces different uuids for different params', () => {
    const u1 = computeQueryUuid({
      sql: 'select * from invoices where id = $1',
      params: { 1: 100 },
      tenantId: 'tenant-1',
    })
    const u2 = computeQueryUuid({
      sql: 'select * from invoices where id = $1',
      params: { 1: 200 },
      tenantId: 'tenant-1',
    })
    expect(u1).not.toBe(u2)
  })

  it('produces different uuids for different tenants (per-tenant namespace)', () => {
    const sql = 'SELECT count(*) FROM invoices'
    const u1 = computeQueryUuid({ sql, tenantId: 'tenant-1' })
    const u2 = computeQueryUuid({ sql, tenantId: 'tenant-2' })
    expect(u1).not.toBe(u2)
  })

  it('is stable across re-invocations (deterministic — no clock or randomness)', () => {
    const args = { sql: 'select 1', tenantId: 'tenant-1' }
    expect(computeQueryUuid(args)).toBe(computeQueryUuid(args))
  })

  it('treats params with re-ordered object keys as the same query (RFC 8785 canonical)', () => {
    const u1 = computeQueryUuid({
      sql: 'select * from t where a = $1 and b = $2',
      params: { a: 'x', b: 'y' },
      tenantId: 'tenant-1',
    })
    const u2 = computeQueryUuid({
      sql: 'select * from t where a = $1 and b = $2',
      params: { b: 'y', a: 'x' },
      tenantId: 'tenant-1',
    })
    expect(u1).toBe(u2)
  })
})

describe('runWithFingerprint', () => {
  it('returns queryUuid, resultUuid, elapsedMs around an executor', async () => {
    const exec = await runWithFingerprint<{ docs: Array<{ id: string }> }>({
      sql: 'select id from invoices limit 2',
      tenantId: 'tenant-1',
      exec: async () => ({ docs: [{ id: 'a' }, { id: 'b' }] }),
    })
    expect(exec.queryUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
    expect(exec.resultUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
    expect(exec.queryUuid).not.toBe(exec.resultUuid)
    expect(exec.rowCount).toBe(2)
    expect(exec.elapsedMs).toBeGreaterThanOrEqual(0)
  })

  it('produces the same resultUuid for byte-equal results (replication consensus)', async () => {
    const rows = [{ id: 'a' }, { id: 'b' }]
    const a = await runWithFingerprint({
      sql: 'select id from invoices',
      tenantId: 'tenant-1',
      exec: async () => ({ docs: rows }),
    })
    const b = await runWithFingerprint({
      sql: 'select id from invoices',
      tenantId: 'tenant-1',
      exec: async () => ({ docs: rows }),
    })
    expect(a.resultUuid).toBe(b.resultUuid)
    expect(a.queryUuid).toBe(b.queryUuid)
  })

  it('supports dry-run mode (no executor) for cache-key pre-computation', async () => {
    const exec = await runWithFingerprint({
      sql: 'select 1',
      tenantId: 'tenant-1',
      // no exec
    })
    expect(exec.queryUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
    expect(exec.result).toBeNull()
  })
})
