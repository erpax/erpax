/**
 * Chain event emitters — Slice KKKK after-change hooks that fire the
 * business-chain events the BUSINESS_CHAINS registry declares.
 *
 * Each emitter is a thin Payload `afterChange` hook that maps a status
 * transition (e.g. PR draft → submitted, PR submitted → approved, RFQ
 * received → awarded, lease-modification posted, production-receipt
 * posted, project-milestone achieved, wip-snapshot posted) to an
 * `emitDomainEvent()` call on the canonical event channel.
 *
 * This is the wiring layer Slice KKKK adds so the chain registry's
 * declared `emits:` value matches what actually fires at runtime.
 *
 * @audit ISO-19011:2018 audit-trail event-emit
 * @compliance SOX §404 internal-controls process-evidence
 */

import type { CollectionAfterChangeHook } from 'payload'
import { eventEmitter } from '@/services/event-emitter.service'
import type { DomainEvent } from '@/types/events'
import { getActorId } from '@/access/auth'

type StatusBearing = { status?: string; id: string; tenant?: string | { id: string } }

/** AggregateType envelope shared by every chain emit. */
export type AggregateType =
  | 'invoice' | 'bill' | 'payment' | 'inventory_transfer'
  | 'bank_statement' | 'subscription' | 'order' | 'fixed_asset'

/**
 * Emit a domain event with Payload-native logging (no custom service layer).
 * Inlined here to break circular dependency: hooks no longer need to import from services.
 */
async function emitDomainEventPayloadNative(
  req: Parameters<CollectionAfterChangeHook>[0]['req'],
  event: DomainEvent,
  subject: string,
): Promise<void> {
  try {
    await eventEmitter.emit(event)
    req.payload.logger.info(`✓ ${event.eventType} emitted for ${event.aggregateType} ${subject}`)
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error emitting ${event.eventType} for ${event.aggregateType} ${subject}`,
    )
  }
}

/**
 * Fire `<event>` when `previousDoc.status !== doc.status === <toStatus>`.
 *
 * Exported (Slice AAAAAAAA 2026-05-11) so the accounting collection
 * factory can build per-collection emit hooks from a structured
 * `emits:` declaration without each collection having to author its
 * own emitter export. The free-standing const exports below remain —
 * they're the explicit Slice KKKK wirings used by the originally-
 * declared business-chains.
 */
export function emitOnStatusTransition(
  toStatus: string,
  eventType: string,
  aggregateType: AggregateType,
): CollectionAfterChangeHook {
  return async ({ doc, previousDoc, req }) => {
    const next = doc as StatusBearing
    const prev = previousDoc as StatusBearing | null
    if (next.status !== toStatus) return doc
    if (prev && prev.status === toStatus) return doc
    const tenantId = typeof next.tenant === 'object' && next.tenant ? next.tenant.id : (next.tenant ?? '')
    if (!tenantId) return doc
    await emitDomainEventPayloadNative(
      req,
      {
        eventId: crypto.randomUUID(),
        eventType: eventType as never, // typed via DomainEvent contract
        tenantId,
        aggregateId: next.id,
        aggregateType,
        timestamp: new Date(),
        userId: getActorId(req) ?? 'system',
        payload: { status: next.status },
      } as never,
      `${eventType}: ${next.id}`,
    )
    return doc
  }
}

/**
 * Fire `<event>` once on row-create regardless of status.
 *
 * Exported (Slice AAAAAAAA 2026-05-11) for the same reason as
 * `emitOnStatusTransition` — the factory consumes structured `emits:`
 * declarations and dispatches to the appropriate helper.
 */
export function emitOnCreate(
  eventType: string,
  aggregateType: AggregateType,
): CollectionAfterChangeHook {
  return async ({ doc, operation, req }) => {
    if (operation !== 'create') return doc
    const next = doc as StatusBearing
    const tenantId = typeof next.tenant === 'object' && next.tenant ? next.tenant.id : (next.tenant ?? '')
    if (!tenantId) return doc
    await emitDomainEventPayloadNative(
      req,
      {
        eventId: crypto.randomUUID(),
        eventType: eventType as never,
        tenantId,
        aggregateId: next.id,
        aggregateType,
        timestamp: new Date(),
        userId: getActorId(req) ?? 'system',
        payload: {},
      } as never,
      `${eventType}: ${next.id}`,
    )
    return doc
  }
}

/* ─── Concrete hooks per Slice KKKK chain ─────────────────────────── */

// P2P
export const emitPrSubmitted     = emitOnStatusTransition('submitted', 'pr:submitted',     'order')
export const emitPrApproved      = emitOnStatusTransition('approved',  'pr:approved',      'order')
export const emitRfqReceived     = emitOnStatusTransition('received',  'rfq:received',     'order')
export const emitRfqAwarded      = emitOnStatusTransition('awarded',   'rfq:awarded',      'order')
export const emitPoCreated       = emitOnCreate('po:created',          'order')
export const emitGrPosted        = emitOnStatusTransition('posted',    'gr:posted',        'inventory_transfer')

// Manufacturing
export const emitWoReleased      = emitOnStatusTransition('released',  'wo:released',      'inventory_transfer')
export const emitProdCompleted   = emitOnStatusTransition('posted',    'prod:completed',   'inventory_transfer')
export const emitQcComplete      = emitOnStatusTransition('completed', 'qc:complete',      'inventory_transfer')

// Project + IFRS-15 over-time
export const emitMilestoneAchieved = emitOnStatusTransition('achieved', 'milestone:achieved', 'invoice')
export const emitWipSnapshotPosted = emitOnStatusTransition('posted',  'wip:snapshot:posted', 'invoice')

// IFRS-16 lease modifications
export const emitLeaseRemeasured = emitOnStatusTransition('posted',    'lease:remeasured', 'fixed_asset')

// Subscription metered usage
export const emitUsageRecorded   = emitOnCreate('usage:recorded',      'subscription')

// CRM
export const emitLeadQualified   = emitOnStatusTransition('sql',       'lead:sql',         'order')
export const emitOpportunityWon  = emitOnStatusTransition('won',       'opp:won',          'order')
