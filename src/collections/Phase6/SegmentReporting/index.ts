import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const SegmentReporting: CollectionConfig = {
  slug: 'segment-reporting',
  admin: {
    useAsTitle: 'segmentName',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'segmentationBasis',
      type: 'select',
      options: [
        { label: 'Operating Segments (IFRS 8 / ASC 280)', value: 'operating' },
        { label: 'Geographic Segments', value: 'geographic' },
        { label: 'Business Line Segments', value: 'business-line' },
        { label: 'Customer/Product Segments', value: 'customer-product' },
      ],
      required: true,
    },
    {
      name: 'reportingStandard',
      type: 'select',
      options: [
        { label: 'IFRS 8', value: 'ifrs-8' },
        { label: 'ASC 280', value: 'asc-280' },
      ],
      required: true,
    },
    {
      name: 'fiscalPeriod',
      type: 'text',
      required: true,
      admin: { description: 'Fiscal year or quarter.' },
    },
    {
      name: 'segmentName',
      type: 'text',
      required: true,
    },
    {
      name: 'segmentDescription',
      type: 'richText',
      admin: { description: 'Products/services, geographic area, or customer base defining segment.' },
    },
    {
      name: 'chiefOperatingDecisionMaker',
      type: 'text',
      admin: { description: 'CODM responsible for resource allocation to segment (IFRS 8 §5).' },
    },
    {
      name: 'revenue',
      type: 'number',
      required: true,
      admin: { description: 'Segment revenue (external + intersegment).' },
    },
    {
      name: 'externalRevenue',
      type: 'number',
      admin: { description: 'Revenue from external customers.' },
    },
    {
      name: 'intersegmentRevenue',
      type: 'number',
      admin: { description: 'Revenue from other segments (transfer price basis).' },
    },
    {
      name: 'operatingProfit',
      type: 'number',
      admin: { description: 'Segment operating profit (EBIT). Measurement basis per IFRS 8 §27.' },
    },
    {
      name: 'interest',
      type: 'number',
    },
    {
      name: 'taxes',
      type: 'number',
    },
    {
      name: 'netIncome',
      type: 'number',
    },
    {
      name: 'assets',
      type: 'number',
      required: true,
      admin: { description: 'Total assets (identifiable per IFRS 8 §28).' },
    },
    {
      name: 'liabilities',
      type: 'number',
      required: true,
      admin: { description: 'Total liabilities (identifiable per IFRS 8 §28).' },
    },
    {
      name: 'capitalExpenditures',
      type: 'number',
      admin: { description: 'CapEx in period.' },
    },
    {
      name: 'depreciation',
      type: 'number',
      admin: { description: 'Depreciation and amortization.' },
    },
    {
      name: 'impairmentCharges',
      type: 'number',
      admin: { description: 'Asset impairment charges.' },
    },
    {
      name: 'majorCustomerDependency',
      type: 'checkbox',
      admin: { description: 'Check if segment revenue from single customer >10% of total (IFRS 8 §34).' },
    },
    {
      name: 'majorCustomerName',
      type: 'text',
      admin: { description: 'Customer name if major customer dependence exists.' },
    },
    {
      name: 'majorCustomerRevenueAmount',
      type: 'number',
      admin: { description: 'Revenue from major customer.' },
    },
    {
      name: 'majorCustomerPercentage',
      type: 'number',
      admin: { description: 'As % of total revenue.' },
    },
    {
      name: 'transferPricingPolicies',
      type: 'richText',
      admin: { description: 'Pricing basis for intersegment transactions (at cost, market price, etc.).' },
    },
    {
      name: 'identifiableAssets',
      type: 'array',
      fields: [
        { name: 'assetCategory', type: 'text', required: true },
        { name: 'amount', type: 'number', required: true },
      ],
    },
    {
      name: 'segmentGeography',
      type: 'array',
      fields: [
        { name: 'countryCode', type: 'text', required: true },
        { name: 'revenue', type: 'number', required: true },
        { name: 'assets', type: 'number' },
      ],
    },
    {
      name: 'quantitativeMeasurements',
      type: 'richText',
      admin: { description: 'Quantitative thresholds used to identify segments (IFRS 8 §13-19).' },
    },
    {
      name: 'reconciliationToConsolidated',
      type: 'richText',
      required: true,
      admin: { description: 'Reconciliation of segment totals to consolidated totals (IFRS 8 §30).' },
    },
    {
      name: 'relatedDisclosures',
      type: 'relationship',
      relationTo: 'disclosure-checklists',
      hasMany: true,
      admin: { description: 'Links to IFRS 8 disclosure checklists for this segment.' },
    },
    {
      name: 'segmentReportingDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Segment reporting note or schedule (PDF).' },
    },
    {
      name: 'reportingStatus',
      type: 'select',
      options: [
        { label: 'Under Preparation', value: 'under-preparation' },
        { label: 'Pending Review', value: 'pending-review' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Reported', value: 'reported' },
      ],
      required: true,
      defaultValue: 'under-preparation',
    },
  ],
}
