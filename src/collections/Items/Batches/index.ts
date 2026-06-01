/**
 * Batches — lot / batch traceability with genealogy (one-up / one-down).
 *
 * Fills the etrima `lots` / `lot_variants` gap: a first-class, traceable
 * identity for a quantity of material or product that flows through
 * inventory and production. Distinct from `production-receipts` (an event
 * that *creates* a lot) — a batch is the durable, recallable record. The
 * free-text `lotNumber` on `production-receipts` / `goods-receipts` is the
 * pointer; THIS is the entity it points to.
 *
 * Genealogy: `parentBatches` (self-referential) encodes one-step-back
 * traceability; the inverse one-step-forward is the set of batches that
 * name this one as a parent — the EU 178/2002 Art 18 obligation.
 *
 * @standard ISO 9001:2015 §8.5.2 identification-and-traceability
 * @standard ISO 22005:2007 feed-and-food-chain-traceability
 * @standard GS1 General Specifications AI(10) batch/lot AI(17) expiry AI(11) production-date
 * @standard EU Regulation 178/2002 Art 18 one-step-back-one-step-forward
 * @standard FDA 21 CFR 211.122 211.130 pharma-lot-control
 * @standard IATF 16949:2016 §8.5.2.1 automotive-traceability
 * @standard ISO-8601-1:2019 date-time manufacture-expiry-dates
 * @accounting IFRS IAS-2 §23-§27 cost-formula-specific-identification
 * @audit ISO-19011:2018 audit-trail lot-genealogy-evidence
 * @compliance SOX §404 internal-controls traceability-control TOM-TRACE-01
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./ProductionReceipts.ts
 * @see ./GoodsReceipts.ts
 * @see ./QualityInspections.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../../access/auth'
import {
  currencyField,
  measureFields,
  statusField,
  notesField,
  auditFields,
  referenceField,
  countryCodeField,
} from '../../../fields/base-accounting-fields'

const Batches: CollectionConfig = {
  slug: 'batches',
  labels: { singular: 'Batch / Lot', plural: 'Batches / Lots' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'item', 'quantity', 'status', 'expiryDate'],
    description:
      'Traceable lot/batch identity (ISO 9001 §8.5.2, ISO 22005, EU 178/2002 Art 18). Carries quality status, expiry and one-step-back genealogy for recall.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Lot/batch number — GS1 AI(10). Tenant-unique human key.' }),
    { name: 'item', type: 'relationship', relationTo: 'items', required: true, index: true,
      admin: { description: 'Item this lot is a quantity of.' } },
    ...measureFields({ required: true, description: 'Original lot quantity in `unitOfMeasure`.' }),
    { name: 'remainingQuantity', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Quantity still on hand (quantity − consumed), in the same `unitOfMeasure`. Maintained by inventory movements.' } },
    statusField(
      [
        { label: 'Quarantine (awaiting QC)', value: 'quarantine' },
        { label: 'Released (available)', value: 'released' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Rejected (NCR)', value: 'rejected' },
        { label: 'Consumed', value: 'consumed' },
        { label: 'Expired', value: 'expired' },
        { label: 'Recalled', value: 'recalled' },
      ],
      'quarantine',
    ),
    { name: 'manufactureDate', type: 'date', index: true,
      admin: { description: 'ISO 8601 — GS1 AI(11) production date.' } },
    { name: 'expiryDate', type: 'date', index: true,
      admin: { description: 'ISO 8601 — GS1 AI(17) expiry / best-before. Drives FEFO picking + expiry sweeps.' } },
    { name: 'receivedDate', type: 'date',
      admin: { description: 'ISO 8601 — when the lot entered this tenant (receipt or production completion).' } },
    countryCodeField({ name: 'countryOfOrigin', description: 'ISO 3166-1 alpha-2 country of origin (customs + food labelling).' }),
    // ── Source (what created this lot) ─────────────────────────────
    { name: 'origin', type: 'select', defaultValue: 'produced',
      options: [
        { label: 'Produced (internal manufacturing)', value: 'produced' },
        { label: 'Purchased (vendor goods receipt)', value: 'purchased' },
        { label: 'Opening balance / migration', value: 'opening' },
        { label: 'Repackaged / split', value: 'repackaged' },
      ] },
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders',
      admin: { description: 'Producing work-order (when origin = produced).' } },
    { name: 'goodsReceipt', type: 'relationship', relationTo: 'goods-receipts',
      admin: { description: 'Goods receipt (when origin = purchased).' } },
    { name: 'supplier', type: 'relationship', relationTo: 'vendors',
      admin: { description: 'Supplier of the lot (purchased origin).' } },
    { name: 'supplierBatchRef', type: 'text',
      admin: { description: "Supplier's own lot/batch number — preserves their traceability chain." } },
    { name: 'warehouseLocation', type: 'relationship', relationTo: 'warehouse-locations',
      admin: { description: 'Current storage location.' } },
    // ── Genealogy (one-step-back; forward = inverse query) ─────────
    { name: 'parentBatches', type: 'relationship', relationTo: 'batches', hasMany: true,
      admin: { description: 'Source lots consumed to make this one — EU 178/2002 Art 18 one-step-back. Forward trace = batches naming this as a parent.' } },
    { name: 'qualityInspection', type: 'relationship', relationTo: 'quality-inspections',
      admin: { description: 'QC inspection that released or rejected this lot.' } },
    // ── Valuation (IAS-2 specific identification) ──────────────────
    currencyField(),
    { name: 'unitCost', type: 'number', defaultValue: 0,
      admin: { description: 'Per-unit carrying cost (IAS-2 §23 specific identification). In cents.' } },
    // ── Recall ─────────────────────────────────────────────────────
    {
      name: 'recall',
      type: 'group',
      label: 'Recall (EU 178/2002 Art 19)',
      fields: [
        { name: 'recalled', type: 'checkbox', defaultValue: false },
        { name: 'recallReference', type: 'text' },
        { name: 'recallDate', type: 'date' },
        { name: 'recallReason', type: 'textarea' },
      ],
    },
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('batches'),
  timestamps: true,
}

export default Batches
