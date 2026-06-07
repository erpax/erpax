import { describe, it, expect } from 'vitest'
import type {
  TenantConfig,
  TranslatedField,
  FeatureLimit,
  FeatureLimits,
} from '@/config/types'

// config/types (./index.ts) is the agnostic seed contract: a tenant's whole
// business surface is one TenantConfig object. This atom is type-only, so we
// construct conforming values and assert the structural invariants the shape
// guarantees.
describe('config/types — the agnostic TenantConfig contract', () => {
  const cfg: TenantConfig = {
    name: 'Acme',
    slug: 'acme',
    domain: 'acme.io',
    colors: { primary: '#000000' },
    businessModel: 'saas',
    subscriptionPlans: [
      {
        name: 'Free',
        slug: 'free',
        monthlyPrice: 0,
        billingCycle: 'monthly',
        limits: { apiCallsPerMonth: 1000, seats: 1, apiAccess: false },
        sortOrder: 1,
      },
      {
        name: 'Pro',
        slug: 'pro',
        monthlyPrice: 19,
        yearlyPrice: 190,
        billingCycle: 'monthly',
        limits: { apiCallsPerMonth: null, seats: 5, apiAccess: true },
        sortOrder: 2,
      },
    ],
    marketing: {
      homepage: {
        heroTitle: 'Hello',
        heroSubtitle: 'World',
        cta: 'Start',
        features: [{ title: 'Fast', description: 'Very fast' }],
      },
      pages: [],
    },
    features: { api: true },
    supportedLanguages: ['en', 'es'],
  }

  it('a minimal conforming config carries the mandatory surface', () => {
    expect(cfg.name).toBe('Acme')
    expect(cfg.colors.primary).toBe('#000000')
    expect(cfg.marketing.homepage.features).toHaveLength(1)
  })

  it('businessModel is constrained to the agnostic model set', () => {
    const models: TenantConfig['businessModel'][] = [
      'saas', 'ecommerce', 'marketplace', 'course', 'newsletter', 'service',
    ]
    for (const m of models) {
      const c: TenantConfig = { ...cfg, businessModel: m }
      expect(c.businessModel).toBe(m)
    }
  })

  it('plan limits allow null for "unlimited" and booleans for feature flags', () => {
    const [free, pro] = cfg.subscriptionPlans
    expect(free.limits.apiCallsPerMonth).toBe(1000)
    expect(pro.limits.apiCallsPerMonth).toBe(null) // unlimited
    expect(pro.limits.apiAccess).toBe(true)
    // limits is an open bag — extra keys are unknown-typed
    const c: TenantConfig = {
      ...cfg,
      subscriptionPlans: [{ ...free, limits: { ...free.limits, customMetric: 42 } }],
    }
    expect(c.subscriptionPlans[0].limits.customMetric).toBe(42)
  })

  it('TranslatedField maps language tags to text', () => {
    const tf: TranslatedField = { en: 'Hello', es: 'Hola' }
    expect(tf.es).toBe('Hola')
    expect(Object.keys(tf)).toContain('en')
  })

  it('FeatureLimit is number | null | boolean; FeatureLimits is the keyed bag', () => {
    const numeric: FeatureLimit = 100
    const unlimited: FeatureLimit = null
    const flag: FeatureLimit = true
    const bag: FeatureLimits = { seats: numeric, apiCalls: unlimited, api: flag }
    expect(bag.seats).toBe(100)
    expect(bag.apiCalls).toBe(null)
    expect(bag.api).toBe(true)
  })
})
