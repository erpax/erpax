import type { Payload } from 'payload'

/**
 * Dunning state machine — past-due invoice cycle.
 *
 * Processes through stages: `open` → `past_due` → `grace_period` → `suspended`.
 * Runs daily (cron) or on Stripe webhook events. Schema deps declared on
 * `src/collections/Invoices/index.ts`.
 *
 * @accounting IFRS IFRS-9 expected-credit-loss impairment
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @standard EN-16931:2017 dunning-notice
 * @standard ISO-8601-1:2019 date-time pastDueSinceAt gracePeriodEndsAt
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @see docs/STANDARDS.md §3 §5
 */

type DocId = string | number

/** Subset of the `subscriptions` collection that the dunning job touches. */
interface SubscriptionForDunning {
  id: DocId
  status: 'trial' | 'active' | 'past_due' | 'grace_period' | 'suspended' | 'cancelled'
}

/** Subset of the `invoices` collection that the dunning job touches.
 *  YYYY: nested under canonical `dates` + `recurring` groups. */
interface InvoiceForDunning {
  id: DocId
  status?: string | null
  dates?: {
    dueAt?: string | null
    pastDueSinceAt?: string | null
    gracePeriodEndsAt?: string | null
    suspensionScheduledFor?: string | null
  }
  recurring?: {
    subscription?: SubscriptionForDunning | DocId | null
  }
}

interface DunningStage {
  name: string
  condition: (daysSincePastDue: number) => boolean
  status: SubscriptionForDunning['status']
  reason: string
}

// DRY: Define dunning stages as configuration
const DUNNING_STAGES: DunningStage[] = [
  {
    name: 'initial',
    condition: (days) => days === 0,
    status: 'past_due',
    reason: 'Invoice past due',
  },
  {
    name: 'grace_period',
    condition: (days) => days >= 3,
    status: 'grace_period',
    reason: 'Entered grace period',
  },
  {
    name: 'suspension',
    condition: (days) => days >= 7,
    status: 'suspended',
    reason: 'Suspended after grace period',
  },
]

/**
 * Get days since invoice became past due
 */
function getDaysSincePastDue(pastDueSinceAt: Date | string): number {
  const ts = pastDueSinceAt instanceof Date ? pastDueSinceAt : new Date(pastDueSinceAt)
  return Math.floor((Date.now() - ts.getTime()) / (24 * 60 * 60 * 1000))
}

/**
 * Log dunning event (DRY: centralized logging)
 */
async function logDunningEvent(
  payload: Payload,
  invoiceId: DocId,
  subscriptionId: DocId,
  stage: string,
  message: string,
): Promise<void> {
  payload.logger.info(
    `[Dunning] Invoice ${invoiceId} (Subscription ${subscriptionId}): ${stage} - ${message}`,
  )
}

/**
 * Update subscription with dunning stage transition.
 * `lastStatusChange` and `lastStatusChangeReason` are real fields on the
 * `subscriptions` collection (see `src/collections/Subscriptions/index.ts`).
 */
async function transitionSubscriptionStatus(
  payload: Payload,
  subscriptionId: DocId,
  newStatus: SubscriptionForDunning['status'],
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
}

/**
 * Process single invoice through dunning state machine
 */
async function processInvoiceDunning(
  payload: Payload,
  invoice: InvoiceForDunning,
  subscription: SubscriptionForDunning,
): Promise<void> {
  const invoiceId = invoice.id
  const subscriptionId = subscription.id

  // YYYY: invoice.dates.pastDueSinceAt is the canonical path.
  const pastDueSinceAt = invoice.dates?.pastDueSinceAt
  if (!pastDueSinceAt) {
    const now = new Date()
    const sevenDaysOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
    await payload.update({
      collection: 'invoices',
      id: invoiceId,
      data: {
        dates: {
          pastDueSinceAt: now.toISOString(),
          gracePeriodEndsAt: sevenDaysOut,
          suspensionScheduledFor: sevenDaysOut,
        },
      } as Record<string, unknown>,
    })

    await transitionSubscriptionStatus(
      payload,
      subscriptionId,
      'past_due',
      'Invoice past due',
    )

    await logDunningEvent(payload, invoiceId, subscriptionId, 'initial', 'Marked as past due')
    return
  }

  // Get days since past due and check which stage to transition to
  const daysSincePastDue = getDaysSincePastDue(pastDueSinceAt)

  // Find the appropriate stage
  for (const stage of DUNNING_STAGES) {
    if (stage.condition(daysSincePastDue) && subscription.status !== stage.status) {
      // Only transition if not already in this or later stage
      const currentStageIndex = DUNNING_STAGES.findIndex(
        (s) => s.status === subscription.status,
      )
      const newStageIndex = DUNNING_STAGES.findIndex((s) => s.status === stage.status)

      if (newStageIndex > currentStageIndex) {
        await transitionSubscriptionStatus(
          payload,
          subscriptionId,
          stage.status,
          stage.reason,
        )

        await logDunningEvent(
          payload,
          invoiceId,
          subscriptionId,
          stage.name,
          stage.reason,
        )
      }
    }
  }
}

/**
 * Main dunning job: Process all past-due invoices.
 */
export async function processDunningCycle(payload: Payload): Promise<void> {
  payload.logger.info('[Dunning] Starting dunning cycle')

  try {
    // Find all open invoices that are past due. YYYY: top-level `status`
    // (promoted from typeStatus.status) + canonical `dates.dueAt` filter.
    const pastDueInvoices = await payload.find({
      collection: 'invoices',
      where: {
        and: [
          { status: { equals: 'open' } },
          { 'dates.dueAt': { less_than: new Date().toISOString() } },
        ],
      } as Record<string, unknown>,
      limit: 1000,
      depth: 2,
    })

    payload.logger.info(
      `[Dunning] Found ${pastDueInvoices.docs.length} past-due invoices`,
    )

    for (const rawInvoice of pastDueInvoices.docs) {
      // The Payload SDK returns docs typed against generated `Config['collections']['invoices']`,
      // which is currently `Invoice` (regenerate `payload-types.ts` for the real shape).
      // Until then, narrow through our local schema-aware view.
      const invoice = rawInvoice as unknown as InvoiceForDunning
      // YYYY: subscription FK lives under `recurring.subscription`.
      const sub = invoice.recurring?.subscription
      const subscription: SubscriptionForDunning | null =
        sub && typeof sub === 'object'
          ? (sub as SubscriptionForDunning)
          : sub != null
            ? ((await payload.findByID({
                collection: 'subscriptions',
                id: sub as DocId,
              })) as unknown as SubscriptionForDunning | null)
            : null

      if (!subscription) {
        payload.logger.warn(`[Dunning] No subscription found for invoice ${invoice.id}`)
        continue
      }

      try {
        await processInvoiceDunning(payload, invoice, subscription)
      } catch (error) {
        payload.logger.error({
          msg: `[Dunning] Error processing invoice ${invoice.id}`,
          err: error,
        })
      }
    }

    payload.logger.info('[Dunning] Dunning cycle completed')
  } catch (error) {
    payload.logger.error({ msg: '[Dunning] Error during dunning cycle', err: error })
    throw error
  }
}

/**
 * Helper: Manually reinstate a suspended subscription
 */
export async function reinstateSubscription(
  payload: Payload,
  subscriptionId: DocId,
  reason: string,
): Promise<void> {
  await transitionSubscriptionStatus(payload, subscriptionId, 'active', reason)
  payload.logger.info(
    `[Dunning] Subscription ${subscriptionId} reinstated: ${reason}`,
  )
}

/**
 * Helper: Manually suspend a subscription
 */
export async function suspendSubscription(
  payload: Payload,
  subscriptionId: DocId,
  reason: string,
): Promise<void> {
  await transitionSubscriptionStatus(
    payload,
    subscriptionId,
    'suspended',
    reason,
  )
  payload.logger.warn(
    `[Dunning] Subscription ${subscriptionId} suspended: ${reason}`,
  )
}
