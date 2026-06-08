/**
 * Subscriptions afterChange — emit IFRS 15 / ASC 606 lifecycle events.
 *
 * Watches `status` transitions and dispatches the matching domain event
 * so the canonical {@link glPostingService} can post the corresponding
 * deferred-revenue / recognised-revenue / refund GL entries. Without
 * this hook, subscription state changes silently bypass the GL —
 * "data is money" without an audit trail.
 *
 * Mapping (Payload `Subscription.status` → emitted event):
 *   - `trial`                       → no event (no revenue obligation yet)
 *   - `active`     (from any other) → `subscription:activated`
 *   - `past_due` / `grace_period`   → no event (still recognised; collection is downstream)
 *   - `suspended`                   → no event (recognition pause; not a contract change)
 *   - `cancelled`                   → `subscription:cancelled` (handler reverses
 *                                     unrecognised deferred revenue and posts
 *                                     refund if `refundAmount > 0`)
 *
 * The companion `subscription:invoiced` / `subscription:refunded` events
 * fire from the Stripe webhook handler (`handleInvoicePaid`,
 * `handleInvoiceRefunded`) — see `src/utilities/billing/`.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time period-boundaries
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
 * @accounting IFRS IFRS-15 §IFRS-15.31 revenue-recognition
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606-10-25 contract-modifications
 * @audit ISO-19011:2018 audit-trail subscription-lifecycle
 * @compliance SOX §404 internal-controls revenue-recognition
 * @see src/types/events.ts SubscriptionActivatedEvent
 * @see src/services/gl-posting.service.ts
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionAfterChangeHook } from 'payload'
import type { Subscription } from '@/types'
import { emitEvent } from '@/event/emitter.service'

const ACTIVE_STATUSES = new Set(['active', 'past_due', 'grace_period'])

function asDate(input: string | Date | null | undefined, fallback: Date): Date {
  if (input instanceof Date) return input
  if (typeof input === 'string' && input.length > 0) {
    const d = new Date(input)
    if (!Number.isNaN(d.getTime())) return d
  }
  return fallback
}

export const emitSubscriptionLifecycleEvents: CollectionAfterChangeHook<Subscription> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (!doc) return doc

  const tenantId =
    typeof doc.tenant === 'object' && doc.tenant && 'id' in doc.tenant
      ? String(doc.tenant.id)
      : String(doc.tenant ?? '')
  const userId = req.user?.id ? String(req.user.id) : 'system'
  const now = new Date()
  const planId =
    typeof doc.plan === 'object' && doc.plan && 'id' in doc.plan
      ? String(doc.plan.id)
      : String(doc.plan ?? '')
  const customerId = String(doc.tenant ?? '') // contracts tie to tenant in this model

  const wasActive = ACTIVE_STATUSES.has(String(previousDoc?.status ?? ''))
  const isActive = ACTIVE_STATUSES.has(String(doc.status ?? ''))

  // ── subscription:activated — first transition into an active state ──────
  if ((operation === 'create' && doc.status === 'active') || (!wasActive && isActive)) {
    const periodStart = asDate(doc.currentPeriodStart, now)
    const periodEnd = asDate(doc.currentPeriodEnd, now)
    // Plan amount is denormalised on the Subscription if available; fall back to plan ref.
    const planRef = doc.plan as unknown as { unitAmount?: number; currency?: string } | null
    const amount = typeof planRef?.unitAmount === 'number' ? planRef.unitAmount : 0
    const currencyCode = typeof planRef?.currency === 'string' ? planRef.currency : 'EUR'

    await emitEvent(
      'subscription:activated',
      tenantId,
      userId,
      {
        subscriptionId: String(doc.id),
        customerId,
        planId,
        amount,
        currencyCode,
        billingCycle: 'monthly', // TODO: read from plan when the field is wired
        periodStart,
        periodEnd,
        stripeSubscriptionId: doc.stripeSubscriptionId ?? undefined,
      },
      String(doc.id),
      'subscription',
    )
  }

  // ── subscription:cancelled — transition into 'cancelled' ────────────────
  if (previousDoc?.status !== 'cancelled' && doc.status === 'cancelled') {
    const cancelledAt = asDate(doc.cancelledAt, now)
    const periodEnd = asDate(doc.currentPeriodEnd, cancelledAt)
    // Proration: unrecognised = (periodEnd - cancelledAt) / (periodEnd - periodStart) * planAmount.
    // Computed downstream in gl-posting handler from the plan amount + boundaries.
    await emitEvent(
      'subscription:cancelled',
      tenantId,
      userId,
      {
        subscriptionId: String(doc.id),
        cancelledAt,
        unrecognisedAmount: 0, // computed in handler from plan + period boundaries
        refundAmount: 0, // refunds emitted separately via subscription:refunded
        currencyCode:
          typeof (doc.plan as unknown as { currency?: string })?.currency === 'string'
            ? (doc.plan as unknown as { currency?: string }).currency!
            : 'EUR',
        reason: doc.cancellationReason ?? undefined,
        periodEnd,
      },
      String(doc.id),
      'subscription',
    )
  }

  return doc
}
