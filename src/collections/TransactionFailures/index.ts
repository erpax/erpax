/**
 * Transaction Failures — error queue for retry / SOX evidence trail.
 *
 * Slice TTT (2026-05-10): added per Slice NNN gap discovery. Captures
 * every failed transaction (payment retry, e-invoice submission, bank
 * import, GL post) with retry-count + last-error-message so SOX §404
 * controls can prove "we tried, and here's why it failed". Distinct
 * from `audit-events` (the canonical event log) — this is the active
 * **work-queue** the operator console drains.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time transaction-date
 * @rfc 7807 problem-details-for-http-apis status-code
 * @audit ISO-19011:2018 audit-trail failure-evidence
 * @compliance SOX §404 internal-controls failure-disposition TOM-FAIL-01
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOC-2 CC7.3 system-incident-response
 * @security ISO-27001 A.5.24 incident-management-planning
 * @security ISO-27002 §5.27 information-security-event-correction
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { statusField, notesField, auditFields, referenceField } from '../../fields/base-accounting-fields'

const TransactionFailures: CollectionConfig = {
  slug: 'transaction-failures',
  labels: { singular: 'Transaction Failure', plural: 'Transaction Failures' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'transactionDate', 'sourceType', 'reason', 'statusCode', 'retryCount', 'status'],
    description:
      'Error queue for payment retries, e-invoice rejections, bank-import errors, GL-post failures. Operator console drains this; SOX §404 control TOM-FAIL-01 audits the disposition trail.',
  },
  access: accountingCollectionAccess(),
  fields: [
    referenceField({ description: 'Failure reference (e.g. `FAIL-2026-04-001`).' }),
    { name: 'transactionDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — original transaction date that failed (NOT the failure-recording date).' } },
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Payment Retry', value: 'payment_retry' },
        { label: 'E-Invoice Submission (НАП / SAF-T)', value: 'einvoice_submission' },
        { label: 'Bank Import (camt.053 / OFX)', value: 'bank_import' },
        { label: 'GL Posting', value: 'gl_post' },
        { label: 'Stripe Webhook', value: 'stripe_webhook' },
        { label: 'PSD2 Bank-API Call', value: 'psd2_call' },
        { label: 'Tax Authority Filing', value: 'tax_filing' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'sourceCollection', type: 'text',
      admin: { description: 'The Payload collection slug the failed source document lives in (e.g. `payments`, `invoices`).' } },
    { name: 'sourceId', type: 'text',
      admin: { description: 'ID of the failed source document.' } },
    { name: 'reason', type: 'text', required: true,
      admin: { description: 'Short human-readable reason (e.g. "card declined", "VAT-ID invalid", "bank API timeout").' } },
    { name: 'statusCode', type: 'text', required: true,
      admin: { description: 'RFC 7807 — HTTP status / provider error code (e.g. "402", "INSUFFICIENT_FUNDS", "VAT_INVALID").' } },
    { name: 'errorPayload', type: 'json',
      admin: { description: 'Full upstream error response — captured for forensic analysis.' } },
    { name: 'retryCount', type: 'number', defaultValue: 0,
      admin: { description: 'Times this failure has been retried.' } },
    { name: 'maxRetries', type: 'number', defaultValue: 5,
      admin: { description: 'Retry-cap before the failure is escalated to manual review.' } },
    { name: 'nextRetryAt', type: 'date',
      admin: { description: 'Scheduled next retry — empty when escalated to manual.' } },
    { name: 'lastRetryAt', type: 'date', admin: { readOnly: true } },
    { name: 'resolvedBy', type: 'relationship', relationTo: 'users',
      admin: { description: 'Operator who marked the failure resolved (manually or via successful retry).' } },
    { name: 'resolution', type: 'text',
      admin: { description: 'How the failure was resolved (e.g. "card retried after customer update", "manually re-entered", "abandoned per business decision").' } },
    statusField(
      [
        { label: 'Open (awaiting retry)', value: 'open' },
        { label: 'Retrying', value: 'retrying' },
        { label: 'Escalated to Manual', value: 'escalated' },
        { label: 'Resolved (succeeded)', value: 'resolved' },
        { label: 'Abandoned (won\'t retry)', value: 'abandoned' },
      ],
      'open',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('transaction-failures'),
  timestamps: true,
}

export default TransactionFailures
