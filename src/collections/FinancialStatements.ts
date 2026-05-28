import type { CollectionConfig } from 'payload'
import { tenantAdminWriteAccess } from '../access/auth'
import { currencyField, notesField } from '../fields/base-accounting-fields'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant';
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy';
import { autoSetTimestamp } from '../hooks/autoSetTimestamp';
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange';
import { enforceSegregationOfDuties } from '../hooks/enforceSegregationOfDuties';

/**
 * Financial Statements — generated statement records (TB, BS, IS, CF, etc.).
 *
 * Slice ZZ: SOX §302 disclosure-controls now actually enforced — the user
 * who generated a statement cannot also certify/approve it (segregation of
 * duties); ISO-8601 generatedAt/issuedAt/approvedAt are auto-stamped on
 * status transitions; every write emits a structured audit-trail event.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at
 * @standard BCP-47 language-tag
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-34 §8 §10 interim-financial-reporting (when statementType ∈ Q1/Q2/Q3 the §10 condensed format applies)
 * @accounting IFRS IFRS-18 §9 §10 §40 presentation-and-disclosure (effective 2027-01 — replaces IAS-1 with structured operating/investing/financing categories)
 * @accounting IFRS IFRS-7 §31-§42 financial-instruments-disclosures (statement notes consume IFRS-7 risk-management disclosures)
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-270 interim-reporting
 * @compliance SOX §302 disclosure-controls
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties certifier-vs-preparer
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */
const FinancialStatements: CollectionConfig = {
  slug: 'financial-statements',
  labels: { singular: 'Financial Statement', plural: 'Financial Statements' },
  admin: {
    useAsTitle: 'statementId',
    defaultColumns: ['statementId', 'statementType', 'fiscalPeriodEnd', 'language', 'generatedAt'],
  },
  access: tenantAdminWriteAccess(),
  fields: [
    { name: 'statementId', type: 'text', required: true, unique: true },
    {
      name: 'statementType',
      type: 'select',
      required: true,
      options: [
        { label: 'Trial Balance', value: 'trial_balance' },
        { label: 'Balance Sheet', value: 'balance_sheet' },
        { label: 'Income Statement', value: 'income_statement' },
        { label: 'Cash Flow Statement', value: 'cash_flow_statement' },
        { label: 'Statement of Changes in Equity', value: 'equity_statement' },
      ],
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Italian', value: 'it' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Russian', value: 'ru' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Chinese', value: 'zh' },
        { label: 'Arabic', value: 'ar' },
      ],
    },
    { name: 'fiscalPeriodStart', type: 'date', required: true },
    { name: 'fiscalPeriodEnd', type: 'date', required: true },
    currencyField(),
    { name: 'statementContent', type: 'json', required: true },
    {
      name: 'financialRatios',
      type: 'array',
      fields: [
        { name: 'ratioName', type: 'text', required: true },
        { name: 'ratioValue', type: 'number', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Liquidity', value: 'liquidity' },
            { label: 'Profitability', value: 'profitability' },
            { label: 'Leverage', value: 'leverage' },
            { label: 'Efficiency', value: 'efficiency' },
          ],
        },
        { name: 'interpretation', type: 'text' },
      ],
    },
    { name: 'comparativePeriod', type: 'date' },
    { name: 'comparativeData', type: 'json' },
    notesField(),
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Final', value: 'final' },
        { label: 'Audited', value: 'audited' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'exportFormats',
      type: 'array',
      fields: [
        {
          name: 'format',
          type: 'select',
          required: true,
          options: [
            { label: 'PDF', value: 'pdf' },
            { label: 'Excel', value: 'excel' },
            { label: 'CSV', value: 'csv' },
            { label: 'JSON', value: 'json' },
            { label: 'HTML', value: 'html' },
          ],
        },
        { name: 'fileUrl', type: 'text' },
        { name: 'generatedAt', type: 'date' },
      ],
    },
    { name: 'generatedAt', type: 'date', required: true, admin: { disabled: true } },
    { name: 'generatedBy', type: 'relationship', relationTo: 'users', admin: { disabled: true } },
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      // SOX §302 disclosure-controls: the user who generated the statement
      // cannot also be the user who certifies/approves it.
      enforceSegregationOfDuties(),
      // ISO-8601 generation/issuance/approval timestamps.
      autoSetTimestamp('generatedAt', (data) => Boolean(data)),
      autoSetTimestamp(
        'issuedAt',
        (data) => (data as { status?: string }).status === 'issued',
      ),
      autoSetTimestamp(
        'approvedAt',
        (data) => Boolean((data as { approvedBy?: unknown }).approvedBy),
      ),
    ],
    afterChange: [auditTrailAfterChange('financial-statements')],
  },
  timestamps: true,
};

export default FinancialStatements;
