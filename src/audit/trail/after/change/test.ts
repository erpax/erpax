import { describe, it, expect } from 'vitest'
import type { CollectionAfterChangeHook } from 'payload'
import { auditTrailAfterChange } from '@/audit/trail/after/change'

// The afterChange emitter (./index.ts) builds a canonical AuditEntry, logs it to
// the streaming aggregator, and persists a Merkle-chained durable row — never
// blocking the source write. We drive the hook with a stub `req.payload`.

interface LoggerCall {
  obj: Record<string, unknown>
  msg: string
}
interface CreateCall {
  collection: string
  data: Record<string, unknown>
}

function makePayload() {
  const info: LoggerCall[] = []
  const error: LoggerCall[] = []
  const created: CreateCall[] = []
  return {
    spy: { info, error, created },
    payload: {
      logger: {
        info: (obj: Record<string, unknown>, msg: string) => info.push({ obj, msg }),
        error: (obj: Record<string, unknown>, msg: string) => error.push({ obj, msg }),
      },
      // No prior rows → previousHash stays ''.
      find: async () => ({ docs: [] as unknown[] }),
      create: async (args: CreateCall) => {
        created.push(args)
        return { id: 'audit-row-1' }
      },
    },
  }
}

// Call the returned hook with a minimal typed afterChange argument.
function callHook(
  hook: CollectionAfterChangeHook,
  args: {
    doc: Record<string, unknown>
    previousDoc: Record<string, unknown>
    operation: 'create' | 'update'
    req: unknown
  },
) {
  return (hook as (a: typeof args) => Promise<unknown>)(args)
}

describe('audit/trail/after/change — two-channel canonical audit emission', () => {
  it('logs a canonical entry to the streaming channel and returns doc', async () => {
    const { payload, spy } = makePayload()
    const hook = auditTrailAfterChange('invoices')
    const doc = { id: 7, tenant: 'tenant-1', status: 'active' }

    const returned = await callHook(hook, {
      doc,
      previousDoc: { id: 7, tenant: 'tenant-1', status: 'draft' },
      operation: 'update',
      req: { user: { id: 'u9' }, payload },
    })

    expect(returned).toBe(doc)
    expect(spy.info).toHaveLength(1)
    const logged = spy.info[0]
    expect(logged.msg).toBe('audit invoices update')
    expect(logged.obj.audit).toBe(true)
    expect(logged.obj.collection).toBe('invoices')
    expect(logged.obj.operation).toBe('update')
    expect(logged.obj.documentId).toBe(7)
    expect(logged.obj.tenantId).toBe('tenant-1')
    expect(logged.obj.userId).toBe('u9')
    expect(logged.obj.previousStatus).toBe('draft')
    expect(logged.obj.nextStatus).toBe('active')
    expect(typeof logged.obj.id).toBe('string')
    expect(typeof logged.obj.timestamp).toBe('string')
  })

  it('persists a durable audit-events row with a rowHash when tenant + doc id present', async () => {
    const { payload, spy } = makePayload()
    const hook = auditTrailAfterChange('journal-entries')

    await callHook(hook, {
      doc: { id: 'doc-3', tenant: 'tenant-2' },
      previousDoc: {},
      operation: 'create',
      req: { user: { id: 'u1' }, payload },
    })

    expect(spy.created).toHaveLength(1)
    const row = spy.created[0]
    expect(row.collection).toBe('audit-events')
    expect(row.data.eventType).toBe('journal-entries:create')
    expect(row.data.collectionSlug).toBe('journal-entries')
    expect(row.data.documentId).toBe('doc-3')
    expect(row.data.tenant).toBe('tenant-2')
    expect(row.data.previousHash).toBe('')
    // SHA-256 hex digest: 64 lowercase hex chars.
    expect(row.data.rowHash).toMatch(/^[0-9a-f]{64}$/)
  })

  it('skips the durable row when tenant id is absent (guarded)', async () => {
    const { payload, spy } = makePayload()
    const hook = auditTrailAfterChange('settings')

    await callHook(hook, {
      doc: { id: 'doc-9' }, // no tenant
      previousDoc: {},
      operation: 'update',
      req: { user: { id: 'u1' }, payload },
    })

    expect(spy.created).toHaveLength(0)
    expect(spy.info).toHaveLength(1) // streaming channel still fires
  })
})
