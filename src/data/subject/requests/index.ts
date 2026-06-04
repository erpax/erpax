/**
 * Data Subject Requests — GDPR Art.15-22 (DSR / DSAR) workflow.
 *
 * Captures and tracks every request from a data subject to access,
 * rectify, erase, port, restrict, or object to processing of their
 * personal data — the controller's evidence trail under Art.30.
 *
 * @standard ISO-8601-1:2019 date-time submitted-at completed-at
 * @compliance GDPR Art.15 right-of-access
 * @compliance GDPR Art.16 right-to-rectification
 * @compliance GDPR Art.17 right-to-erasure
 * @compliance GDPR Art.18 right-to-restriction
 * @compliance GDPR Art.20 right-to-data-portability
 * @compliance GDPR Art.21 right-to-object
 * @compliance GDPR Art.12(3) one-month-response-deadline
 * @audit ISO-19011:2018 audit-trail dsr-evidence
 * @security ISO-27001 A.5.34 privacy-and-pii
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/auth'
import { statusField, notesField, auditFields } from '@/base/accounting/field'

const DataSubjectRequests: CollectionConfig = {
  slug: 'data-subject-requests',
  labels: { singular: 'Data Subject Request', plural: 'Data Subject Requests' },
  admin: { useAsTitle: 'requestId', defaultColumns: ['requestId', 'requestType', 'dataSubject', 'status', 'submittedAt', 'dueAt'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'user'),
    update: roleScopedAccess('admin'),
    delete: tenantAdmin,
  },
  fields: [
    { name: 'requestId', type: 'text', required: true, unique: true, index: true },
    { name: 'dataSubject', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'requestType',
      type: 'select',
      required: true,
      options: [
        { label: 'Art.15 — Access', value: 'access' },
        { label: 'Art.16 — Rectification', value: 'rectification' },
        { label: 'Art.17 — Erasure (right to be forgotten)', value: 'erasure' },
        { label: 'Art.18 — Restriction', value: 'restriction' },
        { label: 'Art.20 — Portability', value: 'portability' },
        { label: 'Art.21 — Object to processing', value: 'object' },
        { label: 'Art.7(3) — Withdraw consent', value: 'withdraw_consent' },
      ],
    },
    { name: 'requestDetail', type: 'textarea' },
    { name: 'submittedAt', type: 'date', required: true },
    { name: 'dueAt', type: 'date', admin: { description: 'Art.12(3) deadline — submittedAt + 1 month (extensible by 2 months).' } },
    statusField(
      [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Identity Verification', value: 'identity_verification' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Awaiting Customer', value: 'awaiting_customer' },
        { label: 'Completed', value: 'completed' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Escalated to DPA', value: 'escalated' },
      ],
      'submitted',
    ),
    { name: 'completedAt', type: 'date', admin: { readOnly: true } },
    { name: 'rejectionReason', type: 'textarea', localized: true },
    { name: 'fulfilmentEvidence', type: 'json', admin: { description: 'JSON record of what was exported/erased/restricted.' } },
    { name: 'handler', type: 'relationship', relationTo: 'users', admin: { description: 'DPO or staff member handling this request.' } },
    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('data-subject-requests', { beforeChange: [autoSetTimestamp('completedAt', (d) => (d as { status?: string }).status === 'completed')] }),
  timestamps: true,
}

export default DataSubjectRequests
