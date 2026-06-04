/**
 * Marketing components — canonical inventory.
 *
 * Every component listed here is a *server-rendered* React component
 * that reads real Payload data — pricing, standards, audit-event
 * counts, country adapters, test recordings — rather than carrying a
 * static prop bag. This is what makes the marketing surface trustable:
 * the homepage's "2,150 audit events recorded today" number is a real
 * `payload.find('audit-events')` count, not a hand-typed boast.
 *
 * @standard schema.org WebPageElement
 * @standard W3C HTML5 Living Standard
 * @compliance WCAG-2.1 level-AA marketing-component-accessibility
 * @audit ISO-19011:2018 audit-trail data-driven-marketing
 * @see src/components/marketing/
 */

import type { Currency } from '@/config/regional-defaults'

/**
 * The 14 canonical marketing components — each implementation file in
 * `src/components/marketing/` exports a server-rendered React component
 * with the matching prop shape declared below.
 */
export interface MarketingComponentInventory {
  HeroBlock: { title: string; subtitle: string; ctaUrl?: string; ctaLabel?: string; heroMediaId?: string | number }
  PricingTable: { tenantId?: string | number; currency?: Currency; highlightPlanId?: string | number }
  FeatureGrid: { features: Array<{ title: string; body: string; standards?: string[] }> }
  StandardsBadges: { tier?: 'all' | 'accounting' | 'audit' | 'security' | 'i18n' }
  LiveAuditCounter: { tenantId?: string | number; sinceDays?: number }
  TestRecordingEmbed: { videoMediaId: string | number; subtitlesMediaId?: string | number; caption?: string }
  ComplianceMatrix: { columns?: Array<'banner-cites' | 'real-impl' | 'status'> }
  IntegrationsGrid: { tenantId?: string | number }
  StatsCounter: { metric: 'mrr' | 'arr' | 'totalRevenue' | 'churnRate' | 'auditEvents' | 'tenantsCount'; tenantId?: string | number; sinceDays?: number }
  Testimonials: { tenantId?: string | number; limit?: number }
  CtaBar: { headline: string; ctaLabel: string; ctaUrl: string; secondaryLabel?: string; secondaryUrl?: string }
  FaqAccordion: { categorySlug?: string; limit?: number }
  CountryShowcase: { highlightCountries?: string[] }
  CapabilityChecker: { capability: string; tenantId?: string | number }
}

export type MarketingComponentName = keyof MarketingComponentInventory
