/**
 * Usage Records — metered-billing event log per tenant per feature.
 *
 * Slice VVV (2026-05-10): added so ERPax can be **billed agnostically**
 * — freelancer plans charge per metered unit (e.g. invoices issued,
 * country-bundles connected, signed PAdES attestations), enterprise
 * plans bundle the same features at flat fee. Each row is one
 * countable event the billing engine aggregates into invoice lines
 * per IFRS-15 §B16-B19 usage-based revenue recognition.
 *
 * Pairs with `FEATURE_REGISTRY` (which features are metered vs
 * boolean) and `getFeatureLimit(req, feature)` (the per-tenant cap
 * driving overage billing).
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time event-time billing-period
 * @standard rfc-9562 uuid event-id
 * @accounting IFRS IFRS-15 §B16 §B17 §B18 §B19 usage-based-revenue
 * @accounting US-GAAP ASC-606-10-32-40 usage-based-pricing
 * @audit ISO-19011:2018 audit-trail usage-evidence
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOC-2 CC7.4 system-monitoring-and-detection
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see @/access/feature-registry FEATURE_REGISTRY
 * @see @/access/subscriptionGates getFeatureLimit
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'
import { emitUsageRecorded } from '@/hooks/chainEventEmitters'

const UsageRecords: CollectionConfig = {
  slug: 'usage-records',
  labels: { singular: 'Usage Record', plural: 'Usage Records' },
  admin: {
    useAsTitle: 'eventId',
    defaultColumns: ['eventId', 'feature', 'eventTime', 'quantity', 'billingPeriod', 'status'],
    description:
      'Metered-billing event log. One row per countable event (invoices issued, signed PAdES, country-bundle calls, etc.). Aggregated by the billing engine into IFRS-15 §B16 usage-based invoice lines.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    { name: 'eventId', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'RFC 9562 UUID v4 — idempotency key. Re-emission with the same eventId is a no-op.', readOnly: true } },
    { name: 'feature', type: 'text', required: true, index: true,
      admin: { description: 'Feature id from FEATURE_REGISTRY (e.g. `invoicing_metered`, `country_bundles`, `eidas_signing`).' } },
    {
      name: 'meterKind',
      type: 'select',
      required: true,
      defaultValue: 'count',
      options: [
        { label: 'Count (per-event tally)', value: 'count' },
        { label: 'Quantity (cumulative units)', value: 'quantity' },
        { label: 'Volume (bytes / API calls)', value: 'volume' },
        { label: 'Duration (seconds active)', value: 'duration' },
      ],
    },
    { name: 'quantity', type: 'number', required: true, defaultValue: 1, min: 0,
      admin: { description: 'Per-event count (1 for `count` meter; bytes for `volume`; seconds for `duration`; etc.).' } },
    { name: 'eventTime', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — when the metered event happened.' } },
    { name: 'billingPeriod', type: 'text', required: true, index: true,
      admin: { description: 'Billing-period bucket (e.g. `2026-04` for monthly, `2026-Q2` for quarterly).' } },
    { name: 'subscription', type: 'relationship', relationTo: 'subscriptions',
      admin: { description: 'The subscription this usage rolls into.' } },
    { name: 'sourceCollection', type: 'text',
      admin: { description: 'Slug of the collection that generated the event (e.g. `invoices`, `evidence-attestations`).' } },
    { name: 'sourceId', type: 'text',
      admin: { description: 'ID of the source row.' } },
    { name: 'rate', type: 'number', defaultValue: 0,
      admin: { description: 'Per-unit price snapshot (cents) at time of event. Rate-card change won\'t retroactively affect billed quantities.' } },
    currencyField(),
    { name: 'amount', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'rate × quantity (cents) — what hits the upcoming invoice line.' } },
    { name: 'invoice', type: 'relationship', relationTo: 'invoices',
      admin: { readOnly: true, description: 'Invoice that consumed this usage (set when the billing job runs).' } },
    statusField(
      [
        { label: 'Recorded (pending billing)', value: 'recorded' },
        { label: 'Billed (rolled into invoice)', value: 'billed' },
        { label: 'Reversed (e.g. event undone)', value: 'reversed' },
        { label: 'Disputed', value: 'disputed' },
      ],
      'recorded',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitUsageRecorded, auditTrailAfterChange('usage-records')],
  },
  timestamps: true,
}

export default UsageRecords
