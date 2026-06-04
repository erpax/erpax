/**
 * TaxPeriods Collection
 *
 * Tracks tax period processes: which tax jurisdictions are included,
 * transfer pricing adjustment documentation, tax authority compliance,
 * and tax-specific adjustment entry preparation.
 *
 * Tax workflow: pending-closing → ready-for-adjustment → adjustment-posted → tax-closed
 *
 * @invariant Tax period must align with fiscal period (same period-end date)
 * @invariant All transfer pricing adjustments must be documented per OECD guidelines
 * @invariant Tax adjustment entries prepared but not auto-posted (requires tax authority approval)
 * @invariant Audit trail tracks all tax period milestones (TP documentation, adjustment posting, closure)
  * @standard OECD tax-period-coding
 * @standard SAF-T OECD reporting-period
 * @standard ISO-8601-1:2019 period-dates
*/

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '@/auth'
import { validateTaxPeriodClosing } from '@/hooks'

export const TaxPeriods: CollectionConfig = {
  slug: 'tax-periods',
  admin: {
    useAsTitle: 'taxPeriodName',
  },
  access: accountingCollectionAccess(),
  hooks: {
    beforeValidate: [validateTaxPeriodClosing],
  },
  fields: [
    {
      name: 'taxPeriodName',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description:
          'Unique ID: e.g., "BG-TAX-2026-YEAR" or "US-TAX-2026-EST-Q3" (jurisdiction-period-type)',
      },
    },
    {
      name: 'taxJurisdiction',
      type: 'text',
      required: true,
      admin: {
        description: 'Tax jurisdiction code (e.g., "BG" for Bulgaria, "US-CA" for California)',
      },
    },
    {
      name: 'taxPeriodType',
      type: 'select',
      options: [
        { label: 'Annual Tax Year', value: 'annual' },
        { label: 'Quarterly Estimation', value: 'quarterly-est' },
        { label: 'Monthly Estimated', value: 'monthly-est' },
        { label: 'Amended Return', value: 'amended' },
        { label: 'Provisional', value: 'provisional' },
      ],
      required: true,
      admin: { description: 'Type of tax period' },
    },
    {
      name: 'fiscalPeriodId',
      type: 'relationship',
      relationTo: 'fiscal-periods',
      required: true,
      admin: {
        description: 'Linked fiscal period (tax period must align with this fiscal period end date)',
      },
    },
    {
      name: 'taxPeriodEndDate',
      type: 'date',
      required: true,
      admin: { description: 'Tax period ending date (must match linked fiscal period end date)' },
    },
    {
      name: 'filingDeadline',
      type: 'date',
      required: true,
      admin: { description: 'Tax authority filing deadline for this jurisdiction' },
    },
    {
      name: 'taxCurrency',
      type: 'text',
      admin: {
        description:
          'Tax reporting currency for this jurisdiction (ISO 4217 code, e.g., BGN for Bulgaria)',
      },
    },
    {
      name: 'filedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'Tax officer or preparer who initiated tax period process' },
    },
    {
      name: 'taxStatus',
      type: 'select',
      options: [
        { label: 'Pending Closing', value: 'pending-closing' },
        { label: 'Ready for Adjustment', value: 'ready-for-adjustment' },
        { label: 'Adjustment Posted', value: 'adjustment-posted' },
        { label: 'Tax Closed', value: 'tax-closed' },
        { label: 'Amended', value: 'amended' },
      ],
      required: true,
      defaultValue: 'pending-closing',
      admin: { description: 'Tax period workflow status' },
    },
    {
      name: 'taxPeriodReadiness',
      type: 'json',
      admin: {
        description:
          'Phase B5: Tax period readiness assessment (periods aligned, TP documented, compliance verified). Auto-populated by validateTaxPeriodClosing hook.',
      },
    },
    {
      name: 'transferPricingAdjustmentCount',
      type: 'number',
      admin: {
        description: 'Number of transfer pricing adjustments for this tax period + jurisdiction',
      },
    },
    {
      name: 'taxAdjustmentEntries',
      type: 'array',
      fields: [
        {
          name: 'sequenceNumber',
          type: 'number',
          required: true,
          admin: { description: 'Order of tax adjustment entry' },
        },
        {
          name: 'journalEntryId',
          type: 'relationship',
          relationTo: 'journal-entries',
          admin: { description: 'Link to tax adjustment GL posting (if posted)' },
        },
        {
          name: 'fromEntity',
          type: 'text',
          required: true,
          admin: { description: 'Entity making the adjustment' },
        },
        {
          name: 'toEntity',
          type: 'text',
          required: true,
          admin: { description: 'Entity receiving the adjustment' },
        },
        {
          name: 'account',
          type: 'text',
          required: true,
          admin: { description: 'GL account for tax adjustment (e.g., 6000-6099 for tax expense)' },
        },
        {
          name: 'accountType',
          type: 'select',
          options: [
            { label: 'Expense', value: 'expense' },
            { label: 'Revenue', value: 'revenue' },
            { label: 'Provision', value: 'provision' },
          ],
          admin: { description: 'Type of account being adjusted' },
        },
        {
          name: 'adjustmentAmount',
          type: 'number',
          required: true,
          admin: { description: 'Tax adjustment amount (may be positive or negative)' },
        },
        {
          name: 'description',
          type: 'text',
          admin: { description: 'Tax adjustment entry description (e.g., transfer pricing method used)' },
        },
        {
          name: 'posted',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Check once tax adjustment posted to GL' },
        },
        {
          name: 'postedDate',
          type: 'date',
          admin: { description: 'When tax adjustment was posted' },
        },
      ],
      admin: { description: 'Tax adjustment entries prepared for tax closing' },
    },
    {
      name: 'governanceScope',
      type: 'json',
      admin: {
        description:
          'Phase B5: Law 63 self-governance metadata. Stores tax authority, compliance thresholds, jurisdiction scope. Auto-populated from tax configuration.',
      },
    },
    {
      name: 'chainLeafUuid',
      type: 'text',
      admin: {
        description:
          'Phase B5: Law 60 audit chain leaf. Computed as sha256(JCS-canonical(TaxPeriods) || prior_leaf_uuid). Enables tamper detection.',
      },
    },
    {
      name: 'auditTrail',
      type: 'richText',
      admin: {
        description:
          'Immutable audit trail of tax period activities (readiness assessment, TP documentation, adjustment posting, closure). Append-only.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'General notes on this tax period process' },
    },
  ],
}
