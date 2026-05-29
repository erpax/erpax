import { CollectionBeforeChangeHook, CollectionAfterChangeHook } from 'payload'
import type { Tenant } from '../../../payload-types'

/**
 * BeforeCreate hook — assign a free / trial plan to a brand-new tenant so
 * the subscription state is non-empty before the first request lands.
 *
 * No revenue is recognized during trial; activation triggers IFRS-15 / ASC-606
 * performance-obligation booking via the Subscriptions collection's hooks.
 *
 * @standard ISO-8601-1:2019 date-time trial-period
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §3
 */
export const initializeTrialSubscription: CollectionBeforeChangeHook<Tenant> = async ({
  data,
  req,
}) => {
  try {
    // Find free or trial plan
    const plans = await req.payload.find({
      collection: 'subscription-plans',
      where: {
        or: [
          { slug: { equals: 'free' } },
          { slug: { equals: 'trial' } },
        ],
      },
      limit: 1,
    })

    if (!plans.docs.length) {
      req.payload.logger.warn('No free/trial plan found for new tenant')
      return data
    }

    const plan = plans.docs[0]
    const now = new Date()
    const trialEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) // 14 day trial

    // Create subscription in afterCreate hook instead
    // (we need the tenant ID which we get after creation)
    req.context = req.context || {}
    req.context.newTenant = true
    req.context.planId = plan.id
    req.context.trialEnd = trialEnd.toISOString()

    return data
  } catch (error) {
    req.payload.logger.error({ msg: 'Error initializing trial', err: error })
    return data
  }
}

/**
 * Create subscription after tenant is created
 */
export const createTrialSubscriptionAfter: CollectionAfterChangeHook<Tenant> = async ({
  doc,
  req,
}) => {
  try {
    if (!req.context?.newTenant || !req.context?.planId) {
      return doc
    }

    // Create subscription for the tenant
    await req.payload.create({
      collection: 'subscriptions',
      data: {
        tenant: doc.id,
        plan: req.context.planId as string,
        status: 'trial',
        trialStartedAt: new Date().toISOString(),
        trialEndsAt: req.context.trialEnd as string,
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: req.context.trialEnd as string,
      },
    })

    req.payload.logger.info(
      `Created trial subscription for new tenant ${doc.id}`,
    )
  } catch (error) {
    req.payload.logger.error({ msg: 'Error creating trial subscription', err: error })
  }

  return doc
}
