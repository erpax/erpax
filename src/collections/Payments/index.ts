import { CollectionConfig } from 'payload'
import { adminOnly, multiTenantRead } from '../../access/auth'
import { authenticated } from '../../access/authenticated'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { paymentsBeforeValidate } from './hooks/beforeValidate'
import { paymentsBeforeChange } from './hooks/beforeChange'
import { paymentsAfterChange } from './hooks/afterChange'
import { invoicePaidTotals } from './hooks/recomputeInvoicePaid'

/**
 * Payments — money-movement records with GL posting + period-lock guard.
 *
 * Slice YYYY (2026-05-10): added top-level `paymentKind` (received|sent
 * — drives the AR vs AP GL handler dispatch in `payment.hook.ts`) and
 * top-level `status` (the lifecycle state — defaultColumns referenced
 * `status` but the field was missing). These were the two missing
 * top-level fields the seed-vs-schema invariant surfaced; everything
 * else (`amounts.amount`, `parties.{sender,receiver}`, `dates.*`) lives
 * inside the canonical groups and is accessed via `doc.amounts.amount`
 * etc. — flat aliases at the consumer layer were the silent-bug source.
 *
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time payment-date value-date
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @compliance SOX §404 internal-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.1
 */
export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'transactionNumber',
    defaultColumns: ['transactionNumber', 'invoice', 'amounts.amount', 'status', 'dates.sentAt'],
    group: 'Billing',
  },
  // Slice MMM (DRY): inline predicates replaced with canonical helpers.
  // The prior `req.user.address` sender/receiver filter referenced a
  // non-existent field on the User schema (User has
  // `addresses: { docs: [...] }`, not singular `address`). Switched to
  // tenant-scoped read via the shared `multiTenantRead` helper to match
  // Items + the post-Slice-CCC accounting plugin. If the original intent
  // was "show only payments where the current user is sender or
  // receiver", that needs a separate design pass against the
  // `addresses` join.
  access: {
    read: multiTenantRead,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  hooks: {
    // AAAAA-cont: prepend canonical autoPopulateTenant + append
    // canonical auditTrailAfterChange to the existing domain hook arrays.
    beforeValidate: [
      autoPopulateTenant,
      ...(Array.isArray(paymentsBeforeValidate) ? paymentsBeforeValidate : [paymentsBeforeValidate]),
    ],
    beforeChange: paymentsBeforeChange,
    afterChange: [
      ...(Array.isArray(paymentsAfterChange) ? paymentsAfterChange : [paymentsAfterChange]),
      auditTrailAfterChange('payments'),
      invoicePaidTotals.afterChange,
    ],
    afterDelete: [invoicePaidTotals.afterDelete],
  },
  timestamps: true,
  fields: [
    {
      name: 'transactionNumber',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'Transaction reference number' },
    },
    {
      name: 'paymentKind',
      type: 'select',
      required: true,
      defaultValue: 'received',
      index: true,
      options: [
        { label: 'Received (AR collection — Dr Cash / Cr AR)', value: 'received' },
        { label: 'Sent (AP disbursement — Dr AP / Cr Cash)', value: 'sent' },
      ],
      admin: {
        description:
          'Slice YYYY: drives the AR-vs-AP GL handler dispatch in `payment.hook.ts`. Required because `parties.{sender,receiver}` alone cannot disambiguate (the tenant could be either side in intercompany).',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'recorded',
      index: true,
      options: [
        { label: 'Recorded (default)', value: 'recorded' },
        { label: 'Authorised', value: 'authorised' },
        { label: 'Sent', value: 'sent' },
        { label: 'Received', value: 'received' },
        { label: 'Settled', value: 'settled' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: {
        description:
          'Lifecycle state. defaultColumns referenced this; YYYY restored the field.',
      },
    },
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'invoices',
      required: true,
      index: true,
      admin: { description: 'Related invoice' },
    },
    {
      type: 'group',
      name: 'parties',
      label: 'Parties',
      fields: [
        {
          name: 'sender',
          type: 'relationship',
          relationTo: 'addresses',
          required: true,
          admin: { description: 'Payment sender (payer)' },
        },
        {
          name: 'receiver',
          type: 'relationship',
          relationTo: 'addresses',
          required: true,
          admin: { description: 'Payment receiver (payee)' },
        },
      ],
    },
    {
      type: 'group',
      name: 'amounts',
      label: 'Amounts',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: { description: 'Payment amount (cents)', step: 0.01 },
        },
        {
          name: 'invoiceAmount',
          type: 'number',
          admin: { description: 'Invoice amount reference (cents)', step: 0.01 },
        },
        {
          name: 'currencyCode',
          type: 'text',
          required: true,
          defaultValue: 'EUR',
          admin: { description: 'Currency code' },
        },
        {
          name: 'exchangeRate',
          type: 'number',
          admin: { description: 'Exchange rate', step: 0.00001 },
        },
      ],
    },
    {
      type: 'group',
      name: 'dates',
      label: 'Dates',
      fields: [
        {
          name: 'sentAt',
          type: 'date',
          admin: { description: 'When payment was sent' },
        },
        {
          name: 'receivedAt',
          type: 'date',
          admin: { description: 'When payment was received' },
        },
        {
          name: 'authorizedAt',
          type: 'date',
          admin: { description: 'When payment was authorized' },
        },
      ],
    },
    {
      type: 'group',
      name: 'authorization',
      label: 'Authorization',
      fields: [
        {
          name: 'authorizedBy',
          type: 'relationship',
          relationTo: 'users',
          admin: { description: 'User who authorized payment' },
        },
      ],
    },
    {
      type: 'group',
      name: 'payment',
      label: 'Payment Details',
      fields: [
        {
          name: 'paymentMethod',
          type: 'text',
          admin: { description: 'Payment method' },
        },
        {
          name: 'note',
          type: 'textarea',
          admin: { description: 'Payment notes' },
        },
      ],
    },
    {
      name: 'metadata',
      type: 'json',
      admin: { description: 'Additional metadata' },
    },
  ],
}
