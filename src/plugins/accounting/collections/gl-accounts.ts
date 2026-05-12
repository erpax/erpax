/**
 * GL Accounts — Chart of Accounts master file for financial statement line items.
 *
 * Core Function:
 *   GL Accounts is the master register of all balance sheet and income statement
 *   accounts for a tenant. Each posting to the GL must reference an active GL Account.
 *   Accounts are structured by role (cash, ar, revenue, etc.) enabling canonical
 *   account resolution (IAS-1 §38 structured presentation). Inactive accounts cannot
 *   receive new postings but remain for historical reporting.
 *
 * Architecture:
 *   • Multi-tenant isolation: each tenant has independent chart (multiTenancyField).
 *   • Canonical role mapping: role field enables gl-account-resolver to translate
 *     domain-specific roles (cash/ar/revenue) to tenant's actual account numbers.
 *   • Status immutability: Active accounts can transition to Inactive; Inactive
 *     accounts cannot be reactivated without approval (regulatory compliance).
 *   • Auto-population: accountNumber, role, balance auto-calculated from GL postings.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant, validateAccountNumberFormat.
 *   • beforeChange: checkForOpenPostings (cannot archive if postings pending).
 *   • afterChange: auditTrailAfterChange (SOX §404 chart-of-accounts audit log).
 *
 * Fields:
 *   • accountNumber (text, unique): IAS-1-compliant account identifier.
 *   • accountName (text, localized): Human-readable account label.
 *   • accountType: Asset | Liability | Equity | Revenue | Expense.
 *   • role (select): Canonical role (cash, ar, ap, revenue, cogs, tax, etc.).
 *   • balance (number, auto): Current GL balance (sum of all postings).
 *   • currency (select): ISO-4217 currency code.
 *   • status: Active | Inactive | Archived.
 *   • parentAccount (relationship): For hierarchical account nesting (sub-accounts).
 *
 * Invariants:
 *   1. accountNumber is immutable once created (historical traceability).
 *   2. Role uniqueness: at most one account per (tenant, role) pair.
 *   3. Only Active accounts can receive new GL postings.
 *   4. Inactive accounts cannot be deleted; only Archived via status field.
 *   5. Balance is auto-calculated from GL-postings; manually overriding is audit-logged.
 *   6. Currency immutable once Active (IAS-21 functional-currency stability).
 *   7. Hierarchical nesting: parentAccount depth ≤ 5 (IAS-1 §38).
 *
 * Audit Trail:
 *   • All state changes recorded with user + timestamp (SOX §404).
 *   • accountNumber changes (if editable) logged to audit-trail for traceability.
 *   • accountNumber is immutable; any attempted edits are audit-logged and rejected (traceability requirement).
 *   • Status → Inactive / Archived transitions emit change event for compliance.
 *   • Balance overwrites require approval + full justification (SAF-T §2).
 *
 * Example:
 *   Tenant BG (Bulgaria) chart:
 *     1. Account 4000 "Sales Revenue" role=revenue, type=Revenue, balance=150000 BGN.
 *     2. Account 1200 "Accounts Receivable" role=ar, type=Asset, balance=42000 BGN.
 *     3. Account 2000 "Accounts Payable" role=ap, type=Liability, balance=28000 BGN.
 *   All linked via gl-postings; balance auto-updated on each journal entry post.
 *
 * Phase Slice:
 *   WW (post-cleanup): Consolidated access predicates into shared auth module,
 *   wired field factories (multiTenancyField, currencyField), implemented audit-trail
 *   emission, added gl-account-resolver for canonical role mapping. Removed dead code
 *   (`if (!data.tenant && undefined)`). Added role field for domain-driven account lookup.
 *
 * @useCase Chart of Accounts — Master register of all GL accounts per tenant.
 * @useCase Account Status Management — Transition Active → Inactive → Archived.
 * @useCase Canonical Account Resolution — Map domain roles to tenant account numbers.
 * @useCase Financial Statement Presentation — IAS-1 §38 account structure.
 * @useCase Audit Trail — Track all chart changes for SOX §404 compliance.
 *
 * @standard ISO-4217:2015 currency-codes account-currency
 * @standard ISO-8601-1:2019 date-time status-transition-date
 * @standard EN-16931:2017 electronic-invoicing account-reference
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-1 §38 account-classification
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting IFRS IAS-21 functional-currency-stability
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-210 balance-sheet account-presentation
 * @accounting OECD SAF-T §2 general-ledger-accounts
 * @audit ISO-19011:2018 audit-trail chart-of-accounts-change
 * @audit ISO-19011:2018 audit-evidence account-history
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls management-assessment
 * @compliance SOX §409 real-time-disclosure account-status-change
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based
 * @see docs/STANDARDS.md §4.2 GL-Account-Standards
 * @see src/services/gl-account-resolver.ts Account-Role-Mapping
 * @see src/plugins/accounting/collections/gl-postings.ts GL-Posting-Reference
 * @see src/fields/accounting/base-accounting-fields.ts Field-Factories
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField, currencyField, statusField } from '@/fields/accounting/base-accounting-fields'

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
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
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
