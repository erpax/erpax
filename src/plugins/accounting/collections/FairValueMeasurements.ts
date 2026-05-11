/**
 * Fair Value Measurements — IFRS 13 Level-1/2/3 hierarchy register.
 *
 * Slice BBBBB-prep (2026-05-11): cross-cutting register that captures the
 * IFRS 13 §72-§90 inputs hierarchy for any asset / liability measured at
 * fair value (financial instruments, investment property, biological
 * assets, share-based payments, business-combination PPA items).
 * Polymorphic source via `sourceCollection` + `sourceId`.
 *
 * @standard IFRS IFRS-13 §9 fair-value-definition
 * @standard IFRS IFRS-13 §72 fair-value-hierarchy-three-levels
 * @standard IFRS IFRS-13 §76 level-1-quoted-prices
 * @standard IFRS IFRS-13 §81 level-2-observable-inputs
 * @standard IFRS IFRS-13 §86 level-3-unobservable-inputs
 * @standard IFRS IFRS-13 §93 disclosure-requirements
 * @standard US-GAAP ASC-820 fair-value-measurement
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time measurement-date
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-fair-value
 * @compliance SOX §404 internal-controls TOM-FV-01 valuation-process
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const FairValueMeasurements: CollectionConfig = {
  slug: 'fair-value-measurements',
  labels: { singular: 'Fair Value Measurement', plural: 'Fair Value Measurements' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'sourceCollection', 'level', 'fairValue', 'measurementDate', 'status'],
    description:
      'IFRS 13 fair-value hierarchy register. One row per asset/liability per measurement event with Level 1/2/3 input classification.',
  },
  access: accountingCollectionAccess({ feature: 'fair_value_measurements' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential reference (e.g. FV-2026-Q1-001).' }),
    { name: 'sourceCollection', type: 'text', required: true, index: true,
      admin: { description: 'Slug of the measured asset/liability (e.g. fixed-assets / investment-properties / biological-assets / fx-transactions / share-based-payments).' } },
    { name: 'sourceId', type: 'text', required: true, index: true,
      admin: { description: 'ID of the source row.' } },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Level 1 — Quoted prices in active markets (IFRS 13 §76)', value: 'level_1' },
        { label: 'Level 2 — Other observable inputs (IFRS 13 §81)', value: 'level_2' },
        { label: 'Level 3 — Unobservable inputs (IFRS 13 §86)', value: 'level_3' },
      ],
    },
    {
      name: 'valuationTechnique',
      type: 'select',
      required: true,
      options: [
        { label: 'Market Approach (comparable transactions)', value: 'market' },
        { label: 'Income Approach (DCF)', value: 'income' },
        { label: 'Cost Approach (replacement cost)', value: 'cost' },
        { label: 'Multiple (composite)', value: 'multiple' },
      ],
    },
    { name: 'measurementDate', type: 'date', required: true, index: true },
    { name: 'fairValue', type: 'number', required: true,
      admin: { description: 'Measured fair value (cents).' } },
    { name: 'priorFairValue', type: 'number',
      admin: { description: 'Previous measurement carrying value (for change disclosure).' } },
    { name: 'fairValueChange', type: 'number',
      admin: { readOnly: true, description: 'fairValue − priorFairValue (cents). Positive ⇒ gain; negative ⇒ loss.' } },
    {
      name: 'recognitionRoute',
      type: 'select',
      required: true,
      defaultValue: 'p_and_l',
      options: [
        { label: 'P&L (FVTPL)', value: 'p_and_l' },
        { label: 'OCI (FVOCI — IFRS 9)', value: 'oci' },
        { label: 'Equity Reserve', value: 'equity' },
      ],
    },
    currencyField(),
    {
      name: 'level3Inputs',
      type: 'array',
      labels: { singular: 'Level-3 Input', plural: 'Level-3 Inputs' },
      admin: {
        description: 'IFRS 13 §93(d) — required disclosure for Level-3 measurements: significant unobservable inputs + range + sensitivity.',
        condition: (d) => (d as { level?: string })?.level === 'level_3',
      },
      dbName: 'fv_l3_inputs',
      fields: [
        { name: 'inputName', type: 'text', required: true,
          admin: { description: 'e.g. Discount rate / Long-term growth rate / Volatility / Customer-attrition rate.' } },
        { name: 'value', type: 'number' },
        { name: 'rangeMin', type: 'number' },
        { name: 'rangeMax', type: 'number' },
        { name: 'sensitivity', type: 'text',
          admin: { description: '+/-1% movement → +/- €X impact on fair value.' } },
      ],
    },
    { name: 'principalMarket', type: 'text',
      admin: { description: 'IFRS 13 §16 — principal (or most-advantageous) market identifier.' } },
    { name: 'valuer', type: 'text',
      admin: { description: 'External valuation firm (when used).' } },
    { name: 'valuationReport', type: 'relationship', relationTo: 'evidence-attestations',
      admin: { description: 'Signed PDF valuation report (eIDAS PAdES).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Validated', value: 'validated' },
        { label: 'Posted', value: 'posted' },
        { label: 'Superseded (re-measured)', value: 'superseded' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('fair-value-measurements')],
  },
  timestamps: true,
}

export default FairValueMeasurements
