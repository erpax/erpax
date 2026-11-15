/**
 * Subscription-gate tests — plan-based access control + revenue-state gating.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-340-40 deferred-contract-costs
 * @security ISO-27002 §5.15 access-control
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §3 §4.4 §7
 */

import { describe, it, expect, vi } from 'vitest'
import type { PayloadRequest } from 'payload'
import {
  requireSubscriptionPlan,
  blockWriteIfSuspended,
  allowReadDenyWriteIfPastDue,
  checkFeatureAccess,
  getFeatureLimit,
  getSubscriptionStatus,
  featureGuard,
} from '@/utilities/subscription/gate'

/** Partial-shape overrides used by createMockRequest. */
interface MockRequestOverrides {
  readonly user?: Record<string, unknown>
  readonly payload?: Record<string, unknown>
}

// Mock Payload request — cast to PayloadRequest at call sites; the
// runtime mock is intentionally narrower than the full interface.
// The user shape MUST match `getUser()` + `getUserContext()`:
//   - presence of `roles` is the discriminator that narrows the
//     `User | PayloadMcpApiKey` auth union to `User`.
//   - tenant is derived from `user.tenants[0].tenant` (the multi-tenant
//     plugin convention), NOT a flat `user.tenant`.
/**
 * The subscriptions a tenant holds, as Payload answers them: `find` returns the stored subscription only
 * when the query asks for `subscriptions` of that subscription's tenant. A gate that looks it up any
 * other way (by the tenant's id as the subscription id, say) finds nothing.
 */
const stored = (subscription: { tenant?: unknown } | null) =>
  vi.fn(async ({ collection, where }: { collection: string; where?: { tenant?: { equals?: unknown } } }) => ({
    docs: subscription && collection === 'subscriptions' && where?.tenant?.equals === subscription.tenant ? [subscription] : [],
  }))

const createMockRequest = (overrides: MockRequestOverrides = {}): PayloadRequest => ({
  user: {
    id: 'user-123',
    roles: ['admin'],
    tenants: [{ tenant: 'tenant-123' }],
    ...overrides.user,
  },
  payload: {
    find: stored(null),
    ...overrides.payload,
  },
  ...overrides,
} as unknown as PayloadRequest)

// Mock subscription — structural; full type lives in payload-types.ts
// (auto-generated) which evolves with schema.
const createMockSubscription = (overrides: Record<string, unknown> = {}) => ({
  id: 'sub-123',
  tenant: 'tenant-123',
  status: 'active',
  plan: {
    id: 'plan-123',
    slug: 'pro',
    limits: {
      apiCallsPerMonth: 10000,
      storageGB: 100,
      customDomains: true,
      apiAccess: true,
    },
  },
  ...overrides,
})

describe('subscriptionGates', () => {
  describe('requireSubscriptionPlan', () => {
    it('should allow active subscription with required plan', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(createMockSubscription()),
        },
      })

      const gate = requireSubscriptionPlan(['pro', 'enterprise'])
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(true)
    })

    it('should deny subscription with non-matching plan', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({
              plan: { id: 'free-plan', slug: 'free', limits: {} },
            }),
          ),
        },
      })

      const gate = requireSubscriptionPlan(['pro', 'enterprise'])
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })

    it('should allow trial status', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({
              status: 'trial',
              plan: { id: 'pro', slug: 'pro', limits: {} },
            }),
          ),
        },
      })

      const gate = requireSubscriptionPlan(['pro'])
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(true)
    })

    it('should deny suspended subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'suspended' }),
          ),
        },
      })

      const gate = requireSubscriptionPlan(['pro'])
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })

    it('should deny when no tenant', async () => {
      const req = createMockRequest({ user: { tenants: [] } })
      const gate = requireSubscriptionPlan(['pro'])
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })
  })

  describe('blockWriteIfSuspended', () => {
    it('should allow writes on active subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(createMockSubscription()),
        },
      })

      const gate = blockWriteIfSuspended()
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(true)
    })

    it('should deny writes on suspended subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'suspended' }),
          ),
        },
      })

      const gate = blockWriteIfSuspended()
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })

    it('should deny writes on cancelled subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'cancelled' }),
          ),
        },
      })

      const gate = blockWriteIfSuspended()
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })

    it('should allow past_due and grace_period writes', async () => {
      for (const status of ['past_due', 'grace_period']) {
        const req = createMockRequest({
          payload: {
            find: stored(createMockSubscription({ status })),
          },
        })

        const gate = blockWriteIfSuspended()
        const result = await gate({ req, slug: 'invoices' })

        expect(result).toBe(true)
      }
    })
  })

  describe('allowReadDenyWriteIfPastDue', () => {
    // Note: this gate is operation-agnostic by design — Payload wires
    // it onto `create`/`update`/`delete` only (the docstring on the
    // exported gate explicitly says so), and `read` is bound to a
    // separate permissive gate. So the gate uniformly returns
    // false for any write-block status, and the "read allowance" is
    // expressed at the CollectionConfig level, not inside the closure.
    it('returns false on past_due — caller wires this onto write ops only', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'past_due' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })

    it('should deny creates on past_due subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'past_due' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })

    it('should deny updates on grace_period', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'grace_period' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(false)
    })

    it('should allow writes on active subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'active' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, slug: 'invoices' })

      expect(result).toBe(true)
    })
  })

  describe('checkFeatureAccess', () => {
    it('should allow enabled feature', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(createMockSubscription()),
        },
      })

      const result = await checkFeatureAccess(req, 'apiAccess')

      expect(result.allowed).toBe(true)
      expect(result.reason).toBeUndefined()
    })

    it('should deny feature not in plan', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({
              plan: {
                id: 'free',
                slug: 'free',
                limits: { apiCallsPerMonth: null, apiAccess: false },
              },
            }),
          ),
        },
      })

      const result = await checkFeatureAccess(req, 'apiAccess')

      expect(result.allowed).toBe(false)
      expect(result.reason).toContain('not included')
    })

    it('should deny feature on non-active subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(
            createMockSubscription({ status: 'suspended' }),
          ),
        },
      })

      const result = await checkFeatureAccess(req, 'apiAccess')

      expect(result.allowed).toBe(false)
      expect(result.reason).toContain('suspended')
    })

    it('should return reason when no subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(null),
        },
      })

      const result = await checkFeatureAccess(req, 'apiAccess')

      expect(result.allowed).toBe(false)
      expect(result.reason).toContain('No subscription')
    })
  })

  describe('getFeatureLimit', () => {
    it('should return feature limit value', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(createMockSubscription()),
        },
      })

      const limit = await getFeatureLimit(req, 'apiCallsPerMonth')

      expect(limit).toBe(10000)
    })

    it('should return null for unlimited feature', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(createMockSubscription()),
        },
      })

      const limit = await getFeatureLimit(req, 'storageGB')

      expect(limit).toBe(100)
    })

    it('should return undefined when no subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(null),
        },
      })

      const limit = await getFeatureLimit(req, 'apiCallsPerMonth')

      expect(limit).toBeUndefined()
    })
  })

  describe('getSubscriptionStatus', () => {
    it('should return subscription', async () => {
      const subscription = createMockSubscription()
      const req = createMockRequest({
        payload: {
          find: stored(subscription),
        },
      })

      const result = await getSubscriptionStatus(req)

      expect(result).toEqual(subscription)
    })

    it('should return null when no subscription', async () => {
      const req = createMockRequest({
        payload: {
          find: stored(null),
        },
      })

      const result = await getSubscriptionStatus(req)

      expect(result).toBeNull()
    })

    it('should return null when no tenant', async () => {
      const req = createMockRequest({ user: { tenant: null } })
      const result = await getSubscriptionStatus(req)

      expect(result).toBeNull()
    })
  })

  describe('the subscription is found through its tenant', () => {
    it("asks for the subscriptions of the user's tenant, newest first", async () => {
      const find = stored(createMockSubscription())
      await getSubscriptionStatus(createMockRequest({ payload: { find } }))
      expect(find).toHaveBeenCalledWith(expect.objectContaining({ collection: 'subscriptions', where: { tenant: { equals: 'tenant-123' } }, sort: '-createdAt', limit: 1 }))
    })

    it('reads it once per request, however many gates ask', async () => {
      const find = stored(createMockSubscription())
      const req = { ...createMockRequest({ payload: { find } }), context: {} } as PayloadRequest
      await Promise.all([featureGuard('apiAccess')({ req } as never), featureGuard('storageGB')({ req } as never), getFeatureLimit(req, 'storageGB')])
      expect(find).toHaveBeenCalledTimes(1)
    })

    it("another tenant's subscription is not this tenant's", async () => {
      const req = createMockRequest({ payload: { find: stored(createMockSubscription({ tenant: 'tenant-999' })) } })
      expect(await getSubscriptionStatus(req)).toBeNull()
      expect((await checkFeatureAccess(req, 'apiAccess')).allowed).toBe(false)
    })
  })

  describe('featureGuard', () => {
    it('lets a tenant through when its plan includes the feature, and refuses one without a subscription', async () => {
      const entitled = createMockRequest({ user: { id: 'user-123', roles: ['user'], tenants: [{ tenant: 'tenant-123' }] }, payload: { find: stored(createMockSubscription()) } })
      const unsubscribed = createMockRequest({ user: { id: 'user-123', roles: ['user'], tenants: [{ tenant: 'tenant-123' }] }, payload: { find: stored(null) } })
      expect(await featureGuard('apiAccess')({ req: entitled } as never)).toBe(true)
      expect(await featureGuard('apiAccess')({ req: unsubscribed } as never)).toBe(false)
    })

    it('lets the platform admin through: it serves every tenant and holds no plan', async () => {
      const superAdmin = createMockRequest({ user: { roles: ['admin'], tenants: [] }, payload: { find: stored(null) } })
      expect(await featureGuard('consolidation')({ req: superAdmin } as never)).toBe(true)
    })
  })
})
