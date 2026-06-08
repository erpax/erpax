/**
 * Stripe webhook event handlers for subscription, invoice, and payment lifecycle.
 *
 * Each handler is invoked from the Stripe webhook receiver after signature
 * verification. The webhook receiver itself enforces RFC 9110 method and
 * RFC 8259 JSON-payload semantics, plus Stripe's HMAC-SHA256 signature header
 * (NIST FIPS-198-1 / RFC 2104). These functions are pure side-effect performers
 * over Payload — they assume the event has already been authenticated.
 *
 * Card data is **never** persisted in this codebase: only Stripe IDs
 * (`stripeSubscriptionId`, `stripeCustomerId`, `stripeInvoiceId`,
 * `stripePaymentIntentId`). PAN, CVV, and full track data live exclusively in
 * Stripe per PCI-DSS §3 / §4 (storage and transmission of cardholder data).
 *
 * @rfc 9110 http-semantics webhook-receiver
 * @rfc 8259 json payload-encoding
 * @rfc 2104 hmac signature-verification
 * @standard NIST FIPS-198-1 keyed-hash-message-authentication
 * @standard PCI-DSS v4.0 §3 protect-stored-account-data
 * @standard PCI-DSS v4.0 §4 protect-cardholder-data-with-strong-cryptography-during-transmission
 * @standard PCI-DSS v4.0 §10 log-and-monitor-access-to-system-components
 * @accounting IFRS-15 revenue-from-contracts-with-customers
 * @compliance SOC-2 CC7.2 system-monitoring-event-logging
 * @security ISO-27001 A.5.14 information-transfer
 * @security ISO-27002 §8.16 monitoring-activities
 * @see docs/STANDARDS.md §4.4
 */

import { Payload, PayloadRequest } from 'payload'
import type { Subscription } from '@/types'
import Stripe from 'stripe'
import { emitEvent } from '@/event/emitter.service'

/**
 * Context object threaded through every webhook handler.
 *
 * @rfc 9110 http-semantics
 */
export interface StripeWebhookContext {
  event: Stripe.Event
  payload: Payload
  req?: PayloadRequest
}

/**
 * DRY pattern: Extract subscription from Stripe event
 */
export async function findPayloadSubscriptionByStripeId(
  payload: Payload,
  stripeSubscriptionId: string,
): Promise<Subscription | null> {
  const result = await payload.find({
    collection: 'subscriptions',
    where: { stripeSubscriptionId: { equals: stripeSubscriptionId } },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

/**
 * Map a Stripe invoice status to the erpax (EN-16931) Invoice status enum.
 */
const mapInvoiceStatus = (
  s: Stripe.Invoice.Status | null | undefined,
): 'draft' | 'open' | 'paid' | 'cancelled' | 'past_due' => {
  switch (s) {
    case 'paid':
      return 'paid'
    case 'draft':
      return 'draft'
    case 'void':
      return 'cancelled'
    case 'uncollectible':
      return 'past_due'
    default:
      return 'open'
  }
}

/**
 * DRY pattern: Update subscription status with logging
 */
export async function updateSubscriptionStatus(
  payload: Payload,
  subscriptionId: string,
  newStatus: NonNullable<Subscription['status']>,
  reason: string,
): Promise<void> {
  await payload.update({
    collection: 'subscriptions',
    id: subscriptionId,
    data: {
      status: newStatus,
      lastStatusChange: new Date().toISOString(),
      lastStatusChangeReason: reason,
    },
  })

  payload.logger.info(`Subscription ${subscriptionId} status → ${newStatus}: ${reason}`)
}

/**
 * DRY pattern: Handle subscription created/updated
 */
export async function handleSubscriptionSync(
  context: StripeWebhookContext,
  stripeSubscription: Stripe.Subscription,
): Promise<void> {
  const { payload } = context

  // Find Payload subscription by Stripe ID
  let payloadSubscription = await findPayloadSubscriptionByStripeId(
    payload,
    stripeSubscription.id,
  )

  // Get Stripe customer email (used to find tenant)
  const stripeCustomerId = stripeSubscription.customer as string
  const customer = await payload.find({
    collection: 'tenants',
    where: { stripeCustomerId: { equals: stripeCustomerId } },
    limit: 1,
  })

  const tenantId = customer.docs[0]?.id

  if (!tenantId) {
    payload.logger.warn(
      `No tenant found for Stripe customer ${stripeCustomerId}`,
    )
    return
  }

  // Map Stripe status → Payload status
  const statusMap: Record<string, NonNullable<Subscription['status']>> = {
    trialing: 'trial',
    active: 'active',
    past_due: 'past_due',
    canceled: 'cancelled',
    incomplete: 'active', // treat incomplete as active pending payment
    incomplete_expired: 'cancelled',
  }

  const newStatus: NonNullable<Subscription['status']> =
    statusMap[stripeSubscription.status] || 'active'

  // Stripe v22 (API basil): period dates moved from the Subscription to
  // its items. Read the first item; store as ISO-8601 strings.
  const periodItem = stripeSubscription.items.data[0]
  const periodStart = periodItem
    ? new Date(periodItem.current_period_start * 1000).toISOString()
    : undefined
  const periodEnd = periodItem
    ? new Date(periodItem.current_period_end * 1000).toISOString()
    : undefined

  if (!payloadSubscription) {
    // Create new subscription
    const plan = await payload.find({
      collection: 'subscription-plans',
      where: { stripePriceId: { equals: stripeSubscription.items.data[0]?.price.id } },
      limit: 1,
    })

    if (!plan.docs.length) {
      payload.logger.warn(`No plan found for Stripe price ${stripeSubscription.items.data[0]?.price.id}`)
      return
    }

    payloadSubscription = await payload.create({
      collection: 'subscriptions',
      data: {
        tenant: tenantId,
        plan: plan.docs[0].id,
        status: newStatus,
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId: stripeCustomerId,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
        trialStartedAt: stripeSubscription.trial_start
          ? new Date(stripeSubscription.trial_start * 1000).toISOString()
          : undefined,
        trialEndsAt: stripeSubscription.trial_end
          ? new Date(stripeSubscription.trial_end * 1000).toISOString()
          : undefined,
      },
    })

    payload.logger.info(
      `Created Payload subscription for Stripe subscription ${stripeSubscription.id}`,
    )
  } else {
    // Update existing subscription
    await updateSubscriptionStatus(
      payload,
      payloadSubscription.id,
      newStatus,
      `Synced from Stripe subscription ${stripeSubscription.id}`,
    )

    // Update period dates
    await payload.update({
      collection: 'subscriptions',
      id: payloadSubscription.id,
      data: {
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      },
    })
  }
}

/**
 * DRY pattern: Handle invoice created/updated
 */
export async function handleInvoiceSync(
  context: StripeWebhookContext,
  stripeInvoice: Stripe.Invoice,
): Promise<void> {
  const { payload } = context

  // Stripe v22 (API basil): invoice.subscription moved to
  // parent.subscription_details.subscription.
  const subRef = stripeInvoice.parent?.subscription_details?.subscription
  const stripeSubId = typeof subRef === 'string' ? subRef : subRef?.id
  if (!stripeSubId) {
    payload.logger.warn(`Invoice ${stripeInvoice.id} has no subscription`)
    return
  }

  const subscription = await findPayloadSubscriptionByStripeId(payload, stripeSubId)
  if (!subscription) {
    payload.logger.warn(`No Payload subscription found for Stripe invoice ${stripeInvoice.id}`)
    return
  }

  // The Stripe id lives in the recurring (billing) group, not a flat column.
  const existing = await payload.find({
    collection: 'invoices',
    where: { 'recurring.stripeInvoiceId': { equals: stripeInvoice.id } },
    limit: 1,
  })

  // Webhooks SYNC billing state onto the canonical EN-16931 Invoice; they
  // never mint one (an accounting invoice requires parties + amounts the
  // webhook can't supply). Header-level partial update only. Stripe amounts
  // are integer minor units; map onto the nested groups (see the
  // `accounting` skill).
  const billingSync = {
    status: mapInvoiceStatus(stripeInvoice.status),
    amounts: { totalDue: stripeInvoice.amount_due, totalPaid: stripeInvoice.amount_paid },
    dates: {
      issuedAt: new Date(stripeInvoice.created * 1000).toISOString(),
      dueAt: new Date(
        (stripeInvoice.due_date || stripeInvoice.created + 30 * 24 * 60 * 60) * 1000,
      ).toISOString(),
    },
    recurring: { subscription: subscription.id, stripeInvoiceId: stripeInvoice.id },
  }

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'invoices', id: existing.docs[0].id, data: billingSync })
    payload.logger.info(`Synced billing state onto invoice for Stripe invoice ${stripeInvoice.id}`)
  } else {
    payload.logger.warn(
      `No erpax invoice tagged with Stripe invoice ${stripeInvoice.id}; billing sync skipped (invoices originate from the sales/order flow, not webhooks)`,
    )
  }
}

/**
 * DRY pattern: Handle invoice paid
 */
export async function handleInvoicePaid(
  context: StripeWebhookContext,
  stripeInvoice: Stripe.Invoice,
): Promise<void> {
  const { payload } = context

  const existing = await payload.find({
    collection: 'invoices',
    where: { 'recurring.stripeInvoiceId': { equals: stripeInvoice.id } },
    limit: 1,
    depth: 1,
  })

  if (!existing.docs.length) {
    payload.logger.warn(`Invoice ${stripeInvoice.id} not found in Payload`)
    return
  }

  const invoice = existing.docs[0]

  // Update invoice to paid
  await payload.update({
    collection: 'invoices',
    id: invoice.id,
    data: {
      status: 'paid',
      dates: { paidAt: new Date().toISOString() },
    },
  })

  // Update subscription to active
  const subRef = invoice.recurring?.subscription
  const subscription = !subRef
    ? null
    : typeof subRef === 'object'
      ? subRef
      : await payload.findByID({ collection: 'subscriptions', id: subRef })

  if (subscription) {
    await updateSubscriptionStatus(
      payload,
      subscription.id,
      'active',
      `Invoice ${stripeInvoice.id} paid`,
    )

    // Slice ZZ-3: emit subscription:invoiced so glPostingService can
    // recognise revenue (Dr Deferred Revenue / Cr Subscription Revenue
    // per IFRS 15 §35 / ASC 606-10-25-30). Without this wire, every
    // Stripe-driven invoice payment silently bypasses the GL.
    const tenantRef = (subscription as { tenant?: number | string | { id: number | string } }).tenant
    const tenantId =
      typeof tenantRef === 'object' && tenantRef !== null && 'id' in tenantRef
        ? String(tenantRef.id)
        : String(tenantRef ?? '')

    const periodStart = stripeInvoice.period_start
      ? new Date(stripeInvoice.period_start * 1000)
      : new Date()
    const periodEnd = stripeInvoice.period_end
      ? new Date(stripeInvoice.period_end * 1000)
      : new Date()

    await emitEvent(
      'subscription:invoiced',
      tenantId,
      'system',
      {
        subscriptionId: String(subscription.id),
        invoiceId: String(invoice.id),
        amount: stripeInvoice.amount_paid ?? 0,
        currencyCode: (stripeInvoice.currency || 'eur').toUpperCase(),
        periodStart,
        periodEnd,
      },
      String(invoice.id),
      'subscription',
    )
  }

  payload.logger.info(`Invoice ${stripeInvoice.id} marked as paid`)
}

/**
 * DRY pattern: Handle invoice payment failed
 */
export async function handleInvoicePaymentFailed(
  context: StripeWebhookContext,
  stripeInvoice: Stripe.Invoice,
): Promise<void> {
  const { payload } = context

  const existing = await payload.find({
    collection: 'invoices',
    where: { 'recurring.stripeInvoiceId': { equals: stripeInvoice.id } },
    limit: 1,
    depth: 1,
  })

  if (!existing.docs.length) {
    return
  }

  const invoice = existing.docs[0]

  // Increment attempt counter and set last attempt error
  await payload.update({
    collection: 'invoices',
    id: invoice.id,
    data: {
      recurring: {
        attemptCount: (invoice.recurring?.attemptCount ?? 0) + 1,
        lastAttemptAt: new Date().toISOString(),
        lastAttemptError: 'Payment attempt failed',
      },
    },
  })

  const subRef = invoice.recurring?.subscription
  const subscription = !subRef
    ? null
    : typeof subRef === 'object'
      ? subRef
      : await payload.findByID({ collection: 'subscriptions', id: subRef })

  if (subscription && subscription.status !== 'past_due') {
    await updateSubscriptionStatus(
      payload,
      subscription.id,
      'past_due',
      `Invoice ${stripeInvoice.id} payment failed`,
    )
  }

  payload.logger.warn(`Invoice ${stripeInvoice.id} payment failed, attempt ${(invoice.recurring?.attemptCount ?? 0) + 1}`)
}

/**
 * Slice SSS — Handle Stripe `charge.refunded` (full or partial refund).
 *
 * Closes the last dead-handler gap from Slice LLL: `glPostingService`
 * subscribes to `subscription:refunded` (which books `Dr Refunds Payable
 * / Cr Cash` — the cash-leg of a previously-recognised refund liability)
 * but no producer fires the event. This handler is symmetric to the
 * existing `handleInvoicePaid` → `subscription:invoiced` path: when
 * Stripe reports a refund, we look up the source subscription and emit.
 *
 * Per IFRS 15 §B22 / ASC 606-10-25-13, customer cancellation with refund
 * extinguishes the unsatisfied performance obligation. The
 * `subscription:cancelled` event already books the refund LIABILITY at
 * cancel-time; this handler books the cash MOVEMENT when the refund
 * actually leaves the bank account (Stripe → customer's card).
 *
 * @standard ISO-4217:2015 currency-codes refund-amount
 * @standard ISO-8601-1:2019 date-time refunded-at
 * @accounting IFRS IFRS-15 §B22 customer-options-for-refund
 * @accounting US-GAAP ASC-606-10-25-13 contract-modification-with-refund
 * @audit ISO-19011:2018 audit-trail refund-cash-leg
 * @compliance SOX §404 internal-controls refund-control
 * @see src/services/gl-posting.service.ts postSubscriptionRefunded
 */
export async function handleChargeRefunded(
  context: StripeWebhookContext,
  stripeCharge: Stripe.Charge,
): Promise<void> {
  const { payload } = context

  // Stripe charge → invoice → subscription resolution chain.
  // We only emit subscription:refunded for charges tied to a subscription
  // invoice. One-off charges (non-subscription) skip — those go through
  // the order:refunded path on the front-of-house orders collection.
  // Stripe v22: Charge.invoice was removed; resolve the local invoice via
  // the charge's PaymentIntent (stored on the invoice's recurring group).
  const piRef = stripeCharge.payment_intent
  const paymentIntentId = typeof piRef === 'string' ? piRef : piRef?.id
  if (!paymentIntentId) {
    payload.logger.info(
      `charge.refunded ${stripeCharge.id}: no payment_intent — skipping (likely one-off charge)`,
    )
    return
  }

  const matchingInvoices = await payload.find({
    collection: 'invoices',
    where: { 'recurring.stripePaymentIntentId': { equals: paymentIntentId } },
    limit: 1,
    depth: 1,
  })
  if (!matchingInvoices.docs.length) {
    payload.logger.warn(
      `charge.refunded ${stripeCharge.id}: invoice for payment_intent ${paymentIntentId} not found locally`,
    )
    return
  }
  const invoice = matchingInvoices.docs[0]
  const subRefC = invoice.recurring?.subscription
  const subscription = !subRefC
    ? null
    : typeof subRefC === 'object'
      ? subRefC
      : await payload.findByID({ collection: 'subscriptions', id: subRefC })

  if (!subscription) {
    payload.logger.info(
      `charge.refunded ${stripeCharge.id}: invoice for payment_intent ${paymentIntentId} has no subscription — emitting nothing (one-off invoice refund)`,
    )
    return
  }

  // `amount_refunded` is in Stripe minor units (cents).
  const refundAmount = stripeCharge.amount_refunded ?? 0
  if (refundAmount <= 0) {
    return
  }

  const tenantRef = (subscription as { tenant?: number | string | { id: number | string } }).tenant
  const tenantId =
    typeof tenantRef === 'object' && tenantRef !== null && 'id' in tenantRef
      ? String(tenantRef.id)
      : String(tenantRef ?? '')

  const refundedAt = new Date()

  await emitEvent(
    'subscription:refunded',
    tenantId,
    'system',
    {
      subscriptionId: String(subscription.id),
      amount: refundAmount,
      currencyCode: (stripeCharge.currency || 'eur').toUpperCase(),
      refundedAt,
    },
    String(subscription.id),
    'subscription',
  )

  payload.logger.info(
    `subscription:refunded emitted for ${subscription.id} (charge ${stripeCharge.id}, amount ${refundAmount})`,
  )
}
