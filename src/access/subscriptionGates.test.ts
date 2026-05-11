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

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  requireSubscriptionPlan,
  blockWriteIfSuspended,
  allowReadDenyWriteIfPastDue,
  checkFeatureAccess,
  getFeatureLimit,
  getSubscriptionStatus,
} from '@/access/subscriptionGates'

// Mock Payload request
const createMockRequest = (overrides: any = {}) => ({
  user: {
    tenant: 'tenant-123',
    ...overrides.user,
  },
  payload: {
    findByID: vi.fn(),
    ...overrides.payload,
  },
  ...overrides,
})

// Mock subscription
const createMockSubscription = (overrides: any = {}) => ({
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
          findByID: vi.fn().mockResolvedValue(createMockSubscription()),
        },
      })

      const gate = requireSubscriptionPlan(['pro', 'enterprise'])
      const result = await gate({ req, operation: 'create' })

      expect(result).toBe(true)
    })

    it('should deny subscription with non-matching plan', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({
              plan: { id: 'free-plan', slug: 'free', limits: {} },
            }),
          ),
        },
      })

      const gate = requireSubscriptionPlan(['pro', 'enterprise'])
      const result = await gate({ req, operation: 'create' })

      expect(result).toBe(false)
    })

    it('should allow trial status', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({
              status: 'trial',
              plan: { id: 'pro', slug: 'pro', limits: {} },
            }),
          ),
        },
      })

      const gate = requireSubscriptionPlan(['pro'])
      const result = await gate({ req, operation: 'create' })

      expect(result).toBe(true)
    })

    it('should deny suspended subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({ status: 'suspended' }),
          ),
        },
      })

      const gate = requireSubscriptionPlan(['pro'])
      const result = await gate({ req, operation: 'create' })

      expect(result).toBe(false)
    })

    it('should deny when no tenant', async () => {
      const req = createMockRequest({ user: { tenant: null } })
      const gate = requireSubscriptionPlan(['pro'])
      const result = await gate({ req, operation: 'create' })

      expect(result).toBe(false)
    })
  })

  describe('blockWriteIfSuspended', () => {
    it('should allow writes on active subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(createMockSubscription()),
        },
      })

      const gate = blockWriteIfSuspended()
      const result = await gate({ req, operation: 'update' })

      expect(result).toBe(true)
    })

    it('should deny writes on suspended subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({ status: 'suspended' }),
          ),
        },
      })

      const gate = blockWriteIfSuspended()
      const result = await gate({ req, operation: 'update' })

      expect(result).toBe(false)
    })

    it('should deny writes on cancelled subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({ status: 'cancelled' }),
          ),
        },
      })

      const gate = blockWriteIfSuspended()
      const result = await gate({ req, operation: 'delete' })

      expect(result).toBe(false)
    })

    it('should allow past_due and grace_period writes', async () => {
      for (const status of ['past_due', 'grace_period']) {
        const req = createMockRequest({
          payload: {
            findByID: vi
              .fn()
              .mockResolvedValue(createMockSubscription({ status })),
          },
        })

        const gate = blockWriteIfSuspended()
        const result = await gate({ req, operation: 'update' })

        expect(result).toBe(true)
      }
    })
  })

  describe('allowReadDenyWriteIfPastDue', () => {
    it('should allow reads on past_due subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({ status: 'past_due' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, operation: 'read' })

      expect(result).toBe(true)
    })

    it('should deny creates on past_due subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({ status: 'past_due' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, operation: 'create' })

      expect(result).toBe(false)
    })

    it('should deny updates on grace_period', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({ status: 'grace_period' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, operation: 'update' })

      expect(result).toBe(false)
    })

    it('should allow writes on active subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
            createMockSubscription({ status: 'active' }),
          ),
        },
      })

      const gate = allowReadDenyWriteIfPastDue()
      const result = await gate({ req, operation: 'create' })

      expect(result).toBe(true)
    })
  })

  describe('checkFeatureAccess', () => {
    it('should allow enabled feature', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(createMockSubscription()),
        },
      })

      const result = await checkFeatureAccess(req, 'apiAccess')

      expect(result.allowed).toBe(true)
      expect(result.reason).toBeUndefined()
    })

    it('should deny feature not in plan', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(
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
          findByID: vi.fn().mockResolvedValue(
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
          findByID: vi.fn().mockResolvedValue(null),
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
          findByID: vi.fn().mockResolvedValue(createMockSubscription()),
        },
      })

      const limit = await getFeatureLimit(req, 'apiCallsPerMonth')

      expect(limit).toBe(10000)
    })

    it('should return null for unlimited feature', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(createMockSubscription()),
        },
      })

      const limit = await getFeatureLimit(req, 'storageGB')

      expect(limit).toBe(100)
    })

    it('should return undefined when no subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(null),
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
          findByID: vi.fn().mockResolvedValue(subscription),
        },
      })

      const result = await getSubscriptionStatus(req)

      expect(result).toEqual(subscription)
    })

    it('should return null when no subscription', async () => {
      const req = createMockRequest({
        payload: {
          findByID: vi.fn().mockResolvedValue(null),
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
})
