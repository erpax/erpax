import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { emitOnStatusTransition, emitOnCreate, emitPrSubmitted } from '@/chain/event/emitter'
import { eventEmitter } from '@/event/emitter.service'
import type { DomainEvent } from '@/types/events'

// chain/event/emitter (./index.ts): the wiring layer that turns a status
// transition (or create) into one fired domain event — entry-edge-once,
// tenant-guarded — so declared emits is exactly what fires.

// Minimal afterChange arg: the hooks only touch doc/previousDoc/operation/req.payload.logger.
const logger = { info: () => {}, error: () => {} }
function arg(over: {
  doc: Record<string, unknown>
  previousDoc?: Record<string, unknown> | null
  operation?: 'create' | 'update'
}) {
  return {
    doc: over.doc,
    previousDoc: over.previousDoc ?? null,
    operation: over.operation ?? 'update',
    req: { payload: { logger } },
  } as unknown as Parameters<ReturnType<typeof emitOnStatusTransition>>[0]
}

describe('chain/event/emitter — declared emits become fired events', () => {
  beforeEach(() => {
    eventEmitter.clearHandlers()
    eventEmitter.clearEventLog()
  })
  afterEach(() => {
    eventEmitter.clearHandlers()
    eventEmitter.clearEventLog()
  })

  it('fires once on the entry edge of the target status', async () => {
    const seen: DomainEvent[] = []
    eventEmitter.subscribe('x:done', async (e) => { seen.push(e) })
    const hook = emitOnStatusTransition('done', 'x:done', 'order')

    await hook(arg({ doc: { id: '1', tenant: 't1', status: 'done' }, previousDoc: { id: '1', status: 'open' } }))
    expect(seen.length).toBe(1)
    expect(seen[0]!.eventType).toBe('x:done')
    expect(seen[0]!.tenantId).toBe('t1')
    expect(seen[0]!.aggregateType).toBe('order')
  })

  it('does not re-fire when already in the target status (no entry edge)', async () => {
    const seen: DomainEvent[] = []
    eventEmitter.subscribe('x:done', async (e) => { seen.push(e) })
    const hook = emitOnStatusTransition('done', 'x:done', 'order')

    await hook(arg({ doc: { id: '1', tenant: 't1', status: 'done' }, previousDoc: { id: '1', status: 'done' } }))
    expect(seen.length).toBe(0)
  })

  it('does not fire on the wrong status', async () => {
    const seen: DomainEvent[] = []
    eventEmitter.subscribe('x:done', async (e) => { seen.push(e) })
    const hook = emitOnStatusTransition('done', 'x:done', 'order')

    await hook(arg({ doc: { id: '1', tenant: 't1', status: 'open' }, previousDoc: null }))
    expect(seen.length).toBe(0)
  })

  it('is tenant-guarded — no tenant, no event', async () => {
    const seen: DomainEvent[] = []
    eventEmitter.subscribe('x:done', async (e) => { seen.push(e) })
    const hook = emitOnStatusTransition('done', 'x:done', 'order')

    await hook(arg({ doc: { id: '1', status: 'done' }, previousDoc: { id: '1', status: 'open' } }))
    expect(seen.length).toBe(0)
  })

  it('emitOnCreate fires only on create, resolving object-tenant id', async () => {
    const seen: DomainEvent[] = []
    eventEmitter.subscribe('u:made', async (e) => { seen.push(e) })
    const hook = emitOnCreate('u:made', 'subscription')

    await hook(arg({ doc: { id: '9', tenant: { id: 't9' } }, operation: 'update' }))
    expect(seen.length).toBe(0)
    await hook(arg({ doc: { id: '9', tenant: { id: 't9' } }, operation: 'create' }))
    expect(seen.length).toBe(1)
    expect(seen[0]!.tenantId).toBe('t9')
  })

  it('concrete chain wirings are afterChange hooks', () => {
    expect(typeof emitPrSubmitted).toBe('function')
  })
})
