import { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'

/**
 * Subscription Plans — pricing-plan catalog (super-admin maintained).
 *
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §3
 */
export const SubscriptionPlans: CollectionConfig = {
  slug: 'subscriptionPlans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'monthlyUSD', 'isActive'],
  },
  // Slice NNN (DRY): inline `() => true` replaced with shared `anyone`.
  // Public catalog read; super-admin only for mutations.
  access: {
    read: anyone,
    create: isSuperAdminAccess,
    update: isSuperAdminAccess,
    delete: isSuperAdminAccess,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'stripeProductId',
      type: 'text',
      unique: true,
      admin: {
        description: 'Stripe Product ID for this plan',
      },
    },
    {
      name: 'stripePriceId',
      type: 'text',
      unique: true,
      admin: {
        description: 'Stripe Price ID (recurring) for this plan',
      },
    },
    {
      name: 'monthlyUSD',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Monthly price in USD cents (0 for free tier)',
        step: 0.01,
      },
    },
    {
      name: 'yearlyUSD',
      type: 'number',
      min: 0,
      admin: {
        description: 'Yearly price in USD cents (optional, for annual billing)',
        step: 0.01,
      },
    },
    {
      name: 'billingCycle',
      type: 'select',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
      ],
      defaultValue: 'monthly',
      required: true,
    },
    {
      name: 'limits',
      type: 'json',
      required: true,
      defaultValue: {
        apiCallsPerMonth: null,
        storageGB: null,
        seats: null,
        customDomains: false,
        advancedAnalytics: false,
        prioritySupport: false,
        apiAccess: false,
        webhooks: false,
      },
      admin: {
        description: 'Feature limits as JSON. null = unlimited',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order in pricing pages (lower = first)',
      },
    },
  ],
}
