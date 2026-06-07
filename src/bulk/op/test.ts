import { describe, it, expect } from 'vitest'
import type { Payload } from 'payload'
import {
  enqueueBulkOperation,
  processRow,
  type BulkOperationInput,
  type BulkOperationKind,
} from '@/bulk/op'

interface CreateCall {
  collection: string
  data: Record<string, unknown>
}

/**
 * Minimal Payload double — records every `create` call and lets a test
 * make `create` throw for a chosen collection (to exercise fail paths).
 */
function makePayload(opts: { throwOn?: string; returnId?: string } = {}) {
  const calls: CreateCall[] = []
  const create = async (arg: { collection: string; data: Record<string, unknown> }) => {
    calls.push({ collection: arg.collection, data: arg.data })
    if (opts.throwOn && arg.collection === opts.throwOn) {
      throw new Error('boom')
    }
    return { id: opts.returnId ?? 'created-id' }
  }
  return { payload: { create } as unknown as Payload, calls }
}

const baseInput = (overrides: Partial<BulkOperationInput> = {}): BulkOperationInput => ({
  tenantId: 't1',
  targetCollection: 'invoices',
  kind: 'import',
  format: 'csv',
  ...overrides,
})

describe('bulk/op — enqueueBulkOperation', () => {
  it('returns status "queued" and mints a UUID operationId when none supplied', async () => {
    const { payload } = makePayload()
    const res = await enqueueBulkOperation(payload, baseInput())
    expect(res.status).toBe('queued')
    expect(res.operationId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    )
  })

  it('honours a caller-supplied operationId (idempotency key)', async () => {
    const { payload } = makePayload()
    const res = await enqueueBulkOperation(payload, baseInput({ operationId: 'fixed-key' }))
    expect(res.operationId).toBe('fixed-key')
  })

  it('writes an audit-events row carrying the queued event type', async () => {
    const { payload, calls } = makePayload()
    const res = await enqueueBulkOperation(payload, baseInput({ kind: 'export', format: 'xlsx' }))
    const audit = calls.find((c) => c.collection === 'audit-events')
    expect(audit).toBeDefined()
    expect(audit!.data.eventType).toBe('bulk:export:queued')
    expect(audit!.data.eventId).toBe(res.operationId)
    expect(audit!.data.collectionSlug).toBe('invoices')
  })

  it('maps kinds to the canonical audit operation (reprocess/reverse → update)', async () => {
    const cases: Array<[BulkOperationKind, string]> = [
      ['import', 'import'],
      ['export', 'export'],
      ['reprocess', 'update'],
      ['reverse', 'update'],
    ]
    for (const [kind, expected] of cases) {
      const { payload, calls } = makePayload()
      await enqueueBulkOperation(payload, baseInput({ kind }))
      const audit = calls.find((c) => c.collection === 'audit-events')
      expect(audit!.data.operation).toBe(expected)
    }
  })

  it('still returns queued even when the audit write throws (best-effort)', async () => {
    const { payload } = makePayload({ throwOn: 'audit-events' })
    const res = await enqueueBulkOperation(payload, baseInput())
    expect(res.status).toBe('queued')
    expect(res.operationId).toBeTruthy()
  })
})

describe('bulk/op — processRow', () => {
  it('inserts the mapped row and reports success with the created id', async () => {
    const { payload, calls } = makePayload({ returnId: 'row-7' })
    const res = await processRow(payload, {
      operationId: 'op1',
      rowIndex: 0,
      targetCollection: 'invoices',
      row: { a: 1 },
      mapped: { reference: 'INV-1' },
    })
    expect(res.success).toBe(true)
    expect(res.createdId).toBe('row-7')
    expect(calls.some((c) => c.collection === 'invoices')).toBe(true)
  })

  it('on insert failure reports failure and writes a transaction-failures row', async () => {
    const { payload, calls } = makePayload({ throwOn: 'invoices' })
    const res = await processRow(payload, {
      operationId: 'op2',
      rowIndex: 3,
      targetCollection: 'invoices',
      row: { bad: true },
      mapped: { reference: 'INV-X' },
    })
    expect(res.success).toBe(false)
    expect(res.error).toBe('boom')
    const failure = calls.find((c) => c.collection === 'transaction-failures')
    expect(failure).toBeDefined()
    expect(failure!.data.reference).toBe('op2:row-3')
    expect(failure!.data.statusCode).toBe('IMPORT_ROW_FAILED')
    expect(failure!.data.status).toBe('open')
  })
})
