/**
 * СУПТО sale event — on a sale closing, emit a content-uuid-keyed domain event
 * for in-process subscribers (GL posting, audit, fiscal-receipt issuance) and
 * federation peers. Per the `event` skill, `aggregateId` is the content-`uuid`
 * (the 0), never the local row id — so a peer reconciles by it. The event is
 * the membrane the СУПТО sale crosses into accounting + the audit chain.
 *
 * @standard BG Наредба-Н-18 §СУПТО sale-lifecycle
 * @audit ISO-19011:2018 audit-trail event-driven
 * @see .claude/skills/event/SKILL.md · src/hooks/chainEventEmitters.ts
 */

import type { CollectionAfterChangeHook } from 'payload'
import { v4 as uuid } from 'uuid'
import { eventEmitter } from '@/event/emitter.service'

interface SaleDoc {
  id?: unknown
  uuid?: unknown
  unp?: unknown
  status?: unknown
  total?: unknown
  currency?: unknown
  paymentType?: unknown
  fiscalDeviceNumber?: unknown
  tenant?: unknown
}

function tenantOf(doc: SaleDoc): string {
  const t = doc.tenant
  if (typeof t === 'string') return t
  if (t && typeof t === 'object' && 'id' in t) {
    const id = (t as { id?: unknown }).id
    if (typeof id === 'string') return id
  }
  return 'unknown'
}

export const emitSaleClosedHook: CollectionAfterChangeHook = async ({ doc, previousDoc, operation }) => {
  const d = doc as SaleDoc
  const prevStatus = (previousDoc as SaleDoc | undefined)?.status
  const justClosed = d.status === 'closed' && (operation === 'create' || prevStatus !== 'closed')
  if (!justClosed) return doc

  await eventEmitter.emit({
    eventId: uuid(),
    eventType: 'sale:closed',
    tenantId: tenantOf(d),
    // `event` skill: the aggregate identity is the content-uuid, not the row id.
    aggregateId: String(d.uuid ?? d.id),
    aggregateType: 'sale',
    timestamp: new Date(),
    payload: {
      unp: d.unp,
      total: d.total,
      currency: d.currency,
      paymentType: d.paymentType,
      fiscalDeviceNumber: d.fiscalDeviceNumber,
    },
  } as unknown as Parameters<typeof eventEmitter.emit>[0])

  return doc
}
