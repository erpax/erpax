/**
 * Beneficial Owners — UBO register per AML / Corporate Transparency Act.
 *
 * @standard ISO-17442-1:2020 lei
 * @compliance EU-AMLD-5 Directive-2018/843 ubo-register
 * @compliance US-CTA Corporate-Transparency-Act-2021 beneficial-ownership
 * @compliance FATF-Recommendation-24 transparency-of-legal-persons
 * @audit ISO-19011:2018 audit-trail ubo-evidence
 * @security ISO-27001 A.5.34 privacy-and-pii
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const BeneficialOwners: CollectionConfig = {
  slug: 'beneficial-owners',
  labels: { singular: 'Beneficial Owner', plural: 'Beneficial Owners' },
  admin: { useAsTitle: 'fullName', defaultColumns: ['fullName', 'entity', 'ownershipPercent', 'controlType', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'auditor'),
    update: roleScopedAccess('admin', 'auditor'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'legal-entities'.
    // The field's description ("Legal entity whose UBO this is") was already
    // correct — only the relation was misaimed (legacy ecommerce-plugin
    // address-as-entity shape). AMLD-5 Art.30 + US CTA both register the
    // ultimate beneficial owner of a *legal entity*, not an address.
    { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true, admin: { description: 'Legal entity whose UBO this is (AMLD-5 Art.30 / US CTA register subject).' } },
    { name: 'fullName', type: 'text', required: true },
    { name: 'dateOfBirth', type: 'date' },
    { name: 'nationality', type: 'text', admin: { description: 'ISO 3166-1 alpha-2 country code.' } },
    { name: 'residenceCountry', type: 'text' },
    { name: 'residenceAddress', type: 'relationship', relationTo: 'addresses' },
    { name: 'ownershipPercent', type: 'number', min: 0, max: 100, admin: { description: 'AMLD threshold typically 25%.' } },
    {
      name: 'controlType',
      type: 'select',
      required: true,
      options: [
        { label: 'Direct ownership', value: 'direct_ownership' },
        { label: 'Indirect ownership', value: 'indirect_ownership' },
        { label: 'Voting rights', value: 'voting_rights' },
        { label: 'Right to appoint board', value: 'board_appointment' },
        { label: 'Other significant control', value: 'other_control' },
      ],
    },
    {
      name: 'pepStatus',
      type: 'select',
      options: ['not_pep', 'domestic_pep', 'foreign_pep', 'family_associate'].map(v => ({ label: v, value: v })),
    },
    { name: 'kycCheck', type: 'relationship', relationTo: 'kyc-checks' },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Pending Verification', value: 'pending' },
        { label: 'Resigned / sold out', value: 'resigned' },
      ],
      'active',
    ),
    { name: 'effectiveFrom', type: 'date' },
    { name: 'effectiveTo', type: 'date' },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('beneficial-owners')],
  },
  timestamps: true,
}

export default BeneficialOwners
