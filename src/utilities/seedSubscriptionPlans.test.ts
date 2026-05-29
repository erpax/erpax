/**
 * seedSubscriptionPlans tests — pricing-plan fixture seeding.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @see docs/STANDARDS.md §3 §7
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { seedSubscriptionPlans, getOrCreatePlan } from '@/utilities/seeding/seedSubscriptionPlans'
import type { TenantConfig } from '@/config/types'
import type { Payload } from 'payload'

/** Pass the minimal mock where the seeder expects a real Payload instance. */
const p = (m: MockPayload): Payload => m as unknown as Payload

/** Minimal Payload mock — methods this test exercises. */
type MockPayload = {
  find: ReturnType<typeof vi.fn>
  create: ReturnType<typeof vi.fn>
  delete: ReturnType<typeof vi.fn>
  logger: {
    info: ReturnType<typeof vi.fn>
    error: ReturnType<typeof vi.fn>
  }
} & Record<string, unknown>

// Mock Payload instance
const createMockPayload = (overrides: Partial<MockPayload> = {}): MockPayload => ({
  find: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
  ...overrides,
})

const createMockConfig = (): TenantConfig => ({
  name: 'Test Tenant',
  slug: 'test-tenant',
  domain: 'test.example.com',
  businessModel: 'saas',
  colors: {
    primary: '#0066cc',
  },
  subscriptionPlans: [
    {
      name: 'Free',
      slug: 'free',
      monthlyPrice: 0,
      billingCycle: 'monthly',
      limits: {
        apiCallsPerMonth: 1000,
        customDomains: false,
        apiAccess: false,
      },
      sortOrder: 1,
    },
    {
      name: 'Pro',
      slug: 'pro',
      monthlyPrice: 29,
      yearlyPrice: 290,
      billingCycle: 'monthly',
      limits: {
        apiCallsPerMonth: 100000,
        customDomains: true,
        apiAccess: true,
      },
      sortOrder: 2,
    },
  ],
  marketing: {
    homepage: {
      heroTitle: 'Build Your Business',
      heroSubtitle: 'With our platform',
      cta: 'Get Started',
      features: [],
    },
    pages: [],
  },
  features: {},
})

describe('seedSubscriptionPlans', () => {
  let mockPayload: MockPayload

  beforeEach(() => {
    mockPayload = createMockPayload()
  })

  it('should create subscription plans from config', async () => {
    const config = createMockConfig()
    mockPayload.find.mockResolvedValue({ docs: [] })
    mockPayload.create
      .mockResolvedValueOnce({ id: 'plan-free', slug: 'free' })
      .mockResolvedValueOnce({ id: 'plan-pro', slug: 'pro' })

    const result = await seedSubscriptionPlans(p(mockPayload), config)

    expect(result).toEqual([
      { planId: 'plan-free', slug: 'free' },
      { planId: 'plan-pro', slug: 'pro' },
    ])
    expect(mockPayload.create).toHaveBeenCalledTimes(2)
  })

  it('should skip existing plans', async () => {
    const config = createMockConfig()

    // First plan exists, second doesn't
    mockPayload.find
      .mockResolvedValueOnce({ docs: [{ id: 'existing-free', slug: 'free' }] })
      .mockResolvedValueOnce({ docs: [] })

    mockPayload.create.mockResolvedValueOnce({ id: 'plan-pro', slug: 'pro' })

    const result = await seedSubscriptionPlans(p(mockPayload), config)

    expect(result).toEqual([
      { planId: 'existing-free', slug: 'free' },
      { planId: 'plan-pro', slug: 'pro' },
    ])

    // Should only create once (second plan)
    expect(mockPayload.create).toHaveBeenCalledTimes(1)
  })

  it('should create plans with all config properties', async () => {
    const config = createMockConfig()
    mockPayload.find.mockResolvedValue({ docs: [] })
    mockPayload.create.mockResolvedValueOnce({ id: 'plan-pro', slug: 'pro' })

    await seedSubscriptionPlans(p(mockPayload), config)

    const createCall = mockPayload.create.mock.calls[1][0]
    expect(createCall.data).toMatchObject({
      name: 'Pro',
      slug: 'pro',
      monthlyPrice: 29,
      yearlyPrice: 290,
      billingCycle: 'monthly',
      limits: {
        apiCallsPerMonth: 100000,
        customDomains: true,
        apiAccess: true,
      },
      sortOrder: 2,
      isActive: true,
    })
  })

  it('should handle errors gracefully', async () => {
    const config = createMockConfig()
    mockPayload.find.mockResolvedValue({ docs: [] })
    mockPayload.create.mockRejectedValueOnce(new Error('Creation failed'))

    await expect(seedSubscriptionPlans(p(mockPayload), config)).rejects.toThrow(
      'Creation failed',
    )
    expect(mockPayload.logger.error).toHaveBeenCalled()
  })
})

describe('getOrCreatePlan', () => {
  let mockPayload: MockPayload

  beforeEach(() => {
    mockPayload = createMockPayload()
  })

  it('should return existing plan id', async () => {
    mockPayload.find.mockResolvedValue({ docs: [{ id: 'existing-plan-id' }] })

    const planConfig = {
      name: 'Existing',
      slug: 'existing',
      monthlyPrice: 99,
      billingCycle: 'monthly' as const,
      limits: {},
      sortOrder: 1,
    }

    const result = await getOrCreatePlan(p(mockPayload), planConfig)

    expect(result).toBe('existing-plan-id')
    expect(mockPayload.create).not.toHaveBeenCalled()
  })

  it('should create plan if not exists', async () => {
    mockPayload.find.mockResolvedValue({ docs: [] })
    mockPayload.create.mockResolvedValueOnce({ id: 'new-plan-id' })

    const planConfig = {
      name: 'New Plan',
      slug: 'new',
      monthlyPrice: 49,
      billingCycle: 'monthly' as const,
      limits: {},
      sortOrder: 1,
    }

    const result = await getOrCreatePlan(p(mockPayload), planConfig)

    expect(result).toBe('new-plan-id')
    expect(mockPayload.create).toHaveBeenCalledOnce()
  })
})
