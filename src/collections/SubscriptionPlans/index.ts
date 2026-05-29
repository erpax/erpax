import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { isSuperAdminAccess } from '../../access/isSuperAdmin'
import { currencyField } from '../../fields/base-accounting-fields'

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
  slug: 'subscription-plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'monthlyPrice', 'isActive'],
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
      name: 'monthlyPrice',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Monthly price in minor units (0 for free tier); currency carried by `currency`.',
        step: 0.01,
      },
    },
    {
      name: 'yearlyPrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Yearly price in minor units (optional, for annual billing); currency carried by `currency`.',
        step: 0.01,
      },
    },
    // erpax carries currency as data (ISO-4217), never baked into the field
    // name — a plan priced in EUR is the same shape as one in USD.
    currencyField({ defaultValue: 'USD' }),
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
