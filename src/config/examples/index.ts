/**
 * Example tenant configs — self-contained, business-model-agnostic templates.
 *
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard BCP-47 language-tag
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @see docs/STANDARDS.md §3
 */

import type { TenantConfig } from '@/config/types'

export const courseBuilderConfig: TenantConfig = {
  name: 'CourseBuilder',
  slug: 'course-builder',
  domain: 'coursebuilder.io',
  businessModel: 'course',
  description: 'Digital course platform for creators',
  colors: {
    primary: '#6366f1',
    secondary: '#ec4899',
  },
  subscriptionPlans: [
    {
      name: 'Free',
      slug: 'free',
      monthlyPrice: 0,
      billingCycle: 'monthly',
      description: 'Get started with basic course creation',
      limits: {
        apiCallsPerMonth: 1000,
        storageGB: 1,
        seats: 1,
        customDomains: false,
        advancedAnalytics: false,
        prioritySupport: false,
        apiAccess: false,
        webhooks: false,
      },
      sortOrder: 1,
    },
    {
      name: 'Creator',
      slug: 'creator',
      monthlyPrice: 29,
      yearlyPrice: 290,
      billingCycle: 'monthly',
      description: 'Perfect for individual course creators',
      limits: {
        apiCallsPerMonth: 50000,
        storageGB: 100,
        seats: 1,
        customDomains: true,
        advancedAnalytics: true,
        prioritySupport: false,
        apiAccess: true,
        webhooks: true,
      },
      sortOrder: 2,
    },
    {
      name: 'Academy',
      slug: 'academy',
      monthlyPrice: 99,
      yearlyPrice: 990,
      billingCycle: 'monthly',
      description: 'For teams managing multiple courses',
      limits: {
        apiCallsPerMonth: 500000,
        storageGB: 1000,
        seats: 10,
        customDomains: true,
        advancedAnalytics: true,
        prioritySupport: true,
        apiAccess: true,
        webhooks: true,
      },
      sortOrder: 3,
    },
  ],
  marketing: {
    homepage: {
      heroTitle: 'Teach Your Passion, Build Your Business',
      heroSubtitle: 'Create and sell online courses without the complexity',
      cta: 'Start Building Free',
      features: [
        {
          title: 'Easy Course Builder',
          description: 'Drag-and-drop interface for creating engaging courses',
        },
        {
          title: 'Student Management',
          description: 'Track progress, engagement, and completion rates',
        },
        {
          title: 'Payment Processing',
          description: 'Integrated Stripe payments with automatic tax handling',
        },
        {
          title: 'Custom Domain',
          description: 'Publish your courses on your own branded domain',
        },
      ],
    },
    pages: [
      {
        slug: 'for-creators',
        title: 'For Course Creators',
        description: 'Build and sell courses',
        content: 'Everything you need to create, market, and sell online courses.',
      },
      {
        slug: 'for-teams',
        title: 'For Teams',
        description: 'Manage multiple courses as a team',
        content: 'Collaborate with your team to build and scale your course business.',
      },
    ],
  },
  features: {
    api: true,
    webhooks: true,
    customDomain: true,
    advancedAnalytics: true,
    teamCollaboration: true,
  },
  supportedLanguages: ['en', 'es', 'fr', 'de'],
}

export const newsletterConfig: TenantConfig = {
  name: 'SubStack Pro',
  slug: 'substack-pro',
  domain: 'substackpro.io',
  businessModel: 'newsletter',
  description: 'Newsletter platform for writers',
  colors: {
    primary: '#1f2937',
    secondary: '#f59e0b',
  },
  subscriptionPlans: [
    {
      name: 'Free',
      slug: 'free',
      monthlyPrice: 0,
      billingCycle: 'monthly',
      description: 'Send up to 100 emails/month',
      limits: {
        apiCallsPerMonth: 100,
        storageGB: 1,
        seats: 1,
        customDomains: false,
        advancedAnalytics: false,
        prioritySupport: false,
        apiAccess: false,
        webhooks: false,
      },
      sortOrder: 1,
    },
    {
      name: 'Pro',
      slug: 'pro',
      monthlyPrice: 19,
      yearlyPrice: 190,
      billingCycle: 'monthly',
      description: 'Unlimited emails + subscriber insights',
      limits: {
        apiCallsPerMonth: null, // unlimited
        storageGB: 10,
        seats: 1,
        customDomains: true,
        advancedAnalytics: true,
        prioritySupport: false,
        apiAccess: true,
        webhooks: false,
      },
      sortOrder: 2,
    },
  ],
  marketing: {
    homepage: {
      heroTitle: 'Start Your Newsletter',
      heroSubtitle: 'Build an audience and monetize your writing',
      cta: 'Create Free Newsletter',
      features: [
        {
          title: 'Beautiful Templates',
          description: 'Professionally designed email templates',
        },
        {
          title: 'Subscriber Analytics',
          description: 'Track opens, clicks, and engagement',
        },
        {
          title: 'Paid Subscriptions',
          description: 'Turn your newsletter into revenue',
        },
      ],
    },
    pages: [],
  },
  features: {
    api: true,
    webhooks: false,
    customDomain: true,
    advancedAnalytics: true,
  },
}

export const marketplaceConfig: TenantConfig = {
  name: 'Digital Marketplace',
  slug: 'digital-marketplace',
  domain: 'digitalmarketplace.io',
  businessModel: 'marketplace',
  description: 'Buy and sell digital products',
  colors: {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
  },
  subscriptionPlans: [
    {
      name: 'Seller',
      slug: 'seller',
      monthlyPrice: 0,
      billingCycle: 'monthly',
      description: 'List and sell digital products',
      limits: {
        apiCallsPerMonth: 10000,
        storageGB: 10,
        seats: 1,
        customDomains: false,
        advancedAnalytics: false,
        prioritySupport: false,
        apiAccess: false,
        webhooks: false,
      },
      sortOrder: 1,
    },
    {
      name: 'Professional',
      slug: 'professional',
      monthlyPrice: 49,
      yearlyPrice: 490,
      billingCycle: 'monthly',
      description: 'Advanced seller tools and analytics',
      limits: {
        apiCallsPerMonth: 100000,
        storageGB: 100,
        seats: 5,
        customDomains: true,
        advancedAnalytics: true,
        prioritySupport: true,
        apiAccess: true,
        webhooks: true,
      },
      sortOrder: 2,
    },
  ],
  marketing: {
    homepage: {
      heroTitle: 'Sell Digital Products Globally',
      heroSubtitle: 'Reach buyers worldwide with our marketplace platform',
      cta: 'List Your Products Free',
      features: [
        {
          title: 'Global Payments',
          description: 'Accept payments from anywhere in the world',
        },
        {
          title: 'Product Management',
          description: 'Manage inventory, versions, and updates',
        },
        {
          title: 'Buyer Protection',
          description: 'Safe, secure transactions for all parties',
        },
      ],
    },
    pages: [],
  },
  features: {
    api: true,
    webhooks: true,
    customDomain: true,
    advancedAnalytics: true,
  },
}

/**
 * Helper: Get config by business model
 */
export function getConfigByBusinessModel(model: string): TenantConfig | null {
  const configs: Record<string, TenantConfig> = {
    'course-builder': courseBuilderConfig,
    'substack-pro': newsletterConfig,
    'digital-marketplace': marketplaceConfig,
  }
  return configs[model] || null
}

/**
 * Helper: List all example configs
 */
export function listExampleConfigs(): TenantConfig[] {
  return [courseBuilderConfig, newsletterConfig, marketplaceConfig]
}
