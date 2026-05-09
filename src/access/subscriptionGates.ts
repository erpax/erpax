/**
 * Subscription-gate access predicates — feature-flag/plan-based access.
 *
 * Gates: `requireSubscriptionPlan`, `blockWriteIfSuspended`,
 * `allowReadDenyWriteIfPastDue`, `checkFeatureAccess`, `getFeatureLimit`,
 * `getSubscriptionStatus`. Used by collection access blocks to enforce
 * paid-feature gating at the API edge.
 *
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-340-40 deferred-contract-costs
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27002 §5.15 access-control
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §3 §4.4
 */

import { Access, PayloadRequest } from 'payload'

/**
 * DRY: Core subscription lookup logic reused across all gate functions
 */
async function getSubscriptionForRequest(
  req: PayloadRequest,
): Promise<{ subscription: any; tenant: string } | null> {
  if (!req.user?.tenant) {
    return null
  }

  try {
    const subscription = await req.payload.findByID({
      collection: 'subscriptions',
      id: req.user.tenant as string,
      depth: 1,
    })

    return subscription ? { subscription, tenant: req.user.tenant } : null
  } catch {
    return null
  }
}

/**
 * Requires tenant to have active subscription in one of the specified plans.
 * Allowed statuses: active, trial, grace_period
 */
export const requireSubscriptionPlan = (requiredPlans: string[]): Access => {
  return async (args) => {
    const subscriptionData = await getSubscriptionForRequest(args.req)
    if (!subscriptionData) {
      return false
    }

    const { subscription } = subscriptionData
    const allowedStatuses = ['active', 'trial', 'grace_period']

    if (!allowedStatuses.includes(subscription.status)) {
      return false
    }

    const plan = typeof subscription.plan === 'object' ? subscription.plan : null
    if (!plan || !requiredPlans.includes(plan.slug)) {
      return false
    }

    return true
  }
}

/**
 * Blocks all updates/deletes if tenant is suspended or cancelled.
 * Read access is still allowed.
 */
export const blockWriteIfSuspended = (): Access => {
  return async (args) => {
    const subscriptionData = await getSubscriptionForRequest(args.req)
    if (!subscriptionData) {
      return false
    }

    const { subscription } = subscriptionData
    const readOnlyStatuses = ['suspended', 'cancelled']

    if (readOnlyStatuses.includes(subscription.status)) {
      return false // deny writes
    }

    return true
  }
}

/**
 * Allows reads but denies writes if tenant is past_due, grace_period, or suspended.
 * Useful for graceful degradation: users can read but not modify.
 */
export const allowReadDenyWriteIfPastDue = (): Access => {
  return async (args) => {
    const { operation, req } = args
    const subscriptionData = await getSubscriptionForRequest(req)

    if (!subscriptionData) {
      return false
    }

    const { subscription } = subscriptionData
    const writeBlockStatuses = ['past_due', 'grace_period', 'suspended', 'cancelled']

    // Only block writes for these operations
    if (['create', 'update', 'delete'].includes(operation)) {
      return !writeBlockStatuses.includes(subscription.status)
    }

    // Allow all read operations
    return true
  }
}

/**
 * Check feature access at runtime (in hooks, endpoints, etc).
 * Returns { allowed, reason } for conditional logic.
 */
export async function checkFeatureAccess(
  req: PayloadRequest,
  feature: string,
): Promise<{ allowed: boolean; reason?: string }> {
  const subscriptionData = await getSubscriptionForRequest(req)

  if (!subscriptionData) {
    return { allowed: false, reason: 'No subscription found' }
  }

  const { subscription } = subscriptionData

  // Check status first
  const allowedStatuses = ['active', 'trial']
  if (!allowedStatuses.includes(subscription.status)) {
    return { allowed: false, reason: `Subscription is ${subscription.status}` }
  }

  // Get plan and check feature
  const plan = typeof subscription.plan === 'object' ? subscription.plan : null
  if (!plan) {
    return { allowed: false, reason: 'No plan' }
  }

  // Parse limits JSON
  const limits = typeof plan.limits === 'string' ? JSON.parse(plan.limits) : plan.limits

  // Check if feature is enabled
  const featureValue = limits?.[feature]
  if (featureValue === false || featureValue === null) {
    return { allowed: false, reason: `${feature} not included in plan` }
  }

  return { allowed: true }
}

/**
 * Get feature limit value from subscription plan.
 * Useful for rate limiting, quota enforcement, etc.
 */
export async function getFeatureLimit(
  req: PayloadRequest,
  feature: string,
): Promise<number | null | undefined> {
  const subscriptionData = await getSubscriptionForRequest(req)
  if (!subscriptionData) {
    return undefined
  }

  const { subscription } = subscriptionData
  const plan = typeof subscription.plan === 'object' ? subscription.plan : null

  if (!plan) {
    return undefined
  }

  const limits = typeof plan.limits === 'string' ? JSON.parse(plan.limits) : plan.limits
  return limits?.[feature]
}

/**
 * Get current subscription status for a tenant.
 * Returns subscription object or null.
 */
export async function getSubscriptionStatus(req: PayloadRequest): Promise<any | null> {
  const subscriptionData = await getSubscriptionForRequest(req)
  return subscriptionData?.subscription ?? null
}
