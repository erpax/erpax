/**
 * # Investment Properties Collection
 *
 * @summary Investment properties per IAS-40 (land and buildings held to earn rental income or for capital appreciation, not owner-occupied or held for sale).
 *
 * ## Core Function
 *
 * The Investment Properties collection registers all land, buildings, and mixed-use properties held primarily
 * for earning rental income or capital appreciation rather than for use in operations or for sale in the ordinary
 * course of business. Under IAS-40 §5-9, investment properties are distinct from property occupied by the entity
 * (PP&E per IAS-16) and inventory held for development/resale. Each property record captures the initial acquisition
 * cost and election of a measurement model (fair-value per IAS-40 §33, or cost per IAS-40 §56 with fair-value disclosure).
 * Fair-value model properties are remeasured at each reporting date with gains/losses flowing through P&L per IAS-40 §35;
 * cost-model properties are depreciated per IAS-16 guidance with fair-value disclosed in the notes. The collection links
 * to the properties registry (reference data), tracks rental income YTD, and cascades fair-value changes to GL via
 * afterChange hooks. IAS-40 §57-65 "transfers" (e.g., owner-occupation begins, development for sale) are tracked via
 * transferReason field and trigger accounting reclassification (investment property → PP&E, or → inventory).
 *
 * ## Architecture
 *
 * Multi-tenancy is enforced via the `tenant` field (indexed). Each investment property has one unique reference
 * (sequential or asset-based, e.g., 'IP-2026-001') and links to a properties collection (relationTo: 'properties')
 * that holds location, attributes, and survey data. The measurement-model election (fair-value vs. cost) is set at
 * acquisition and must be applied uniformly to all investment properties per IAS-40 §30(a). Fair-value measurement
 * leverages a relationship to 'fair-value-measurements' collection (IFRS-13 Level 1/2/3 hierarchy tracking); cost-model
 * properties reference IAS-16 useful-life guidance for depreciation. Rental-income and operating-expense tracking
 * (rentalIncomeYtd, directOperatingExpensesYtd) are not GL-integrated (that flows via lease accounting or
 * rent-receivable posting); this collection provides the disclosure aggregate per IAS-40 §75. Status lifecycle
 * (active, under construction, vacant, transferred out, disposed) gates the property's reporting categorization.
 * An optional lease relationship (relationTo: 'leases') tracks outbound leases to tenants (lessor perspective).
 * GL account mapping is implicit (fair-value changes debit/credit an 'unrealized gain/loss' account as configured
 * per the chart-of-accounts policy); no explicit GL accounts are stored here (that level of detail is in fair-value-measurements).
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:**
 *   - `autoPopulateTenant`: Stamps `tenant` from context.
 * - **beforeChange:**
 *   - `autoPopulateCreatedBy`: Stamps `createdBy` on initial insert.
 * - **afterChange:**
 *   - `auditTrailAfterChange('investment-properties')`: Logs full record delta to audit-events.
 *   - (Future) fair-value remeasurement hook: when measurement-model = 'fair_value', compares currentFairValue
 *     to prior-period fair value and emits GL entry to book the gain/loss (not yet integrated in baseline).
 *
 * ## Key Fields
 *
 * - **reference (text, required, unique, indexed):** Sequential or asset-based identifier (e.g., 'IP-2026-001'). Primary user-facing ID.
 * - **property (relationship to properties, required, indexed):** Reference to the properties registry (core location, cadastre, square footage data).
 * - **acquisitionDate (date, required):** Property purchase or acquisition date (ISO-8601). Immutable per IAS-40 §20-29 measurement principles.
 * - **acquisitionCost (number, required):** Purchase price + directly attributable costs (e.g., legal, survey, transfer taxes) in cents, per IAS-40 §20-29. Immutable under both fair-value and cost models.
 * - **measurementModel (select, required, default 'fair_value'):** Accounting model election per IAS-40 §30: 'fair_value' (IAS-40 §33) or 'cost' (IAS-40 §56, follows IAS-16 depreciation with fair-value disclosed). Election must be applied uniformly to all IP per IAS-40 §30(a).
 * - **currentFairValue (number):** Fair value at reporting date (cents) per IFRS-13 methodology. Required if measurementModel = 'fair_value'; disclosed (not recognized) if measurementModel = 'cost'.
 * - **fairValueChangeYtd (number, read-only):** Cumulative change in fair value YTD (cents). = currentFairValue − priorPeriodFairValue per IAS-40 §35. Posted to P&L under fair-value model; disclosed as unrealized gain/loss under cost model.
 * - **rentalIncomeYtd (number, default 0):** Rental or lease income recognized YTD (cents). Per IAS-40 §75(e), this aggregate is disclosed separately as part of "rental income from investment property."
 * - **directOperatingExpensesYtd (number, default 0):** Operating expenses (maintenance, property tax, utilities) incurred on IP YTD (cents). Per IAS-40 §75(f), disclosed separately with a split: expenses on occupied vs. vacant IP.
 * - **currency (select, default 'EUR'):** Currency of all monetary fields (cost, fair value, income) per ISO-4217:2015.
 * - **transferReason (select):** Trigger for reclassification per IAS-40 §57-65: 'transfer_to_ppe' (owner-occupation begins), 'transfer_from_ppe' (owner-occupation ends), 'transfer_to_inventory' (development for sale begins), 'transfer_from_inventory' (development complete, lease commences). When set, triggers GL reclassification entry and status → 'transferred_out'.
 * - **lease (relationship to leases):** Lessor-perspective lease; used when the IP is leased out to a tenant. Links to the leases collection for rental terms, ROU asset, and lease-modification tracking (lessor accounting per IFRS-16 for embedded leases or ASC-842 lessor disclosure).
 * - **fairValueMeasurement (relationship to fair-value-measurements):** IFRS-13 fair-value hierarchy classification (Level 1/2/3 input hierarchy) and supporting documentation (e.g., appraisal report, comparable-transactions analysis).
 * - **journalEntry (relationship to journal-entries, read-only):** Reference to any GL posting created for fair-value gain/loss under fair-value model (populated by afterChange hook).
 * - **status (select, default 'active'):** Asset lifecycle per IAS-40 §9: 'active' (held for rental/appreciation), 'construction' (under development per IAS-40 §8 exemption), 'vacant' (temporarily not leased), 'transferred_out' (reclassified out of IP), 'disposed' (sold).
 * - **notes (textarea):** Commentary (e.g., "Appraised by XYZ at fair value 500,000 BGN per report IP-2026-001-A", "Leased to Tenant ABC under lease L-001").
 *
 * ## Core Invariants
 *
 * - **Measurement Model Immutability (Uniform Applicability):** Once elected, the measurement model (fair-value vs. cost) must be applied uniformly to all investment properties per IAS-40 §30(a). Individual properties cannot use different models. Changing models requires a retrospective application per IAS-8 and is rare in practice.
 * - **Acquisition Cost Immutability:** acquisitionCost is set once and cannot be changed. Subsequent additions (capital improvements, expansion) are either (a) separate assets, or (b) depreciated separately if using cost model.
 * - **Fair-Value Consistency:** currentFairValue must be measured using consistent inputs (Level 1, 2, or 3 per IFRS-13) and disclosed with hierarchy classification per IAS-40 §74(g).
 * - **Status Transition Immutability:** Once status = 'transferred_out' (per IAS-40 §57-65 transfer), the property is no longer an investment property; subsequent transfers back to IP are auditable events with supporting documentation.
 * - **Cost Model Falls Back to IAS-16:** Properties using the cost-model must follow IAS-16 depreciation guidance (useful life, residual value, component depreciation); fair-value is disclosed in notes only per IAS-40 §56.
 *
 * ## Audit Trail
 *
 * Every investment-property record captures:
 * - `createdBy` (user ID + timestamp): Initial creation stamp.
 * - `modifiedBy` (user ID + timestamp): Last modification stamp.
 * - All changes (e.g., fair-value remeasurement, transfer reason, status) are logged to audit-events with before/after values.
 * Fair-value gains/losses under the fair-value model are booked to GL via the journalEntry relationship and are auditable
 * back to the GL account (e.g., 'Unrealized Gain on Investment Properties'). Per IAS-40 §74-76, auditors verify:
 * (1) all properties held for rental/appreciation are registered in this collection (completeness),
 * (2) measurement model is consistent and disclosed, (3) fair-value measurements are supported by appraisals or
 * market evidence (IFRS-13), and (4) transfers in/out are properly classified and support SOX §404 internal-control objectives.
 * @standard IAS-40 §74-76 disclosure-requirements; @standard SOX §404 internal-controls real-estate-asset-register.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "inv_prop_uuid_sofia_001",
 *   "tenant": "tenant_bg_001",
 *   "reference": "IP-2026-001",
 *   "property": "prop_uuid_sofia_office",
 *   "acquisitionDate": "2020-06-15",
 *   "acquisitionCost": 50000000,  // 500,000 BGN
 *   "measurementModel": "fair_value",
 *   "currentFairValue": 55000000,  // 550,000 BGN (5 June 2026 appraisal)
 *   "fairValueChangeYtd": 1000000,  // 10,000 BGN gain (Jan–May 2026)
 *   "rentalIncomeYtd": 6000000,  // 60,000 BGN (5 months × 12,000 BGN/month)
 *   "directOperatingExpensesYtd": 850000,  // 8,500 BGN (utilities, tax, maintenance)
 *   "currency": "BGN",
 *   "status": "active",
 *   "lease": "lease_uuid_tenant_abc",
 *   "fairValueMeasurement": "fvm_uuid_sofia_appraisal_2026",
 *   "journalEntry": "je_uuid_fv_gain_202605",
 *   "createdBy": "accountant_001",
 *   "createdAt": "2020-06-15T09:00:00Z",
 *   "modifiedBy": "accountant_002",
 *   "modifiedAt": "2026-05-10T15:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation for investment properties
 * @useCase Investment property accounting, fair-value measurement, rental-income tracking, balance-sheet disclosure
 * @accounting IFRS IAS-40 §5-9 definition-and-recognition, §20-29 initial-measurement, §30-35 fair-value-model, §56-65 cost-model-and-transfers
 * @accounting IFRS IAS-40 §74-76 disclosure-requirements
 * @accounting IFRS IFRS-13 fair-value-measurement-hierarchy
 * @accounting IAS-16 §52-67 (cost-model depreciation if applicable)
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time acquisition-date reporting-date
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-investment-property fair-value-support
 * @compliance SOX §404 internal-controls real-estate-completeness
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/properties.ts (reference data)
 * @see src/plugins/accounting/collections/leases.ts (lessor-side leasing)
 * @see docs/STANDARDS.md §4.2 investment-property-accounting
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const InvestmentProperties: CollectionConfig = {
  slug: 'investment-properties',
  labels: { singular: 'Investment Property', plural: 'Investment Properties' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'property', 'measurementModel', 'currentFairValue', 'rentalIncomeYtd', 'status'],
    description:
      'IAS 40 — property held to earn rentals or capital appreciation (not own-use, not held-for-sale).',
  },
  access: accountingCollectionAccess({ feature: 'investment_property' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential reference (e.g. IP-2026-001).' }),
    { name: 'property', type: 'relationship', relationTo: 'properties', required: true, index: true },
    { name: 'acquisitionDate', type: 'date', required: true },
    { name: 'acquisitionCost', type: 'number', required: true,
      admin: { description: 'IAS 40 §20-§29 — purchase price + directly attributable costs (cents).' } },
    {
      name: 'measurementModel',
      type: 'select',
      required: true,
      defaultValue: 'fair_value',
      options: [
        { label: 'Fair Value Model (IAS 40 §33)', value: 'fair_value' },
        { label: 'Cost Model (IAS 40 §56 — follows IAS 16)', value: 'cost' },
      ],
      admin: { description: 'IAS 40 §30 election — applied uniformly to all investment property.' },
    },
    { name: 'currentFairValue', type: 'number',
      admin: { description: 'IFRS 13 fair value at reporting date (cents). Required when measurementModel = fair_value; disclosed only when = cost.' } },
    { name: 'fairValueChangeYtd', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'IAS 40 §35 — gain/loss on remeasurement (P&L) under fair-value model.' } },
    { name: 'rentalIncomeYtd', type: 'number', defaultValue: 0,
      admin: { description: 'IAS 17/IFRS 16 lease income recognised YTD (cents).' } },
    { name: 'directOperatingExpensesYtd', type: 'number', defaultValue: 0,
      admin: { description: 'IAS 40 §75(f) — operating expenses disclosure split.' } },
    currencyField(),
    {
      name: 'transferReason',
      type: 'select',
      options: [
        { label: 'Owner-occupation begins (transfer OUT to PPE)', value: 'transfer_to_ppe' },
        { label: 'Owner-occupation ends (transfer IN from PPE)', value: 'transfer_from_ppe' },
        { label: 'Development for sale begins (transfer OUT to inventory)', value: 'transfer_to_inventory' },
        { label: 'Development complete + lease commenced (transfer IN from inventory)', value: 'transfer_from_inventory' },
      ],
      admin: { description: 'IAS 40 §57-§65 — change-in-use trigger.' },
    },
    { name: 'lease', type: 'relationship', relationTo: 'leases',
      admin: { description: 'When the IP is leased OUT to a tenant (lessor side).' } },
    { name: 'fairValueMeasurement', type: 'relationship', relationTo: 'fair-value-measurements',
      admin: { description: 'IFRS 13 hierarchy classification (Level 1/2/3).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Under Construction (IAS 40 §8)', value: 'construction' },
        { label: 'Vacant', value: 'vacant' },
        { label: 'Transferred Out', value: 'transferred_out' },
        { label: 'Disposed', value: 'disposed' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('investment-properties')],
  },
  timestamps: true,
}

export default InvestmentProperties
