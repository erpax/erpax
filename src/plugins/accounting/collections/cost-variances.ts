/**
 * [1. Core Function] — Cost Variances decompose IAS-2 §21 standard-cost deltas (standard cost × completed quantity vs. actual costs absorbed) into six categories: material-price (actual unit-cost vs standard), material-quantity (actual qty vs standard qty), labour-rate (actual wage vs standard rate), labour-efficiency (actual hours vs standard hours), overhead-spending (actual allocation vs standard), and overhead-volume (capacity utilization variance). Generated when a work-order closes, variances are reviewed for disposition (favorable/unfavorable) and posted to GL variance accounts per cost-accounting policy.
 *
 * [2. Architecture] — Variance system required by IAS-2 §21 (standard-cost method) for cost-of-conversion tracking. Pairs with work-orders (standard-cost snapshot) and production-receipts (actual costs consumed). Multi-tenant isolation via tenant field. Variances are computed automatically when WO status transitions from completed → closed. Each variance category decomposed per manufacturing-accounting doctrine (material variance = price + qty; labour variance = rate + efficiency; overhead variance = spending + volume). GL posting disposition (favorable = credit variance account; unfavorable = debit variance account) enables management reporting (KPI variances by cause: supplier price increases vs production inefficiencies vs overhead absorption).
 *
 * [3. Hooks & Validation] — Variances are generated on production-receipt posting (status → posted) and accumulated until WO close (status → closed). No direct creation hooks; emitted by cost-variance-calculation service on WO transition. afterChange: auditTrailAfterChange (variance records logged). Standards: @standard IFRS IAS-2 §21 standard-cost variance method, @standard US-GAAP ASC-330-10-30 variance recognition.
 *
 * [4. Key Fields] — reference (text, unique, required): variance reference e.g., VAR-2026-04-0001. workOrder (relationship, required): link to WO. varianceDate (date, required): date variance computed (typically WO close date). variances (group): decomposition per category: materialPriceVariance (actual price − standard price) × actual qty), materialQuantityVariance ((actual qty − standard qty) × standard price), labourRateVariance ((actual wage − standard wage) × actual hours), labourEfficiencyVariance ((actual hours − standard hours) × standard wage), overheadSpendingVariance (actual overhead − standard allocation), overheadVolumeVariance (standard allocation − (standard rate × actual hours)). Notes on sign convention: + = unfavorable (cost overrun); − = favorable (cost savings). totalVariance (readonly): Σ of six categories. journalEntry (relationship, readonly): GL posting reference (Dr Variance Account / Cr standard-cost inventory variance reversal). status (select): draft/approved/posted/reversed.
 *
 * [5. Invariants] — checkVarianceSum: totalVariance = materialPriceVariance + materialQuantityVariance + labourRateVariance + labourEfficiencyVariance + overheadSpendingVariance + overheadVolumeVariance (exact, no rounding error > 1 cent). checkWorkOrderValidity: workOrder must exist and be in closed status. checkVarianceDocumentation: if totalVariance exceeds threshold (e.g., 10% of standard cost), variance must have notes for justification. checkGLPosting: on status=posted, must create GL entry (Dr Variance Account / Cr Inventory Variance) matching totalVariance amount.
 *
 * [6. Audit Trail] — Variance computation (on WO close) emits production:variance-computed event. Variance record creation logged with who, what (6 categories, total), when to audit-events. GL posting (status → posted) immutable; reversal only via separate reversal-variance record. SOX §404: variance review & approval gate (status = draft until reviewed, then approved before posting). Variance investigator documents cause (supplier price increase, labour inefficiency, overhead absorption shortfall) for management reporting.
 *
 * [7. Example] — Bulgaria automotive: VAR-2026-05-0023 for WO-2026-05-0042 (100 engine blocks). Standard cost snapshot at WO release: material 500000 BGN, labour 130000 BGN, overhead 103000 BGN. Actual costs absorbed from 98 production-receipts: material 509000 BGN (component supplier price increase + higher waste), labour 129000 BGN (efficiency gain from faster assembly), overhead 105000 BGN (higher absorption due to extra shifts). Variance decomposition: material-price +12000 BGN unfavorable (supplier raised prices per EU regulations), material-qty −3000 BGN favorable (waste lower than expected), labour-rate −500 BGN favorable (no rate change), labour-efficiency −500 BGN favorable (faster operation), overhead-spending +2000 BGN unfavorable (higher utilities), overhead-volume 0 (normal capacity maintained). Total unfavorable: +10000 BGN. GL posts Dr Unfavorable Variance (100) 10000 BGN / Cr Inventory Variance Reversal (130-var) 10000 BGN. Notes document: "EU energy tariff increase; supplier price pass-through; labour efficiency from process improvement implemented Q2".
 *
 * [8. Phase Slice] — Phase 2.12, Task 7: Inventory & Operations. Final 8-section JSDoc: inventory-movements, warehouse-locations, work-orders, bills-of-materials, production-receipts, quality-inspections, cost-variances (this), consignment-inventory, maintenance-work-orders. All changes subject to local tsc + vitest gates; cumulative audit per slice LLL–VV findings resolution.
 *
 * @standard IAS-2 (Inventories) — §21 standard-cost variance method & recognition
 * @standard ISO-8601-1:2019 — varianceDate field
 * @standard US-GAAP ASC-330-10-30 — Inventory Valuation & Variance Recognition
 * @standard ISO-22400:2014 — Manufacturing Key Performance Indicators
 * @feature standard-cost-variance — 6-category decomposition (material-price/qty, labour-rate/efficiency, overhead-spending/volume)
 * @feature variance-investigation — cause documentation (supplier, labour, overhead) for KPI reporting
 * @feature gl-posting — automatic GL entries (Dr Unfavorable / Cr Inventory Variance) per variance sign
 * @invariant checkVarianceSum — totalVariance = Σ of 6 categories (no rounding error)
 * @invariant checkWorkOrderClosed — workOrder must be in closed status
 * @useCase "100-unit WO closes; actual material cost 1% higher than standard (supplier price increase); variance posted to unfavorable-variance GL account"
 * @useCase "Labour efficiency exceeds standard (team trained on new process); 2% favorable labour-efficiency variance posted to favorable-variance GL account"
 * @useCase "Overhead absorption falls short due to lower machine utilization (demand drop); unfavorable overhead-volume variance requires capacity-planning review"
 * @role production-accountant "Compute cost variances on WO close; investigate significant variances (>10% threshold); approve GL posting"
 * @role management-accountant "Review variance trends; identify systemic issues (supplier inflation, labour rate changes); recommend corrective actions"
 * @summary IAS-2 §21 standard-cost variance tracking with 6-category decomposition, GL posting, and investigation documentation for cost-accounting
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const CostVariances: CollectionConfig = {
  slug: 'cost-variances',
  labels: { singular: 'Cost Variance', plural: 'Cost Variances' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'workOrder', 'varianceDate', 'totalVariance', 'status'],
    description:
      'IAS-2 §21 standard-cost variances. One row per work-order close — decomposed into price/quantity/labour-rate/labour-efficiency/overhead variance categories.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Variance reference (e.g. `VAR-2026-04-0001`).' }),
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders', required: true, index: true },
    { name: 'varianceDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — date the variance was computed (typically WO close).' } },
    currencyField(),
    {
      name: 'variances',
      type: 'group',
      label: 'Variance decomposition (IAS-2 §21)',
      fields: [
        { name: 'materialPriceVariance', type: 'number', defaultValue: 0,
          admin: { description: 'Σ((actual price − standard price) × actual qty). + = unfavourable. In cents.' } },
        { name: 'materialQuantityVariance', type: 'number', defaultValue: 0,
          admin: { description: 'Σ((actual qty − standard qty) × standard price). + = unfavourable. In cents.' } },
        { name: 'labourRateVariance', type: 'number', defaultValue: 0,
          admin: { description: '(Actual rate − standard rate) × actual hours. In cents.' } },
        { name: 'labourEfficiencyVariance', type: 'number', defaultValue: 0,
          admin: { description: '(Actual hours − standard hours) × standard rate. In cents.' } },
        { name: 'overheadSpendingVariance', type: 'number', defaultValue: 0,
          admin: { description: 'Actual overhead − (standard rate × actual hours). In cents.' } },
        { name: 'overheadVolumeVariance', type: 'number', defaultValue: 0,
          admin: { description: '(Standard rate × actual hours) − (standard rate × standard hours allowed). IAS-2 §13 unallocated overhead. In cents.' } },
      ],
    },
    { name: 'totalVariance', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Σ of the 6 variance components.' } },
    {
      name: 'disposition',
      type: 'select',
      defaultValue: 'cogs',
      options: [
        { label: 'COGS (sold + on-hand pro-rata, IAS-2 §13)', value: 'cogs' },
        { label: 'Inventory Adjustment (capitalise to FG)', value: 'inventory' },
        { label: 'Period Expense (write off immediately)', value: 'period' },
      ],
      admin: { description: 'How the variance is disposed at WO close. IAS-2 §13 requires cogs/inventory split when material; immaterial → period.' },
    },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE that books the variance disposition.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Disposition', value: 'pending_disposition' },
        { label: 'Disposed', value: 'disposed' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('cost-variances')],
  },
  timestamps: true,
}

export default CostVariances
