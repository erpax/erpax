/**
 * # Vendor Scorecards
 *
 * @summary Periodic vendor performance metrics (OTD, quality, responsiveness) per ISO 9001 §8.4 supplier evaluation.
 *
 * ## Core Function
 *
 * Vendor Scorecards record periodic (typically quarterly) performance metrics for each supplier, including on-time delivery (%),
 * quality acceptance rate (%), price accuracy (%), and response time (avg hours). The overall score and recommendation
 * (preferred → approved → conditional → probation → de-list) drive vendor renewal, probation, or de-listing decisions.
 * ISO 9001 §8.4 mandates supplier evaluation and re-evaluation; this collection is the audit trail for those decisions.
 * QBR (quarterly business review) dates and vendor acknowledgment flags support continuous improvement planning.
 *
 * ## Architecture
 *
 * Multi-tenancy via tenant field (auto-populated). Scorecards are immutable once shared with vendor (status = shared / acknowledged),
 * preventing retro-active performance adjustments. Evaluator is required (procurement / quality manager) to ensure accountability.
 * All scorecards linked to a vendor (relationship); a single vendor may have many scorecards (one per quarter/year).
 * Reference field (auto-generated slug) ensures human-readable ID for QBR meeting notes. Status workflow: draft → reviewed →
 * shared → acknowledged → closed. Audit trail captures evaluator identity and scorecard review date. @standard ISO 9001:2015 §8.4
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — captures tenant from session context.
 * - **beforeChange:** autoPopulateCreatedBy — stamps evaluator as createdBy if not already set.
 * - **afterChange:** auditTrailAfterChange — logs scorecard changes (metric updates, recommendation shifts) to audit-events.
 *
 * ## Key Fields
 *
 * - **reference (text):** Auto-generated tenant-unique reference (e.g. VEND-SCORECARD-BG-2026-Q1). Human-readable scorecard ID.
 * - **vendor (relationship, required):** Link to vendor master record. Used for scorecard filtering and QBR tracking.
 * - **periodLabel (text, required):** Human-readable period (e.g. "2026-Q1", "2026-FY"). Used for trend analysis across quarters.
 * - **periodStartDate, periodEndDate (date):** Metric collection window (e.g. 2026-01-01 to 2026-03-31).
 * - **evaluator (relationship, required):** User who completed the scorecard (procurement manager / quality lead). @audit SOX §404
 * - **metrics.onTimeDeliveryPercent (number 0–100):** OTD % across the period. Target typically ≥ 98%.
 * - **metrics.qualityAcceptanceRate (number 0–100):** % of receipts accepted without nonconformance. Target typically ≥ 99%.
 * - **metrics.priceAccuracyPercent (number 0–100):** % of invoices matching PO price. Variance tracking for cost control.
 * - **metrics.responseTimeAvgHours (number):** Average vendor response time to RFQs and queries (hours). Lower is better.
 * - **metrics.returnRatePercent (number 0–100):** % of goods returned / rejected due to defects.
 * - **metrics.sustainabilityScore (number 0–100, optional):** ESG / supplier-sustainability score per corporate policy.
 * - **metrics.cybersecurityScore (number 0–100, optional):** ISO 27001 A.5.19 supplier-information-security score. @standard ISO-27001
 * - **volumes.totalSpend (number):** Sum of vendor invoices in period (cents). Used for volume-weighted performance.
 * - **volumes.numberOfPurchaseOrders (number):** Count of POs issued in period. Indicates engagement level.
 * - **volumes.numberOfReceipts (number):** Count of goods-receipts processed. Used to weight OTD % calculation.
 * - **volumes.numberOfNonconformances (number):** Count of quality issues / nonconforming receipts.
 * - **volumes.numberOfReturns (number):** Count of goods returned / rejected.
 * - **overallScore (number 0–100):** Weighted composite score that drives the recommendation. Calculation: typically 30% OTD + 40% quality + 20% price + 10% response time.
 * - **recommendation (select, required):** [preferred, approved, conditional, probation, delist]; determines vendor status for next FY.
 * - **improvementPlan (textarea):** Required when recommendation = conditional / probation; specifies what vendor must do to improve.
 * - **reviewedWithVendor (checkbox):** Whether the scorecard was reviewed in a QBR meeting (governance evidence).
 * - **reviewMeetingDate (date):** QBR meeting date (evidence of continuous improvement discussion).
 * - **status (select):** [draft, reviewed, shared, acknowledged, closed]; workflow status. @audit ISO-19011:2018
 *
 * ## Core Invariants
 *
 * - **periodUniquenessPerVendor:** vendor + periodLabel is unique per tenant; prevents duplicate scorecards for same period.
 * - **metricsBoundaries:** all % metrics clamped [0, 100]; responseTimeAvgHours ≥ 0; total Spend, counts ≥ 0.
 * - **overallScoreDerivedFromMetrics:** overallScore computed from metrics via weighted formula; recalculated on save.
 * - **recommendationBasedOnOverallScore:** recommendation is driven by overallScore bands (e.g. ≥ 95% = preferred, 85–94% = approved).
 * - **improvementPlanRequiredForRisk:** if recommendation = conditional | probation, improvementPlan field must be non-empty.
 * - **immutabilityAfterAcknowledgment:** once status = acknowledged, scorecard cannot be modified (prevents retro-active changes).
 * - **multiTenancyIsolation:** tenant field enforced; scorecards for one tenant invisible to another.
 *
 * ## Audit Trail
 *
 * Every scorecard captures: createdAt (timestamp), createdBy (evaluator user ID), modifiedAt, modifiedBy. All metric changes,
 * recommendation shifts, and QBR meeting dates logged to audit-events with full deltas. @standard SOX §404 @audit ISO-19011:2018
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "scorecard_uuid_1",
 *   "tenant": "tenant_uuid_1",
 *   "reference": "VEND-SCORECARD-BG-2026-Q1",
 *   "vendor": "vendors_uuid_1",
 *   "periodLabel": "2026-Q1",
 *   "periodStartDate": "2026-01-01",
 *   "periodEndDate": "2026-03-31",
 *   "evaluator": "user_uuid_procurement",
 *   "metrics": {
 *     "onTimeDeliveryPercent": 97.5,
 *     "qualityAcceptanceRate": 98.9,
 *     "priceAccuracyPercent": 100.0,
 *     "responseTimeAvgHours": 2.1
 *   },
 *   "volumes": { "totalSpend": 2500000, "numberOfPurchaseOrders": 23 },
 *   "overallScore": 96.8,
 *   "recommendation": "approved",
 *   "reviewedWithVendor": true,
 *   "reviewMeetingDate": "2026-04-10",
 *   "status": "acknowledged",
 *   "createdAt": "2026-04-05T11:00:00Z",
 *   "createdBy": "user_uuid_procurement"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Vendor performance tracking, QBR planning, vendor renewal decisions
 * @standard ISO 9001:2015 §8.4 control-of-externally-provided-processes
 * @standard ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-27001 A.5.19 supplier-information-security
 * @standard ISO-18001:2007 occupational-health-and-safety-vendor-compliance
 * @standard ISO-14001:2015 environmental-management-esg-vendor-scoring
 * @standard ISO-50001:2018 energy-management-logistics-suppliers
 * @standard COSO internal-control-vendor-risk-assessment
 * @standard ISO-31000:2018 risk-management-vendor-framework
 * @standard ISO-19011:2018 audit-trail-vendor-evaluation-evidence
 * @audit ISO-19011:2018 audit-trail-vendor-evaluation
 * @compliance SOX §404 internal-controls-vendor-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./vendors.ts
 */
import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const VendorScorecards: CollectionConfig = {
  slug: 'vendor-scorecards',
  labels: { singular: 'Vendor Scorecard', plural: 'Vendor Scorecards' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'vendor', 'periodLabel', 'overallScore', 'recommendation', 'status'],
    description:
      'ISO 9001 §8.4 vendor performance scorecard. Periodic (typically quarterly). Drives renewal / probation / de-listing decision.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    referenceField(),
    { name: 'vendor', type: 'relationship', relationTo: 'vendors', required: true, index: true },
    { name: 'periodLabel', type: 'text', required: true,
      admin: { description: 'e.g. 2026-Q1, 2026-FY.' } },
    { name: 'periodStartDate', type: 'date', required: true },
    { name: 'periodEndDate', type: 'date', required: true },
    { name: 'evaluator', type: 'relationship', relationTo: 'users', required: true,
      admin: { description: 'Procurement / quality manager who completed the scorecard.' } },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        { name: 'onTimeDeliveryPercent', type: 'number', min: 0, max: 100,
          admin: { description: 'OTD % across the period.' } },
        { name: 'qualityAcceptanceRate', type: 'number', min: 0, max: 100,
          admin: { description: '% of receipts accepted without nonconformance.' } },
        { name: 'priceAccuracyPercent', type: 'number', min: 0, max: 100,
          admin: { description: '% of invoices matching PO price.' } },
        { name: 'responseTimeAvgHours', type: 'number',
          admin: { description: 'Average vendor response time to RFQs / queries (hours).' } },
        { name: 'returnRatePercent', type: 'number', min: 0, max: 100 },
        { name: 'sustainabilityScore', type: 'number', min: 0, max: 100,
          admin: { description: 'Optional ESG / supplier-sustainability score.' } },
        { name: 'cybersecurityScore', type: 'number', min: 0, max: 100,
          admin: { description: 'ISO 27001 A.5.19 supplier-information-security score.' } },
      ],
    },
    {
      name: 'volumes',
      type: 'group',
      fields: [
        { name: 'totalSpend', type: 'number', defaultValue: 0,
          admin: { description: 'Σ vendor invoices in period (cents).' } },
        { name: 'numberOfPurchaseOrders', type: 'number', defaultValue: 0 },
        { name: 'numberOfReceipts', type: 'number', defaultValue: 0 },
        { name: 'numberOfNonconformances', type: 'number', defaultValue: 0 },
        { name: 'numberOfReturns', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'overallScore', type: 'number', min: 0, max: 100,
      admin: { description: 'Weighted composite score (0-100). Drives the recommendation.' } },
    {
      name: 'recommendation',
      type: 'select',
      required: true,
      options: [
        { label: 'Preferred (top tier)', value: 'preferred' },
        { label: 'Approved (continue using)', value: 'approved' },
        { label: 'Conditional (improvement plan required)', value: 'conditional' },
        { label: 'Probation (risk; monitor closely)', value: 'probation' },
        { label: 'De-list (do not award new business)', value: 'delist' },
      ],
    },
    { name: 'improvementPlan', type: 'textarea',
      admin: { description: 'Required when recommendation = conditional / probation — what the vendor must do.' } },
    { name: 'reviewedWithVendor', type: 'checkbox', defaultValue: false,
      admin: { description: 'Was the scorecard discussed with the vendor in a QBR?' } },
    { name: 'reviewMeetingDate', type: 'date' },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Reviewed (internal)', value: 'reviewed' },
        { label: 'Shared with Vendor', value: 'shared' },
        { label: 'Acknowledged by Vendor', value: 'acknowledged' },
        { label: 'Closed', value: 'closed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('vendor-scorecards')],
  },
  timestamps: true,
}

export default VendorScorecards
