import { describe, it, expect } from 'vitest'
import {
  courseBuilderConfig,
  newsletterConfig,
  marketplaceConfig,
  getConfigByBusinessModel,
  listExampleConfigs,
} from '@/config/examples'
import type { TenantConfig } from '@/config/types'

// config/examples (./index.ts): self-contained, TenantConfig-conforming
// templates that seed a working tenant by copy-and-edit.
describe('config/examples — self-contained agnostic tenant templates', () => {
  const all = [courseBuilderConfig, newsletterConfig, marketplaceConfig]

  it('every example is a structurally complete TenantConfig', () => {
    for (const cfg of all) {
      expect(typeof cfg.name).toBe('string')
      expect(cfg.slug.length).toBeGreaterThan(0)
      expect(cfg.colors.primary).toMatch(/^#/)
      expect(cfg.subscriptionPlans.length).toBeGreaterThan(0)
      expect(cfg.marketing.homepage.heroTitle.length).toBeGreaterThan(0)
      expect(Array.isArray(cfg.marketing.pages)).toBe(true)
    }
  })

  it('the examples cover distinct business models', () => {
    expect(courseBuilderConfig.businessModel).toBe('course')
    expect(newsletterConfig.businessModel).toBe('newsletter')
    expect(marketplaceConfig.businessModel).toBe('marketplace')
    const models = new Set(all.map((c) => c.businessModel))
    expect(models.size).toBe(all.length)
  })

  it('every plan has a unique slug and a monotone sortOrder within its tenant', () => {
    for (const cfg of all) {
      const slugs = cfg.subscriptionPlans.map((p) => p.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
      const orders = cfg.subscriptionPlans.map((p) => p.sortOrder)
      const sorted = [...orders].sort((a, b) => a - b)
      expect(orders).toEqual(sorted)
    }
  })

  it('newsletter Pro encodes unlimited api calls as null (the contract sentinel)', () => {
    const pro = newsletterConfig.subscriptionPlans.find((p) => p.slug === 'pro')!
    expect(pro.limits.apiCallsPerMonth).toBe(null)
  })

  it('getConfigByBusinessModel resolves by slug, null when unknown', () => {
    expect(getConfigByBusinessModel('course-builder')).toBe(courseBuilderConfig)
    expect(getConfigByBusinessModel('substack-pro')).toBe(newsletterConfig)
    expect(getConfigByBusinessModel('digital-marketplace')).toBe(marketplaceConfig)
    expect(getConfigByBusinessModel('does-not-exist')).toBe(null)
  })

  it('listExampleConfigs returns all templates, each a valid TenantConfig', () => {
    const list: TenantConfig[] = listExampleConfigs()
    expect(list).toHaveLength(3)
    expect(list).toEqual(expect.arrayContaining(all))
  })
})
