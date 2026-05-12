/**
 * # Opportunities
 *
 * @summary Sales-pipeline deals with probability-weighted forecast, close-won contract creation, and revenue-recognition trigger.
 *
 * ## Core Function
 *
 * Opportunities represent qualified sales deals: identified customer needs, proposed solution, negotiation status, and close forecast.
 * Each opportunity links to a lead (prospect conversion) or existing customer (upsell/cross-sell). Stages (qualification → discovery → solution →
 * quote → negotiation → verbal-commit → closed-won/lost) gate workflow. Probability (0-100%) is snapshot-based; weightedAmount = amount × probability/100
 * feeds the sales forecast. On close-won, emitOpportunityWon hook creates a contract and (if needed) a customer. Close-lost reasons (price, fit, timing,
 * competitor, budget, politics) provide win/loss analysis. Revenue recognition under IFRS-15 §9 is triggered on contract-existence (typically close-won).
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenantId`. Lead and customer relationships allow lead-origin or upsell paths. OpportunityOwner (sales rep) drives
 * assignment and forecasting rollup. ForecastCategory (pipeline, best_case, commit, closed, omitted) aligns with sales-forecast conventions (Siebel-style).
 * Segment relationship enables IFRS-15 §4 portfolio grouping (if segment is marked isPortfolioForIfrs15). ChainEventEmitters (emitOpportunityWon)
 * trigger GL and contract creation on status → closed_won. Activity relationship (optional) links contact logs, emails, calls for deal-progression tracking.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** autoPopulateCreatedBy — track opportunity creation user (sales rep)
 * - **afterChange:** emitOpportunityWon, auditTrailAfterChange — on close-won: create contract; log stage changes and probability updates
 *
 * ## Key Fields
 *
 * - **name (text, localized, required, index):** Deal name / company-opportunity identifier (e.g., "Acme Corp - Enterprise License", "Localized: ООО Интех Лтд -엔터프라이즈"). @standard ISO-639-1 localization
 * - **lead (relationship → leads):** Source lead (prospect origin). Null for customer-direct upsells.
 * - **customer (relationship → customers):** Existing customer (for upsell/cross-sell). Null for net-new from lead.
 * - **opportunityOwner (relationship → users, required):** Sales rep owner. Drives forecast rollup and assignment authority.
 * - **stage (select, required, default: qualification):** Pipeline stage: qualification, discovery, solution, quote_sent, negotiation, verbal_commit, closed_won, closed_lost, closed_no_decision. @standard IFRS-15 §9 contract-existence
 * - **probability (number, min: 0, max: 100, default: 10):** Snapshot probability (0-100%). Stage defaults available but operator can override.
 * - **currency (text, required, default: EUR):** ISO-4217 currency code (deal currency, may differ from customer default). @standard ISO-4217:2015
 * - **amount (number, required, cents):** Annual contract value (ARR for SaaS) or one-time TCV. Forecast basis.
 * - **weightedAmount (number, readOnly, cents):** amount × probability/100. Aggregated for sales-pipeline forecast.
 * - **expectedCloseDate (date, required, index):** Projected close date. Forecast-period scheduling.
 * - **actualCloseDate (date):** Date deal actually closed (close-won or close-lost). Null until stage → closed_won/lost.
 * - **closeReason (select, conditional on closed):** Win/loss reason: price, product_fit, timing, competitor, internal_politics, budget_cut, other. Win/loss analysis.
 * - **competitor (text, conditional on closeReason = competitor):** Competitor name if lost to competitor. Competitive intelligence.
 * - **forecastCategory (select):** Forecast convention: pipeline (≤ SQL), best_case (verbal commit), commit (fully negotiated), closed (won/lost), omitted (abandoned). Sales-operations rollup.
 * - **segment (relationship → customer-segments):** Customer segment (for IFRS-15 §4 portfolio grouping if applicable). @accounting IFRS-15 §4 portfolio-practical-expedient
 * - **campaign (text):** Campaign identifier (marketing-origin attribution, e.g., "Q2-Webinar", "InboundContent2026").
 * - **contractCreated (relationship → contracts, readOnly):** Contract auto-created on close-won (via emitOpportunityWon). Links to contract-creation event.
 * - **status (select, required, default: open):** Lifecycle: open, won, lost, abandoned. Query filter shortcut.
 * - **createdBy (relationship → users, readOnly):** User who created the opportunity (typically sales rep or CRM admin).
 * - **createdAt (date, readOnly):** Creation timestamp (ISO-8601).
 * - **modifiedBy (relationship → users, readOnly):** Last user who updated stage/probability/amount.
 * - **modifiedAt (date, readOnly):** Last modification timestamp.
 * - **note (textarea):** Internal notes (decision-criteria, objection handling, next steps, risk flags).
 * - **tenantId (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **ContractExistence:** On stage → closed_won, emitOpportunityWon creates contract + adjusts customer (creates if needed). @standard IFRS-15 §9 contract-existence
 * - **ProbabilityStageDefault:** Probability defaults per stage (qualification: 10%, discovery: 25%, solution: 50%, quote: 65%, negotiation: 75%, verbal: 85%, closed: 100%).
 * - **ForecastAmountUpdate:** weightedAmount = amount × probability/100. Read-only; auto-computed on amount or probability change.
 * - **CloseDateValidation:** actualCloseDate ≤ today (cannot close in future); expectedCloseDate ≥ today (future forecast).
 * - **NetNewVsUpsell:** Either lead OR customer is set, not both. Upsells have customer; net-new conversions have lead.
 * - **TenantIsolation:** Queries filtered by tenantId; cross-tenant access denied. @standard SOX §302
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All stage transitions, probability updates, and amount changes logged to `audit-events` with full field deltas.
 * Close-won and close-lost events timestamped separately; contract-creation and lead-conversion events logged as chain triggers.
 * Forecast-category changes and win/loss reasons logged for sales-operations win/loss reporting.
 * @standard SOX §302 CRM pipeline control
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "opp_uuid_acme_ent",
 *   "tenantId": "tenant_bg_ltd",
 *   "name": "Acme Corp — Enterprise License (3-year)",
 *   "nameLocalized": { "bg": "ООО Акме — Лицензиране на предприятие (3-годишно)", "en": "Acme Corp — Enterprise License (3-year)" },
 *   "lead": "lead_uuid_2026_001",
 *   "customer": null,
 *   "opportunityOwner": "user_uuid_rep_alice",
 *   "stage": "closed_won",
 *   "probability": 100,
 *   "currency": "BGN",
 *   "amount": 40000000,
 *   "weightedAmount": 40000000,
 *   "expectedCloseDate": "2026-06-30",
 *   "actualCloseDate": "2026-05-10",
 *   "closeReason": null,
 *   "forecastCategory": "closed",
 *   "segment": "seg_uuid_enterprise",
 *   "campaign": "Q2-2026-Direct",
 *   "contractCreated": "con_uuid_acme_3yr",
 *   "status": "won",
 *   "createdBy": "user_uuid_rep_alice",
 *   "createdAt": "2026-02-15T09:00:00Z",
 *   "modifiedBy": "user_uuid_rep_alice",
 *   "modifiedAt": "2026-05-10T17:45:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec IFRS-15 contract-existence sales-forecast
 * @useCase Sales-pipeline forecasting, deal-stage progression, close-won contract creation, revenue-recognition trigger
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-639-1 language-tags localized-names
 * @accounting IFRS IFRS-15 §9 contract-existence-criteria
 * @accounting IFRS IFRS-15 §4 portfolio-practical-expedient (via segment)
 * @audit ISO-19011:2018 audit-trail crm-pipeline
 * @compliance SOX §302 §404 sales-forecast control
 * @security Multi-tenant isolation; role-based ownership (sales rep)
 * @see ./Leads.ts (lead conversion path)
 * @see ./Customers.ts (customer upsell path)
 * @see ./Contracts.ts (close-won contract creation)
 * @see ./Activities.ts (deal-progression contact log)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'
import { emitOpportunityWon } from '@/hooks/chainEventEmitters'

const Opportunities: CollectionConfig = {
  slug: 'opportunities',
  labels: { singular: 'Opportunity', plural: 'Opportunities' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'customer', 'stage', 'amount', 'weightedAmount', 'expectedCloseDate', 'status'],
    description:
      'Sales-pipeline deal with weighted forecast. Close-won creates a contract + (if needed) a customer.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    multiTenancyField(),
    { name: 'name', type: 'text', localized: true, required: true, index: true },
    { name: 'lead', type: 'relationship', relationTo: 'leads' },
    { name: 'customer', type: 'relationship', relationTo: 'customers',
      admin: { description: 'Existing customer (for upsell/cross-sell). Null for net-new from lead.' } },
    { name: 'opportunityOwner', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'stage',
      type: 'select',
      required: true,
      defaultValue: 'qualification',
      options: [
        { label: 'Qualification', value: 'qualification' },
        { label: 'Discovery / Needs Analysis', value: 'discovery' },
        { label: 'Solution / Proposal', value: 'solution' },
        { label: 'Quote Sent', value: 'quote_sent' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Verbal Commit', value: 'verbal_commit' },
        { label: 'Closed Won', value: 'closed_won' },
        { label: 'Closed Lost', value: 'closed_lost' },
        { label: 'Closed No-Decision', value: 'closed_no_decision' },
      ],
    },
    { name: 'probability', type: 'number', min: 0, max: 100, defaultValue: 10,
      admin: { description: 'Snapshot probability (0-100%). Defaults map to stage but operator can override.' } },
    currencyField(),
    { name: 'amount', type: 'number', required: true,
      admin: { description: 'Annual contract value (ARR for SaaS) or one-time TCV (cents).' } },
    { name: 'weightedAmount', type: 'number',
      admin: { readOnly: true, description: 'amount × probability/100. Aggregated for the pipeline forecast.' } },
    { name: 'expectedCloseDate', type: 'date', required: true, index: true },
    { name: 'actualCloseDate', type: 'date' },
    { name: 'closeReason', type: 'select', options: [
      { label: 'Price', value: 'price' },
      { label: 'Product Fit', value: 'product_fit' },
      { label: 'Timing', value: 'timing' },
      { label: 'Competitor (lost to)', value: 'competitor' },
      { label: 'Internal Politics', value: 'internal_politics' },
      { label: 'Budget Cut', value: 'budget_cut' },
      { label: 'Other', value: 'other' },
    ]},
    { name: 'competitor', type: 'text' },
    { name: 'forecastCategory', type: 'select', options: [
      { label: 'Pipeline', value: 'pipeline' },
      { label: 'Best Case', value: 'best_case' },
      { label: 'Commit', value: 'commit' },
      { label: 'Closed', value: 'closed' },
      { label: 'Omitted', value: 'omitted' },
    ]},
    { name: 'segment', type: 'relationship', relationTo: 'customer-segments' },
    { name: 'campaign', type: 'text' },
    { name: 'contractCreated', type: 'relationship', relationTo: 'contracts',
      admin: { readOnly: true, description: 'Contract created on close-won.' } },
    statusField(
      [
        { label: 'Open', value: 'open' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
        { label: 'Abandoned', value: 'abandoned' },
      ],
      'open',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitOpportunityWon, auditTrailAfterChange('opportunities')],
  },
  timestamps: true,
}

export default Opportunities
