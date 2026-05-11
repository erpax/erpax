/**
 * Consignment Inventory — per-SKU on-hand running balance at consignee
 * locations. The asset side of the IFRS-15 §B77-B78 ledger.
 *
 * Slice ZZZZ (2026-05-10): every shipment to / sale from / return from a
 * consignee mutates this row's `quantityOnHand` + `valueOnHand`. The
 * consignor (tenant) keeps the rows on its **own** balance sheet under
 * IAS-2 §6 (inventory held at another location); the consignee never
 * recognises them.
 *
 * Pairs with `consignment-arrangements` (the master agreement) +
 * `consignment-sales` (the events that decrement on-hand) +
 * `inventory-movements` (the underlying double-entry stock movements).
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @accounting IFRS IAS-2 §6 inventories-held-at-other-location
 * @accounting IFRS IFRS-15 §B77-B78 consignment-arrangements
 * @accounting US-GAAP ASC-330 inventory-location-tracked
 * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
 * @audit ISO-19011:2018 audit-trail consignment-on-hand-evidence
 * @compliance SOX §404 internal-controls inventory-segregation TOM-INV-03
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./ConsignmentArrangements.ts
 * @see ./ConsignmentSales.ts
 * @see ./InventoryMovements.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const ConsignmentInventory: CollectionConfig = {
  slug: 'consignment-inventory',
  labels: { singular: 'Consignment Inventory', plural: 'Consignment Inventory' },
  admin: {
    useAsTitle: 'lineId',
    defaultColumns: ['lineId', 'arrangement', 'itemSku', 'quantityOnHand', 'valueOnHand', 'asOfDate', 'status'],
    description:
      'Per-SKU running balance of inventory held at a consignee location. Tenant retains balance-sheet ownership per IAS-2 §6 + IFRS-15 §B77-B78.',
  },
  access: accountingCollectionAccess({ feature: 'consignment_inventory' }),
  fields: [
    multiTenancyField(),
    { name: 'lineId', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Stable line id (e.g. `CINV-2026-04-001`).' } },
    { name: 'arrangement', type: 'relationship', relationTo: 'consignment-arrangements', required: true, index: true },
    { name: 'consigneeWarehouseLocation', type: 'relationship', relationTo: 'warehouse-locations',
      admin: { description: 'Specific consignee location for multi-location consignees.' } },
    { name: 'itemSku', type: 'text', required: true, index: true,
      admin: { description: 'Item SKU / material code. Free-text until an items collection lands.' } },
    { name: 'itemDescription', type: 'text' },
    { name: 'unitOfMeasure', type: 'text', defaultValue: 'EA',
      admin: { description: 'UN/CEFACT REC 20 unit-of-measure code (e.g. EA, KG, L).' } },
    { name: 'quantityOnHand', type: 'number', required: true, defaultValue: 0, min: 0,
      admin: { description: 'Current on-hand quantity at the consignee location.' } },
    { name: 'unitCost', type: 'number', defaultValue: 0,
      admin: { description: 'Per-unit cost (cents) — IAS-2 §10 cost-of-purchase. Drives valueOnHand.' } },
    { name: 'valueOnHand', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'quantityOnHand × unitCost (cents). Computed on each movement.' } },
    currencyField(),
    { name: 'asOfDate', type: 'date', required: true, index: true,
      admin: { description: 'When this row was last reconciled / counted.' } },
    { name: 'lastShipmentDate', type: 'date',
      admin: { description: 'Most recent ship-to-consignee event.' } },
    { name: 'lastSaleDate', type: 'date',
      admin: { description: 'Most recent sale-by-consignee event (decrements on-hand).' } },
    {
      name: 'valuationMethod',
      type: 'select',
      defaultValue: 'fifo',
      options: [
        { label: 'FIFO', value: 'fifo' },
        { label: 'Weighted Average', value: 'weighted_average' },
        { label: 'Specific Identification', value: 'specific_id' },
        { label: 'Standard Cost', value: 'standard' },
      ],
      admin: { description: 'IAS-2 §25 — must match the tenant\'s primary inventory valuation method.' },
    },
    { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts',
      admin: { description: 'Inventory GL account this consignment row maps to (typically a sub-account of 1300 — Inventory at Consignee).' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Frozen (cycle-count in progress)', value: 'frozen' },
        { label: 'Reconciled (zeroed)', value: 'reconciled' },
        { label: 'Written Off (per IAS-2 §28)', value: 'written_off' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('consignment-inventory')],
  },
  timestamps: true,
}

export default ConsignmentInventory
