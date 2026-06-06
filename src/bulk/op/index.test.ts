/**
 * Bulk operations service — wiring gate. Proves the unified import/export contract
 * actually writes through Payload: an audit-events row on enqueue, and a
 * transaction-failures row when a row mapper throws. Pure (a fake Payload records
 * create() calls); no DB.
 *
 * @standard ISO 20022 + EN-16931 + RFC 4180 (the formats the contract unifies)
 * @audit ISO-19011:2018 audit-trail bulk-ops-evidence
 * @see ./index.ts ; src/agents/mcp/tool-defs.ts (erpax.bulk.enqueue)
 */
import { describe, it, expect } from 'vitest'
import { enqueueBulkOperation, processRow } from '@/bulk/op'
import type { Payload } from 'payload'

type CreateCall = { collection: string; data: Record<string, unknown> }

/** A fake Payload that records every create() and lets a test fail specific collections. */
function fakePayload(failOn: ReadonlySet<string> = new Set()): { payload: Payload; calls: CreateCall[] } {
  const calls: CreateCall[] = []
  const payload = {
    async create(args: { collection: string; data: Record<string, unknown> }) {
      if (failOn.has(args.collection)) throw new Error(`boom: ${args.collection}`)
      calls.push({ collection: args.collection, data: args.data })
      return { id: `doc-${calls.length}` }
    },
  } as unknown as Payload
  return { payload, calls }
}

describe('bulk/op: enqueue writes an audit-events row (wiring gate)', () => {
  it('records an audit-events row with eventType bulk:import:queued and operation import', async () => {
    const { payload, calls } = fakePayload()
    const result = await enqueueBulkOperation(payload, {
      tenantId: 't1',
      targetCollection: 'invoices',
      kind: 'import',
      format: 'csv',
      sourceUrl: 'r2://imports/a.csv',
    })
    expect(result.status).toBe('queued')
    expect(result.operationId).toBeTruthy()

    const audit = calls.find((c) => c.collection === 'audit-events')
    expect(audit).toBeDefined()
    expect(audit!.data.eventType).toBe('bulk:import:queued')
    expect(audit!.data.operation).toBe('import') // BULK_KIND_TO_AUDIT_OPERATION['import']
    expect(audit!.data.collectionSlug).toBe('invoices')
  })

  it('maps reprocess/reverse to the update audit-operation (mutations of existing docs)', async () => {
    const { payload, calls } = fakePayload()
    await enqueueBulkOperation(payload, { tenantId: 't1', targetCollection: 'invoices', kind: 'reprocess', format: 'json' })
    const audit = calls.find((c) => c.collection === 'audit-events')
    expect(audit!.data.eventType).toBe('bulk:reprocess:queued')
    expect(audit!.data.operation).toBe('update')
  })

  it('is best-effort — never throws even if the audit write fails', async () => {
    const { payload } = fakePayload(new Set(['audit-events']))
    await expect(
      enqueueBulkOperation(payload, { tenantId: 't1', targetCollection: 'invoices', kind: 'export', format: 'csv' }),
    ).resolves.toMatchObject({ status: 'queued' })
  })
})

describe('bulk/op: processRow writes a transaction-failures row on a mapper failure (wiring gate)', () => {
  it('writes a transaction-failures row with statusCode IMPORT_ROW_FAILED when the target create throws', async () => {
    // The target collection create() throws; transaction-failures create() succeeds.
    const { payload, calls } = fakePayload(new Set(['invoices']))
    const out = await processRow(payload, {
      operationId: 'op-1',
      rowIndex: 7,
      targetCollection: 'invoices',
      row: { foo: 'bar' },
      mapped: { foo: 'bar' },
    })
    expect(out.success).toBe(false)
    const failure = calls.find((c) => c.collection === 'transaction-failures')
    expect(failure).toBeDefined()
    expect(failure!.data.statusCode).toBe('IMPORT_ROW_FAILED')
    expect(failure!.data.reference).toBe('op-1:row-7')
    expect(failure!.data.sourceCollection).toBe('invoices')
    expect(failure!.data.status).toBe('open')
  })

  it('returns the created id on a successful row (no failure row written)', async () => {
    const { payload, calls } = fakePayload()
    const out = await processRow(payload, {
      operationId: 'op-2',
      rowIndex: 0,
      targetCollection: 'invoices',
      row: { a: 1 },
      mapped: { a: 1 },
    })
    expect(out.success).toBe(true)
    expect(out.createdId).toBeTruthy()
    expect(calls.find((c) => c.collection === 'transaction-failures')).toBeUndefined()
  })
})
