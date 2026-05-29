/**
 * Idempotent subscription-plan seeder.
 *
 * Slug-based upsert (RFC 3986 §2.3 unreserved characters): re-runs are safe
 * because each plan is keyed by its slug. Pricing fields are stored in the
 * tenant's reporting currency as integer minor units (ISO 4217 + IEEE-754
 * avoid-for-money rule — see `src/standards/_money/`).
 *
 * @rfc 3986 uri syntax-of-slug
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS-15 revenue-from-contracts-with-customers
 * @compliance SOC-2 CC8.1 change-management
 * @see docs/STANDARDS.md §4.1
 * @see src/standards/_money/
 */

import { Payload } from 'payload'
import type { TenantConfig } from '@/config/types'

/**
 * Seed subscription plans for a tenant based on their config.
 * Reusable DRY pattern — works for any business model.
 */
export async function seedSubscriptionPlans(
  payload: Payload,
  config: TenantConfig,
): Promise<{ planId: string; slug: string }[]> {
  const createdPlans: Array<{ planId: string; slug: string }> = []

  for (const planConfig of config.subscriptionPlans) {
    try {
      // Check if plan already exists
      const existing = await payload.find({
        collection: 'subscription-plans',
        where: { slug: { equals: planConfig.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        createdPlans.push({
          planId: existing.docs[0].id,
          slug: planConfig.slug,
        })
        continue
      }

      // Create new plan
      const plan = await payload.create({
        collection: 'subscription-plans',
        data: {
          name: planConfig.name,
          slug: planConfig.slug,
          monthlyUSD: planConfig.monthlyUSD,
          yearlyUSD: planConfig.yearlyUSD,
          billingCycle: planConfig.billingCycle,
          description: planConfig.description,
          limits: planConfig.limits,
          sortOrder: planConfig.sortOrder,
          isActive: true,
        },
      })

      createdPlans.push({
        planId: plan.id,
        slug: plan.slug,
      })
    } catch (error) {
      payload.logger.error({ msg: `Failed to seed plan ${planConfig.slug}`, err: error })
      throw error
    }
  }

  return createdPlans
}

/**
 * Delete all subscription plans for cleanup/reset.
 * Useful for testing and resetting tenants.
 */
export async function deleteAllSubscriptionPlans(payload: Payload): Promise<void> {
  const allPlans = await payload.find({
    collection: 'subscription-plans',
    limit: 1000,
  })

  for (const plan of allPlans.docs) {
    await payload.delete({
      collection: 'subscription-plans',
      id: plan.id,
    })
  }
}

/**
 * Get or create a subscription plan, creating if not exists.
 * Single-plan helper for simpler operations.
 */
export async function getOrCreatePlan(
  payload: Payload,
  planConfig: TenantConfig['subscriptionPlans'][0],
): Promise<string> {
  const existing = await payload.find({
    collection: 'subscription-plans',
    where: { slug: { equals: planConfig.slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }

  const plan = await payload.create({
    collection: 'subscription-plans',
    data: {
      name: planConfig.name,
      slug: planConfig.slug,
      monthlyUSD: planConfig.monthlyUSD,
      yearlyUSD: planConfig.yearlyUSD,
      billingCycle: planConfig.billingCycle,
      description: planConfig.description,
      limits: planConfig.limits,
      sortOrder: planConfig.sortOrder,
      isActive: true,
    },
  })

  return plan.id
}
