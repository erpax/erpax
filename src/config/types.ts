/**
 * `TenantConfig` — agnostic seed configuration shape for any tenant.
 *
 * Single config file controls business logic, features, pricing, content.
 *
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-17442-1:2020 lei
 * @standard BCP-47 language-tag
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @compliance GDPR Art.4(7) data-controller
 * @see docs/STANDARDS.md §3
 */
export interface TenantConfig {
  // Basic tenant info
  name: string
  slug: string
  domain: string
  description?: string

  // Branding
  colors: {
    primary: string
    secondary?: string
    accent?: string
  }
  fonts?: {
    heading?: string
    body?: string
  }

  // Business model
  businessModel: 'saas' | 'ecommerce' | 'marketplace' | 'course' | 'newsletter' | 'service'

  // Subscription plans this tenant offers
  subscriptionPlans: Array<{
    name: string
    slug: string
    monthlyPrice: number
    yearlyPrice?: number
    billingCycle: 'monthly' | 'yearly'
    description?: string
    limits: {
      apiCallsPerMonth?: number | null
      storageGB?: number | null
      seats?: number | null
      customDomains?: boolean
      advancedAnalytics?: boolean
      prioritySupport?: boolean
      apiAccess?: boolean
      webhooks?: boolean
      [key: string]: unknown
    }
    sortOrder: number
  }>

  // Marketing content
  marketing: {
    homepage: {
      heroTitle: string
      heroSubtitle: string
      cta: string
      features: Array<{
        title: string
        description: string
        icon?: string
      }>
    }
    pages: Array<{
      slug: string
      title: string
      description: string
      content: string
    }>
  }

  // Feature flags
  features: {
    api?: boolean
    webhooks?: boolean
    customDomain?: boolean
    advancedAnalytics?: boolean
    teamCollaboration?: boolean
    [key: string]: boolean | undefined
  }

  // Localization - supported languages
  supportedLanguages?: string[] // e.g., ['en', 'es', 'fr']

  // Stripe configuration (optional, for paid plans)
  stripe?: {
    secretKey?: string
    publishableKey?: string
  }

  // Metadata
  metadata?: Record<string, unknown>
}

/**
 * TranslatedField - Helper for multilingual fields
 * Stores translations as { language: string, text: string }
 */
export interface TranslatedField {
  [language: string]: string
}

/**
 * Feature limit type helpers
 */
export type FeatureLimit = number | null | boolean
export type FeatureLimits = Record<string, FeatureLimit>
