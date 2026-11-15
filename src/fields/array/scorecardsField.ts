import type { Field } from 'payload'
import { validations } from 'payload/shared'

/**
 * Vendor scorecards — the periodic evaluation of a supplier (ISO 9001:2015 §8.4.1 evaluation and
 * re-evaluation of external providers; ISO 27001 A.5.19 supplier security). It was the
 * vendor-scorecards collection, one row per vendor and period; a scorecard is the vendor's, so it is
 * a row on the party.
 *
 *   · one scorecard per period;
 *   · a period ends on or after it starts;
 *   · a conditional or probation recommendation carries the improvement plan the vendor must follow;
 *   · a stored scorecard is never removed (§8.4.1 retains the results as documented information), and
 *     scorecards belong to a vendor (`partyRows`, the parties hook).
 */

interface Scorecard {
  periodLabel?: string | null
}

/** A period ends on or after it starts. */
export const periodError = (end: unknown, start: unknown): string | true =>
  !end || !start || String(end) >= String(start) ? true : 'A scorecard period ends on or after it starts.'

/** A conditional or probation recommendation carries the vendor's improvement plan. */
export const improvementPlanError = (plan: unknown, recommendation: unknown): string | true =>
  ['conditional', 'probation'].includes(String(recommendation)) && !String(plan ?? '').trim()
    ? 'A conditional or probation recommendation carries the improvement plan the vendor must follow.'
    : true

/** One scorecard per period. */
export const duplicatePeriodError = (rows: unknown): string | true => {
  const labels = (Array.isArray(rows) ? (rows as Scorecard[]) : []).map((row) => String(row.periodLabel ?? '').trim().toLowerCase())
  return new Set(labels).size === labels.length ? true : 'A vendor has one scorecard per period.'
}

type Check = (value: unknown, args: never) => string | true | Promise<string | true>
type Sibling = { siblingData?: Record<string, unknown> }

const percent = (name: string, description?: string): Field => ({ name, type: 'number', min: 0, max: 100, ...(description ? { admin: { description } } : {}) })

export const scorecardsField = (): Field => ({
  name: 'scorecards',
  type: 'array',
  labels: { singular: 'Scorecard', plural: 'Scorecards' },
  admin: { description: 'Periodic evaluation of this vendor (ISO 9001 §8.4.1). A scorecard is kept, never removed.' },
  validate: (async (value: unknown, args: never) => {
    const first = await (validations.array as unknown as Check)(value, args)
    return first === true ? duplicatePeriodError(value) : first
  }) as never,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'periodLabel', type: 'text', required: true, admin: { description: 'e.g. 2026-Q1, 2026-FY.' } },
        { name: 'periodStartDate', type: 'date', required: true },
        {
          name: 'periodEndDate',
          type: 'date',
          required: true,
          validate: (async (value: unknown, args: never) => {
            const first = await (validations.date as unknown as Check)(value, args)
            return first === true ? periodError(value, (args as Sibling).siblingData?.periodStartDate) : first
          }) as never,
        },
        { name: 'evaluator', type: 'relationship', relationTo: 'users', required: true, admin: { description: 'Procurement or quality manager who completed the scorecard.' } },
      ],
    },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        percent('onTimeDeliveryPercent', 'On-time delivery across the period.'),
        percent('qualityAcceptanceRate', 'Receipts accepted without nonconformance.'),
        percent('priceAccuracyPercent', 'Invoices matching the PO price.'),
        { name: 'responseTimeAvgHours', type: 'number', min: 0, admin: { description: 'Average response time to RFQs and queries (hours).' } },
        percent('returnRatePercent'),
        percent('sustainabilityScore', 'Optional ESG / supplier-sustainability score.'),
        percent('cybersecurityScore', 'ISO 27001 A.5.19 supplier information-security score.'),
      ],
    },
    {
      name: 'volumes',
      type: 'group',
      fields: [
        { name: 'totalSpend', type: 'number', min: 0, defaultValue: 0, admin: { description: 'Vendor invoices in the period (cents).' } },
        { name: 'numberOfPurchaseOrders', type: 'number', min: 0, defaultValue: 0 },
        { name: 'numberOfReceipts', type: 'number', min: 0, defaultValue: 0 },
        { name: 'numberOfNonconformances', type: 'number', min: 0, defaultValue: 0 },
        { name: 'numberOfReturns', type: 'number', min: 0, defaultValue: 0 },
      ],
    },
    {
      type: 'row',
      fields: [
        percent('overallScore', 'Composite score (0–100) the evaluator records.'),
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
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Reviewed (internal)', value: 'reviewed' },
            { label: 'Shared with Vendor', value: 'shared' },
            { label: 'Acknowledged by Vendor', value: 'acknowledged' },
            { label: 'Closed', value: 'closed' },
          ],
        },
      ],
    },
    {
      name: 'improvementPlan',
      type: 'textarea',
      admin: { description: 'What the vendor must do — required for a conditional or probation recommendation.' },
      validate: (async (value: unknown, args: never) => {
        const first = await (validations.textarea as unknown as Check)(value, args)
        return first === true ? improvementPlanError(value, (args as Sibling).siblingData?.recommendation) : first
      }) as never,
    },
    {
      type: 'row',
      fields: [
        { name: 'reviewedWithVendor', type: 'checkbox', defaultValue: false, admin: { description: 'Discussed with the vendor in a business review.' } },
        { name: 'reviewMeetingDate', type: 'date' },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
})
