/**
 * GL Accounts — Chart of Accounts.
 *
 * Slice WW-cleanup (this turn): switched to canonical access predicates +
 * field factories + autoPopulateTenant beforeValidate. Removed dead
 * `if (!data.tenant && undefined)` code (always-false condition).
 * Added `role` field so the new `gl-account-resolver` can map canonical
 * roles (cash / ar / revenue / etc.) to this tenant's actual accounts.
 *
 * @standard ISO-4217:2015 currency-codes account-currency
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-210 balance-sheet
 * @accounting OECD SAF-T §2 general-ledger-accounts
 * @audit ISO-19011:2018 audit-trail chart-of-accounts-change
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.2
 * @see src/services/gl-account-resolver.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { currencyField, statusField } from '@/fields'

const GLAccounts: CollectionConfig = {
  slug: 'gl-accounts',
  labels: {
    singular: 'GL Account',
    plural: 'GL Accounts',
  },
  admin: {
    useAsTitle: 'accountNumber',
    defaultColumns: ['accountNumber', 'accountName', 'accountType', 'role', 'balance', 'status'],
    preview: (doc) => `${doc.accountNumber} - ${doc.accountName}`,
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'accountNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique account code (e.g., 1000, 2100, 5001) — matches your jurisdiction\'s chart-of-accounts numbering.',
      },
    },
    {
      name: 'accountName',
      type: 'text',
      required: true,
    },
    {
      name: 'accountType',
      type: 'select',
      required: true,
      options: [
        { label: 'Asset', value: 'asset' },
        { label: 'Liability', value: 'liability' },
        { label: 'Equity', value: 'equity' },
        { label: 'Revenue', value: 'revenue' },
        { label: 'Expense', value: 'expense' },
        { label: 'Gain/Loss', value: 'gain_loss' },
      ],
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Cash', value: 'cash' },
        { label: 'Accounts Receivable (A/R)', value: 'ar' },
        { label: 'Accounts Payable (A/P)', value: 'ap' },
        { label: 'Inventory', value: 'inventory' },
        { label: 'Revenue', value: 'revenue' },
        { label: 'Cost of Goods Sold', value: 'cogs' },
        { label: 'Expense', value: 'expense' },
        { label: 'Sales Tax Payable', value: 'sales_tax_payable' },
        { label: 'Input Tax Asset', value: 'input_tax_asset' },
        { label: 'Deferred Revenue', value: 'deferred_revenue' },
        { label: 'Subscription Revenue', value: 'subscription_revenue' },
        { label: 'Refunds Payable', value: 'refunds_payable' },
        // IFRS 16 / ASC 842 lease accounts.
        { label: 'Lease Interest Expense', value: 'lease_interest_expense' },
        { label: 'Lease Liability', value: 'lease_liability' },
        { label: 'ROU Amortisation Expense', value: 'rou_amortisation_expense' },
        { label: 'Accumulated ROU Amortisation', value: 'accumulated_rou_amortisation' },
      ],
      admin: {
        description: 'Canonical accounting role — gl-posting handlers resolve this to the actual account ID via `resolveGlAccount`.',
      },
    },
    {
      name: 'parentAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      admin: {
        description: 'Parent account for hierarchy',
      },
    },
    {
      name: 'normalBalance',
      type: 'select',
      required: true,
      options: [
        { label: 'Debit', value: 'debit' },
        { label: 'Credit', value: 'credit' },
      ],
      admin: {
        description: 'Normal balance side for this account',
      },
    },
    {
      name: 'balance',
      type: 'number',
      defaultValue: 0,
      admin: {
        disabled: true,
        description: 'Current balance (calculated from journal entries)',
      },
    },
    {
      name: 'balanceInBaseCurrency',
      type: 'number',
      defaultValue: 0,
      admin: {
        disabled: true,
        description: 'Balance in base currency',
      },
    },
    currencyField(),
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Locked', value: 'locked' },
      ],
      'active',
    ),
    {
      name: 'description',
      type: 'textarea', localized: true,
    },
    {
      name: 'isTaxAccount',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    afterChange: [auditTrailAfterChange('gl-accounts')],
  },
  timestamps: true,
}

export default GLAccounts
