/**
 * KYC Checks — AML / Customer Due Diligence record per customer / vendor.
 *
 * @standard ISO/IEC-19794 biometric-data-interchange-formats
 * @standard FATF-Recommendation-10 customer-due-diligence
 * @compliance EU-AMLD-6 Directive-2018/1673 anti-money-laundering
 * @compliance USA-PATRIOT-Act §326 customer-identification-program
 * @compliance EU-Regulation-2015/847 wire-transfers
 * @audit ISO-19011:2018 audit-trail kyc-evidence
 * @security ISO-27001 A.5.34 privacy-and-pii
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const KycChecks: CollectionConfig = {
  slug: 'kyc-checks',
  labels: { singular: 'KYC Check', plural: 'KYC Checks' },
  admin: { useAsTitle: 'checkId', defaultColumns: ['checkId', 'subject', 'riskRating', 'status', 'completedAt'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'auditor'),
    update: roleScopedAccess('admin', 'auditor'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'checkId', type: 'text', required: true, unique: true, index: true },
    {
      name: 'subjectType',
      type: 'select',
      required: true,
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Vendor', value: 'vendor' },
        { label: 'Beneficial owner', value: 'beneficial_owner' },
        { label: 'Authorised signatory', value: 'signatory' },
      ],
    },
    // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'customers'.
    // AMLD-5 Art.13(1) "customer due diligence" — the screened subject is
    // the customer party itself, not their address. The polymorphic
    // address-as-subject shape inherited from the deleted ecommerce
    // plugin masked this. Vendor / beneficial-owner / signatory screening
    // happens via separate KycCheck rows (subjectType select drives
    // join-time interpretation).
    { name: 'subject', type: 'relationship', relationTo: 'customers', required: true },
    {
      name: 'cddLevel',
      type: 'select',
      required: true,
      options: [
        { label: 'Simplified Due Diligence (SDD)', value: 'sdd' },
        { label: 'Standard CDD', value: 'cdd' },
        { label: 'Enhanced Due Diligence (EDD)', value: 'edd' },
      ],
    },
    {
      name: 'identityDocuments',
      type: 'array',
      fields: [
        { name: 'docType', type: 'select', options: ['passport', 'national_id', 'driving_licence', 'utility_bill', 'bank_statement', 'other'].map(v => ({ label: v, value: v })) },
        { name: 'docNumber', type: 'text', admin: { description: 'Encrypted at rest.' } },
        { name: 'issuingCountry', type: 'text', admin: { description: 'ISO 3166-1 alpha-2.' } },
        { name: 'expiresAt', type: 'date' },
      ],
    },
    {
      name: 'sanctionsScreening',
      type: 'group',
      fields: [
        { name: 'screenedAt', type: 'date' },
        { name: 'lists', type: 'json', admin: { description: 'OFAC SDN, EU consolidated, UN, HMT, etc.' } },
        { name: 'matchFound', type: 'checkbox', defaultValue: false },
        { name: 'matchDetails', type: 'textarea' },
      ],
    },
    {
      name: 'pepStatus',
      type: 'select',
      options: [
        { label: 'Not a PEP', value: 'not_pep' },
        { label: 'Domestic PEP', value: 'domestic_pep' },
        { label: 'Foreign PEP', value: 'foreign_pep' },
        { label: 'Family / close associate', value: 'family_associate' },
      ],
      admin: { description: 'Politically Exposed Person status.' },
    },
    {
      name: 'riskRating',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Prohibited', value: 'prohibited' },
      ],
    },
    statusField(
      [
        { label: 'Pending', value: 'pending' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Requires Re-verification', value: 'requires_reverification' },
      ],
      'pending',
    ),
    { name: 'completedAt', type: 'date', admin: { readOnly: true } },
    { name: 'nextReviewDue', type: 'date', admin: { description: 'AMLD-6 ongoing monitoring.' } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties(),
      autoSetTimestamp('completedAt', (d) => ['approved', 'rejected'].includes(String((d as { status?: string }).status))),
    ],
    afterChange: [auditTrailAfterChange('kyc-checks')],
  },
  timestamps: true,
}

export default KycChecks
