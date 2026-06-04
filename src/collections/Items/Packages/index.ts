/**
 * Packages — logistic handling units (pallet / carton / case …) with SSCC.
 *
 * Fills the etrima `packs` / `pack_types` / `pack_items` / `packing_lists`
 * gap: the handling-unit layer between line items and a `shipments` record.
 * One self-referential collection models the whole packing hierarchy —
 * a pallet (`parentPackage`) containing cartons containing item/lot lines.
 * `pack_types` collapse to the `type` discriminator; a `packing_list` is
 * simply the set of packages on one `shipment`.
 *
 * @standard GS1 General Specifications AI(00) SSCC serial-shipping-container-code
 * @standard ISO/IEC 15459-1:2014 unique-identification transport-units
 * @standard GS1 Logistic Label
 * @standard ISO-8601-1:2019 date-time
 * @standard UN/CEFACT Recommendation 21 packaging-codes
 * @audit ISO-19011:2018 audit-trail packing-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Shipments.ts
 * @see ./Batches.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import {
  statusField,
  notesField,
  auditFields,
  referenceField,
  measureFields,
  unitOfMeasureField,
} from '@/fields/base-accounting-fields'

const Packages: CollectionConfig = {
  slug: 'packages',
  labels: { singular: 'Package', plural: 'Packages' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'sscc', 'type', 'shipment', 'status'],
    description:
      'Logistic handling unit (GS1 SSCC). Self-referential nesting (pallet → carton → contents). The packing list is the set of packages on a shipment.',
  },
  access: accountingCollectionAccess({ feature: 'logistics' }),
  fields: [
    referenceField({ description: 'Package reference / handling-unit id.' }),
    { name: 'sscc', type: 'text', index: true,
      admin: { description: 'GS1 AI(00) Serial Shipping Container Code (18 digits) — globally unique transport-unit id.' } },
    { name: 'type', type: 'select', defaultValue: 'carton',
      options: [
        { label: 'Pallet', value: 'pallet' },
        { label: 'Carton / Box', value: 'carton' },
        { label: 'Case', value: 'case' },
        { label: 'Crate', value: 'crate' },
        { label: 'Container', value: 'container' },
        { label: 'Bag / Sack', value: 'bag' },
        { label: 'Roll', value: 'roll' },
        { label: 'Drum', value: 'drum' },
      ] },
    { name: 'parentPackage', type: 'relationship', relationTo: 'packages',
      admin: { description: 'Containing handling unit (e.g. the pallet a carton sits on). Self-referential nesting.' } },
    { name: 'shipment', type: 'relationship', relationTo: 'shipments', index: true,
      admin: { description: 'Shipment this package belongs to. The packing list = all packages on a shipment.' } },
    {
      name: 'contents',
      type: 'array',
      label: 'Contents',
      admin: { description: 'Item/lot lines packed in this unit (etrima pack_items).' },
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items', required: true },
        { name: 'batch', type: 'relationship', relationTo: 'batches',
          admin: { description: 'Lot/batch of the packed quantity — keeps traceability through packing.' } },
        ...measureFields({ required: true }),
      ],
    },
    {
      name: 'measurements',
      type: 'group',
      label: 'Weight & dimensions',
      fields: [
        { name: 'grossWeight', type: 'number', min: 0, admin: { description: 'Gross weight incl. packaging.' } },
        { name: 'netWeight', type: 'number', min: 0, admin: { description: 'Net weight of contents.' } },
        unitOfMeasureField({ name: 'weightUnitOfMeasure', defaultValue: 'KGM', description: 'UN/CEFACT Rec 20 mass unit (KGM/GRM/LBR).' }),
        { name: 'length', type: 'number', min: 0 },
        { name: 'width', type: 'number', min: 0 },
        { name: 'height', type: 'number', min: 0 },
        unitOfMeasureField({ name: 'dimensionUnitOfMeasure', defaultValue: 'CMT', description: 'UN/CEFACT Rec 20 length unit (CMT/MTR/INH).' }),
      ],
    },
    { name: 'warehouseLocation', type: 'relationship', relationTo: 'warehouse-locations',
      admin: { description: 'Staging / storage location of the package.' } },
    statusField(
      [
        { label: 'Packing', value: 'packing' },
        { label: 'Sealed', value: 'sealed' },
        { label: 'Staged', value: 'staged' },
        { label: 'Loaded', value: 'loaded' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Returned', value: 'returned' },
      ],
      'packing',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('packages'),
  timestamps: true,
}

export default Packages
