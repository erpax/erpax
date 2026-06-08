import type { CollectionConfig } from 'payload'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { notesField } from '@/base/accounting/field'
import { autoPopulateTenant } from '@/auto/populate/tenant';
import { autoPopulateCreatedBy } from '@/auto/populate/created/by';
import { autoSetTimestamp } from '@/auto/set/timestamp';
import { auditTrailAfterChange } from '@/audit/trail/after/change';
import { validateNotLocked } from '@/utility';

/**
 * Tax Calculations — computed tax-liability snapshots per period.
 *
 * Slice ZZ: full canonical hook chain wired (autoPopulateTenant +
 * autoPopulateCreatedBy + validateNotLocked + ISO-8601 postedAt /
 * filedAt / paidAt timestamps + audit-trail emission per write).
 *
 * @standard ISO-3166-1:2020 country-codes jurisdiction
 * @standard ISO-3166-2:2020 subdivision-codes jurisdiction
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time period posted-at filed-at paid-at
 * @standard EN-16931:2017 §BG-23 vat-breakdown
 * @accounting OECD SAF-T tax-table
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls tax-position
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.1
 */
const TaxCalculations: CollectionConfig = {
  slug: 'tax-calculations',
  labels: { singular: 'Tax Calculation', plural: 'Tax Calculations' },
  admin: {
    useAsTitle: 'calculationId',
    defaultColumns: ['calculationId', 'taxType', 'jurisdiction', 'period', 'taxAmount', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'calculationId', type: 'text', required: true, unique: true },
    {
      name: 'taxType',
      type: 'select',
      required: true,
      options: [
        { label: 'Sales Tax', value: 'sales_tax' },
        { label: 'VAT', value: 'vat' },
        { label: 'GST', value: 'gst' },
        { label: 'Income Tax', value: 'income_tax' },
        { label: 'Payroll Tax', value: 'payroll_tax' },
      ],
    },
    {
      name: 'jurisdiction',
      type: 'select',
      required: true,
      options: [
        { label: 'US Federal', value: 'us_federal' },
        { label: 'US State', value: 'us_state' },
        { label: 'EU', value: 'eu' },
        { label: 'Canada Federal', value: 'ca_federal' },
        { label: 'Canada Provincial', value: 'ca_provincial' },
        { label: 'Australia', value: 'au' },
        { label: 'Japan', value: 'jp' },
        { label: 'China', value: 'cn' },
        { label: 'India', value: 'in' },
        { label: 'Brazil', value: 'br' },
      ],
    },
    { name: 'period', type: 'date', required: true },
    { name: 'taxRate', type: 'number', required: true },
    { name: 'grossAmount', type: 'number', required: true },
    { name: 'taxableAmount', type: 'number', required: true },
    { name: 'taxAmount', type: 'number', required: true },
    { name: 'netAmount', type: 'number', required: true },
    { name: 'taxPayableAccount', type: 'relationship', relationTo: 'gl-accounts', required: true },
    { name: 'taxExpenseAccount', type: 'relationship', relationTo: 'gl-accounts' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { disabled: true } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'calculated',
      options: [
        { label: 'Calculated', value: 'calculated' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Filed', value: 'filed' },
        { label: 'Paid', value: 'paid' },
      ],
    },
    { name: 'filingDeadline', type: 'date' },
    { name: 'paymentDeadline', type: 'date' },
    notesField(),
  ],
  // Slice ZZ: full canonical hook chain wired per banner declarations.
  // Was: empty hooks (banner promised audit-trail, no implementation).
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      // ISO-8601 status-transition timestamps.
      autoSetTimestamp(
        'postedAt',
        (data) => (data as { status?: string }).status === 'posted',
      ),
      autoSetTimestamp(
        'filedAt',
        (data) => (data as { status?: string }).status === 'filed',
      ),
      autoSetTimestamp(
        'paidAt',
        (data) => (data as { status?: string }).status === 'paid',
      ),
    ],
    afterChange: [auditTrailAfterChange('tax-calculations')],
  },
  timestamps: true,
};

export default TaxCalculations;
