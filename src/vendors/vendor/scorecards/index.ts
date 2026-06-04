/**
 * Vendor Scorecards — periodic OTD / quality / response-time metrics.
 *
 * Slice FFFF (2026-05-10): ISO 9001 §8.4 mandates evaluation +
 * re-evaluation of external providers. This collection is the periodic
 * scorecard (typically quarterly) that drives vendor renewal /
 * de-listing decisions.
 *
 * @standard ISO 9001:2015 §8.4 control-of-externally-provided-processes
 * @standard ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail vendor-evaluation
 * @compliance SOX §404 internal-controls vendor-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27001 A.5.19 information-security-supplier-relationships
 * @see ./Vendors.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { statusField, notesField, auditFields, referenceField } from '@/base/accounting/field'

const VendorScorecards: CollectionConfig = {
  slug: 'vendor-scorecards',
  labels: { singular: 'Vendor Scorecard', plural: 'Vendor Scorecards' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'vendor', 'periodLabel', 'overallScore', 'recommendation', 'status'],
    description:
      'ISO 9001 §8.4 vendor performance scorecard. Periodic (typically quarterly). Drives renewal / probation / de-listing decision.',
  },
  access: accountingCollectionAccess(),
  fields: [
    referenceField(),
    { name: 'vendor', type: 'relationship', relationTo: 'vendors', required: true, index: true },
    { name: 'periodLabel', type: 'text', required: true,
      admin: { description: 'e.g. 2026-Q1, 2026-FY.' } },
    { name: 'periodStartDate', type: 'date', required: true },
    { name: 'periodEndDate', type: 'date', required: true },
    { name: 'evaluator', type: 'relationship', relationTo: 'users', required: true,
      admin: { description: 'Procurement / quality manager who completed the scorecard.' } },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        { name: 'onTimeDeliveryPercent', type: 'number', min: 0, max: 100,
          admin: { description: 'OTD % across the period.' } },
        { name: 'qualityAcceptanceRate', type: 'number', min: 0, max: 100,
          admin: { description: '% of receipts accepted without nonconformance.' } },
        { name: 'priceAccuracyPercent', type: 'number', min: 0, max: 100,
          admin: { description: '% of invoices matching PO price.' } },
        { name: 'responseTimeAvgHours', type: 'number',
          admin: { description: 'Average vendor response time to RFQs / queries (hours).' } },
        { name: 'returnRatePercent', type: 'number', min: 0, max: 100 },
        { name: 'sustainabilityScore', type: 'number', min: 0, max: 100,
          admin: { description: 'Optional ESG / supplier-sustainability score.' } },
        { name: 'cybersecurityScore', type: 'number', min: 0, max: 100,
          admin: { description: 'ISO 27001 A.5.19 supplier-information-security score.' } },
      ],
    },
    {
      name: 'volumes',
      type: 'group',
      fields: [
        { name: 'totalSpend', type: 'number', defaultValue: 0,
          admin: { description: 'Σ vendor invoices in period (cents).' } },
        { name: 'numberOfPurchaseOrders', type: 'number', defaultValue: 0 },
        { name: 'numberOfReceipts', type: 'number', defaultValue: 0 },
        { name: 'numberOfNonconformances', type: 'number', defaultValue: 0 },
        { name: 'numberOfReturns', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'overallScore', type: 'number', min: 0, max: 100,
      admin: { description: 'Weighted composite score (0-100). Drives the recommendation.' } },
    {
      name: 'recommendation',
      type: 'select',
      required: true,
      options: [
        { label: 'Preferred (top tier)', value: 'preferred' },
        { label: 'Approved (continue using)', value: 'approved' },
        { label: 'Conditional (improvement plan required)', value: 'conditional' },
        { label: 'Probation (risk; monitor closely)', value: 'probation' },
        { label: 'De-list (do not award new business)', value: 'delist' },
      ],
    },
    { name: 'improvementPlan', type: 'textarea',
      admin: { description: 'Required when recommendation = conditional / probation — what the vendor must do.' } },
    { name: 'reviewedWithVendor', type: 'checkbox', defaultValue: false,
      admin: { description: 'Was the scorecard discussed with the vendor in a QBR?' } },
    { name: 'reviewMeetingDate', type: 'date' },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Reviewed (internal)', value: 'reviewed' },
        { label: 'Shared with Vendor', value: 'shared' },
        { label: 'Acknowledged by Vendor', value: 'acknowledged' },
        { label: 'Closed', value: 'closed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('vendor-scorecards'),
  timestamps: true,
}

export default VendorScorecards
