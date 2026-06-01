/**
 * Related Party Transactions — single-folder collection node.
 *
 * @accounting IAS-24 related-party-disclosures
 * @accounting US-GAAP ASC-850 related-party-disclosures
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const RelatedPartyTransactions: CollectionConfig = {
  slug: 'related-party-transactions',
  admin: {
    useAsTitle: 'transactionDescription',
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
      name: 'relatedPartyName',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'relatedPartyType',
      type: 'select',
      options: [
        { label: 'Key Management Personnel', value: 'key-management' },
        { label: 'Director', value: 'director' },
        { label: 'Officer', value: 'officer' },
        { label: 'Shareholder (>5%)', value: 'shareholder' },
        { label: 'Family Member', value: 'family' },
        { label: 'Other Entity (Controlled)', value: 'other-entity-controlled' },
        { label: 'Other Entity (Associate)', value: 'other-entity-associate' },
        { label: 'Other Entity (Joint Venture)', value: 'other-entity-jv' },
        { label: 'Post-employment Benefit Plan', value: 'benefit-plan' },
        { label: 'Government Entity', value: 'government' },
      ],
      required: true,
    },
    {
      name: 'relationship',
      type: 'richText',
      required: true,
      admin: { description: 'Nature of the relationship and basis for identification as related party.' },
    },
    {
      name: 'transactionDate',
      type: 'date',
      required: true,
    },
    {
      name: 'transactionDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'transactionType',
      type: 'select',
      options: [
        { label: 'Sale of Goods/Services', value: 'sale' },
        { label: 'Purchase of Goods/Services', value: 'purchase' },
        { label: 'Loan (Provided)', value: 'loan-provided' },
        { label: 'Loan (Received)', value: 'loan-received' },
        { label: 'Lease (Operating)', value: 'lease-operating' },
        { label: 'Lease (Finance)', value: 'lease-finance' },
        { label: 'Dividend Payment', value: 'dividend' },
        { label: 'Management Fee', value: 'management-fee' },
        { label: 'Royalty', value: 'royalty' },
        { label: 'Equity Investment', value: 'equity-investment' },
        { label: 'Guarantee', value: 'guarantee' },
        { label: 'Asset Purchase/Sale', value: 'asset-transaction' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
      admin: { description: 'ISO 4217 currency code (USD, EUR, BGN, etc.).' },
    },
    {
      name: 'terms',
      type: 'richText',
      admin: { description: 'Payment terms, pricing basis, conditions, and any special terms.' },
    },
    {
      name: 'armLengthBasis',
      type: 'richText',
      admin: { description: 'Evidence that transaction was at arm\'s length (IFRS 24 §21, IAS 24 §9).' },
    },
    {
      name: 'approvalStatus',
      type: 'select',
      options: [
        { label: 'Pre-Approved', value: 'pre-approved' },
        { label: 'Approved', value: 'approved' },
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'approverName',
      type: 'text',
      admin: { description: 'Board member or audit committee member who approved.' },
    },
    {
      name: 'approvalDate',
      type: 'date',
    },
    {
      name: 'disclosureRequired',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Must be disclosed per IFRS 24 / IAS 24.' },
    },
    {
      name: 'disclosedInFinancialStatements',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'disclosureReference',
      type: 'text',
      admin: { description: 'Note reference in financial statements (e.g., Note 32).' },
    },
    {
      name: 'relatedControls',
      type: 'relationship',
      relationTo: 'internal-controls',
      hasMany: true,
      admin: { description: 'Controls designed to prevent unauthorized related party transactions.' },
    },
    {
      name: 'evidence',
      type: 'relationship',
      relationTo: 'audit-evidence',
      hasMany: true,
    },
  ],
}
