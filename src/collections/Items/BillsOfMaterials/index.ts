/**
 * Bills of Materials (BOM) — components + quantities per finished good.
 *
 * Slice UUU (2026-05-10): added because prior audits were
 * registry-limited (only checked what was declared in
 * `SEED_VALIDATION_REGISTRY`); a first-principles standards walk
 * caught manufacturing as a structural gap. Every ERP that books
 * inventory at full absorbed cost per IAS-2 §10 needs a BOM —
 * without it, the GL hook has no way to compute "cost of
 * conversion" (direct labour + variable + fixed overhead) per BOM
 * line, only "cost of purchase" per receipt line.
 *
 * Pairs with `work-orders` (production execution) and
 * `cost-variances` (IAS-2 §21 standard-cost variances on issue).
 *
 * @standard ISO-8601-1:2019 date-time effective-from / to
 * @standard ISA-95:2013 enterprise-control-system-integration §B.4
 * @standard ISO 22400:2014 manufacturing-operations-management KPIs
 * @accounting IFRS IAS-2 §10 §13 cost-of-conversion
 * @accounting IFRS IAS-2 §13 systematic-allocation-of-fixed-overheads
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail bom-version-control
 * @compliance SOX §404 internal-controls bom-engineering-change-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkOrders.ts
 * @see ./CostVariances.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { tenantAdminWriteAccess } from '../../../access/auth'
import { statusField, notesField, auditFields, referenceField, unitOfMeasureField } from '../../../fields/base-accounting-fields'

const BillsOfMaterials: CollectionConfig = {
  slug: 'bills-of-materials',
  labels: { singular: 'Bill of Materials', plural: 'Bills of Materials' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'finishedGood', 'version', 'effectiveFrom', 'status'],
    description:
      'IAS-2 §10 cost-of-conversion components per finished good. Versioned per ECO; only one row per (finishedGood × version) is `active` at a time.',
  },
  access: tenantAdminWriteAccess(), // Slice VVV: gated by feature 'manufacturing' (see featureGuard wiring TBA)
  fields: [
    referenceField({ description: 'BOM reference (e.g. `BOM-WIDGET-001-v3`).' }),
    { name: 'finishedGood', type: 'relationship', relationTo: 'items', required: true, index: true,
      admin: { description: 'The finished-good item this BOM produces.' } },
    { name: 'version', type: 'text', required: true,
      admin: { description: 'Version label (e.g. `v3`, `2026-Q1`). Bumped per ECO.' } },
    { name: 'effectiveFrom', type: 'date', required: true,
      admin: { description: 'ISO 8601 — first date this BOM version applies to new work-orders.' } },
    { name: 'effectiveTo', type: 'date',
      admin: { description: 'ISO 8601 — last date this BOM is active. Empty = open-ended.' } },
    { name: 'producedQuantity', type: 'number', defaultValue: 1, min: 1,
      admin: { description: 'Output quantity per BOM run (e.g. 1 widget per BOM, or 100 in batch process).' } },
    {
      name: 'components',
      type: 'array',
      required: true,
      labels: { singular: 'Component', plural: 'Components' },
      admin: { description: 'Per-component quantity required to produce `producedQuantity` of finished good.' },
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items', required: true,
          admin: { description: 'Component item (raw material / sub-assembly).' } },
        { name: 'quantity', type: 'number', required: true, min: 0,
          admin: { description: 'Quantity consumed per BOM run.' } },
        unitOfMeasureField({ description: 'UN/CEFACT Rec 20 unit (e.g. `KGM`, `H87`, `LTR`).' }),
        { name: 'wasteAllowance', type: 'number', defaultValue: 0,
          admin: { description: 'Expected scrap percentage (0-100).' } },
        { name: 'isOptional', type: 'checkbox', defaultValue: false,
          admin: { description: 'Substitutable component.' } },
      ],
    },
    {
      name: 'operations',
      type: 'array',
      labels: { singular: 'Operation', plural: 'Operations' },
      admin: { description: 'Routing — sequence of work-center operations that absorb conversion cost (IAS-2 §13).' },
      fields: [
        { name: 'sequence', type: 'number', required: true,
          admin: { description: 'Order in routing (10, 20, 30 — leave gaps for inserts).' } },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'workCenter', type: 'relationship', relationTo: 'work-centers',
          admin: { description: 'Work-center performing this standard operation (relational — the capacity unit).' } },
        { name: 'standardLabourMinutes', type: 'number', defaultValue: 0,
          admin: { description: 'Standard labour-minutes per BOM run — drives direct-labour absorption.' } },
        { name: 'standardMachineMinutes', type: 'number', defaultValue: 0,
          admin: { description: 'Standard machine-minutes per BOM run — drives overhead absorption.' } },
      ],
    },
    { name: 'engineeringChangeOrder', type: 'text',
      admin: { description: 'ECO reference that triggered this version (audit trail for SOX §404 BOM-control).' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Superseded', value: 'superseded' },
        { label: 'Obsolete', value: 'obsolete' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('bills-of-materials'),
  timestamps: true,
}

export default BillsOfMaterials
