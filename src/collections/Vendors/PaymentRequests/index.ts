/**
 * Payment Requests — internal request-to-disburse with approval workflow.
 *
 * Fills the ceccec/erpax `check_request_forms` gap: a controlled request to
 * issue a payment (check / transfer) to a payee, gated by an approver
 * before it can be fulfilled by a `payment-runs` batch or a `payments`
 * record. The requester ≠ approver split is the SOX §404 segregation-of-
 * duties control over disbursement.
 *
 * @standard ISO-20022 pain.001 payment-initiation
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time request-due-dates
 * @compliance SOX §404 internal-controls disbursement-approval TOM-PAY-01
 * @security ISO-27002 §5.4 segregation-of-duties requester-vs-approver
 * @audit ISO-19011:2018 audit-trail approval-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./PaymentRuns.ts
 * @see ./Payments.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../../access/auth'
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
  referenceField,
  glAccountField,
} from '../../../fields/base-accounting-fields'

const PaymentRequests: CollectionConfig = {
  slug: 'payment-requests',
  labels: { singular: 'Payment Request', plural: 'Payment Requests' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'payee', 'amount', 'requestDate', 'status'],
    description:
      'Internal request to disburse a payment. Requester ≠ approver (SOX §404 segregation of duties); fulfilled by a payment-run or payment.',
  },
  access: accountingCollectionAccess({ feature: 'banking' }),
  fields: [
    referenceField({ description: 'Request reference (e.g. `PR-2026-0042`).' }),
    { name: 'requestDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — date the request was raised.' } },
    { name: 'requesterName', type: 'text', required: true,
      admin: { description: 'Name of the person requesting (free text; `createdBy` is the system user).' } },
    { name: 'payee', type: 'text', required: true,
      admin: { description: 'Payee name as it should appear on the instrument.' } },
    { name: 'vendor', type: 'relationship', relationTo: 'vendors',
      admin: { description: 'Vendor master record, when the payee is a known vendor.' } },
    { name: 'amount', type: 'number', required: true, min: 0,
      admin: { description: 'Requested amount in minor units (cents).' } },
    currencyField(),
    { name: 'purpose', type: 'textarea', required: true,
      admin: { description: 'Business purpose of the disbursement (the control narrative).' } },
    ...glAccountField(),
    { name: 'paymentMethod', type: 'relationship', relationTo: 'payment-methods',
      admin: { description: 'Requested method (check / transfer / SEPA).' } },
    { name: 'dueDate', type: 'date',
      admin: { description: 'ISO 8601 — date by which payment is needed.' } },
    statusField(
      [
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Completed (paid)', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'pending',
    ),
    { name: 'paymentRun', type: 'relationship', relationTo: 'payment-runs',
      admin: { readOnly: true, description: 'Payment run that fulfilled this request.' } },
    { name: 'payment', type: 'relationship', relationTo: 'payments',
      admin: { readOnly: true, description: 'Payment record that settled this request.' } },
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('payment-requests'),
  timestamps: true,
}

export default PaymentRequests
