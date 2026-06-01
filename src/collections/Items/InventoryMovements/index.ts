/**
 * Inventory Movements — every quantity change with source/destination.
 *
 * Append-only stock-ledger required by IAS 2 §10/§36 (cost-flow assumption)
 * and ASC 330-10-30 (inventory valuation). Each movement either increases or
 * decreases on-hand at a `WarehouseLocation`; balanced movements (transfer)
 * use both `fromLocation` and `toLocation`. The GL hook posts to the COGS or
 * inventory-variance account when `kind` is `sale` / `consumption` /
 * `adjustment`.
 *
 * @standard ISO-8601-1:2019 date-time movement-at posted-at
 * @standard ISO-3166-1:2020 country-codes via location
 * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
 * @accounting US-GAAP ASC-330 inventory cost-flow
 * @accounting US-GAAP ASC-606 cogs-recognition
 * @audit ISO-19011:2018 audit-trail stock-ledger
 * @compliance SOX §404 internal-controls inventory-cycle-count
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../../../hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '../../../hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '../../../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../../access/auth'
import { validateNotLocked } from '../../../services/accounting/utilities/period-lock'
import { currencyField, statusField, notesField, auditFields } from '../../../fields/base-accounting-fields'
import { inventoryMovementPostingHook } from '../../../hooks/collections/accounting/inventory-movement.hook'

const InventoryMovements: CollectionConfig = {
  slug: 'inventory-movements',
  labels: { singular: 'Inventory Movement', plural: 'Inventory Movements' },
  admin: {
    useAsTitle: 'movementId',
    defaultColumns: ['movementId', 'kind', 'item', 'quantity', 'fromLocation', 'toLocation', 'movementAt', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    { name: 'movementId', type: 'text', required: true, unique: true, index: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Receipt (PO / GRN)', value: 'receipt' },
        { label: 'Sale / Issue', value: 'sale' },
        { label: 'Consumption (production)', value: 'consumption' },
        { label: 'Transfer', value: 'transfer' },
        { label: 'Return Inbound (RMA)', value: 'return_in' },
        { label: 'Return Outbound (to vendor)', value: 'return_out' },
        { label: 'Adjustment (cycle count)', value: 'adjustment' },
        { label: 'Write-off / Scrap', value: 'write_off' },
        { label: 'Opening Balance', value: 'opening' },
      ],
    },
    { name: 'item', type: 'relationship', relationTo: 'items', required: true, index: true },
    { name: 'lotOrSerial', type: 'text', admin: { description: 'Lot / serial number for traceability.' } },
    { name: 'quantity', type: 'number', required: true, admin: { description: 'Positive = inbound to toLocation; negative = outbound from fromLocation.' } },
    { name: 'unitCost', type: 'number', defaultValue: 0, admin: { description: 'In cents — used for cost-flow & GL valuation.' } },
    { name: 'extendedCost', type: 'number', defaultValue: 0, admin: { readOnly: true, description: 'quantity × unitCost; auto-computed.' } },
    // Slice QQQ: explicit cost-formula election per IAS-2 §25 / ASC 330-10-30.
    // Without this, the GL handler defaulted to weighted-average implicitly,
    // which is non-conformant for tenants electing FIFO or specific
    // identification (often a tax / disclosure choice).
    //
    // @accounting IFRS IAS-2 §25 cost-formulas
    // @accounting US-GAAP ASC-330-10-30 inventory-valuation
    {
      name: 'valuationMethod',
      type: 'select',
      required: true,
      defaultValue: 'weighted_average',
      options: [
        { label: 'FIFO (First-In First-Out)', value: 'fifo' },
        { label: 'Weighted Average Cost', value: 'weighted_average' },
        { label: 'Specific Identification', value: 'specific_identification' },
      ],
      admin: {
        description:
          'IAS-2 §25 / ASC 330-10-30 cost formula election. Drives how the GL handler picks unitCost when the source-doc cost basis differs from the on-hand average.',
      },
    },
    currencyField(),
    { name: 'fromLocation', type: 'relationship', relationTo: 'warehouse-locations' },
    { name: 'toLocation', type: 'relationship', relationTo: 'warehouse-locations' },
    { name: 'movementAt', type: 'date', required: true, index: true },
    {
      name: 'sourceDocumentType',
      type: 'select',
      options: [
        { label: 'Goods Receipt', value: 'goods_receipt' },
        { label: 'Shipment', value: 'shipment' },
        { label: 'Return / RMA', value: 'return' },
        { label: 'Order', value: 'order' },
        { label: 'Period-End Adjustment', value: 'adjustment' },
        { label: 'Manual', value: 'manual' },
      ],
    },
    { name: 'sourceDocumentId', type: 'text', admin: { description: 'Free-form id of the originating document for traceability.' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'draft',
    ),
    { name: 'postedAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      autoSetTimestamp('postedAt', (d) => (d as { status?: string }).status === 'posted'),
    ],
    afterChange: [
      // Emit inventory:adjusted on status → 'posted' for kinds without
      // an upstream source-doc GL path (transfer / adjustment / write_off
      // / consumption). Receipts + sales already covered by
      // bill:activated / invoice:activated event paths.
      inventoryMovementPostingHook,
      auditTrailAfterChange('inventory-movements'),
    ],
  },
  timestamps: true,
}

export default InventoryMovements
