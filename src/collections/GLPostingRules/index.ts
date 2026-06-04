/**
 * GLPostingRules Collection
 *
 * Defines GL account characteristics for double-entry validation.
 * Determines account type, polarity (debit/credit normal), balance sheet vs. P&L,
 * reconciliation requirements, and more.
 *
 * Purpose: Centralized account metadata for validation & reporting.
  * @accounting IFRS IAS-1 double-entry
 * @compliance SOX §404 internal-controls
 * @standard ISO-8601-1:2019 effective-date
*/

import { CollectionConfig } from 'payload'
import { tenantAdmin } from '@/access/auth'

export const GLPostingRules: CollectionConfig = {
  slug: 'gl-posting-rules',
  admin: {
    useAsTitle: 'accountType',
  },
  access: {
    read: tenantAdmin,
    create: tenantAdmin,
    update: tenantAdmin,
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'accountType',
      type: 'select',
      options: [
        { label: 'Asset', value: 'asset' },
        { label: 'Current Asset', value: 'current-asset' },
        { label: 'Fixed Asset', value: 'fixed-asset' },
        { label: 'Accumulated Depreciation (Contra-Asset)', value: 'accumulated-depreciation' },
        { label: 'Liability', value: 'liability' },
        { label: 'Current Liability', value: 'current-liability' },
        { label: 'Long-Term Liability', value: 'long-term-liability' },
        { label: 'Equity', value: 'equity' },
        { label: 'Retained Earnings', value: 'retained-earnings' },
        { label: 'Common Stock', value: 'common-stock' },
        { label: 'Revenue', value: 'revenue' },
        { label: 'Operating Revenue', value: 'operating-revenue' },
        { label: 'Expense', value: 'expense' },
        { label: 'Operating Expense', value: 'operating-expense' },
        { label: 'COGS', value: 'cogs' },
        { label: 'Administrative Expense', value: 'administrative-expense' },
        { label: 'Other Income', value: 'other-income' },
        { label: 'Other Expense', value: 'other-expense' },
        { label: 'Gain', value: 'gain' },
        { label: 'Loss', value: 'loss' },
      ],
      required: true,
      admin: { description: 'Account classification for validation & reporting' },
    },
    {
      name: 'normalPolarity',
      type: 'select',
      options: [
        { label: 'Debit (increases with debits)', value: 'debit' },
        { label: 'Credit (increases with credits)', value: 'credit' },
      ],
      required: true,
      admin: { description: 'Debit-normal or credit-normal per double-entry rules' },
    },
    {
      name: 'balanceSheetCategory',
      type: 'select',
      options: [
        { label: 'Balance Sheet', value: 'balance-sheet' },
        { label: 'P&L (Income Statement)', value: 'pl' },
        { label: 'Retained Earnings / Equity', value: 'retained-earnings' },
      ],
      required: true,
      admin: { description: 'Whether account appears on balance sheet or P&L' },
    },
    {
      name: 'requiresReconciliation',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Check if account must be reconciled monthly (e.g., bank, AR, AP, inventory)',
      },
    },
    {
      name: 'reconciliationFrequency',
      type: 'select',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Annual', value: 'annual' },
        { label: 'Not Required', value: 'none' },
      ],
      admin: { description: 'How often account must be reconciled' },
    },
    {
      name: 'isCashFlowRelevant',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Check if account affects cash flow statement' },
    },
    {
      name: 'closesAtPeriodEnd',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Check if account closes to retained earnings at period-end (P&L accounts only)',
      },
    },
    {
      name: 'relatedGLAccounts',
      type: 'relationship',
      relationTo: 'gl-accounts',
      hasMany: true,
      admin: { description: 'Link to GL accounts using this rule set' },
    },
    {
      name: 'notes',
      type: 'richText',
      admin: { description: 'Accounting guidance for this account type' },
    },
  ],
}
