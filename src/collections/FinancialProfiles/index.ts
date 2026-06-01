/**
 * Financial Profiles — an individual's / party's personal balance sheet.
 *
 * Fills the ceccec/erpax `personal_financial_infos` gap: a recorded
 * statement of a person's assets, liabilities, income and expenses, used
 * for KYC / creditworthiness / AML customer-due-diligence. Assets,
 * liabilities, income and expenses keep the source's flexible JSON shape;
 * `netWorth` is derived. Links to `kyc-checks` so the CDD chain is whole.
 *
 * Personal financial data is sensitive — tenant-isolated, access-gated,
 * and subject to GDPR storage-limitation; never seed real values.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @compliance FATF Recommendation 10 customer-due-diligence
 * @compliance EU AMLD5 (Directive 2018/843) beneficial-owner-financials
 * @compliance GDPR Art 5(1)(c) data-minimisation Art 5(1)(e) storage-limitation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation A.8.12 data-leakage-prevention
 * @audit ISO-19011:2018 audit-trail kyc-evidence
 * @see ./KycChecks.ts
 * @see ./BeneficialOwners.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../../fields/base-accounting-fields'

const FinancialProfiles: CollectionConfig = {
  slug: 'financial-profiles',
  labels: { singular: 'Financial Profile', plural: 'Financial Profiles' },
  admin: {
    useAsTitle: 'personName',
    defaultColumns: ['reference', 'personName', 'netWorth', 'asOfDate', 'status'],
    description:
      "An individual's assets/liabilities/income/expenses for KYC / creditworthiness (FATF R.10). Sensitive personal data — GDPR storage-limited.",
  },
  access: accountingCollectionAccess({ feature: 'compliance_aml' }),
  fields: [
    referenceField({ description: 'Profile reference.' }),
    { name: 'personName', type: 'text', required: true,
      admin: { description: 'Name of the individual the profile is for.' } },
    {
      name: 'relatedParty',
      type: 'relationship',
      relationTo: ['customers', 'vendors', 'beneficial-owners', 'users'],
      admin: { description: 'Party this profile belongs to (polymorphic).' },
    },
    { name: 'kycCheck', type: 'relationship', relationTo: 'kyc-checks',
      admin: { description: 'KYC/CDD check this profile supports.' } },
    { name: 'asOfDate', type: 'date', index: true,
      admin: { description: 'ISO 8601 — date the financial position is stated as of.' } },
    currencyField(),
    { name: 'assets', type: 'json',
      admin: { description: 'Itemised assets (JSON) — e.g. property, deposits, investments.' } },
    { name: 'liabilities', type: 'json',
      admin: { description: 'Itemised liabilities (JSON) — e.g. mortgages, loans.' } },
    { name: 'incomeSources', type: 'json',
      admin: { description: 'Itemised income sources (JSON) — e.g. salary, dividends.' } },
    { name: 'expenses', type: 'json',
      admin: { description: 'Itemised recurring expenses (JSON).' } },
    { name: 'netWorth', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Σ assets − Σ liabilities (minor units). Derived.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Verified', value: 'verified' },
        { label: 'Expired (re-CDD due)', value: 'expired' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('financial-profiles'),
  timestamps: true,
}

export default FinancialProfiles
