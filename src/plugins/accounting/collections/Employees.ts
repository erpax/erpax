/**
 * Employees — workforce master record for payroll, benefits, time tracking.
 *
 * Foundation for the payroll cycle (TimeEntries → PayrollRuns) and
 * the IAS 19 / ASC 710 employee-benefits subledger. Personal data here
 * is GDPR-classified — read access is tenant-admin + payroll-officer
 * only, never tenant-wide reads.
 *
 * @standard ISO-3166-1:2020 country-codes citizenship work-country
 * @standard ISO-3166-2:2020 subdivision-codes
 * @standard ISO-13616-1:2020 iban payroll-bank-account
 * @standard ISO-9362:2022 bic payroll-bank-account
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time hire-date termination-date
 * @standard ISO-17442-1:2020 lei employer-identifier
 * @accounting IFRS IAS-19 employee-benefits
 * @accounting US-GAAP ASC-710 compensation-general
 * @accounting US-GAAP ASC-715 compensation-retirement-benefits
 * @audit ISO-19011:2018 audit-trail employee-master
 * @compliance SOX §404 internal-controls payroll-master
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance GDPR Art.9 special-categories-of-personal-data
 * @compliance GDPR Art.30 records-of-processing-activities
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.34 privacy-and-protection-of-pii
 * @security ISO-27002 §8.11 data-masking
 * @see docs/STANDARDS.md §4.2 §4.4
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, tenantAdmin } from '@/plugins/auth/access'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'

const Employees: CollectionConfig = {
  slug: 'employees',
  labels: { singular: 'Employee', plural: 'Employees' },
  admin: {
    useAsTitle: 'employeeNumber',
    defaultColumns: [
      'employeeNumber',
      'displayName',
      'jobTitle',
      'employmentType',
      'hireDate',
      'status',
    ],
    description:
      'Workforce master. GDPR-classified personal data — read access is admin / payroll-officer only.',
  },
  // Stricter than the typical scopedAccess() — payroll-officer is the
  // dedicated GDPR-privileged role. Avoid the broader 'accountant' tier.
  access: {
    read: roleScopedAccess('admin', 'payroll-officer', 'hr'),
    create: roleScopedAccess('admin', 'hr'),
    update: roleScopedAccess('admin', 'hr', 'payroll-officer'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    {
      name: 'employeeNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Internal employee id (e.g. EMP-2026-001).' },
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
      admin: { description: 'Full preferred-name display string.' },
    },
    // ── Identity (GDPR Art.9 — sensitive, kept minimal) ──
    {
      name: 'identity',
      type: 'group',
      label: 'Identity',
      admin: {
        description:
          'GDPR Art.9 special categories — collect only what payroll mandates require.',
      },
      fields: [
        { name: 'givenName', type: 'text', required: true },
        { name: 'familyName', type: 'text', required: true },
        {
          name: 'dateOfBirth',
          type: 'date',
          admin: {
            description:
              'Required for tax / benefits eligibility. Mask in non-payroll views.',
          },
        },
        {
          name: 'nationalIdRef',
          type: 'text',
          admin: {
            description:
              'Reference to a tokenised id stored elsewhere (do NOT store the raw national id here). ISO 27002 §8.11 data masking.',
          },
        },
        {
          name: 'citizenshipCountry',
          type: 'text',
          admin: { description: 'ISO 3166-1 alpha-2.' },
        },
      ],
    },
    // ── Contact (GDPR Art.6 — minimal contact info) ──
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        {
          name: 'workEmail',
          type: 'email',
          admin: { description: 'Used for HR + payslip distribution.' },
        },
        {
          name: 'personalEmail',
          type: 'email',
          admin: {
            description:
              'GDPR-sensitive. Required only when work email is decommissioned post-termination.',
          },
        },
        { name: 'phone', type: 'text' },
      ],
    },
    // ── Employment ──
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'employmentType',
      type: 'select',
      required: true,
      defaultValue: 'full_time_indefinite',
      options: [
        { label: 'Full-time indefinite', value: 'full_time_indefinite' },
        { label: 'Full-time fixed-term', value: 'full_time_fixed_term' },
        { label: 'Part-time indefinite', value: 'part_time_indefinite' },
        { label: 'Part-time fixed-term', value: 'part_time_fixed_term' },
        { label: 'Apprentice / trainee', value: 'apprentice' },
        { label: 'Internship', value: 'intern' },
        { label: 'Contractor (1099 / Self-employed)', value: 'contractor' },
        { label: 'Director / Officer', value: 'director' },
      ],
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'cost-centers',
      admin: {
        description:
          'Cost-center the employee\'s payroll posts to. Drives IFRS 8 / ASC 280 segment reporting.',
      },
    },
    {
      name: 'manager',
      type: 'relationship',
      relationTo: 'employees',
      admin: { description: 'Reporting line; can be null for org root.' },
    },
    {
      name: 'workCountry',
      type: 'text',
      admin: {
        description:
          'ISO 3166-1 alpha-2. Drives the country-context cascade (tax codes, social-security regime, payroll calendar).',
      },
    },
    { name: 'hireDate', type: 'date', required: true },
    {
      name: 'probationEndDate',
      type: 'date',
      admin: { description: 'Probation typically 3 / 6 months per local labour law.' },
    },
    {
      name: 'contractEndDate',
      type: 'date',
      admin: {
        description:
          'For fixed-term contracts. Required when employmentType ends in _fixed_term.',
      },
    },
    {
      name: 'terminationDate',
      type: 'date',
      admin: {
        description:
          'Last working day. Triggers final payroll + benefits cessation.',
      },
    },
    {
      name: 'terminationReason',
      type: 'select',
      options: [
        { label: 'Resignation', value: 'resignation' },
        { label: 'End of fixed-term', value: 'end_of_fixed_term' },
        { label: 'Retirement', value: 'retirement' },
        { label: 'Mutual agreement', value: 'mutual' },
        { label: 'Performance — for cause', value: 'performance' },
        { label: 'Misconduct — for cause', value: 'misconduct' },
        { label: 'Redundancy', value: 'redundancy' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        condition: (data) => Boolean((data as { terminationDate?: unknown })?.terminationDate),
      },
    },
    // ── Compensation (IAS 19 §10 short-term + §53 post-employment) ──
    currencyField('EUR'),
    {
      name: 'compensation',
      type: 'group',
      label: 'Compensation (IAS 19)',
      fields: [
        {
          name: 'baseSalaryAnnual',
          type: 'number',
          min: 0,
          admin: {
            description:
              'Gross annual base salary (cents). Pro-rated by the employmentType FTE.',
          },
        },
        {
          name: 'fteRatio',
          type: 'number',
          min: 0,
          max: 1,
          defaultValue: 1,
          admin: {
            description:
              'Full-time equivalent ratio (0.5 = 50%). Used for part-time pro-ration.',
          },
        },
        {
          name: 'paySchedule',
          type: 'select',
          defaultValue: 'monthly',
          options: [
            { label: 'Weekly', value: 'weekly' },
            { label: 'Bi-weekly', value: 'biweekly' },
            { label: 'Semi-monthly (15th + last day)', value: 'semimonthly' },
            { label: 'Monthly', value: 'monthly' },
          ],
        },
        {
          name: 'targetBonusPercent',
          type: 'number',
          min: 0,
          max: 100,
          admin: { description: 'Annual bonus target as % of base.' },
        },
        {
          name: 'targetBonusBasis',
          type: 'select',
          options: [
            { label: 'Discretionary', value: 'discretionary' },
            { label: 'Performance-based (KPIs)', value: 'performance' },
            { label: 'Profit-share', value: 'profit_share' },
            { label: 'Sales commission', value: 'commission' },
          ],
        },
      ],
    },
    // ── Benefits (IAS 19 / ASC 715 — post-employment) ──
    {
      name: 'benefits',
      type: 'group',
      label: 'Benefits (IAS 19 / ASC 715)',
      fields: [
        {
          name: 'pensionPlan',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Defined contribution (DC)', value: 'defined_contribution' },
            { label: 'Defined benefit (DB)', value: 'defined_benefit' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          admin: {
            description:
              'IAS 19 §51 distinguishes DC (employer pays a contribution) from DB (employer guarantees a benefit). DB triggers actuarial accounting.',
          },
        },
        {
          name: 'pensionEmployerContributionPercent',
          type: 'number',
          min: 0,
          max: 100,
          admin: { description: 'Employer contribution as % of base salary.' },
        },
        { name: 'healthInsurance', type: 'checkbox', defaultValue: false },
        { name: 'lifeInsurance', type: 'checkbox', defaultValue: false },
        {
          name: 'paidTimeOffDaysPerYear',
          type: 'number',
          min: 0,
          admin: {
            description:
              'PTO accrual entitlement per year. Drives the IAS 19 §11 accumulating-PTO liability.',
          },
        },
        {
          name: 'paidTimeOffBalance',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description:
              'Current accrued PTO balance (days). Decremented when leave is taken; resets per local policy.',
          },
        },
      ],
    },
    // ── Bank account for payroll disbursement (ISO 13616 / 9362) ──
    {
      name: 'payrollBankAccount',
      type: 'group',
      label: 'Payroll bank account',
      fields: [
        {
          name: 'iban',
          type: 'text',
          admin: { description: 'ISO 13616 IBAN.' },
        },
        {
          name: 'bic',
          type: 'text',
          admin: { description: 'ISO 9362 BIC.' },
        },
        {
          name: 'accountHolder',
          type: 'text',
          admin: {
            description:
              'Beneficiary name on the account; may differ from displayName for cultural / legal reasons.',
          },
        },
      ],
    },
    // ── Tax + social security ──
    {
      name: 'tax',
      type: 'group',
      label: 'Tax & social security',
      fields: [
        {
          name: 'taxIdRef',
          type: 'text',
          admin: {
            description:
              'Reference to a tokenised tax id stored elsewhere (do NOT store the raw id). ISO 27002 §8.11 data masking.',
          },
        },
        {
          name: 'socialSecurityIdRef',
          type: 'text',
          admin: {
            description:
              'Reference to a tokenised SSN / NI number / equivalent. Do NOT store raw.',
          },
        },
        {
          name: 'taxResidenceCountry',
          type: 'text',
          admin: {
            description:
              'ISO 3166-1 alpha-2. May differ from workCountry for cross-border employees.',
          },
        },
      ],
    },
    statusField(
      [
        { label: 'Pre-hire (offer accepted, not yet started)', value: 'pre_hire' },
        { label: 'Active', value: 'active' },
        { label: 'On leave', value: 'on_leave' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Terminated', value: 'terminated' },
      ],
      'pre_hire',
    ),
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp(
        'terminationDate',
        (d) => (d as { status?: string }).status === 'terminated',
      ),
    ],
    afterChange: [auditTrailAfterChange('employees')],
  },
  timestamps: true,
}

export default Employees
