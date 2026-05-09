import { CollectionConfig } from 'payload'
// Slice PPP: arAgingHook + cogsHook removed — they delegated to services
// that don't exist in `src/services/` (silent no-ops). Aging is now a
// service-generated DTO via `financialReportingService`; COGS will fold
// into `gl-posting.service.ts`'s invoice handler when built.
import { invoiceAccountingHook } from '@/plugins/accounting/hooks'
import { validateNotLocked } from '@/plugins/accounting/utilities/period-lock'
import { adminOnly, multiTenantRead } from '@/plugins/auth'
import { authenticated } from '@/access/authenticated'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'

/**
 * Invoices — header for AR/AP billing with GL posting + period locking.
 *
 * @standard EN-16931:2017 semantic-data-model-electronic-invoice
 * @standard Peppol-BIS-3.0 billing electronic-invoicing
 * @standard UN-EDIFACT INVOIC d96a
 * @standard UBL-2.1 universal-business-language
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time invoice-date due-date
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @compliance SOX §404 internal-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §3
 */
export const Invoices: CollectionConfig = {
  slug: 'invoices',
  admin: {
    useAsTitle: 'number',
    defaultColumns: ['number', 'invoiceType', 'seller', 'buyer', 'date', 'status', 'totalAmount'],
    group: 'Billing',
  },
  // Slice MMM (DRY): inline predicates replaced with canonical helpers.
  // The prior `req.user.address` seller/buyer filter referenced a
  // non-existent field on the User schema (User has
  // `addresses: { docs: [...] }`, not singular `address`). Switched
  // to tenant-scoped read via shared `multiTenantRead`.
  access: {
    read: multiTenantRead,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [validateNotLocked],
    afterChange: [invoiceAccountingHook],
  },
  fields: [
    {
      type: 'group',
      name: 'typeStatus',
      label: 'Type & Status',
      fields: [
        {
          name: 'invoiceType',
          type: 'select',
          required: true,
          index: true,
          options: [
            { label: 'Cart', value: 'cart' },
            { label: 'Request', value: 'request' },
            { label: 'Quotation', value: 'quotation' },
            { label: 'Purchase Order', value: 'purchase_order' },
            { label: 'Proforma Invoice', value: 'proforma_invoice' },
            { label: 'Invoice', value: 'invoice' },
            { label: 'Bill', value: 'bill' },
            { label: 'Credit Note', value: 'credit_note' },
            { label: 'Debit Note', value: 'debit_note' },
            { label: 'Protocol', value: 'protocol' },
            { label: 'Subscription', value: 'subscription' },
            { label: 'Lease', value: 'lease' },
            { label: 'Transfer', value: 'transfer' },
          ],
          admin: {
            description: 'Document type',
          },
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Issued', value: 'issued' },
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Open', value: 'open' },
            { label: 'Past Due', value: 'past_due' },
            { label: 'Grace Period', value: 'grace_period' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Complete', value: 'complete' },
          ],
          index: true,
          admin: { description: 'Current status' },
        },
        {
          name: 'confirmed',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Confirmed by parties' },
        },
      ],
    },
    {
      name: 'number',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'Document number' },
    },
    {
      name: 'protocolNumber',
      type: 'text',
      unique: true,
      admin: { description: 'Protocol number' },
    },
    {
      name: 'purchaseOrder',
      type: 'text',
      admin: { description: 'PO reference' },
    },
    {
      name: 'salesOrder',
      type: 'text',
      admin: { description: 'SO reference' },
    },
    {
      type: 'group',
      name: 'parties',
      label: 'Parties',
      fields: [
        {
          name: 'seller',
          type: 'relationship',
          relationTo: 'addresses',
          required: true,
          index: true,
          admin: { description: 'Selling party' },
        },
        {
          name: 'sellerAgent',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Seller agent' },
        },
        {
          name: 'buyer',
          type: 'relationship',
          relationTo: 'addresses',
          required: true,
          index: true,
          admin: { description: 'Buying party' },
        },
        {
          name: 'buyerAgent',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Buyer agent' },
        },
        {
          name: 'supplier',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Supplier' },
        },
        {
          name: 'consignee',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Delivery recipient' },
        },
      ],
    },
    {
      type: 'group',
      name: 'dates',
      label: 'Dates',
      fields: [
        {
          name: 'date',
          type: 'date',
          index: true,
          admin: { description: 'Document date' },
        },
        {
          name: 'issuedAt',
          type: 'date',
          admin: { description: 'Issue date' },
        },
        {
          name: 'orderDate',
          type: 'date',
          admin: { description: 'Order date' },
        },
        {
          name: 'proformaDate',
          type: 'date',
          admin: { description: 'Proforma date' },
        },
        {
          name: 'protocolDate',
          type: 'date',
          admin: { description: 'Protocol date' },
        },
        {
          name: 'paymentDate',
          type: 'date',
          admin: { description: 'Payment date' },
        },
        {
          name: 'paidAt',
          type: 'date',
          admin: { description: 'Full payment date' },
        },
        {
          name: 'deliveredAt',
          type: 'date',
          admin: { description: 'Delivery date' },
        },
        {
          name: 'cancelledAt',
          type: 'date',
          admin: { description: 'Cancellation date' },
        },
        {
          name: 'dueAt',
          type: 'date',
          index: true,
          admin: { description: 'Due-by date used by the dunning cycle' },
        },
        {
          name: 'pastDueSinceAt',
          type: 'date',
          index: true,
          admin: { description: 'Set when the dunning cycle first marks the invoice past-due' },
        },
        {
          name: 'gracePeriodEndsAt',
          type: 'date',
          admin: { description: 'Computed: pastDueSinceAt + grace window' },
        },
        {
          name: 'suspensionScheduledFor',
          type: 'date',
          admin: { description: 'Computed: when the related subscription is scheduled for suspension' },
        },
      ],
    },
    {
      type: 'group',
      name: 'amounts',
      label: 'Amounts (in cents)',
      fields: [
        {
          name: 'itemTotal',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: { description: 'Items subtotal', step: 0.01 },
        },
        {
          name: 'discountTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Total discounts', step: 0.01 },
        },
        {
          name: 'netTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Net before tax', step: 0.01 },
        },
        {
          name: 'taxTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Total tax', step: 0.01 },
        },
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: { description: 'Grand total', step: 0.01 },
        },
        {
          name: 'totalPaid',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Amount paid', step: 0.01 },
        },
        {
          name: 'totalDue',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Amount due', step: 0.01 },
        },
      ],
    },
    {
      type: 'group',
      name: 'billingTax',
      label: 'Billing & Tax',
      fields: [
        {
          name: 'currencyCode',
          type: 'text',
          required: true,
          defaultValue: 'EUR',
          admin: { description: 'ISO 4217 currency' },
        },
        {
          name: 'exchangeRate',
          type: 'number',
          admin: { description: 'Exchange rate', step: 0.00001 },
        },
        {
          name: 'taxType',
          type: 'select',
          options: [
            { label: 'VAT', value: 'vat' },
            { label: 'GST', value: 'gst' },
          ],
          admin: { description: 'Tax regime' },
        },
        {
          name: 'taxesIncluded',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Price includes tax' },
        },
        {
          name: 'taxNote',
          type: 'textarea',
          admin: { description: 'Tax notes' },
        },
      ],
    },
    {
      type: 'group',
      name: 'recurring',
      label: 'Recurring',
      fields: [
        {
          name: 'billingPeriod',
          type: 'select',
          options: [
            { label: 'Second', value: 'second' },
            { label: 'Minute', value: 'minute' },
            { label: 'Hour', value: 'hour' },
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ],
          admin: { description: 'Billing frequency' },
        },
        {
          name: 'nextBillingDate',
          type: 'date',
          index: true,
          admin: { description: 'Next billing date' },
        },
        {
          name: 'periodStart',
          type: 'date',
          admin: { description: 'Period start' },
        },
        {
          name: 'periodEnd',
          type: 'date',
          admin: { description: 'Period end' },
        },
        {
          name: 'subscription',
          type: 'relationship',
          relationTo: 'subscriptions',
          index: true,
          admin: { description: 'Owning subscription (used by dunning cycle)' },
        },
      ],
    },
    {
      type: 'group',
      name: 'ledger',
      label: 'Ledger',
      fields: [
        {
          name: 'debitAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Debit account' },
        },
        {
          name: 'creditAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Credit account' },
        },
      ],
    },
    {
      type: 'group',
      name: 'notes',
      label: 'Notes',
      fields: [
        {
          name: 'note',
          type: 'textarea',
          admin: { description: 'General notes' },
        },
        {
          name: 'invoiceNote',
          type: 'textarea',
          admin: { description: 'Invoice notes' },
        },
        {
          name: 'deliveryNote',
          type: 'textarea',
          admin: { description: 'Delivery notes' },
        },
        {
          name: 'deliveryTerms',
          type: 'text',
          admin: { description: 'Delivery terms' },
        },
        {
          name: 'paymentTerms',
          type: 'text',
          admin: { description: 'Payment terms' },
        },
        {
          name: 'paymentMethods',
          type: 'json',
          admin: { description: 'Accepted payment methods' },
        },
      ],
    },
    {
      type: 'group',
      name: 'relationships',
      label: 'Relationships',
      fields: [
        {
          name: 'parent',
          type: 'relationship',
          relationTo: 'invoices',
          admin: { description: 'Parent invoice' },
        },
        {
          name: 'order',
          type: 'relationship',
          relationTo: 'invoices',
          admin: { description: 'Related order' },
        },
        {
          name: 'domain',
          type: 'relationship',
          relationTo: 'tenants',
          admin: { description: 'Domain context' },
        },
      ],
    },
    {
      name: 'test',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Test invoice' },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: { description: 'Additional metadata' },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
      hidden: true,
    },
  ],
}
