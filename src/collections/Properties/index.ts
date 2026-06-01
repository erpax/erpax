/**
 * Properties — real-estate property master per ISO 41001 / ISO 55000.
 *
 * Slice ZZZZ (2026-05-10): the IWMS entry point. Each row is one
 * physical property (building / site / land parcel) the tenant owns or
 * leases. Pairs with `spaces` (sub-property zones), `fixed-assets`
 * (capitalised owned property), `leases` (IFRS-16 leased property),
 * and `maintenance-work-orders` (CMMS work against the property).
 *
 * @standard ISO-41001:2018 facility-management-management-systems
 * @standard ISO-41011:2017 facility-management-vocabulary
 * @standard ISO-41013:2017 facility-management-scope
 * @standard ISO-55000:2014 asset-management property-as-asset
 * @standard ISO-19650-1:2018 information-management-using-bim
 * @standard ISO-3166-1:2020 country-codes property-country
 * @standard ISO-3166-2:2020 subdivision-codes property-region
 * @standard NACE-Rev.2 economic-activity-of-occupants
 * @standard EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)
 * @accounting IFRS IAS-16 property-plant-and-equipment owned-property
 * @accounting IFRS IFRS-16 §22 right-of-use-asset leased-property
 * @accounting US-GAAP ASC-360 property-plant-and-equipment
 * @audit ISO-19011:2018 audit-trail property-master-changes
 * @compliance SOX §404 internal-controls real-estate-portfolio
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Spaces.ts
 * @see ./MaintenanceWorkOrders.ts
 * @see ./FixedAssets.ts
 * @see ./Leases.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { currencyField, statusField, notesField, auditFields } from '../../fields/base-accounting-fields'

const Properties: CollectionConfig = {
  slug: 'properties',
  labels: { singular: 'Property', plural: 'Properties' },
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'name', 'kind', 'tenure', 'country', 'grossInternalArea', 'status'],
    description:
      'IWMS property master per ISO 41001 §3.1.7 facility. Owned/leased/managed real estate. Pairs with spaces (sub-units) + maintenance-work-orders.',
  },
  access: accountingCollectionAccess({ feature: 'facility_management' }),
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Short code (e.g. `HQ-SOF`, `WHS-BER-01`).' } },
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'office',
      options: [
        { label: 'Office (commercial)', value: 'office' },
        { label: 'Warehouse / Distribution', value: 'warehouse' },
        { label: 'Manufacturing Plant', value: 'plant' },
        { label: 'Retail (storefront)', value: 'retail' },
        { label: 'Hotel / Hospitality', value: 'hospitality' },
        { label: 'Healthcare Facility', value: 'healthcare' },
        { label: 'Educational Facility', value: 'education' },
        { label: 'Mixed-use', value: 'mixed' },
        { label: 'Land (undeveloped / parcel)', value: 'land' },
        { label: 'Data Centre', value: 'data_centre' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'tenure',
      type: 'select',
      required: true,
      defaultValue: 'owned',
      options: [
        { label: 'Owned (freehold)', value: 'owned' },
        { label: 'Leased (IFRS-16 ROU asset)', value: 'leased' },
        { label: 'Managed (3rd-party property under management)', value: 'managed' },
        { label: 'Sub-let to tenant', value: 'sublet' },
      ],
      admin: { description: 'Drives IAS-16 vs IFRS-16 vs management-revenue accounting.' },
    },
    { name: 'address', type: 'relationship', relationTo: 'addresses', required: true, index: true },
    { name: 'country', type: 'text', required: true,
      admin: { description: 'ISO 3166-1 alpha-2.' } },
    { name: 'region', type: 'text',
      admin: { description: 'ISO 3166-2 subdivision code.' } },
    {
      name: 'measurements',
      type: 'group',
      label: 'Measurements (per IPMS)',
      admin: { description: 'International Property Measurement Standard areas (sqm).' },
      fields: [
        { name: 'grossInternalArea', type: 'number', min: 0,
          admin: { description: 'IPMS 1 — total internal area (m²).' } },
        { name: 'netInternalArea', type: 'number', min: 0,
          admin: { description: 'IPMS 3 — usable / lettable area (m²).' } },
        { name: 'siteArea', type: 'number', min: 0,
          admin: { description: 'Land parcel area (m²).' } },
        { name: 'numberOfFloors', type: 'number', min: 0 },
        { name: 'numberOfUnits', type: 'number', min: 0,
          admin: { description: 'For multi-let: number of distinct units.' } },
      ],
    },
    {
      name: 'occupancy',
      type: 'group',
      label: 'Occupancy',
      fields: [
        { name: 'designedCapacity', type: 'number', min: 0,
          admin: { description: 'Designed person capacity (per fire / building code).' } },
        { name: 'currentHeadcount', type: 'number', min: 0,
          admin: { description: 'Current occupants (drives space-utilisation KPIs).' } },
        { name: 'naceCode', type: 'text',
          admin: { description: 'NACE Rev.2 economic activity of primary occupant.' } },
      ],
    },
    {
      name: 'lifecycle',
      type: 'group',
      label: 'Lifecycle',
      fields: [
        { name: 'acquiredAt', type: 'date',
          admin: { description: 'Date acquired (purchase / lease commence).' } },
        { name: 'commissionedAt', type: 'date',
          admin: { description: 'Date placed in service.' } },
        { name: 'plannedDisposalAt', type: 'date',
          admin: { description: 'Planned end-of-use / sale.' } },
        { name: 'disposedAt', type: 'date',
          admin: { description: 'Actual disposal date.' } },
      ],
    },
    currencyField(),
    { name: 'bookValue', type: 'number',
      admin: { description: 'Carrying amount (cents) — for owned: cost − accumulated depreciation; for leased: ROU asset.' } },
    { name: 'fixedAsset', type: 'relationship', relationTo: 'fixed-assets',
      admin: { description: 'For owned property: the IAS-16 row that capitalises this property.' } },
    { name: 'lease', type: 'relationship', relationTo: 'leases',
      admin: { description: 'For leased property: the IFRS-16 lease record.' } },
    {
      name: 'energyCertificate',
      type: 'group',
      label: 'Energy / Sustainability (EU EPBD + ESRS-E1)',
      fields: [
        {
          name: 'epcRating',
          type: 'select',
          options: [
            { label: 'A+', value: 'A+' }, { label: 'A', value: 'A' },
            { label: 'B', value: 'B' }, { label: 'C', value: 'C' },
            { label: 'D', value: 'D' }, { label: 'E', value: 'E' },
            { label: 'F', value: 'F' }, { label: 'G', value: 'G' },
          ],
          admin: { description: 'EU EPBD energy-performance certificate band.' },
        },
        { name: 'epcExpiresAt', type: 'date' },
        { name: 'kwhPerSqmYear', type: 'number',
          admin: { description: 'Primary energy intensity (kWh/m²·yr) — feeds ESRS-E1 disclosures.' } },
      ],
    },
    { name: 'bimReference', type: 'text',
      admin: { description: 'ISO 19650 BIM model identifier (URL / CDE reference).' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Under Construction', value: 'construction' },
        { label: 'Vacant', value: 'vacant' },
        { label: 'Decommissioned', value: 'decommissioned' },
        { label: 'Disposed', value: 'disposed' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('properties'),
  timestamps: true,
}

export default Properties
