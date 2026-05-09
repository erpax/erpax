/**
 * Performance Obligations — IFRS 15 §22 distinct promises within a contract.
 *
 * The canonical type lives in `@/standards/ifrs-15` (PerformanceObligation).
 * This collection's field set is the Payload projection of that type:
 *
 *   canonical.id              → doc.id (Payload-managed)
 *   canonical.contractId      → doc.contract (relationship)
 *   canonical.description     → doc.description
 *   canonical.kind            → doc.kind (distinct | series)
 *   canonical.recognitionTiming → doc.recognitionTiming (point_in_time | over_time)
 *   canonical.overTimeMeasurement → doc.overTimeMeasurement (output_method | input_method)
 *   canonical.measurementKind → doc.measurementKind (units_delivered, ...)
 *   canonical.standaloneSellingPrice → doc.standaloneSellingPrice
 *   canonical.allocatedAmount → doc.allocatedAmount
 *   canonical.recognizedAmount → doc.recognisedToDate (legacy spelling preserved)
 *   canonical.status          → doc.status
 *   canonical.satisfiedAt     → doc.satisfiedAt
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time satisfaction-date
 * @accounting IFRS IFRS-15 §22 distinct-performance-obligation
 * @accounting IFRS IFRS-15 §31 satisfaction-of-performance-obligation
 * @accounting IFRS IFRS-15 §35 over-time-recognition
 * @accounting IFRS IFRS-15 §38 point-in-time-recognition
 * @accounting IFRS IFRS-15 §41-§43 progress-measurement
 * @accounting US-GAAP ASC-606-10-25-14 distinct-goods-services
 * @accounting US-GAAP ASC-606-10-25-31 progress-measurement
 * @audit ISO-19011:2018 audit-trail po-satisfaction
 * @compliance SOX §404 internal-controls revenue-recognition
 * @see src/standards/ifrs-15/types.ts PerformanceObligation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const PerformanceObligations: CollectionConfig = {
  slug: 'performance-obligations',
  labels: { singular: 'Performance Obligation', plural: 'Performance Obligations' },
  admin: { useAsTitle: 'description', defaultColumns: ['contract', 'description', 'standaloneSellingPrice', 'recognitionMethod', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'contract', type: 'relationship', relationTo: 'contracts', required: true, index: true },
    { name: 'description', type: 'text', required: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'distinct',
      options: [
        { label: 'Distinct (IFRS 15 §22(a))', value: 'distinct' },
        { label: 'Series of distinct (IFRS 15 §22(b))', value: 'series' },
      ],
      admin: {
        description:
          'IFRS 15 §22(a): one distinct promise. §22(b): a series of substantially-the-same distinct goods/services with the same pattern of transfer (typical for SaaS subscriptions).',
      },
    },
    {
      name: 'recognitionTiming',
      type: 'select',
      required: true,
      defaultValue: 'point_in_time',
      options: [
        { label: 'Point-in-time (IFRS 15 §38)', value: 'point_in_time' },
        { label: 'Over-time (IFRS 15 §35)', value: 'over_time' },
      ],
      admin: {
        description:
          'When the customer obtains control. Most goods → point-in-time at delivery; services that meet §35 criteria → over-time.',
      },
    },
    {
      name: 'overTimeMeasurement',
      type: 'select',
      options: [
        { label: 'Output method (IFRS 15 §B15-B17)', value: 'output_method' },
        { label: 'Input method (IFRS 15 §B18-B19)', value: 'input_method' },
      ],
      admin: {
        description:
          'Required when recognitionTiming = over_time. Output methods measure value transferred; input methods measure inputs consumed.',
        condition: (data) =>
          (data as { recognitionTiming?: string })?.recognitionTiming === 'over_time',
      },
    },
    {
      name: 'measurementKind',
      type: 'select',
      options: [
        // Output method kinds (IFRS 15 §B15-B17)
        { label: 'Units delivered (output)', value: 'units_delivered' },
        { label: 'Units produced (output)', value: 'units_produced' },
        { label: 'Milestones (output)', value: 'milestones' },
        { label: 'Time elapsed (output) — most common for SaaS', value: 'time_elapsed' },
        { label: 'Survey of work (output)', value: 'survey_of_work' },
        // Input method kinds (IFRS 15 §B18-B19)
        { label: 'Cost-to-cost (input) — typical construction', value: 'cost_to_cost' },
        { label: 'Labor hours (input)', value: 'labor_hours' },
        { label: 'Machine hours (input)', value: 'machine_hours' },
        { label: 'Resources consumed (input)', value: 'resources_consumed' },
        { label: 'Time passed (input)', value: 'time_passed' },
      ],
      admin: {
        description:
          'Specific measurement kind under the chosen output/input method.',
        condition: (data) =>
          (data as { recognitionTiming?: string })?.recognitionTiming === 'over_time',
      },
    },
    /**
     * @deprecated Replaced by `recognitionTiming` + `overTimeMeasurement` +
     * `measurementKind` (canonical IFRS-15 split). Preserved for back-compat
     * with seeded data; set by a sync hook in a future slice. New writes
     * should populate the canonical fields and may leave this null.
     */
    {
      name: 'recognitionMethod',
      type: 'select',
      options: [
        { label: 'Point-in-time (IFRS 15 §38)', value: 'point_in_time' },
        { label: 'Over-time — input method (IFRS 15 §35)', value: 'over_time_input' },
        { label: 'Over-time — output method (IFRS 15 §35)', value: 'over_time_output' },
      ],
      admin: {
        description:
          'DEPRECATED — superseded by recognitionTiming + overTimeMeasurement + measurementKind. Kept for back-compat.',
        position: 'sidebar',
      },
    },
    { name: 'standaloneSellingPrice', type: 'number', required: true, min: 0, admin: { description: 'In cents. Maps to canonical PerformanceObligation.standaloneSellingPrice.' } },
    currencyField(),
    {
      name: 'allocatedAmount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Portion of contract transaction price allocated to this PO (cents). Computed by IFRS 15 §73 relative-SSP. Maps to canonical PerformanceObligation.allocatedAmount.',
      },
    },
    {
      name: 'recognisedToDate',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description:
          'Cumulative recognised revenue (cents). Maps to canonical PerformanceObligation.recognizedAmount (note spelling — collection preserves British spelling for back-compat with seed data).',
      },
    },
    {
      name: 'percentComplete',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description:
          'For over-time methods: 0–100. Maps to canonical PerformanceObligation.progress × 100 (canonical type uses 0..1 fraction).',
      },
    },
    statusField(
      [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Satisfied', value: 'satisfied' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'pending',
    ),
    { name: 'satisfiedAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp('satisfiedAt', (d) => (d as { status?: string }).status === 'satisfied'),
    ],
    afterChange: [auditTrailAfterChange('performance-obligations')],
  },
  timestamps: true,
}

export default PerformanceObligations
