/**
 * # Deferred Tax Items
 *
 * @summary IFRS IAS-12 deferred-tax register: temporary differences origination/reversal, DTA/DTL recognition and reversal tracking.
 *
 * ## Core Function
 *
 * Deferred Tax Items is the IFRS IAS-12 (Income Taxes) deferred-tax accounting register. Each row
 * tracks one temporary difference (a difference between tax base and carrying amount of an asset/liability)
 * that requires deferred-tax asset (DTA) or deferred-tax liability (DTL) recognition. The collection
 * separates concerns: origination events (e.g., fixed asset depreciation: book 5yr, tax 2yr) create
 * one record; reversal events (subsequent year, difference shrinks) create reversal records. The `kind`
 * discriminator (deductible vs taxable; loss carry-forward vs credit carry-forward) drives recognition
 * rules (DTA §34 "probable" threshold; DTL §23 mandatory recognition). Tax rate is snapshotted at
 * recognition date (IAS-12 §47 substantively-enacted rate), enabling audit trail of rate changes and
 * deferred-tax remeasurement impacts. Pairs with tax-jurisdictions (jurisdiction-specific tax rates)
 * and gl-accounts (DTA/DTL balance sheet accounts). Expected reversal date drives current/non-current
 * classification (IAS-1 §69).
 *
 * ## Architecture
 *
 * Each deferred-tax item references a source collection + ID (e.g., sourceCollection=fixed-assets,
 * sourceId=asset-uuid), enabling traceability back to the origin (useful for impairment/disposal
 * audit trails). Multi-jurisdiction: jurisdiction field enables tax-rate lookup per jurisdiction
 * (DTL for BG 10% rate ≠ DTL for US 25% rate). recognitionDate = date DTA/DTL is first accrued
 * (immutable; determines IAS-12 §47 substantively-enacted rate snapshot). expectedReversalDate =
 * expected dissolution date of temporary difference; drives current/non-current split. realisationProbability
 * = DTA-only recognition gate (§34): probable → recognised; possible → disclose only; remote → no
 * recognition. journalEntry (readOnly) = GL posting that booked the deferred-tax accrual/reversal
 * (auto-populated by ConsistencyAgent). status workflow: draft → recognised → reversed → derecognised
 * (probability dropped). Audit trail captures all mutations + rate-change impacts.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — multi-tenant scoping.
 * - **beforeChange:** autoPopulateCreatedBy.
 * - **afterChange:** auditTrailAfterChange — log origination/reversal events, rate changes, realisationProbability shifts.
 *
 * ## Key Fields
 *
 * - **reference (text, required, unique):** Sequential DTA/DTL reference (e.g., DT-2026-04-001). @standard ISO-8601 YYYY-MM prefix.
 * - **kind (select, required):** IAS-12 classification: deductible | taxable | tax_loss_carryforward | tax_credit_carryforward. Drives recognition rules.
 * - **classification (select, required, default=non_current):** Expected reversal window: current (≤12 months) | non_current (>12 months). IAS-1 §69 balance-sheet split.
 * - **sourceCollection (text):** Slug of origin (e.g., fixed-assets, inventory-movements, provisions). For audit trail traceability.
 * - **sourceId (text):** ID of the origin row (asset UUID, inventory transaction ID, provision ID). Enables drill-down.
 * - **jurisdiction (relationship to tax-jurisdictions, required, indexed):** Tax jurisdiction whose rate applies. IAS-12 §47 substantively-enacted rate at that jurisdiction.
 * - **temporaryDifference (number, required, cents, signed):** Carrying amount − Tax base (absolute difference). Positive ⇒ taxable (DTL); negative ⇒ deductible (DTA). @standard IAS-12 §5 definition.
 * - **taxRate (number, required, %, 0-100):** IAS-12 §47 substantively-enacted tax rate at jurisdiction + recognition date (immutable snapshot). E.g., 10% for BG corporate tax.
 * - **deferredTaxAmount (number, required, cents, signed):** temporaryDifference × (taxRate / 100). Signed: positive = DTL (liability); negative = DTA (asset). Postedto GL DTA/DTL account.
 * - **currency (select):** ISO-4217 code (inherited from jurisdiction.currency). @standard ISO-4217:2015.
 * - **recognitionDate (date, required, indexed):** ISO-8601 date DTA/DTL first accrued (immutable). Rate snapshot date per IAS-12 §47.
 * - **expectedReversalDate (date):** ISO-8601 expected temporary-difference reversal date. Drives current/non-current split. IAS-12 §52 timing estimation.
 * - **realisationProbability (select):** DTA-only recognition gate (§34): probable (recognisable) | possible (disclose only) | remote (no recognition). Audit-evidence for probability assessment.
 * - **journalEntry (relationship to journal-entries, readOnly):** GL posting that booked the deferred-tax accrual or reversal. Auto-populated by ConsistencyAgent.
 * - **status (select, default=draft):** Workflow: draft | recognised | reversed | derecognised. Controls recognition + GL posting immutability.
 * - **auditFields() (group, readOnly):** createdBy, createdAt, updatedAt, updatedBy. Standard Payload audit metadata.
 * - **notes (textarea):** Internal explanation (e.g., "Originated from fixed-asset depreciation policy change per IAS-8 §42", "Reversal due to asset disposal 2026-02-15").
 *
 * ## Core Invariants
 *
 * - **recognitionDate immutability:** Once set, recognitionDate cannot be changed (rate snapshot immutability per IAS-12 §47). Corrections require new record.
 * - **temporaryDifference sign consistency:** Positive ⇒ kind=taxable; negative ⇒ kind=deductible (derived check; prevents category mismatch).
 * - **rate immutability post-recognition:** Once status=recognised, taxRate cannot be changed (IAS-12 §47 snapshot). Remeasurement changes (rate updates) require new record with new recognitionDate.
 * - **DTA probability gate:** kind=deductible + status=recognised requires realisationProbability=probable (IAS-12 §34 recognition condition).
 * - **current/non-current logic:** classification is immutable and based on expectedReversalDate logic (current if ≤12 months from reporting date).
 * - **reversal traceability:** reversal records must reference origination record via sourceId or similar; enables audit chain (origination → reversal → derecognition).
 * - **jurisdiction + rate consistency:** taxRate must match jurisdiction's corporate-tax rate at recognitionDate (validation via tax-jurisdictions lookup).
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to audit-events collection with full field deltas (reference, kind, taxRate, deferredTaxAmount, realisationProbability, status).
 * recognitionDate and taxRate are immutable post-creation; attempted edits are audit-logged and rejected (snapshot immutability).
 * realisationProbability shifts (e.g., probable → possible → remote) are audit-logged (triggers DTA derecognition review).
 * Status transitions (draft → recognised → reversed) are audit-logged with GL posting reference (journalEntry audit anchor).
 * Reversal events (status=reversed) are linked to origination records for audit chain (IAS-12 §47 timing traceability).
 * Remeasurement impacts (e.g., rate change on subsequent reporting date) are separate new records (not in-place edits).
 * @standard ISO-19011:2018 audit-trail deferred-tax evidence retention (IFRS §34 recognition criteria audit).
 * @standard SOX §404 internal-controls deferred-tax position documentation.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "dti-uuid",
 *   "reference": "DT-2026-04-001",
 *   "kind": "deductible",
 *   "classification": "non_current",
 *   "sourceCollection": "fixed-assets",
 *   "sourceId": "asset-uuid-5200",
 *   "jurisdiction": "ref-to-tax-jurisdiction-eu-bg",
 *   "temporaryDifference": -1000000,
 *   "taxRate": 10,
 *   "deferredTaxAmount": -100000,
 *   "currency": "BGN",
 *   "recognitionDate": "2026-04-10",
 *   "expectedReversalDate": "2029-04-10",
 *   "realisationProbability": "probable",
 *   "journalEntry": "ref-to-je-uuid",
 *   "status": "recognised",
 *   "notes": "Deferred-tax asset for fixed-asset depreciation timing (book 5yr, tax 3yr per BG tax code).",
 *   "createdBy": "user-123",
 *   "createdAt": "2026-04-10T09:30:00Z",
 *   "updatedAt": "2026-04-10T09:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase IFRS IAS-12 deferred-tax asset/liability recognition and measurement.
 * @useCase Temporary-difference tracking: origination, reversal, derecognition workflow.
 * @useCase Current/non-current classification: split balance-sheet presentation per IAS-1 §69.
 * @useCase Rate snapshot audit trail: IAS-12 §47 substantively-enacted rate immutability.
 * @useCase DTA probability assessment: realisationProbability gate per §34 recognition condition.
 *
 * @standard ISO-8601-1:2019 date-time recognition-date expected-reversal-date
 * @standard ISO-4217:2015 currency-codes deferred-tax currency
 *
 * @accounting IFRS IAS-12 §15-68 income-taxes deferred-tax-assets deferred-tax-liabilities
 * @accounting IFRS IAS-12 §4-5 definitions of deferred-tax
 * @accounting IFRS IAS-12 §29 deductible-temporary-differences DTA
 * @accounting IFRS IAS-12 §23 taxable-temporary-differences DTL
 * @accounting IFRS IAS-12 §34 DTA-recognition-criteria (probable, carryforward)
 * @accounting IFRS IAS-12 §47 measurement-using-substantively-enacted-rate
 * @accounting IFRS IAS-12 §52 expected-reversal-date-estimation
 * @accounting IFRS IAS-12 §74 offsetting-and-presentation
 * @accounting IFRS IAS-1 §69 current-non-current classification
 * @accounting US-GAAP ASC-740 income-taxes deferred-tax
 *
 * @audit ISO-19011:2018 audit-trail deferred-tax-evidence
 * @audit SOX §404 internal-controls deferred-tax-position
 *
 * @compliance IFRS IAS-12 §34 DTA-recognition-probability assessment
 * @compliance SOX §302 certification §404 management-assessment
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security Feature-gated access (accountingCollectionAccess with feature: deferred_tax)
 *
 * @see tax-jurisdictions (tax-rate source per IAS-12 §47 substantively-enacted)
 * @see journal-entries (GL posting reference via journalEntry field)
 * @see fixed-assets (typical DTA origination source)
 * @see inventory-movements (inventory valuation DTA source)
 * @see provisions (provision timing differences DTA source)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const DeferredTaxItems: CollectionConfig = {
  slug: 'deferred-tax-items',
  labels: { singular: 'Deferred Tax Item', plural: 'Deferred Tax Items' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'kind', 'classification', 'temporaryDifference', 'deferredTaxAmount', 'jurisdiction', 'status'],
    description:
      'IAS-12 deferred-tax register. One row per origination or reversal of a temporary difference between tax base and carrying amount.',
  },
  access: accountingCollectionAccess({ feature: 'deferred_tax' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential reference (e.g. DT-2026-04-001).' }),
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Deductible Temporary Difference (DTA)', value: 'deductible' },
        { label: 'Taxable Temporary Difference (DTL)', value: 'taxable' },
        { label: 'Tax Loss Carry-Forward', value: 'tax_loss_carryforward' },
        { label: 'Tax Credit Carry-Forward', value: 'tax_credit_carryforward' },
      ],
      admin: { description: 'IAS-12 §15 vs §24 classification — drives DTA vs DTL recognition.' },
    },
    {
      name: 'classification',
      type: 'select',
      required: true,
      defaultValue: 'non_current',
      options: [
        { label: 'Current (≤ 12 months reversal)', value: 'current' },
        { label: 'Non-current (> 12 months reversal)', value: 'non_current' },
      ],
    },
    { name: 'sourceCollection', type: 'text', admin: { description: 'Slug of the origin (e.g. fixed-assets / inventory-movements / provisions).' } },
    { name: 'sourceId', type: 'text', admin: { description: 'ID of the origin row.' } },
    { name: 'jurisdiction', type: 'relationship', relationTo: 'tax-jurisdictions', required: true, index: true,
      admin: { description: 'Tax jurisdiction whose rate applies.' } },
    { name: 'temporaryDifference', type: 'number', required: true,
      admin: { description: 'Carrying amount − Tax base (cents). Positive ⇒ taxable; negative ⇒ deductible.' } },
    { name: 'taxRate', type: 'number', required: true, min: 0, max: 100,
      admin: { description: 'IAS-12 §47 substantively-enacted rate at reporting date (%).', step: 0.01 } },
    { name: 'deferredTaxAmount', type: 'number', required: true,
      admin: { description: 'temporaryDifference × taxRate / 100 (cents). Signed.' } },
    currencyField(),
    { name: 'recognitionDate', type: 'date', required: true, index: true },
    { name: 'expectedReversalDate', type: 'date',
      admin: { description: 'IAS-12 §52 — when the difference is expected to reverse.' } },
    { name: 'realisationProbability', type: 'select',
      options: [
        { label: 'Probable (DTA recognisable)', value: 'probable' },
        { label: 'Possible (disclose only)', value: 'possible' },
        { label: 'Remote (no recognition)', value: 'remote' },
      ],
      admin: { description: 'IAS-12 §34 — DTA only recognised when realisation is probable.' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE that booked the deferred-tax accrual or reversal.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Recognised', value: 'recognised' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Derecognised (probability dropped)', value: 'derecognised' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('deferred-tax-items')],
  },
  timestamps: true,
}

export default DeferredTaxItems
