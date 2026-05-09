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
import Stripe from 'stripe'

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
): Promise<any | null> {
  const result = await payload.find({
    collection: 'subscriptions',
    where: { stripeSubscriptionId: { equals: stripeSubscriptionId } },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

/**
 * DRY pattern: Update subscription status with logging
 */
export async function updateSubscriptionStatus(
  payload: Payload,
  subscriptionId: string,
  newStatus: string,
  reason: string,
): Promise<void> {
  await payload.update({
    collection: 'subscriptions',
    id: subscriptionId,
    data: {
      status: newStatus,
      lastStatusChange: new Date(),
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
  const statusMap: Record<string, string> = {
    trialing: 'trial',
    active: 'active',
    past_due: 'past_due',
    canceled: 'cancelled',
    incomplete: 'active', // treat incomplete as active pending payment
    incomplete_expired: 'cancelled',
  }

  const newStatus = statusMap[stripeSubscription.status] || 'active'

  if (!payloadSubscription) {
    // Create new subscription
    const plan = await payload.find({
      collection: 'subscriptionPlans',
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
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        trialStartedAt: stripeSubscription.trial_start
          ? new Date(stripeSubscription.trial_start * 1000)
          : undefined,
        trialEndsAt: stripeSubscription.trial_end
          ? new Date(stripeSubscription.trial_end * 1000)
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
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
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

  // Find subscription first
  if (!stripeInvoice.subscription) {
    payload.logger.warn(`Invoice ${stripeInvoice.id} has no subscription`)
    return
  }

  const subscription = await findPayloadSubscriptionByStripeId(
    payload,
    stripeInvoice.subscription as string,
  )

  if (!subscription) {
    payload.logger.warn(
      `No Payload subscription found for Stripe invoice ${stripeInvoice.id}`,
    )
    return
  }

  // Check if invoice exists
  const existing = await payload.find({
    collection: 'invoices',
    where: { stripeInvoiceId: { equals: stripeInvoice.id } },
    limit: 1,
  })

  const invoiceData = {
    tenant: subscription.tenant,
    subscription: subscription.id,
    stripeInvoiceId: stripeInvoice.id,
    status: stripeInvoice.status || 'open',
    amountDue: stripeInvoice.amount_due,
    amountPaid: stripeInvoice.amount_paid,
    issuedAt: new Date(stripeInvoice.created * 1000),
    dueAt: new Date((stripeInvoice.due_date || stripeInvoice.created + 30 * 24 * 60 * 60) * 1000),
    stripePaymentIntentId: typeof stripeInvoice.payment_intent === 'string'
      ? stripeInvoice.payment_intent
      : undefined,
    items: stripeInvoice.lines.data.map((line) => ({
      description: line.description || 'Invoice item',
      unitAmount: line.amount,
      quantity: 1,
      periodStart: line.period?.start ? new Date(line.period.start * 1000) : undefined,
      periodEnd: line.period?.end ? new Date(line.period.end * 1000) : undefined,
    })),
  }

  if (existing.docs.length > 0) {
    // Update existing invoice
    await payload.update({
      collection: 'invoices',
      id: existing.docs[0].id,
      data: invoiceData,
    })
  } else {
    // Create new invoice
    await payload.create({
      collection: 'invoices',
      data: invoiceData,
    })

    payload.logger.info(`Created invoice for Stripe invoice ${stripeInvoice.id}`)
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
    where: { stripeInvoiceId: { equals: stripeInvoice.id } },
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
      paidAt: new Date(),
    },
  })

  // Update subscription to active
  const subscription = typeof invoice.subscription === 'object'
    ? invoice.subscription
    : await payload.findByID({
        collection: 'subscriptions',
        id: invoice.subscription,
      })

  if (subscription) {
    await updateSubscriptionStatus(
      payload,
      subscription.id,
      'active',
      `Invoice ${stripeInvoice.id} paid`,
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
    where: { stripeInvoiceId: { equals: stripeInvoice.id } },
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
      attemptCount: (invoice.attemptCount || 0) + 1,
      lastAttemptAt: new Date(),
      lastAttemptError: 'Payment attempt failed',
    },
  })

  const subscription = typeof invoice.subscription === 'object'
    ? invoice.subscription
    : await payload.findByID({
        collection: 'subscriptions',
        id: invoice.subscription,
      })

  if (subscription && subscription.status !== 'past_due') {
    await updateSubscriptionStatus(
      payload,
      subscription.id,
      'past_due',
      `Invoice ${stripeInvoice.id} payment failed`,
    )
  }

  payload.logger.warn(`Invoice ${stripeInvoice.id} payment failed, attempt ${(invoice.attemptCount || 0) + 1}`)
}
