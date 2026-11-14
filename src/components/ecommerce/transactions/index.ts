/**
 * Transactions — ONE record of money moving: the e-commerce plugin's `transactions`, carrying the
 * payment register.
 *
 * There were two: the plugin's `transactions` (a card payment at checkout — order, cart, gateway
 * ids, amount) and a custom `payments` collection (AR collection / AP disbursement against an
 * invoice, with the GL posting). The custom collection is folded into the plugin's through its
 * `transactionsCollectionOverride`. The plugin owns the collection; this module adds the
 * register's fields, statuses and hooks.
 *
 * THE GUARD. The register's hooks post to the general ledger. A checkout attempt must never do
 * that: it is created `pending` and may fail. So the accounting hooks run only on a transaction
 * that IS a register payment — one that names its `paymentKind`. The plugin never sets that
 * field; a transaction entered against an invoice gets `received` when none is given (what the
 * register's default was). A web transaction therefore behaves exactly as it did before the fold.
 *
 * What the fold decided where the two shapes collided:
 *  - `status` is ONE lifecycle: the plugin's values (pending · succeeded · failed · cancelled ·
 *    expired · refunded) and the register's (recorded · authorised · sent · received · settled ·
 *    reversed) in one select. The default is the plugin's.
 *  - `amount` / `currency` are the plugin's (what the gateway charged). The register's figures
 *    stay in the `amounts` group, which is what the invoice-paid rollup sums.
 *  - `paymentMethod` is the plugin's gateway choice; the register's free-text method stays in the
 *    `payment` group.
 *  - Access is the plugin's (admins only). The register let any signed-in user create a payment.
 *
 * @accounting IFRS IFRS-9 §3.1.1 recognition (cash received / paid)
 * @accounting IFRS IAS-7 §10 statement-of-cash-flows operating-activities
 * @compliance PSD2 EU-2015/2366 payment-transaction
 * @compliance SOX §404 internal-controls cash-application
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  Field,
  Option,
} from 'payload'
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

import { auditTrailAfterChange } from '@/hooks/collections/shared/auditTrailAfterChange'
import { paymentAccountingHook } from '@/hooks/collections/invoices-payments/paymentAccountingHook'
import { invoicePaidTotals } from '@/utilities/invoices/payments/hooks/recomputeInvoicePaid'
import { validateNotLocked } from '@/utilities/utility'

/** A transaction is a register payment when it names its kind (AR collection or AP disbursement). */
export const isRegisterPayment = (doc: unknown): boolean => {
  const kind = (doc as { paymentKind?: unknown } | null | undefined)?.paymentKind
  return kind === 'received' || kind === 'sent'
}

/** A transaction entered against an invoice with no kind is a collection — the register's old default. */
export const kindFromInvoice: CollectionBeforeValidateHook = ({ data }) => {
  if (data && data.invoice && !data.paymentKind) data.paymentKind = 'received'
  return data
}

/** Run a register hook only on a register payment; a checkout transaction passes through untouched. */
export const onRegisterPayment = {
  beforeChange: (hook: CollectionBeforeChangeHook): CollectionBeforeChangeHook => (args) =>
    isRegisterPayment(args.data) ? hook(args) : args.data,
  afterChange: (hook: CollectionAfterChangeHook): CollectionAfterChangeHook => (args) =>
    isRegisterPayment(args.doc) ? hook(args) : args.doc,
}

/** The register's statuses, added to the plugin's own. */
const REGISTER_STATUSES: readonly { label: string; value: string }[] = [
  { label: 'Recorded', value: 'recorded' },
  { label: 'Authorised', value: 'authorised' },
  { label: 'Sent', value: 'sent' },
  { label: 'Received', value: 'received' },
  { label: 'Settled', value: 'settled' },
  { label: 'Reversed', value: 'reversed' },
  { label: 'Failed', value: 'failed' },
]

const valueOf = (option: Option): string => (typeof option === 'string' ? option : option.value)

/** One lifecycle: the plugin's options first (its values and labels win), then every register status it lacks. */
export const transactionStatusOptions = (pluginOptions: readonly Option[]): Option[] => {
  const have = new Set(pluginOptions.map(valueOf))
  return [...pluginOptions, ...REGISTER_STATUSES.filter((status) => !have.has(status.value))]
}

/** The payment register's fields, as they sit on the plugin's transaction. */
export const paymentFields = (): Field[] => [
  { name: 'transactionNumber', type: 'text', unique: true, index: true,
    admin: { description: 'Transaction reference number' } },
  {
    name: 'paymentKind',
    type: 'select',
    index: true,
    options: [
      { label: 'Received (AR collection — Dr Cash / Cr AR)', value: 'received' },
      { label: 'Sent (AP disbursement — Dr AP / Cr Cash)', value: 'sent' },
    ],
    admin: {
      description:
        'Set on a register payment; it selects the AR-vs-AP GL posting. Empty on a checkout transaction, which posts nothing here. Defaults to Received when an invoice is given.',
    },
  },
  { name: 'invoice', type: 'relationship', relationTo: 'invoices', index: true,
    admin: { description: 'The invoice this payment settles (register payments).' } },
  {
    type: 'group',
    name: 'parties',
    label: 'Parties',
    fields: [
      { name: 'sender', type: 'relationship', relationTo: 'addresses', admin: { description: 'Payment sender (payer)' } },
      { name: 'receiver', type: 'relationship', relationTo: 'addresses', admin: { description: 'Payment receiver (payee)' } },
    ],
  },
  {
    type: 'group',
    name: 'amounts',
    label: 'Amounts',
    fields: [
      { name: 'amount', type: 'number', defaultValue: 0, min: 0,
        admin: { description: 'Payment amount applied to the invoice — what the invoice-paid rollup sums', step: 0.01 } },
      { name: 'invoiceAmount', type: 'number', admin: { description: 'Invoice amount reference', step: 0.01 } },
      { name: 'currencyCode', type: 'text', defaultValue: 'EUR', admin: { description: 'Currency code' } },
      { name: 'exchangeRate', type: 'number', admin: { description: 'Exchange rate', step: 0.00001 } },
    ],
  },
  {
    type: 'group',
    name: 'dates',
    label: 'Dates',
    fields: [
      { name: 'sentAt', type: 'date', admin: { description: 'When payment was sent' } },
      { name: 'receivedAt', type: 'date', admin: { description: 'When payment was received' } },
      { name: 'authorizedAt', type: 'date', admin: { description: 'When payment was authorized' } },
    ],
  },
  {
    type: 'group',
    name: 'authorization',
    label: 'Authorization',
    fields: [
      { name: 'authorizedBy', type: 'relationship', relationTo: 'users', admin: { description: 'User who authorized payment' } },
    ],
  },
  {
    type: 'group',
    name: 'payment',
    label: 'Payment Details',
    fields: [
      { name: 'paymentMethod', type: 'text', admin: { description: 'Payment method (register payments: bank transfer, cash, cheque …)' } },
      { name: 'note', type: 'textarea', admin: { description: 'Payment notes' } },
    ],
  },
  { name: 'metadata', type: 'json', admin: { description: 'Additional metadata' } },
]

/**
 * The plugin's transactions collection with the register folded in. Throws at config time if the
 * plugin's `status` select is not where this expects it, or if a register field would shadow one
 * of the plugin's — a plugin upgrade must not silently change what a payment is.
 */
export const transactionsOverride: CollectionOverride = ({ defaultCollection }) => {
  let widened = false
  const fields = defaultCollection.fields.map((field): Field => {
    if ('name' in field && field.name === 'status' && field.type === 'select') {
      widened = true
      return { ...field, options: transactionStatusOptions(field.options) }
    }
    return field
  })
  if (!widened) throw new Error('transactions: the e-commerce plugin no longer has a top-level `status` select to carry the payment statuses')

  const added = paymentFields()
  const taken = new Set(fields.flatMap((field) => ('name' in field ? [field.name] : [])))
  for (const field of added) {
    if ('name' in field && taken.has(field.name)) throw new Error(`transactions: the e-commerce plugin now has its own \`${field.name}\` — the payment register field would shadow it`)
  }

  return {
    ...defaultCollection,
    fields: [...fields, ...added],
    hooks: {
      ...defaultCollection.hooks,
      beforeValidate: [...(defaultCollection.hooks?.beforeValidate ?? []), kindFromInvoice],
      beforeChange: [...(defaultCollection.hooks?.beforeChange ?? []), onRegisterPayment.beforeChange(validateNotLocked)],
      afterChange: [
        ...(defaultCollection.hooks?.afterChange ?? []),
        onRegisterPayment.afterChange(paymentAccountingHook),
        auditTrailAfterChange('transactions'),
        invoicePaidTotals.afterChange,
      ],
      afterDelete: [...(defaultCollection.hooks?.afterDelete ?? []), invoicePaidTotals.afterDelete],
    },
  }
}
