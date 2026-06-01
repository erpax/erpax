/**
 * Business Combinations — IFRS 3 acquirer-side M&A register.
 *
 * Slice BBBBB-prep (2026-05-11): each row is one acquisition (asset deal,
 * share deal, reverse acquisition, or NCI step-up). Captures the §32
 * goodwill calculation: consideration transferred + NCI + previously-
 * held interest − fair value of identifiable net assets acquired.
 * Pairs with `legal-entities` (acquired entity) and `intangible-assets`
 * (PPA-allocated identifiable intangibles).
 *
 * @standard IFRS IFRS-3 §10-§13 identifying-the-acquirer
 * @standard IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired
 * @standard IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain
 * @standard IFRS IFRS-3 §B41-B49 reverse-acquisitions
 * @standard IFRS IFRS-10 §B86 consolidation
 * @standard US-GAAP ASC-805 business-combinations
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time acquisition-date
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-business-combination
 * @compliance SOX §404 internal-controls TOM-MA-01 PPA-process
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../../../fields/base-accounting-fields'

const BusinessCombinations: CollectionConfig = {
  slug: 'business-combinations',
  labels: { singular: 'Business Combination', plural: 'Business Combinations' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'acquireeName', 'dealType', 'acquisitionDate', 'considerationTransferred', 'goodwill', 'status'],
    description:
      'IFRS 3 acquirer-side M&A register. Captures the §32 goodwill computation + PPA allocation.',
  },
  access: accountingCollectionAccess({ feature: 'business_combinations' }),
  fields: [
    referenceField({ description: 'Sequential deal reference (e.g. MA-2026-001).' }),
    { name: 'acquireeName', type: 'text', required: true },
    { name: 'acquireeLegalEntity', type: 'relationship', relationTo: 'legal-entities',
      admin: { description: 'Acquired entity once registered in legal-entities (post-close).' } },
    {
      name: 'dealType',
      type: 'select',
      required: true,
      options: [
        { label: 'Asset Deal', value: 'asset_deal' },
        { label: 'Share Deal (controlling interest)', value: 'share_deal' },
        { label: 'Reverse Acquisition (IFRS 3 §B41)', value: 'reverse' },
        { label: 'Step Acquisition (NCI buy-out)', value: 'step' },
        { label: 'Common Control (no IFRS 3 — disclosure only)', value: 'common_control' },
      ],
    },
    { name: 'acquisitionDate', type: 'date', required: true, index: true,
      admin: { description: 'IFRS 3 §8 — date control is obtained.' } },
    { name: 'percentageAcquired', type: 'number', required: true, min: 0, max: 100,
      admin: { description: 'Percentage of equity / voting rights obtained (%).', step: 0.01 } },
    { name: 'considerationTransferred', type: 'number', required: true,
      admin: { description: 'IFRS 3 §37 — fair value of cash + equity + contingent consideration (cents).' } },
    { name: 'cashConsideration', type: 'number', defaultValue: 0 },
    { name: 'equityConsideration', type: 'number', defaultValue: 0 },
    { name: 'contingentConsideration', type: 'number', defaultValue: 0,
      admin: { description: 'IFRS 3 §39 — fair value of earn-outs / contingent payments at acquisition date.' } },
    { name: 'nciFairValue', type: 'number', defaultValue: 0,
      admin: { description: 'IFRS 3 §19 — non-controlling interest at fair value (full) or proportionate share (partial).' } },
    { name: 'previouslyHeldInterestFairValue', type: 'number', defaultValue: 0,
      admin: { description: 'IFRS 3 §42 — for step acquisitions: re-measured prior interest at acquisition-date fair value.' } },
    { name: 'fairValueIdentifiableNetAssets', type: 'number', required: true,
      admin: { description: 'IFRS 3 §18 — sum of recognised identifiable assets acquired & liabilities assumed (cents).' } },
    { name: 'goodwill', type: 'number',
      admin: { readOnly: true, description: 'IFRS 3 §32: consideration + NCI + prior-interest − net-assets. Positive ⇒ goodwill (asset); negative ⇒ bargain-purchase gain (P&L).' } },
    { name: 'isBargainPurchase', type: 'checkbox', defaultValue: false,
      admin: { readOnly: true, description: 'True when goodwill is negative; IFRS 3 §34 — recognise gain in P&L.' } },
    currencyField(),
    {
      name: 'ppaAllocations',
      type: 'array',
      labels: { singular: 'PPA Allocation', plural: 'PPA Allocations' },
      admin: { description: 'Purchase price allocation by identifiable asset / liability category.' },
      dbName: 'bc_ppa',
      fields: [
        { name: 'category', type: 'select', required: true, options: [
          { label: 'Tangible — PPE (IAS 16)', value: 'ppe' },
          { label: 'Intangible — Customer relationships', value: 'int_customer' },
          { label: 'Intangible — Brand / Trademark', value: 'int_brand' },
          { label: 'Intangible — Technology / Patent', value: 'int_technology' },
          { label: 'Intangible — Order Backlog', value: 'int_backlog' },
          { label: 'Intangible — Non-compete', value: 'int_noncompete' },
          { label: 'Inventory step-up', value: 'inventory_stepup' },
          { label: 'Deferred tax (IAS 12)', value: 'deferred_tax' },
          { label: 'Pension (IAS 19)', value: 'pension' },
          { label: 'Provision (IAS 37)', value: 'provision' },
          { label: 'Other identifiable', value: 'other' },
        ] },
        { name: 'fairValue', type: 'number', required: true },
        { name: 'description', type: 'text', localized: true },
        { name: 'usefulLifeYears', type: 'number', admin: { description: 'For amortisable intangibles.' } },
      ],
    },
    { name: 'measurementPeriodEndDate', type: 'date',
      admin: { description: 'IFRS 3 §45 — up to 12 months from acquisition for fair-value adjustments.' } },
    { name: 'transactionCosts', type: 'number', defaultValue: 0,
      admin: { description: 'IFRS 3 §53 — expensed (NOT capitalised into goodwill).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    { name: 'evidenceAttestation', type: 'relationship', relationTo: 'evidence-attestations',
      admin: { description: 'Signed PPA report (eIDAS PAdES) — auditor walk-through anchor.' } },
    statusField(
      [
        { label: 'Signed (LOI / SPA executed)', value: 'signed' },
        { label: 'Closed (control obtained)', value: 'closed' },
        { label: 'PPA Provisional', value: 'ppa_provisional' },
        { label: 'PPA Final', value: 'ppa_final' },
        { label: 'Measurement Period Closed', value: 'measurement_closed' },
      ],
      'signed',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('business-combinations'),
  timestamps: true,
}

export default BusinessCombinations
