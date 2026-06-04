/**
 * Consignment Arrangements — IFRS-15 §B77-B78 / ASC 606-10-55-79 master.
 *
 * Slice ZZZZ (2026-05-10): a consignment arrangement is when entity A
 * (consignor / tenant) ships goods to entity B (consignee) for storage
 * + onward sale, but **control does not transfer until the consignee
 * sells to an end-customer**. Per IFRS-15 §B78 the consignor recognises
 * inventory at the consignee's location AND keeps revenue deferred
 * until the §B77 indicators (control passed, no return-right, etc.)
 * resolve.
 *
 * Pairs with `consignment-inventory` (per-SKU running balance at the
 * consignee's location) + `consignment-sales` (sale events that trigger
 * IFRS-15 §38 point-in-time revenue recognition).
 *
 * @standard EN-16931:2017 §BG-15 deliver-to-information
 * @standard INCOTERMS 2020 (CPT / CIP / DDP control-transfer points)
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 §B77-B78 consignment-arrangements
 * @accounting IFRS IFRS-15 §38 point-in-time-control-transfer
 * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
 * @accounting US-GAAP ASC-606-10-55-80 consignment-control
 * @accounting IFRS IAS-2 §6 inventory-held-at-other-location
 * @audit ISO-19011:2018 audit-trail consignment-arrangement-evidence
 * @compliance SOX §404 internal-controls revenue-deferral TOM-AR-04
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./ConsignmentInventory.ts
 * @see ./ConsignmentSales.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/base-accounting-fields'

const ConsignmentArrangements: CollectionConfig = {
  slug: 'consignment-arrangements',
  labels: { singular: 'Consignment Arrangement', plural: 'Consignment Arrangements' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'consignee', 'effectiveFrom', 'maxValue', 'status'],
    description:
      'IFRS-15 §B77-B78 consignment master agreement. Pairs with consignment-inventory (running balance at consignee) + consignment-sales (sale events triggering revenue recognition).',
  },
  access: accountingCollectionAccess({ feature: 'consignment_inventory' }),
  fields: [
    referenceField({ description: 'Sequential arrangement reference (e.g. `CONS-2026-001`).' }),
    { name: 'consignee', type: 'relationship', relationTo: 'addresses', required: true, index: true,
      admin: { description: 'Counterparty holding the consigned goods on our behalf (distributor, retailer, 3PL).' } },
    { name: 'consigneeName', type: 'text',
      admin: { description: 'Denormalised name for fast filter / list display.' } },
    { name: 'consigneeWarehouseLocation', type: 'relationship', relationTo: 'warehouse-locations',
      admin: { description: 'Optional FK if the consignee location is also tracked in `warehouse-locations` (type=`consignment`).' } },
    { name: 'effectiveFrom', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — start of the arrangement.' } },
    { name: 'effectiveTo', type: 'date',
      admin: { description: 'Optional end date; null = open-ended until terminated.' } },
    {
      name: 'controlTransferTrigger',
      type: 'select',
      required: true,
      defaultValue: 'consignee_sale',
      options: [
        { label: 'Sale by consignee to end-customer (most common — IFRS-15 §B78)', value: 'consignee_sale' },
        { label: 'Acceptance by consignee after trial period', value: 'consignee_acceptance' },
        { label: 'Time-out (deemed sale after N days unsold)', value: 'time_out' },
        { label: 'Manual recognition (operator confirms control passed)', value: 'manual' },
      ],
      admin: { description: 'IFRS-15 §B77 — what event resolves the §B77 indicators and transfers control.' },
    },
    { name: 'timeOutDays', type: 'number',
      admin: { description: 'Required when controlTransferTrigger = `time_out`. Days after which unsold inventory is deemed sold to consignee.' } },
    {
      name: 'returnRights',
      type: 'select',
      required: true,
      defaultValue: 'unrestricted',
      options: [
        { label: 'Unrestricted return (consignee can send back any unsold)', value: 'unrestricted' },
        { label: 'Returns within window (e.g. 90-day return window)', value: 'window' },
        { label: 'No returns (sale is final on consignee acceptance)', value: 'none' },
      ],
      admin: { description: 'IFRS-15 §B77(c) — return-right is a primary indicator of consignment vs sale.' },
    },
    { name: 'returnWindowDays', type: 'number',
      admin: { description: 'Days the consignee can return unsold inventory; required when returnRights = `window`.' } },
    currencyField(),
    { name: 'maxValue', type: 'number',
      admin: { description: 'Maximum on-hand value the consignee is approved to hold (cents). Used to gate ship-to-consignee.' } },
    { name: 'commissionRatePercent', type: 'number', min: 0, max: 100,
      admin: { description: 'Commission % the consignee earns on sale (0-100). Net revenue = sale price × (1 − rate).', step: 0.01 } },
    {
      name: 'incoterm',
      type: 'select',
      options: [
        { label: 'CPT — Carriage Paid To', value: 'CPT' },
        { label: 'CIP — Carriage and Insurance Paid To', value: 'CIP' },
        { label: 'DAP — Delivered at Place', value: 'DAP' },
        { label: 'DPU — Delivered at Place Unloaded', value: 'DPU' },
        { label: 'DDP — Delivered Duty Paid', value: 'DDP' },
        { label: 'EXW — Ex Works', value: 'EXW' },
        { label: 'FCA — Free Carrier', value: 'FCA' },
        { label: 'Other', value: 'OTHER' },
      ],
      admin: { description: 'INCOTERMS 2020 — note: physical-delivery incoterm DOES NOT transfer accounting control under consignment (IFRS-15 §B78).' },
    },
    { name: 'contract', type: 'relationship', relationTo: 'contracts',
      admin: { description: 'Optional FK to the IFRS-15 master contract that governs this arrangement.' } },
    { name: 'evidenceAttestation', type: 'relationship', relationTo: 'evidence-attestations',
      admin: { description: 'Signed PDF agreement (eIDAS PAdES) — auditor walk-through anchor.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Suspended (no new shipments)', value: 'suspended' },
        { label: 'Terminated (final settlement)', value: 'terminated' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('consignment-arrangements'),
  timestamps: true,
}

export default ConsignmentArrangements
