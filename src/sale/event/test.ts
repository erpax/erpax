import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * The hook fires EXACTLY when a sale becomes closed — never on an unrelated update
 * to an already-closed sale, which would double-post to the GL and the audit chain.
 * The emitter is mocked: this proves the TRIGGER and the identity, not the transport.
 */
const emit = vi.fn()
vi.mock('@/event/emitter/service', () => ({ eventEmitter: { emit: (e: unknown) => emit(e) } }))

const { emitSaleClosedHook } = await import('./index')

const fire = (doc: Record<string, unknown>, previousDoc?: Record<string, unknown>, operation = 'update') =>
  (emitSaleClosedHook as unknown as (a: unknown) => Promise<unknown>)({ doc, previousDoc, operation })

beforeEach(() => emit.mockClear())

describe('sale/event — the closing membrane', () => {
  it('emits when a sale is created already closed', async () => {
    await fire({ status: 'closed', uuid: 'u1' }, undefined, 'create')
    expect(emit).toHaveBeenCalledTimes(1)
    expect(emit.mock.calls[0]![0]).toMatchObject({ eventType: 'sale:closed', aggregateType: 'sale' })
  })

  it('emits on the transition open → closed', async () => {
    await fire({ status: 'closed', uuid: 'u2' }, { status: 'open' })
    expect(emit).toHaveBeenCalledTimes(1)
  })

  it('does NOT re-emit when an already-closed sale is updated', async () => {
    // Re-emitting here would post the same sale to the GL and audit chain twice.
    await fire({ status: 'closed', uuid: 'u3' }, { status: 'closed' })
    expect(emit).not.toHaveBeenCalled()
  })

  it('does not emit for a sale that is not closed', async () => {
    await fire({ status: 'open', uuid: 'u4' }, { status: 'open' })
    expect(emit).not.toHaveBeenCalled()
  })
})

describe('sale/event — identity is the content-uuid, not the row id', () => {
  it('uses uuid when present — a peer reconciles by content, never by local id', async () => {
    await fire({ status: 'closed', uuid: 'content-uuid', id: 'row-42' }, undefined, 'create')
    expect(emit.mock.calls[0]![0]).toMatchObject({ aggregateId: 'content-uuid' })
  })

  it('falls back to the row id only when there is no uuid', async () => {
    await fire({ status: 'closed', id: 'row-42' }, undefined, 'create')
    expect(emit.mock.calls[0]![0]).toMatchObject({ aggregateId: 'row-42' })
  })

  it('resolves the tenant from a string OR a populated relation', async () => {
    await fire({ status: 'closed', uuid: 'a', tenant: 't-1' }, undefined, 'create')
    expect(emit.mock.calls[0]![0]).toMatchObject({ tenantId: 't-1' })
    emit.mockClear()
    await fire({ status: 'closed', uuid: 'b', tenant: { id: 't-2' } }, undefined, 'create')
    expect(emit.mock.calls[0]![0]).toMatchObject({ tenantId: 't-2' })
  })

  it('never invents a tenant — an unresolvable one is named "unknown"', async () => {
    await fire({ status: 'closed', uuid: 'c' }, undefined, 'create')
    expect(emit.mock.calls[0]![0]).toMatchObject({ tenantId: 'unknown' })
  })
})
