import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const DebtSchedule: CollectionConfig = {
  slug: 'debt-schedule',
  admin: {
    useAsTitle: 'debtInstrumentName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'debtInstrumentName',
      type: 'text',
      required: true,
      admin: { description: 'E.g., "Senior Term Loan Facility", "10-Year Bonds 2030".' },
    },
    {
      name: 'debtInstrumentId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Internal identifier or ISIN/CUSIP.' },
    },
    {
      name: 'debtType',
      type: 'select',
      options: [
        { label: 'Bank Loan - Term', value: 'bank-term-loan' },
        { label: 'Bank Loan - Revolving', value: 'bank-revolving' },
        { label: 'Bank Loan - Accordion', value: 'bank-accordion' },
        { label: 'Bonds - Fixed Rate', value: 'bonds-fixed' },
        { label: 'Bonds - Floating Rate', value: 'bonds-floating' },
        { label: 'Convertible Bonds', value: 'convertible-bonds' },
        { label: 'Finance Lease', value: 'finance-lease' },
        { label: 'Operating Lease', value: 'operating-lease' },
        { label: 'Securitization', value: 'securitization' },
        { label: 'Government Grants/Subsidies (repayable)', value: 'government-grant' },
        { label: 'Vendor Financing', value: 'vendor-financing' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'lenderName',
      type: 'text',
      required: true,
      admin: { description: 'Bank, bondholder base, lessor name.' },
    },
    {
      name: 'lenderContact',
      type: 'text',
      admin: { description: 'Contact for covenant reporting, etc.' },
    },
    {
      name: 'principalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
      admin: { description: 'ISO 4217 (USD, EUR, BGN, etc.).' },
    },
    {
      name: 'issuanceDate',
      type: 'date',
      required: true,
    },
    {
      name: 'maturityDate',
      type: 'date',
      required: true,
    },
    {
      name: 'interestRate',
      type: 'text',
      admin: { description: 'E.g., "3.5% fixed" or "EURIBOR+2.0% floating".' },
    },
    {
      name: 'interestPaymentFrequency',
      type: 'select',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Semi-Annual', value: 'semi-annual' },
        { label: 'Annual', value: 'annual' },
      ],
    },
    {
      name: 'repaymentSchedule',
      type: 'array',
      fields: [
        { name: 'paymentDate', type: 'date', required: true },
        { name: 'principalPayment', type: 'number', required: true },
        { name: 'interestPayment', type: 'number' },
        { name: 'totalPayment', type: 'number' },
        { name: 'paymentStatus', type: 'select', options: [
          { label: 'Scheduled', value: 'scheduled' },
          { label: 'Paid', value: 'paid' },
          { label: 'Deferred', value: 'deferred' },
        ], defaultValue: 'scheduled'},
      ],
    },
    {
      name: 'outstandingBalance',
      type: 'number',
      required: true,
      admin: { description: 'Current principal outstanding as of balance sheet date.' },
    },
    {
      name: 'securityType',
      type: 'select',
      options: [
        { label: 'Unsecured', value: 'unsecured' },
        { label: 'Secured - Assets', value: 'secured-assets' },
        { label: 'Secured - Guarantees', value: 'secured-guarantees' },
        { label: 'Secured - Cross-Default', value: 'secured-cross-default' },
      ],
    },
    {
      name: 'securityDetails',
      type: 'richText',
      admin: { description: 'Collateral, guarantees, cross-default provisions.' },
    },
    {
      name: 'financialCovenants',
      type: 'array',
      fields: [
        { name: 'covenantName', type: 'text', required: true },
        { name: 'covenantDefinition', type: 'richText' },
        { name: 'testedFrequency', type: 'select', options: [
          { label: 'Quarterly', value: 'quarterly' },
          { label: 'Semi-Annual', value: 'semi-annual' },
          { label: 'Annual', value: 'annual' },
        ]},
        { name: 'threshold', type: 'text', required: true },
        { name: 'currentPerformance', type: 'text' },
        { name: 'complianceStatus', type: 'select', options: [
          { label: 'In Compliance', value: 'compliant' },
          { label: 'Breach Notice', value: 'breach' },
          { label: 'Waived', value: 'waived' },
        ], defaultValue: 'compliant'},
      ],
    },
    {
      name: 'operationalCovenants',
      type: 'richText',
      admin: { description: 'Non-financial covenants (reporting, insurance, etc.).' },
    },
    {
      name: 'restrictiveCovenants',
      type: 'richText',
      admin: { description: 'Restrictions (dividends, capex, asset sales, additional debt).' },
    },
    {
      name: 'prepaymentTerms',
      type: 'richText',
      admin: { description: 'Prepayment penalties, lockup periods, make-whole provisions.' },
    },
    {
      name: 'defaultProvisions',
      type: 'richText',
      admin: { description: 'Events of default, acceleration clauses, remedies.' },
    },
    {
      name: 'guarantees',
      type: 'relationship',
      relationTo: 'legal-entities',
      hasMany: true,
      admin: { description: 'Subsidiaries or parent guaranteeing this debt.' },
    },
    {
      name: 'fxHedges',
      type: 'relationship',
      relationTo: 'fx-transactions',
      hasMany: true,
      admin: { description: 'FX hedging instruments if multi-currency.' },
    },
    {
      name: 'lastCovenant ComplianceTest',
      type: 'date',
    },
    {
      name: 'nextCovenantTest',
      type: 'date',
    },
    {
      name: 'riskAssessment',
      type: 'richText',
      admin: { description: 'Refinance risk, interest rate risk, covenant risk assessment.' },
    },
    {
      name: 'relatedControls',
      type: 'relationship',
      relationTo: 'internal-controls',
      hasMany: true,
    },
    {
      name: 'debtStatus',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Performing', value: 'performing' },
        { label: 'Breach - Cure Period', value: 'breach-cure' },
        { label: 'Breach - Waived', value: 'breach-waived' },
        { label: 'Repaid', value: 'repaid' },
        { label: 'Refinanced', value: 'refinanced' },
      ],
      required: true,
      defaultValue: 'active',
    },
    {
      name: 'debtAgreement',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Loan agreement, bond indenture, lease agreement (PDF).' },
    },
  ],
}
