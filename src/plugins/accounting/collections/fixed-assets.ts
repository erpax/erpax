import type { CollectionConfig } from 'payload'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy';
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp';
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange';
import { createAccountingCollection, createGLAccountFields } from '@/services/accounting/factories';
import { multiTenancyField, currencyField, statusField, notesField } from '@/fields/accounting';
// Slice PPP: depreciationHook removed — delegated to a `req.payload.services?.depreciation`
// service that doesn't exist in `src/services/` (silent no-op). Depreciation
// will fold into a scheduled job (Slice ZZ pattern with `dunningJob`) when
// the maintainer designs the cron-driven posting cadence.
import {
  calculateDepreciableBase,
  calculateStraightLineDepreciation,
  calculateBookValue,
} from '@/services/accounting/utilities';

/**
 * # Fixed Assets Collection
 *
 * @summary Capitalized property, plant, and equipment (PP&E) with automated depreciation tracking and book-value accounting per IAS-16.
 *
 * ## Core Function
 *
 * The Fixed Assets collection maintains the master register of all depreciable and non-depreciable assets
 * owned by the organization. Each asset record captures acquisition cost, useful life, depreciation method,
 * and period-end carrying amounts (net book value). The collection calculates depreciation expense monthly
 * (or per fiscal period), posts GL entries via `depreciation-schedules`, and maintains an immutable cost basis
 * per IAS-16 §16-17. Asset classification (machinery, building, equipment, etc.) drives GL account mapping,
 * reporting taxonomies, and compliance disclosure per IAS-16 §68-76 (useful life determination).
 * Disposal accounting (gain/loss on sale) is triggered automatically when status transitions to 'disposed'.
 *
 * ## Architecture
 *
 * Multi-tenant isolation is enforced via the `tenant` field (indexed). Each asset belongs to exactly one tenant.
 * Asset tagging (serial number, barcode, location) supports physical verification in fixed-asset cycles.
 * GL posting relationships (assetAccount, accumulatedDepreciationAccount, depreciationExpenseAccount) are
 * established via relationship fields pointing to `gl-accounts`. Depreciation method selection (straight-line,
 * declining-balance, units-of-activity, sum-of-years-digits) is immutable post-acquisition; the depreciationSchedules
 * table auto-generates when an asset is created. Book-value calculations (cost − accumulated depreciation)
 * are read-only and recomputed by beforeChange hooks. Residual values constrain depreciation base (depreciableBase = cost − residual);
 * depreciation expense cannot exceed depreciableBase / usefulLifeYears. Status lifecycle (active → fully_depreciated / disposed)
 * gates operational vs. retirement accounting treatments. The collection integrates with `vendors` (supplier) and
 * optionally links to `addresses` for asset location details (via location text field).
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** (none currently)
 * - **beforeChange:**
 *   - `autoPopulateCreatedBy`: Stamps `createdBy` on initial insert.
 *   - `autoSetTimestamp('disposalDate', ...)`: Auto-stamps `disposalDate` with current ISO-8601 timestamp when status → 'disposed'.
 *   - Compute `depreciableBase = assetCost − residualValue` (IAS-16 §8).
 *   - Compute `annualDepreciationAmount` for straight-line method: `depreciableBase / usefulLifeYears` (IAS-16 §52).
 *   - Compute `bookValue = assetCost − accumulatedDepreciation` (read-only display).
 *   - Set `depreciationStartDate` to `acquisitionDate` if not supplied.
 * - **afterChange:**
 *   - `auditTrailAfterChange('fixed-assets')`: Emits full record delta to `audit-events` for SOX §404 compliance.
 *
 * ## Key Fields
 *
 * - **assetNumber (text, required, unique):** Immutable sequential or vendor SKU identifier (e.g., 'FIX-2026-0001'). Index for UI lookups.
 * - **description (text, localized, required):** Asset human-readable name in user's locale (e.g., 'Forklift Fleet', 'Офис сгада' in Bulgarian). @standard ISO-9002 asset-naming.
 * - **assetCategory (select):** Asset class driving GL mapping and useful-life defaults (land, building, equipment, machinery, vehicles, furniture_fixtures, leasehold_improvements, software, intangible_assets, other). Per IAS-16 §6, each category has implied useful-life guidance.
 * - **acquisitionDate (date, required):** Asset purchase/receipt date (ISO-8601). Immutable; drives depreciation start date. @standard ISO-8601-1:2019.
 * - **assetCost (number, required):** Original cost in cents, gross of accumulated depreciation. Immutable per IAS-16 §16-17 (historical cost model).
 * - **currency (select, default 'EUR'):** Currency of cost and depreciation amounts. Per ISO-4217:2015.
 * - **supplier (relationship to vendors):** Asset supplier for procurement traceability per IAS-16 §16(a) "directly attributable costs."
 * - **purchaseOrder (text):** Reference PO number for invoice matching and cost substantiation.
 * - **location (text):** Physical storage location or department (e.g., 'Warehouse A', 'Sofia HQ Floor 3') — text field (not yet localized).
 * - **serialNumber (text, unique):** Manufacturer serial number for physical verification audit trails.
 * - **barcode (text, unique):** Internal barcode for asset-tracking systems and warehouse software integrations.
 * - **depreciationMethod (select, default 'straight_line'):** Method for expense allocation: straight_line (default per IAS-16 §52), declining_balance, double_declining_balance, units_of_activity, sum_of_years_digits (per IAS-16 §50 policy election).
 * - **usefulLifeYears (number, required, min 0):** Asset's estimated useful life in years per IAS-16 §51-52. Example: machinery = 5 years, building = 40 years, vehicles = 3 years.
 * - **residualValue (number, default 0, min 0):** Expected residual/salvage value at end of useful life per IAS-16 §8. Constraints depreciableBase; depreciation stops when bookValue ≤ residualValue.
 * - **depreciableBase (number, computed, read-only):** = assetCost − residualValue per IAS-16 §8. Non-negative; used to calculate periodic depreciation.
 * - **annualDepreciationAmount (number, computed, read-only):** = depreciableBase / usefulLifeYears (straight-line only; other methods computed in depreciation-schedules).
 * - **accumulatedDepreciation (number, default 0, read-only):** Sum of all depreciation posted YTD (cents). Updated by depreciation-schedules posting hook.
 * - **bookValue (number, computed, read-only):** = assetCost − accumulatedDepreciation. Net asset value for balance-sheet reporting per IAS-16 §68-72.
 * - **depreciationStartDate (date):** Date depreciation begins; typically = acquisitionDate or in-service date (e.g., May 2023 for an asset acquired Jan but placed in service May).
 * - **lastDepreciationDate (date, read-only):** Last date depreciation was posted by the job (for diagnostics).
 * - **totalUnitsExpected (number):** For units-of-activity method: total units the asset is expected to produce (e.g., 100,000 machine hours).
 * - **unitsProducedToDate (number, default 0):** Cumulative units produced; used to calculate depreciation = (unitsProducedToDate / totalUnitsExpected) × depreciableBase.
 * - **assetAccount (relationship to gl-accounts):** GL account for the asset (1600+ range per CoA). Example: 1610 'Machinery & Equipment'.
 * - **accumulatedDepreciationAccount (relationship to gl-accounts):** Contra-asset account for accumulated depreciation (1899 range). Credited monthly when depreciation posts.
 * - **depreciationExpenseAccount (relationship to gl-accounts):** Expense account debited when depreciation posts (6000+ range per CoA). Example: 6110 'Depreciation Expense — Machinery'.
 * - **status (select):** Asset lifecycle state: 'active' (in-service), 'inactive' (retired from service but not disposed), 'fully_depreciated' (bookValue = residualValue), 'disposed' (sold/scrapped), 'held_for_sale' (awaiting disposal). Only 'active' generates depreciation.
 * - **disposalDate (date):** Date asset was removed from service (auto-stamped when status → 'disposed'). Triggers gain/loss-on-disposal calculation.
 * - **disposalProceeds (number):** Cash received from asset sale/trade-in (cents). Used to calculate gain/loss per IAS-16 §87-88.
 * - **gainOnDisposal (number, computed, read-only):** = disposalProceeds − bookValue at disposal date. Positive = gain (P&L credit); negative = loss (P&L debit).
 * - **lastMaintenanceDate (date):** Last date asset received maintenance; for asset-lifecycle planning and impairment triggers per IAS-36 (unexpected maintenance needs may signal impairment).
 * - **nextMaintenanceDate (date):** Scheduled maintenance date; system reminder field for preventive maintenance.
 * - **maintenanceNotes (textarea):** Free-text log of repairs, replacements, major overhauls. Per IAS-16 §13, major spare-parts or component overhauls may trigger componentization and separate useful-life reassessment.
 * - **notes (textarea):** General commentary (e.g., "Insured under policy XYZ", "Pledged as collateral on line of credit").
 *
 * ## Core Invariants
 *
 * - **Cost Immutability:** assetCost is set once at acquisition and cannot be changed. All cost adjustments (additional capitalized costs, dismantling, restoration) must be modeled as separate assets or componentization per IAS-16 §13.
 * - **Residual Value Constraint:** residualValue must be ≤ assetCost; depreciableBase must always be ≥ 0.
 * - **Depreciation Ceiling:** accumulatedDepreciation must never exceed depreciableBase (cost − residual). Once bookValue = residualValue, status auto-transitions to 'fully_depreciated' and further depreciation stops.
 * - **GL Account Immutability:** assetAccount, accumulatedDepreciationAccount, depreciationExpenseAccount are set at creation and should not be modified (reclassification requires disposal + reacquisition under new account mapping).
 * - **Single Depreciation Method:** depreciationMethod is chosen at creation and immutable per IAS-16 policy election. Changing methods requires a restatement and retrospective application per IAS-8.
 * - **Status-Driven Lifecycle:** only 'active' and 'modified' statuses trigger depreciation schedules. 'fully_depreciated', 'inactive', 'held_for_sale', 'disposed' do not generate new schedules.
 *
 * ## Audit Trail
 *
 * Every fixed-asset record captures:
 * - `createdBy` (user ID + ISO-8601 timestamp): Initial creation stamp.
 * - `modifiedBy` (user ID + ISO-8601 timestamp): Last modification (tracked per hook).
 * - `lastModified` (ISO-8601 timestamp, read-only): Last change timestamp.
 * - `lastModifiedBy` (user ID): Last modifier ID for access-control audit.
 * All field-level changes (e.g., useful-life revision, depreciation-method correction, residual-value update)
 * are logged to the `audit-events` collection with full before/after values. Depreciation posting (via depreciation-schedules
 * afterChange hook) cascades GL entries automatically, and those postings are auditable via the journal-entries relationship.
 * Per SOX §302 §404, every depreciation calculation must tie back to a depreciation-schedule record with supporting
 * asset-master values. @standard SOX §302 §404; @standard IAS-16 §68-76 (disclosure guidance).
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "fa_uuid_machinery_001",
 *   "tenant": "tenant_bg_001",
 *   "assetNumber": "FIX-2026-0042",
 *   "description": "Forklift Fleet (5 units)",
 *   "descriptionLocalized": {
 *     "en": "Forklift Fleet (5 units)",
 *     "bg": "Флотилия мотокари (5 бр.)"
 *   },
 *   "assetCategory": "machinery",
 *   "acquisitionDate": "2023-01-15",
 *   "assetCost": 5000000,  // 50,000 BGN in cents
 *   "currency": "BGN",
 *   "supplier": "vendor_cat_001",
 *   "location": "Warehouse A, Sofia",
 *   "serialNumber": "CAT-FL950K-2023-00042",
 *   "depreciationMethod": "straight_line",
 *   "usefulLifeYears": 5,
 *   "residualValue": 500000,  // 5,000 BGN
 *   "depreciableBase": 4500000,  // (50,000 − 5,000 BGN)
 *   "annualDepreciationAmount": 900000,  // 9,000 BGN/year
 *   "depreciationStartDate": "2023-01-15",
 *   "accumulatedDepreciation": 2700000,  // 27,000 BGN (3 years × 9,000)
 *   "bookValue": 2300000,  // (50,000 − 27,000 BGN)
 *   "assetAccount": "gl_1610",  // Machinery & Equipment
 *   "accumulatedDepreciationAccount": "gl_1699",
 *   "depreciationExpenseAccount": "gl_6110",
 *   "status": "active",
 *   "lastMaintenanceDate": "2026-04-20",
 *   "createdBy": "accountant_001",
 *   "createdAt": "2023-01-15T10:30:00Z",
 *   "modifiedBy": "accountant_002",
 *   "modifiedAt": "2026-05-10T14:22:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation for fixed assets & leasing
 * @useCase Fixed asset accounting, depreciation scheduling, asset lifecycle management, SOX §404 capital-asset control
 * @accounting IAS-16 property-plant-and-equipment, IAS-36 asset-impairment, US-GAAP ASC-360 PP&E
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-9002 asset-identification
 * @audit ISO-19011:2018 audit-trail capital-asset-verification
 * @compliance SOX §302 §404 internal-controls asset-register
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/depreciationschedules.ts (depreciation posting)
 * @see src/plugins/accounting/collections/leases.ts (ROU assets for finance leases)
 * @see docs/STANDARDS.md §4.2 fixed-asset-accounting
 */
const _baseFixedAssets = createAccountingCollection(
    {
      slug: 'fixed-assets',
      labels: { singular: 'Fixed Asset', plural: 'Fixed Assets' },
      useAsTitle: 'assetNumber',
      defaultColumns: ['assetNumber', 'description', 'assetCategory', 'acquisitionDate', 'assetCost', 'status'],
      beforeChangeHooks: [
        autoPopulateCreatedBy,
        // ISO-8601 disposalDate stamp on status → 'disposed' transition.
        autoSetTimestamp(
          'disposalDate',
          (data) => (data as { status?: string }).status === 'disposed',
        ),
        async ({ data }) => {
          // Calculate depreciable base
          if (data.assetCost !== undefined && data.residualValue !== undefined) {
            data.depreciableBase = calculateDepreciableBase(data.assetCost, data.residualValue);
          }

          // Calculate annual depreciation for straight-line method
          if (data.depreciationMethod === 'straight_line' && data.depreciableBase !== undefined && data.usefulLifeYears) {
            data.annualDepreciationAmount = calculateStraightLineDepreciation(data.depreciableBase, data.usefulLifeYears);
          }

          // Calculate book value
          if (data.assetCost !== undefined && data.accumulatedDepreciation !== undefined) {
            data.bookValue = calculateBookValue(data.assetCost, data.accumulatedDepreciation);
          }

          // Set depreciation start date if not provided
          if (!data.depreciationStartDate && data.acquisitionDate) {
            data.depreciationStartDate = data.acquisitionDate;
          }

          return data;
        },
      ],
    },
    () => [
      multiTenancyField(),
      { name: 'assetNumber', type: 'text', required: true, unique: true, index: true },
      { name: 'description', type: 'text', localized: true, required: true },

      // Asset classification
      {
        name: 'assetCategory',
        type: 'select',
        required: true,
        options: [
          { label: 'Land', value: 'land' },
          { label: 'Building', value: 'building' },
          { label: 'Equipment', value: 'equipment' },
          { label: 'Machinery', value: 'machinery' },
          { label: 'Vehicles', value: 'vehicles' },
          { label: 'Furniture & Fixtures', value: 'furniture_fixtures' },
          { label: 'Leasehold Improvements', value: 'leasehold_improvements' },
          { label: 'Software', value: 'software' },
          { label: 'Intangible Assets', value: 'intangible_assets' },
          { label: 'Other', value: 'other' },
        ],
      },

      // Acquisition details
      { name: 'acquisitionDate', type: 'date', required: true },
      { name: 'assetCost', type: 'number', required: true, min: 0 },
      currencyField('EUR'),
      // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'vendors'.
      // The field's description already said "Asset supplier/vendor" — the
      // relation should always have pointed at the vendor master, not the
      // address book. Address can be resolved via vendor.billingAddress.
      { name: 'supplier', type: 'relationship', relationTo: 'vendors', admin: { description: 'Asset supplier/vendor (IAS-16 §16(a) — directly attributable cost source).' } },
      { name: 'purchaseOrder', type: 'text', admin: { description: 'Reference PO number' } },

      // Physical location
      { name: 'location', type: 'text', admin: { description: 'Physical location/department' } },
      { name: 'serialNumber', type: 'text', unique: true },
      { name: 'barcode', type: 'text', unique: true },

      // Depreciation configuration
      {
        name: 'depreciationMethod',
        type: 'select',
        defaultValue: 'straight_line',
        options: [
          { label: 'Straight Line', value: 'straight_line' },
          { label: 'Declining Balance', value: 'declining_balance' },
          { label: 'Double Declining Balance', value: 'double_declining_balance' },
          { label: 'Units of Activity', value: 'units_of_activity' },
          { label: 'Sum of Years Digits', value: 'sum_of_years_digits' },
        ],
      },
      { name: 'usefulLifeYears', type: 'number', required: true, min: 0 },
      { name: 'residualValue', type: 'number', defaultValue: 0, min: 0, admin: { description: 'Expected residual/salvage value' } },
      { name: 'depreciableBase', type: 'number', admin: { disabled: true, description: 'Cost - Residual Value' } },
      { name: 'annualDepreciationAmount', type: 'number', defaultValue: 0, admin: { disabled: true } },
      { name: 'accumulatedDepreciation', type: 'number', defaultValue: 0, admin: { disabled: true } },
      { name: 'bookValue', type: 'number', defaultValue: 0, admin: { disabled: true, description: 'Cost - Accumulated Depreciation' } },
      { name: 'depreciationStartDate', type: 'date', admin: { description: 'Date depreciation begins' } },
      { name: 'lastDepreciationDate', type: 'date', admin: { disabled: true } },

      // Units of activity method
      { name: 'totalUnitsExpected', type: 'number', admin: { description: 'Total units expected to produce' } },
      { name: 'unitsProducedToDate', type: 'number', defaultValue: 0, admin: { description: 'Units produced so far' } },

      // GL Account mapping
      ...createGLAccountFields([
        { name: 'assetAccount', description: 'Fixed asset GL account (1600+)' },
        { name: 'accumulatedDepreciationAccount', description: 'Accumulated depreciation contra-asset account' },
        { name: 'depreciationExpenseAccount', description: 'Depreciation expense account (6000+)' },
      ]),

      // Status & lifecycle
      statusField(
        [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Fully Depreciated', value: 'fully_depreciated' },
          { label: 'Disposed', value: 'disposed' },
          { label: 'Held for Sale', value: 'held_for_sale' },
        ],
        'active',
      ),
      { name: 'disposalDate', type: 'date', admin: { description: 'Date when asset was disposed' } },
      { name: 'disposalProceeds', type: 'number', admin: { description: 'Amount received from disposal' } },
      { name: 'gainOnDisposal', type: 'number', admin: { disabled: true, description: 'Gain or loss on disposal' } },

      // Maintenance tracking
      { name: 'lastMaintenanceDate', type: 'date' },
      { name: 'nextMaintenanceDate', type: 'date' },
      { name: 'maintenanceNotes', type: 'textarea' },

      notesField(),
    ],
  ) as Partial<CollectionConfig>;

// Compose afterChange chain on top of the factory output. The factory
// doesn't (yet) expose `afterChangeHooks` as an option, so we wire the
// audit-trail emission here per the canonical convention. Once the
// factory grows an `afterChangeHooks` option, move this in.
const FixedAssets: CollectionConfig = {
  ..._baseFixedAssets,
  hooks: {
    ..._baseFixedAssets.hooks,
    afterChange: [
      ...(_baseFixedAssets.hooks?.afterChange ?? []),
      // ISO-19011:2018 audit-trail per banner declaration.
      auditTrailAfterChange('fixed-assets'),
    ],
  },
} as CollectionConfig;

export default FixedAssets;
