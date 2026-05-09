import { CollectionConfig } from 'payload'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import {
  encryptSubscriptionData,
  decryptSubscriptionData,
} from './hooks/encryptSensitiveFields'

/**
 * Subscriptions — tenant-to-plan binding with period state and Stripe sync.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time period-start period-end
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-340-40 deferred-contract-costs
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance SOX §404 internal-controls
 * @security ISO-27002 §8.24 use-of-cryptography
 * @see docs/STANDARDS.md §3
 */
export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    useAsTitle: 'status',
    defaultColumns: ['tenant', 'plan', 'status', 'currentPeriodStart', 'currentPeriodEnd'],
  },
  access: {
    read: isSuperAdminAccess,
    create: isSuperAdminAccess,
    update: isSuperAdminAccess,
    delete: isSuperAdminAccess,
  },
  hooks: {
    beforeChange: [encryptSubscriptionData],
    afterRead: [decryptSubscriptionData],
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'The tenant this subscription belongs to',
      },
    },
    {
      name: 'plan',
      type: 'relationship',
      relationTo: 'subscriptionPlans',
      required: true,
      admin: {
        description: 'Current subscription plan',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Trial', value: 'trial' },
        { label: 'Active', value: 'active' },
        { label: 'Past Due', value: 'past_due' },
        { label: 'Grace Period', value: 'grace_period' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
      defaultValue: 'trial',
      index: true,
      admin: {
        description: 'Current subscription state in billing cycle',
      },
    },
    {
      name: 'trialStartedAt',
      type: 'date',
    },
    {
      name: 'trialEndsAt',
      type: 'date',
    },
    {
      name: 'currentPeriodStart',
      type: 'date',
    },
    {
      name: 'currentPeriodEnd',
      type: 'date',
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'Stripe subscription object ID',
      },
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      index: true,
      admin: {
        description: 'Stripe customer ID',
      },
    },
    {
      name: 'cancelledAt',
      type: 'date',
    },
    {
      name: 'cancellationReason',
      type: 'text',
    },
    {
      name: 'pausedAt',
      type: 'date',
    },
    {
      name: 'resumeAt',
      type: 'date',
    },
    {
      name: 'lastStatusChange',
      type: 'date',
    },
    {
      name: 'lastStatusChangeReason',
      type: 'text',
    },
  ],
}
