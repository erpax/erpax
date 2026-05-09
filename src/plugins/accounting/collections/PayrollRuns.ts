/**
 * Payroll Runs — periodic batch payroll: gross-to-net, accruals, disbursement.
 *
 * One run per (tenant, payroll period × paySchedule). Aggregates the
 * approved TimeEntries for the period, computes per-employee gross →
 * deductions → employer-side accruals → net, and produces:
 *   1. The journal entries (Dr Wages Expense / Cr Net Payroll Payable +
 *      Cr Tax Withheld + Cr Pension Payable + Cr SS Payable + Dr
 *      Employer Social Security Expense / Cr Employer SS Payable + …)
 *   2. The pain.001 batch (one credit transfer per employee net pay)
 *      that the bank ingests on the pay date.
 *
 * SOX §404 four-eyes via the same enforceSegregationOfDuties hook used
 * on PeriodEndAdjustments — preparer ≠ authoriser. Period-locked once
 * posted (cannot be edited; reversals are a separate run).
 *
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time period payment-date
 * @accounting IFRS IAS-19 employee-benefits short-term
 * @accounting IFRS IAS-19 §51 defined-contribution-plans
 * @accounting US-GAAP ASC-710 compensation-general
 * @accounting US-GAAP ASC-715 compensation-retirement-benefits
 * @audit ISO-19011:2018 audit-trail payroll-evidence
 * @compliance SOX §302 disclosure-controls
 * @compliance SOX §404 internal-controls four-eyes
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance GDPR Art.30 records-of-processing-activities
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties
 * @security ISO-27002 §5.34 privacy-and-protection-of-pii
 * @security ISO-27002 §8.11 data-masking
 * @see src/plugins/accounting/collections/Employees.ts
 * @see src/plugins/accounting/collections/TimeEntries.ts
 * @see src/plugins/accounting/collections/PaymentRuns.ts (pain.001 sibling)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, tenantAdmin } from '@/plugins/auth/access'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'
import { validateNotLocked } from '../utilities/period-lock'
import { payrollRunPostingHook } from '../hooks/payroll-run.hook'

const PayrollRuns: CollectionConfig = {
  slug: 'payroll-runs',
  labels: { singular: 'Payroll Run', plural: 'Payroll Runs' },
  admin: {
    useAsTitle: 'runId',
    defaultColumns: [
      'runId',
      'paySchedule',
      'periodEnd',
      'paymentDate',
      'employeeCount',
      'totalGross',
      'totalNet',
      'status',
    ],
    description:
      'Periodic batch payroll. Aggregates approved TimeEntries, computes gross-to-net, posts JEs, and emits the pain.001 disbursement file.',
  },
  // Tighter access than the typical roleScopedAccess('admin', 'accountant')
  // — payroll touches GDPR-classified personal data.
  access: {
    read: roleScopedAccess('admin', 'payroll-officer', 'hr'),
    create: roleScopedAccess('admin', 'payroll-officer'),
    update: roleScopedAccess('admin', 'payroll-officer'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    {
      name: 'runId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Human-readable id (e.g. PR-2026-04-MONTHLY).' },
    },
    {
      name: 'paySchedule',
      type: 'select',
      required: true,
      options: [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Bi-weekly', value: 'biweekly' },
        { label: 'Semi-monthly', value: 'semimonthly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Off-cycle (one-off)', value: 'off_cycle' },
      ],
    },
    { name: 'periodStart', type: 'date', required: true, index: true },
    { name: 'periodEnd', type: 'date', required: true, index: true },
    {
      name: 'paymentDate',
      type: 'date',
      required: true,
      admin: {
        description:
          'Date the bank releases the funds. Used as pain.001 ReqdExctnDt.',
      },
    },
    currencyField('EUR'),
    {
      name: 'sourceBankAccount',
      type: 'relationship',
      relationTo: 'bank-accounts',
      required: true,
      admin: { description: 'Tenant bank account funding the disbursement.' },
    },

    // ── Lines — one per employee ──
    {
      name: 'lines',
      type: 'array',
      labels: { singular: 'Payroll line', plural: 'Payroll lines' },
      admin: {
        description:
          'One payroll line per employee. Computed by the close-job from approved TimeEntries + Employee.compensation.',
      },
      fields: [
        {
          name: 'employee',
          type: 'relationship',
          relationTo: 'employees',
          required: true,
        },
        // Time inputs (from TimeEntries)
        { name: 'regularMinutes', type: 'number', defaultValue: 0 },
        { name: 'overtime15Minutes', type: 'number', defaultValue: 0 },
        { name: 'overtime2Minutes', type: 'number', defaultValue: 0 },
        { name: 'nightShiftMinutes', type: 'number', defaultValue: 0 },
        { name: 'holidayWorkMinutes', type: 'number', defaultValue: 0 },
        { name: 'ptoMinutes', type: 'number', defaultValue: 0 },
        { name: 'sickMinutes', type: 'number', defaultValue: 0 },
        // Gross
        {
          name: 'baseGross',
          type: 'number',
          required: true,
          admin: { description: 'Base salary contribution for the period (cents).' },
        },
        {
          name: 'overtimeGross',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Overtime + night-shift + holiday-work pay (cents).' },
        },
        {
          name: 'bonusGross',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'One-off bonus / commission for this period (cents).' },
        },
        {
          name: 'totalGross',
          type: 'number',
          required: true,
          admin: {
            description:
              '= baseGross + overtimeGross + bonusGross. Hits Wages Expense.',
          },
        },
        // Employee deductions (Cr side of the JE)
        {
          name: 'incomeTaxWithheld',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Employee income-tax withholding (cents).' },
        },
        {
          name: 'socialSecurityEmployee',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Employee-side social security (cents).' },
        },
        {
          name: 'pensionEmployee',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Employee pension contribution (cents).' },
        },
        {
          name: 'otherDeductions',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Garnishments / repayments / voluntary deductions (cents).',
          },
        },
        // Net
        {
          name: 'netPay',
          type: 'number',
          required: true,
          admin: {
            description:
              '= totalGross − all employee deductions. The amount the pain.001 transfers to the employee.',
          },
        },
        // Employer-side accruals (additional Dr expense rows)
        {
          name: 'socialSecurityEmployer',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Employer-side social security expense (cents).' },
        },
        {
          name: 'pensionEmployer',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Employer pension contribution (cents).' },
        },
        {
          name: 'payrollTaxesEmployer',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Other employer payroll taxes (FUTA / unemployment).' },
        },
        // Cost-center allocation (optional — defaults to employee.department)
        {
          name: 'costCenter',
          type: 'relationship',
          relationTo: 'cost-centers',
        },
        // Pay slip + audit
        {
          name: 'paySlipDocument',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Generated pay-slip PDF distributed to the employee.',
          },
        },
      ],
    },

    // ── Roll-ups (computed) ──
    {
      name: 'employeeCount',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Computed = lines.length.',
      },
    },
    {
      name: 'totalGross',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Σ lines[].totalGross. Hits Wages Expense in aggregate.',
      },
    },
    {
      name: 'totalDeductions',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          'Σ employee-side withholdings (taxes + SS + pension + other).',
      },
    },
    {
      name: 'totalNet',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          'Σ lines[].netPay. The pain.001 control sum.',
      },
    },
    {
      name: 'totalEmployerSideAccruals',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          'Σ employer-side payroll taxes + pension. Posts to Payroll Tax Expense + Pension Expense.',
      },
    },

    // ── Sign-off + lifecycle ──
    {
      name: 'preparedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
    { name: 'preparedAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'authorisedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
    { name: 'authorisedAt', type: 'date', admin: { readOnly: true } },

    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Calculated', value: 'calculated' },
        { label: 'Pending review', value: 'pending_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted (JE booked)', value: 'posted' },
        { label: 'Disbursed (pain.001 sent)', value: 'disbursed' },
        { label: 'Settled (bank ack)', value: 'settled' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    {
      name: 'journalEntry',
      type: 'relationship',
      relationTo: 'journal-entries',
      admin: {
        readOnly: true,
        description: 'JE booked when status flips to posted.',
      },
    },
    {
      name: 'paymentRun',
      type: 'relationship',
      relationTo: 'payment-runs',
      admin: {
        readOnly: true,
        description:
          'pain.001 PaymentRun emitted when status flips to disbursed.',
      },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      // SOX §404 four-eyes: preparer ≠ authoriser.
      enforceSegregationOfDuties(),
      autoSetTimestamp(
        'preparedAt',
        (d) => (d as { status?: string }).status === 'pending_review',
      ),
      autoSetTimestamp(
        'authorisedAt',
        (d) => (d as { status?: string }).status === 'approved',
      ),
    ],
    afterChange: [
      // GL post on status → 'posted' — books the canonical IAS 19 /
      // ASC 710 wages JE and back-links the JE id. SOX §404 four-eyes
      // is enforced in beforeChange via enforceSegregationOfDuties.
      payrollRunPostingHook,
      auditTrailAfterChange('payroll-runs'),
    ],
  },
  timestamps: true,
}

export default PayrollRuns
