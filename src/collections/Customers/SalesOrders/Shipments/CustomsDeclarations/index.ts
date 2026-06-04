/**
 * Customs Declarations — WCO HS-coded export/import declarations.
 *
 * Slice UUU (2026-05-10): added per first-principles ERP gap. Every
 * cross-border shipment needs a customs declaration with HS-coded
 * line items, valuation, and origin. The data lives nowhere
 * structured today; it's stuffed into shipment `notes`. EU exports
 * from BG (and other member states) need ECS / ICS submissions per
 * UCC; this collection is the structured source.
 *
 * @standard ISO-8601-1:2019 date-time declaration-date
 * @standard ISO-3166-1:2020 country-codes country-of-origin
 * @standard ISO-4217:2015 currency-codes valuation-currency
 * @standard WCO HS Convention harmonised-system
 * @standard EU UCC Regulation 952/2013 union-customs-code
 * @standard WCO Data Model 3.x customs-data-elements
 * @audit ISO-19011:2018 audit-trail customs-evidence
 * @compliance EU UCC §6 customs-declaration
 * @compliance OECD BEPS Action 13 transfer-pricing-documentation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Shipments.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, taxonomySelect, unitOfMeasureField } from '@/fields/base-accounting-fields'
import { INCOTERM_OPTIONS } from '@/standards/incoterms-2020'

const CustomsDeclarations: CollectionConfig = {
  slug: 'customs-declarations',
  labels: { singular: 'Customs Declaration', plural: 'Customs Declarations' },
  admin: {
    useAsTitle: 'mrn',
    defaultColumns: ['mrn', 'declarationType', 'shipment', 'declarationDate', 'totalValue', 'status'],
    description:
      'WCO HS-coded customs declaration per cross-border shipment. EU UCC export (ECS) / import (ICS) submission source.',
  },
  access: accountingCollectionAccess({ feature: 'logistics' }),
  fields: [
    { name: 'mrn', type: 'text', required: false, unique: true, index: true,
      admin: { description: 'Movement Reference Number (UCC). Issued by customs after acceptance.' } },
    {
      name: 'declarationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Export (UCC EX-A)', value: 'export' },
        { label: 'Import (UCC IM-A)', value: 'import' },
        { label: 'Re-export', value: 'reexport' },
        { label: 'Transit (T1/T2)', value: 'transit' },
        { label: 'Temporary Admission', value: 'temporary_admission' },
        { label: 'Inward Processing', value: 'inward_processing' },
        { label: 'Outward Processing', value: 'outward_processing' },
      ],
    },
    { name: 'shipment', type: 'relationship', relationTo: 'shipments', required: true, index: true },
    { name: 'declarationDate', type: 'date', required: true, index: true },
    { name: 'countryOfDispatch', type: 'text',
      admin: { description: 'ISO 3166-1 alpha-2 — country goods leave from.' } },
    { name: 'countryOfDestination', type: 'text', required: true,
      admin: { description: 'ISO 3166-1 alpha-2 — final destination country.' } },
    { name: 'countryOfOrigin', type: 'text',
      admin: { description: 'ISO 3166-1 alpha-2 — country where the goods were manufactured (drives preferential treatment).' } },
    currencyField(),
    { name: 'totalValue', type: 'number', required: true,
      admin: { description: 'Σ(line items × declared value), in cents. Drives import VAT + duty calculation.' } },
    { name: 'totalDuty', type: 'number', defaultValue: 0,
      admin: { description: 'Customs duty payable, in cents. Computed by customs authority.' } },
    { name: 'totalImportVat', type: 'number', defaultValue: 0,
      admin: { description: 'Import VAT payable, in cents.' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      labels: { singular: 'Line Item', plural: 'Line Items' },
      admin: { description: 'WCO data-model line items — one per HS code per declared item.' },
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items',
          admin: { description: 'The internal item — denormalised hsCode flows into `hsCode` for the declaration.' } },
        { name: 'description', type: 'text', required: true,
          admin: { description: 'Goods description per WCO HS (must match commercial invoice).' } },
        { name: 'hsCode', type: 'text', required: true,
          admin: { description: 'WCO HS Code (6-digit minimum; 8/10-digit for combined nomenclature).' } },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        unitOfMeasureField({ description: 'WCO supplementary unit (C62 / KGM / LTR / etc.).' }),
        { name: 'netWeight', type: 'number',
          admin: { description: 'Net weight in kg.' } },
        { name: 'grossWeight', type: 'number',
          admin: { description: 'Gross weight in kg.' } },
        { name: 'declaredValue', type: 'number', required: true,
          admin: { description: 'Declared value per line, in cents.' } },
        { name: 'preferentialOrigin', type: 'checkbox', defaultValue: false,
          admin: { description: 'Goods qualify for preferential origin (EUR.1 / EUR-MED / etc.).' } },
        { name: 'tariffPreferenceCode', type: 'text',
          admin: { description: 'EU preference code if `preferentialOrigin = true` (e.g. `300` GSP, `400` ACP).' } },
      ],
    },
    taxonomySelect('incoterm', INCOTERM_OPTIONS, { description: 'INCOTERMS 2020 term — drives who pays duty/VAT.' }),
    { name: 'submittedAt', type: 'date',
      admin: { description: 'ISO 8601 — when declaration was submitted to customs.' } },
    { name: 'acceptedAt', type: 'date',
      admin: { description: 'ISO 8601 — when customs accepted (MRN issued).' } },
    { name: 'releasedAt', type: 'date',
      admin: { description: 'ISO 8601 — when goods were released by customs.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Accepted (MRN issued)', value: 'accepted' },
        { label: 'Held for Inspection', value: 'held' },
        { label: 'Released', value: 'released' },
        { label: 'Rejected', value: 'rejected' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('customs-declarations'),
  timestamps: true,
}

export default CustomsDeclarations
