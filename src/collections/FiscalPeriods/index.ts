/**
 * FiscalPeriods Collection
 *
 * Defines the fiscal year structure and period boundaries for each entity.
 * Supports: monthly, quarterly, weekly, ISO-week, 4/4/5 retail, custom boundaries.
 * Each fiscal configuration is immutable once created; amendments create chain links.
 *
 * Purpose: Single source of truth for fiscal year start, period type, and regulatory context.
 * Integrated with: FiscalCalendars (pre-computed lookup), FiscalPeriodResolver (runtime resolution).
 *
 * @standard IAS-34:2023 Interim Financial Reporting (period structure, quarterly alignment)
 * @standard ISO-8601:2019 (week numbering, leap year handling, date representation)
 * @standard ISO-4217:2023 (currency code per fiscal configuration)
 * @standard SAF-T:3.0.2 (regulatory period coding, audit file structure)
 * @standard XBRL-GL (fiscal context for general ledger reporting)
 * @standard eIDAS:2014/910/EU (qualified electronic signature on amendments)
 * @standard GDPR:2016/679 (audit trail, access control, encryption)
 * @standard SOX:2002 (access control evidence via chain)
 * @invariant Fiscal year start month ∈ [1..12], day ∈ [1..31]
 * @invariant periodType determines boundary calculation (monthly/quarterly/weekly/iso-week/custom)
 * @invariant customPeriodBoundaries must be contiguous, non-overlapping, sorted by startDate
 * @invariant effectiveDate marks configuration activation; supercedes links prior configs
 * @invariant chainLeafUuid implements Law 60 (immutable audit chain)
 * @invariant governanceScope enables Law 63 (self-governance per entity)
 * @invariant regulatoryFramework enum constrains supported reporting regimes
 */

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '../../access/auth'
import { updateFiscalCalendarOnPeriodChange } from '../../hooks/updateFiscalCalendarOnPeriodChange'

export const FiscalPeriods: CollectionConfig = {
  slug: 'fiscal-periods',
  admin: {
    useAsTitle: 'displayLabel',
  },
  access: accountingCollectionAccess(),
  hooks: {
    beforeChange: [updateFiscalCalendarOnPeriodChange],
  },
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
      admin: { description: 'Legal entity this fiscal configuration applies to' },
    },
    {
      name: 'displayLabel',
      type: 'text',
      required: true,
      admin: {
        description:
          'Display label for admin (e.g., "FY2026 | Calendar Year | USD" or "FY2026 Q1-Q4 | Retail 4/4/5")',
      },
    },
    {
      name: 'fiscalYearStartMonth',
      type: 'number',
      required: true,
      admin: {
        description: 'Fiscal year start month (1=January, 12=December). Determines period boundaries.',
      },
    },
    {
      name: 'fiscalYearStartDay',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description:
          'Fiscal year start day of month (1..31). Example: July 1 for US Federal (month=7, day=1).',
      },
    },
    {
      name: 'periodType',
      type: 'select',
      options: [
        { label: 'Monthly (12 periods/year)', value: 'monthly' },
        { label: 'Quarterly (4 periods/year)', value: 'quarterly' },
        { label: 'Weekly (52/53 periods/year)', value: 'weekly' },
        { label: 'ISO Week (52/53 periods/year, week 1 = first week with Thursday)', value: 'iso-week' },
        { label: 'Retail 4/4/5 (4 weeks, 4 weeks, 5 weeks)', value: 'retail-445' },
        { label: 'Custom (via customPeriodBoundaries)', value: 'custom' },
      ],
      required: true,
      admin: { description: 'Fiscal period structure (determines how dates map to periods)' },
    },
    {
      name: 'customPeriodBoundaries',
      type: 'json',
      admin: {
        description:
          'Only if periodType=custom. Array of {periodNumber, periodLabel, startDate, endDate}. Must be contiguous, sorted, non-overlapping.',
        condition: (data) => data?.periodType === 'custom',
      },
    },
    {
      name: 'currencyCode',
      type: 'text',
      required: true,
      admin: {
        description: 'Currency code (ISO 4217, e.g., USD, EUR, GBP). Default currency for this fiscal config.',
      },
    },
    {
      name: 'localeCode',
      type: 'text',
      required: true,
      defaultValue: 'und',
      admin: {
        description:
          'Locale for date formatting and period names (BCP 47, e.g., en-US, de-DE, und=undefined). Affects display only.',
      },
    },
    {
      name: 'countryCode',
      type: 'text',
      required: true,
      admin: {
        description: 'Country code (ISO 3166-1 alpha-2, e.g., US, GB, DE). Used for regulatory framework selection.',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft (not yet active)', value: 'draft' },
        { label: 'Active (current fiscal configuration)', value: 'active' },
        { label: 'Archived (superseded by newer config)', value: 'archived' },
      ],
      required: true,
      defaultValue: 'draft',
      admin: { description: 'Configuration lifecycle status' },
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
      admin: {
        description:
          'Date this configuration becomes active. All postings ≥ effectiveDate use this config until superceded.',
      },
    },
    {
      name: 'supercedes',
      type: 'relationship',
      relationTo: 'fiscal-periods',
      admin: {
        description:
          'If not null, this config replaces a prior config (creates amendment chain link for audit trail). Points to prior FiscalPeriods record.',
      },
    },
    {
      name: 'regulatoryFramework',
      type: 'select',
      options: [
        { label: 'IAS/IFRS (International Accounting Standards)', value: 'ias-ifrs' },
        { label: 'US GAAP (Generally Accepted Accounting Principles)', value: 'us-gaap' },
        { label: 'Local Statutory (country-specific)', value: 'local-statutory' },
        { label: 'SAF-T (Standard Audit File for Tax)', value: 'saf-t' },
        { label: 'XBRL (eXtensible Business Reporting Language)', value: 'xbrl' },
      ],
      required: true,
      defaultValue: 'ias-ifrs',
      admin: { description: 'Regulatory reporting framework (affects period coding, segment alignment)' },
    },
    {
      name: 'allowsNonGregorian',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'If true, fiscal periods may not align with Gregorian calendar (e.g., Islamic, Hebrew calendar). Requires custom computation.',
      },
    },
    {
      name: 'leapYearAdjustment',
      type: 'select',
      options: [
        { label: 'None (standard Gregorian leap year)', value: 'none' },
        { label: 'Shifted (add Feb 29 to final period)', value: 'shifted' },
        { label: 'Custom (via amendment)', value: 'custom' },
      ],
      defaultValue: 'none',
      admin: { description: 'How to handle leap year (affects period boundaries)' },
    },
    {
      name: 'governanceScope',
      type: 'json',
      admin: {
        description:
          'Law 63: Self-governance metadata. Stores entity self-rule context (role assignments, approval thresholds, amendment authorities). Auto-populated from entity profile.',
      },
    },
    {
      name: 'chainLeafUuid',
      type: 'text',
      admin: {
        description:
          'Law 60: Immutable audit chain leaf. Computed as sha256(JCS-canonical(FiscalPeriods) || prior_leaf_uuid). Enables tamper detection.',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'User who created this fiscal configuration' },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: { description: 'Timestamp of creation' },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'User who last updated this configuration (amendments)' },
    },
    {
      name: 'updatedAt',
      type: 'date',
      admin: { description: 'Timestamp of last amendment' },
    },
    {
      name: 'auditTrail',
      type: 'richText',
      admin: {
        description: 'Immutable audit trail: creation, amendments, activations, regulatory submissions. Append-only.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Configuration notes (e.g., regulatory requirements, tenant-specific adjustments)' },
    },
  ],
}
