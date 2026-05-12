/**
 * Government Grants — IAS-20 + ASC 958-605 register of public-sector
 * incentives + EU funds + national subsidies.
 *
 * Slice BBBB (2026-05-10): EU members + most jurisdictions provide
 * grants (cash, tax credits, asset transfers below market price). IAS-20
 * mandates structured recognition (deferred-income vs net-against-asset
 * methods) and conditional disclosure of unfulfilled conditions. This
 * collection is the structured home for those grants.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-20 §7 §8 §10 recognition
 * @accounting IFRS IAS-20 §12 §13 income-or-asset-presentation
 * @accounting IFRS IAS-20 §17 §18 §28 §32 disclosure
 * @accounting IFRS IAS-20 §39 disclosure-government-assistance
 * @accounting US-GAAP ASC-958-605 contributions
 * @accounting US-GAAP ASC-832 government-assistance-disclosure
 * @audit ISO-19011:2018 audit-trail grant-evidence
 * @compliance EU CSRD ESRS 2 sbm-3 material-impacts (EU funds traceability)
 * @compliance OECD BEPS Action 13 country-by-country (when grants ≥ threshold)
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Provisions.ts (clawback risk)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField, legalEntityField } from '@/fields/accounting/base-accounting-fields'

const GovernmentGrants: CollectionConfig = {
  slug: 'government-grants',
  labels: { singular: 'Government Grant', plural: 'Government Grants' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'grantorName', 'grantType', 'totalAwarded', 'recognisedToDate', 'status'],
    description:
      'IAS-20 register of public-sector incentives + EU funds + national subsidies. Tracks award, conditions, recognition pattern, clawback risk.',
  },
  access: accountingCollectionAccess({ feature: 'period_end_closing' }),
  fields: [
    multiTenancyField(),
    referenceField(),
    { name: 'grantName', type: 'text', required: true },
    { name: 'grantorName', type: 'text', required: true,
      admin: { description: 'Granting authority (e.g. EU Horizon Europe, BG Innovation Fund, US SBA).' } },
    { name: 'grantorCountryCode', type: 'text',
      admin: { description: 'ISO 3166-1 alpha-2 — country of the granting authority.' } },
    legalEntityField({ description: 'Recipient legal entity.' }),
    {
      name: 'grantType',
      type: 'select',
      required: true,
      options: [
        { label: 'Cash Grant (income-related, IAS-20 §29)', value: 'cash_income' },
        { label: 'Capital Grant (asset-related, IAS-20 §17)', value: 'cash_capital' },
        { label: 'Tax Credit / Rebate', value: 'tax_credit' },
        { label: 'Below-Market Loan (IAS-20 §10A)', value: 'concessionary_loan' },
        { label: 'Asset Transfer Below Market Value', value: 'asset_transfer' },
        { label: 'Forgivable Loan', value: 'forgivable_loan' },
        { label: 'Service Contribution (in-kind)', value: 'in_kind_service' },
        { label: 'R&D / Innovation Grant', value: 'rd_grant' },
        { label: 'Employment Subsidy', value: 'employment_subsidy' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'recognitionMethod',
      type: 'select',
      required: true,
      defaultValue: 'deferred_income',
      options: [
        { label: 'Deferred Income (IAS-20 §24(a))', value: 'deferred_income' },
        { label: 'Net Against Asset Carrying Amount (IAS-20 §24(b))', value: 'net_against_asset' },
        { label: 'Income on Receipt (no future obligation)', value: 'on_receipt' },
        { label: 'Reduce Related Expense (income approach)', value: 'reduce_expense' },
      ],
      admin: { description: 'IAS-20 §12-24 — chosen presentation method (consistent application required).' },
    },
    {
      name: 'recognitionPattern',
      type: 'select',
      defaultValue: 'systematic_useful_life',
      options: [
        { label: 'Systematic over Useful Life (asset-related)', value: 'systematic_useful_life' },
        { label: 'Match to Costs Incurred', value: 'match_to_costs' },
        { label: 'Straight-Line over Grant Period', value: 'straight_line' },
        { label: 'On Achievement of Conditions', value: 'on_milestones' },
        { label: 'Immediate (no future obligation)', value: 'immediate' },
      ],
    },
    { name: 'awardDate', type: 'date', required: true,
      admin: { description: 'Date of formal award letter / contract.' } },
    { name: 'effectiveStartDate', type: 'date' },
    { name: 'effectiveEndDate', type: 'date' },
    currencyField(),
    { name: 'totalAwarded', type: 'number', required: true,
      admin: { description: 'Maximum award amount (cents).' } },
    { name: 'amountReceived', type: 'number', defaultValue: 0,
      admin: { description: 'Cumulative cash received to date.' } },
    { name: 'recognisedToDate', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Cumulative income recognised in P&L (or asset reduction).' } },
    { name: 'deferredIncomeBalance', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Outstanding liability — cash received but not yet recognised in P&L.' } },
    {
      name: 'conditions',
      type: 'array',
      labels: { singular: 'Condition', plural: 'Conditions' },
      dbName: 'grant_cond',
      admin: { description: 'IAS-20 §7 — only recognise when reasonable assurance of compliance with conditions.' },
      fields: [
        { name: 'condition', type: 'text', required: true },
        { name: 'targetDate', type: 'date' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'open',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Met', value: 'met' },
            { label: 'Breached (clawback risk)', value: 'breached' },
            { label: 'Waived', value: 'waived' },
          ],
        },
        { name: 'evidenceRef', type: 'text' },
      ],
    },
    { name: 'clawbackProvision', type: 'relationship', relationTo: 'provisions',
      admin: { description: 'IAS-20 §32 — provision for repayment when condition-breach probability ≥ 50%.' } },
    { name: 'isEUFunded', type: 'checkbox', defaultValue: false,
      admin: { description: 'EU CSRD ESRS 2 traceability — flags grants requiring EU traceability disclosure.' } },
    { name: 'euCFCAReference', type: 'text',
      admin: { description: 'EU Commission CFCA / programme reference (e.g. Horizon Europe project ID).' } },
    { name: 'relatedAsset', type: 'relationship', relationTo: 'fixed-assets',
      admin: { description: 'For capital grants under net-against-asset method, the asset whose carrying amount is reduced.' } },
    statusField(
      [
        { label: 'Awarded', value: 'awarded' },
        { label: 'Active (recognising)', value: 'active' },
        { label: 'Conditions Met (no clawback risk)', value: 'conditions_met' },
        { label: 'Fully Recognised', value: 'fully_recognised' },
        { label: 'Repayable (clawback triggered)', value: 'repayable' },
        { label: 'Repaid', value: 'repaid' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'awarded',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('government-grants')],
  },
  timestamps: true,
}

export default GovernmentGrants
