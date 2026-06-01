/**
 * Gateway Events — idempotent inbound webhook / integration event log.
 *
 * Fills the ceccec/erpax `stripe_events` + `integrations` gap: the durable,
 * deduplicated record of every event received from an external provider
 * (payment gateway, bank PSD2 feed, e-invoicing network…). The unique
 * `externalEventId` is the idempotency key — re-delivery of the same event
 * is a no-op. Raw payloads are stored for replay/audit, NEVER cardholder
 * data (PCI-DSS scope reduction).
 *
 * @standard PCI-DSS v4.0 §3 no-PAN-storage cardholder-data-minimisation
 * @standard ISO-8601-1:2019 date-time received-processed-timestamps
 * @standard RFC-9110 §9.2.2 idempotency
 * @security ISO-27001 A.8.15 logging A.8.16 monitoring-activities
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail integration-event-evidence
 * @see ./Payments.ts
 * @see ./TransactionFailures.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { statusField, notesField, auditFields } from '../../fields/base-accounting-fields'

const GatewayEvents: CollectionConfig = {
  slug: 'gateway-events',
  labels: { singular: 'Gateway Event', plural: 'Gateway Events' },
  admin: {
    useAsTitle: 'externalEventId',
    defaultColumns: ['provider', 'eventType', 'externalEventId', 'status', 'receivedAt'],
    description:
      'Idempotent inbound webhook log from external providers. externalEventId is the dedup key; raw payload kept for replay (never card data — PCI-DSS).',
  },
  access: accountingCollectionAccess({ feature: 'integrations' }),
  fields: [
    { name: 'provider', type: 'select', required: true, index: true, defaultValue: 'stripe',
      options: [
        { label: 'Stripe', value: 'stripe' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Adyen', value: 'adyen' },
        { label: 'GoCardless', value: 'gocardless' },
        { label: 'Wise', value: 'wise' },
        { label: 'Bank (PSD2 / open banking)', value: 'bank_psd2' },
        { label: 'PEPPOL e-invoicing', value: 'peppol' },
        { label: 'Other', value: 'other' },
      ] },
    { name: 'externalEventId', type: 'text', required: true, unique: true, index: true,
      admin: { description: "Provider's event id (e.g. Stripe `evt_…`). Idempotency key — unique." } },
    { name: 'eventType', type: 'text', required: true, index: true,
      admin: { description: 'Provider event type (e.g. `payment_intent.succeeded`).' } },
    { name: 'signatureVerified', type: 'checkbox', defaultValue: false,
      admin: { description: 'Whether the webhook signature (HMAC) was verified before processing.' } },
    { name: 'payload', type: 'json',
      admin: { description: 'Raw event envelope for replay/audit. MUST NOT contain PAN / full card data (PCI-DSS §3).' } },
    {
      name: 'relatedDocument',
      type: 'relationship',
      relationTo: ['invoices', 'payments', 'subscriptions', 'refunds'],
      admin: { description: 'Polymorphic link to the erpax record this event acted on.' },
    },
    { name: 'receivedAt', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — when the event was received.' } },
    { name: 'processedAt', type: 'date',
      admin: { readOnly: true, description: 'ISO 8601 — when processing completed.' } },
    { name: 'retryCount', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Processing attempts so far.' } },
    { name: 'error', type: 'textarea',
      admin: { readOnly: true, description: 'Last processing error, if any.' } },
    statusField(
      [
        { label: 'Received', value: 'received' },
        { label: 'Processing', value: 'processing' },
        { label: 'Processed', value: 'processed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Ignored (duplicate / irrelevant)', value: 'ignored' },
      ],
      'received',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('gateway-events'),
  timestamps: true,
}

export default GatewayEvents
