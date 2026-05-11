/**
 * Notification dispatch — canonical seed (Slice PPPP).
 *
 * Domain event observed → notification dispatched. Demonstrates the
 * subscriber wiring from `services/notifications/subscriber.ts`.
 *
 * Each step is silent at the GL level (notifications don't move money)
 * but writes audit-events rows for ISO 19011 §6.4.6 evidence.
 *
 * @standard rfc-5321 + rfc-5322 + GDPR Art.7 + ISO 19011 §6.4.6
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'
import { sendNotification } from '@/services/notifications'

const observe: ChainStepImpl = async (payload, ctx) => {
  // Simulate observing a domain event by writing an audit row directly.
  // Production wiring uses `subscriber.wireNotificationSubscriber()` to
  // listen on the event emitter; this seed exercises the same audit row.
  await payload.create({
    collection: 'audit-events',
    data: {
      tenant: ctx.tenantId,
      eventId: crypto.randomUUID(),
      eventType: 'notify:observed',
      actor: 'system',
      targetCollection: 'invoices',
      targetId: 'chain-test-invoice',
      after: { observed: 'invoice:activated' },
      emittedAt: new Date().toISOString(),
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'notify:observed'
}

const dispatch: ChainStepImpl = async (payload, ctx) => {
  // Single fan-out call — sendNotification writes its own audit row
  // (best-effort) and reports per-channel deliveries.
  const r = await sendNotification(payload, {
    tenantId: ctx.tenantId,
    toEmail: 'chain-test@example.test',
    toUserId: ctx.userId,
    category: 'transactional',
    channels: ['email', 'in_app'],
    subject: 'Chain test — invoice issued',
    body: 'This is a chain-driven notification.',
    metadata: { sourceEvent: 'invoice:activated' },
  })
  if (!r || !Array.isArray(r.deliveries)) {
    throw new Error('sendNotification returned unexpected shape')
  }
  return 'notify:dispatched'
}

export const notificationDispatchImpls: ChainImpls = [observe, dispatch]
