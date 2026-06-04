/**
 * Consignment Sales — sale-by-consignee events that resolve the
 * IFRS-15 §B77 control-transfer indicators and trigger revenue
 * recognition + inventory derecognition.
 *
 * Slice ZZZZ (2026-05-10): each row is one reportable sale event from
 * the consignee. The afterChange hook (next slice) will:
 *   - decrement `consignment-inventory.quantityOnHand`
 *   - emit `inventory-movement` (kind: `sale_from_consignee`)
 *   - emit `consignment:sold` so glPostingService books:
 *       Dr Cash / AR        net-sale-amount
 *       Dr Commission Expense  commission-amount
 *       Cr Revenue           gross-sale-amount
 *       Cr Inventory at Consignee   carrying-cost
 *       Dr COGS                     carrying-cost
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time sale-date
 * @accounting IFRS IFRS-15 §31 satisfaction-of-performance-obligation
 * @accounting IFRS IFRS-15 §38 point-in-time-control-transfer
 * @accounting IFRS IFRS-15 §B77-B78 consignment-control
 * @accounting IFRS IAS-2 §34 cost-of-inventories-recognised-as-expense
 * @accounting US-GAAP ASC-606-10-25-30 control-passing
 * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
 * @audit ISO-19011:2018 audit-trail consignment-sale-evidence
 * @compliance SOX §404 internal-controls revenue-completeness TOM-AR-04
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./ConsignmentArrangements.ts
 * @see ./ConsignmentInventory.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields, referenceField, unitOfMeasureField } from '@/base/accounting/field'

const ConsignmentSales: CollectionConfig = {
  slug: 'consignment-sales',
  labels: { singular: 'Consignment Sale', plural: 'Consignment Sales' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'arrangement', 'saleDate', 'quantitySold', 'grossAmount', 'status'],
    description:
      'Sale-by-consignee event. Per IFRS-15 §B78, this is the moment control transfers and revenue recognises.',
  },
  access: accountingCollectionAccess({ feature: 'consignment_inventory' }),
  fields: [
    referenceField({ description: 'Sale reference reported by the consignee (e.g. `CSALE-2026-04-001`).' }),
    { name: 'arrangement', type: 'relationship', relationTo: 'consignment-arrangements', required: true, index: true },
    { name: 'consignmentInventory', type: 'relationship', relationTo: 'consignment-inventory', required: true, index: true,
      admin: { description: 'Source inventory row this sale draws from.' } },
    { name: 'saleDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — date the consignee sold to the end-customer (this is the IFRS-15 §B78 control-transfer date).' } },
    { name: 'reportedDate', type: 'date',
      admin: { description: 'Date the consignee reported the sale to us (may lag saleDate).' } },
    { name: 'endCustomerRef', type: 'text',
      admin: { description: 'Reference / id of the end-customer the consignee sold to (free-text; consignee may anonymise).' } },
    { name: 'quantitySold', type: 'number', required: true, min: 0 },
    unitOfMeasureField(),
    { name: 'unitPrice', type: 'number', required: true, min: 0,
      admin: { description: 'Per-unit selling price (cents).' } },
    { name: 'grossAmount', type: 'number', required: true, min: 0,
      admin: { description: 'quantitySold × unitPrice (cents). The gross revenue line.' } },
    { name: 'commissionRatePercent', type: 'number', min: 0, max: 100, defaultValue: 0,
      admin: { description: 'Snapshot of arrangement.commissionRatePercent at sale time (rate-card change ≠ retroactive).', step: 0.01 } },
    { name: 'commissionAmount', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'grossAmount × commissionRatePercent / 100 (cents).' } },
    { name: 'netAmount', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'grossAmount − commissionAmount (cents). Hits AR/cash.' } },
    { name: 'cogsAmount', type: 'number', defaultValue: 0,
      admin: { description: 'IAS-2 §34 cost-of-sales — quantitySold × consignment-inventory.unitCost (cents).' } },
    currencyField(),
    { name: 'invoice', type: 'relationship', relationTo: 'invoices',
      admin: { description: 'Invoice the consignor raises against the consignee for the sale.' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE that booked the revenue + COGS + commission entries.' } },
    statusField(
      [
        { label: 'Reported (consignee report received)', value: 'reported' },
        { label: 'Validated', value: 'validated' },
        { label: 'Posted (GL booked)', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'reported',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('consignment-sales'),
  timestamps: true,
}

export default ConsignmentSales
