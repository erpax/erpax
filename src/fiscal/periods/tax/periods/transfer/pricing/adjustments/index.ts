/**
 * TransferPricingAdjustments Collection
 *
 * Documents transfer pricing adjustments for intercompany transactions.
 * Supports OECD transfer pricing methods and includes required supporting documentation.
 *
 * Transfer pricing workflow: documented → validated → approved → posted
 *
 * @invariant Each adjustment must document transaction type, method used, and reason
 * @invariant Supporting documentation (contemporaneous documentation) required per OECD guidelines
 * @invariant All adjustments must be per-jurisdiction and per-transaction-type
 * @invariant Audit trail tracks all TP documentation, validation, and posting milestones
  * @standard OECD Transfer-Pricing-Guidelines-2022
 * @compliance OECD BEPS Action-13 country-by-country
 * @standard US IRC §482 arms-length
*/

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '@/auth'

export const TransferPricingAdjustments: CollectionConfig = {
  slug: 'transfer-pricing-adjustments',
  admin: {
    useAsTitle: 'adjustmentDescription',
  },
  access: accountingCollectionAccess(),
  fields: [
    {
      name: 'adjustmentDescription',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description:
          'Unique ID: e.g., "BG-PARENT-SUB-SALES-2026" (jurisdiction-from-to-type-period)',
      },
    },
    {
      name: 'taxJurisdiction',
      type: 'text',
      required: true,
      admin: {
        description: 'Tax jurisdiction for this adjustment (e.g., "BG", "US-CA")',
      },
    },
    {
      name: 'taxPeriod',
      type: 'relationship',
      relationTo: 'tax-periods',
      admin: { description: 'Tax period this adjustment belongs to' },
    },
    {
      name: 'fromEntity',
      type: 'text',
      required: true,
      admin: { description: 'Paying/transferring entity (supplier side)' },
    },
    {
      name: 'toEntity',
      type: 'text',
      required: true,
      admin: { description: 'Receiving entity (customer side)' },
    },
    {
      name: 'transactionType',
      type: 'select',
      options: [
        { label: 'Sales of Tangible Goods', value: 'sales' },
        { label: 'Services', value: 'services' },
        { label: 'Royalties & IP', value: 'royalties' },
        { label: 'Financing & Loans', value: 'financing' },
        { label: 'Cost Sharing', value: 'cost-sharing' },
      ],
      required: true,
      admin: { description: 'Type of intercompany transaction' },
    },
    {
      name: 'originalAmount',
      type: 'number',
      required: true,
      admin: { description: 'Transaction amount per original agreement/invoice' },
    },
    {
      name: 'adjustedAmount',
      type: 'number',
      required: true,
      admin: {
        description: 'Adjusted transaction amount per OECD arm\'s length standard',
      },
    },
    {
      name: 'adjustmentAmount',
      type: 'number',
      admin: {
        description: 'Calculated difference (adjustedAmount - originalAmount)',
      },
    },
    {
      name: 'methodUsed',
      type: 'select',
      options: [
        {
          label: 'Comparable Uncontrolled Price (CUP)',
          value: 'comparable-uncontrolled',
        },
        { label: 'Cost-Plus Method', value: 'cost-plus' },
        { label: 'Resale Price Method', value: 'resale' },
        { label: 'Profit Split Method', value: 'profit-split' },
        { label: 'Transactional Net Margin Method (TNMM)', value: 'tnmm' },
      ],
      required: true,
      admin: {
        description:
          'OECD transfer pricing method used (BEPS Action 4 recommended hierarchy)',
      },
    },
    {
      name: 'adjustmentReason',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Detailed reason for adjustment (why arm\'s length price differs from agreement)',
      },
    },
    {
      name: 'supportingDocumentation',
      type: 'text',
      required: true,
      admin: {
        description:
          'Path/reference to contemporaneous documentation (e.g., benchmark study file, external appraisal)',
      },
    },
    {
      name: 'documentationStatus',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Documented', value: 'documented' },
        { label: 'Challenged', value: 'challenged' },
      ],
      defaultValue: 'draft',
      admin: { description: 'Status of TP documentation review' },
    },
    {
      name: 'adjustmentDate',
      type: 'date',
      required: true,
      admin: { description: 'Date of transfer pricing adjustment (typically period-end date)' },
    },
    {
      name: 'relatedDocuments',
      type: 'relationship',
      relationTo: 'journal-entries',
      hasMany: true,
      admin: {
        description: 'Related journal entries (original + adjustment postings)',
      },
    },
    {
      name: 'auditTrail',
      type: 'richText',
      admin: {
        description:
          'Immutable audit trail: documentation review, challenges, approvals. Append-only.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'General notes on this transfer pricing adjustment' },
    },
  ],
}
