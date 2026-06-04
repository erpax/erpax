/**
 * Customer Segments — pricing / marketing buckets.
 *
 * Slice EEEE (2026-05-10): segments group customers for differentiated
 * pricing (volume tiers, regional discounts), targeted campaigns, and
 * IFRS-15 portfolio-of-contracts disclosures (§4 portfolio practical
 * expedient).
 *
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 §4 portfolio-practical-expedient
 * @accounting IFRS IFRS-8 §22 disclosure-of-segment-information
 * @audit ISO-19011:2018 audit-trail crm-segmentation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Customers.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { statusField, notesField, auditFields } from '@/fields/base-accounting-fields'

const CustomerSegments: CollectionConfig = {
  slug: 'customer-segments',
  labels: { singular: 'Customer Segment', plural: 'Customer Segments' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'segmentType', 'discountPercent', 'paymentTermDays', 'status'],
    description:
      'Pricing / marketing / portfolio segment. Customers tag-link to segments; pricing rules + campaigns target the segment.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    { name: 'name', type: 'text', localized: true, required: true, unique: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'segmentType',
      type: 'select',
      required: true,
      defaultValue: 'commercial',
      options: [
        { label: 'Commercial Tier (e.g. SMB / Mid-Market / Enterprise)', value: 'commercial' },
        { label: 'Industry Vertical', value: 'industry' },
        { label: 'Geographic Region', value: 'geographic' },
        { label: 'Lifecycle Stage', value: 'lifecycle' },
        { label: 'Behavioural', value: 'behavioural' },
        { label: 'Strategic Account', value: 'strategic' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'criteria', type: 'textarea',
      admin: { description: 'Operator-readable criteria (e.g. "ARR ≥ €100k AND industry = SaaS").' } },
    { name: 'priorityRank', type: 'number',
      admin: { description: 'Tie-breaker when a customer fits multiple segments (lower = higher priority).' } },
    { name: 'discountPercent', type: 'number', min: 0, max: 100, defaultValue: 0,
      admin: { description: 'Default discount % off list price for this segment.' } },
    { name: 'paymentTermDays', type: 'number', defaultValue: 30,
      admin: { description: 'Default Net-N payment terms (days).' } },
    { name: 'creditLimit', type: 'number',
      admin: { description: 'Default per-customer credit limit (cents) — operator can override per customer.' } },
    {
      name: 'pricingTier',
      type: 'select',
      options: [
        { label: 'List Price', value: 'list' },
        { label: 'Volume Discount', value: 'volume' },
        { label: 'Negotiated', value: 'negotiated' },
        { label: 'Strategic / VIP', value: 'strategic' },
      ],
    },
    { name: 'isPortfolioForIfrs15', type: 'checkbox', defaultValue: false,
      admin: { description: 'IFRS-15 §4 portfolio practical expedient — group similar contracts for revenue recognition.' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Deprecated', value: 'deprecated' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('customer-segments'),
  timestamps: true,
}

export default CustomerSegments
