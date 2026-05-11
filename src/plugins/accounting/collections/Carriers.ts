/**
 * Carriers — shipping/freight carrier master per tenant.
 *
 * Slice UUU (2026-05-10): added per first-principles ERP gap. The
 * existing `shipments.carrier` field was a free-text string; this
 * collection makes the carrier a first-class entity so per-tenant
 * shipping accounts (DHL/UPS/FedEx/national-post), credentials, rate
 * cards, and INCOTERMS-tagged service levels can be normalised.
 *
 * @standard ISO-8601-1:2019 date-time effective-from
 * @standard INCOTERMS 2020 international-commercial-terms
 * @standard IATA DGR dangerous-goods-regulations
 * @standard IMDG-Code maritime-dangerous-goods
 * @standard UPU-S10 universal-postal-union shipment-identifier
 * @audit ISO-19011:2018 audit-trail carrier-master
 * @compliance SOX §404 internal-controls carrier-master TOM-LOG-01
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §8.24 use-of-cryptography api-credentials-encryption
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { tenantMasterDataAccess } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields, taxonomySelect } from '../fields/base-accounting-fields'
import { INCOTERM_OPTIONS } from '@/standards/incoterms-2020'

const Carriers: CollectionConfig = {
  slug: 'carriers',
  labels: { singular: 'Carrier', plural: 'Carriers' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'scope', 'status'],
    description:
      'Shipping/freight carrier master per tenant — DHL/UPS/FedEx/national-post and per-tenant accounts. Normalises `shipments.carrier` from free-text.',
  },
  access: tenantMasterDataAccess(),
  fields: [
    multiTenancyField(),
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Carrier code (e.g. `DHL`, `UPS`, `FEDEX`, `BG-POST`).' } },
    { name: 'name', type: 'text', required: true,
      admin: { description: 'Display name (e.g. `DHL Express`, `Bulgarian Posts`).' } },
    {
      name: 'scope',
      type: 'select',
      required: true,
      defaultValue: 'international',
      options: [
        { label: 'International (cross-border)', value: 'international' },
        { label: 'National (domestic)', value: 'national' },
        { label: 'Regional / Last-Mile', value: 'regional' },
        { label: 'Postal (UPU)', value: 'postal' },
        { label: 'Freight (LTL/FTL)', value: 'freight' },
        { label: 'Maritime', value: 'maritime' },
        { label: 'Air-Cargo', value: 'air' },
      ],
    },
    { name: 'accountNumber', type: 'text',
      admin: { description: 'Per-tenant carrier account number (used in API requests).' } },
    { name: 'apiBaseUrl', type: 'text',
      admin: { description: 'RFC 3986 base URL for the carrier rate / tracking API.' } },
    { name: 'apiCredentialsId', type: 'text',
      admin: { description: 'Reference into a secrets-store (NIST SP-800-108 KDF) — never store raw credentials.' } },
    {
      name: 'serviceLevels',
      type: 'array',
      labels: { singular: 'Service Level', plural: 'Service Levels' },
      admin: { description: 'INCOTERMS-tagged transport options offered by this carrier.' },
      fields: [
        { name: 'code', type: 'text', required: true,
          admin: { description: 'Carrier service code (e.g. `EXPRESS_WORLDWIDE`).' } },
        { name: 'label', type: 'text', required: true },
        taxonomySelect('incoterm', INCOTERM_OPTIONS),
        { name: 'transitDays', type: 'number',
          admin: { description: 'Typical end-to-end transit time in days.' } },
      ],
    },
    { name: 'supportsHazmat', type: 'checkbox', defaultValue: false,
      admin: { description: 'IATA DGR / IMDG-Code hazardous-goods carriage allowed.' } },
    { name: 'effectiveFrom', type: 'date',
      admin: { description: 'When this carrier became active for the tenant.' } },
    { name: 'effectiveTo', type: 'date',
      admin: { description: 'When the relationship ends — empty = open.' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Terminated', value: 'terminated' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('carriers')],
  },
  timestamps: true,
}

export default Carriers
