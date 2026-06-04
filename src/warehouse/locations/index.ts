/**
 * Warehouse Locations — physical / logical stock locations.
 *
 * Master data referenced by InventoryMovements and Shipments. Per IAS 2 and
 * ASC 330, inventory must be tracked at the location level for cost-flow,
 * count-variance, and SOX §404 segregation purposes. ISO 6346 supports
 * container/shipping-unit identifiers for bonded / cross-dock cases.
 *
 * @standard ISO-3166-1:2020 country-codes location-country
 * @standard ISO-3166-2:2020 subdivision-codes location-region
 * @standard ISO-6346:2022 freight-container-coding-and-marking
 * @standard EN-16931:2017 §BG-15 deliver-to-information
 * @accounting IFRS IAS-2 inventories location-tracked
 * @accounting US-GAAP ASC-330 inventory location-tracked
 * @audit ISO-19011:2018 audit-trail location-master-changes
 * @compliance SOX §404 internal-controls inventory-segregation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { statusField, notesField, auditFields } from '@/base/accounting/field'

const WarehouseLocations: CollectionConfig = {
  slug: 'warehouse-locations',
  labels: { singular: 'Warehouse / Location', plural: 'Warehouse Locations' },
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'name', 'type', 'country', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true, admin: { description: 'Short code, e.g. SOF-MAIN, NYC-3PL.' } },
    { name: 'name', type: 'text', localized: true, required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'warehouse',
      options: [
        { label: 'Warehouse (own)', value: 'warehouse' },
        { label: '3PL Warehouse', value: '3pl' },
        { label: 'Retail Store', value: 'retail' },
        { label: 'Consignment', value: 'consignment' },
        { label: 'In Transit', value: 'transit' },
        { label: 'Quarantine / QC', value: 'quarantine' },
        { label: 'Returns / RMA', value: 'returns' },
        { label: 'Bonded / Customs', value: 'bonded' },
        { label: 'Virtual / Drop-ship', value: 'virtual' },
      ],
    },
    { name: 'address', type: 'relationship', relationTo: 'addresses' },
    { name: 'country', type: 'text', admin: { description: 'ISO 3166-1 alpha-2.' } },
    { name: 'region', type: 'text', admin: { description: 'ISO 3166-2 subdivision code.' } },
    { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts', admin: { description: 'Default inventory GL account for stock at this location.' } },
    {
      name: 'bins',
      type: 'array',
      admin: { description: 'Optional bin/aisle/shelf detail for cycle-count granularity.' },
      fields: [
        { name: 'binCode', type: 'text', required: true },
        { name: 'description', type: 'text', localized: true },
      ],
    },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Closed', value: 'closed' },
      ],
      'active',
    ),
    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('warehouse-locations'),
  timestamps: true,
}

export default WarehouseLocations
