import type { CollectionConfig } from 'payload'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy';
import { autoSetTimestamp } from '../hooks/autoSetTimestamp';
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange';
import { createAccountingCollection, createGLAccountFields } from '../services/accounting/factories';
import { currencyField, statusField, notesField } from '../fields';
// Slice PPP: depreciationHook removed — delegated to a `req.payload.services?.depreciation`
// service that doesn't exist in `src/services/` (silent no-op). Depreciation
// will fold into a scheduled job (Slice ZZ pattern with `dunningJob`) when
// the maintainer designs the cron-driven posting cadence.
import {
  calculateDepreciableBase,
  calculateStraightLineDepreciation,
  calculateBookValue,
} from '../services/accounting/utilities';

/**
 * Fixed Assets — capitalized PP&E with depreciation and book-value tracking.
 *
 * Slice ZZ: autoPopulateCreatedBy threaded into the factory's beforeChange
 * chain; ISO-8601 disposalDate auto-stamped on status → 'disposed';
 * audit-trail emission wired at the post-factory composition point.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date
 * @accounting IFRS IAS-16 property-plant-and-equipment
 * @accounting IFRS IAS-36 impairment-of-assets
 * @accounting US-GAAP ASC-360 property-plant-and-equipment
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls capital-asset-register
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.2
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
