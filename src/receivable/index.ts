/**
 * A/R Field Factories — reusable Payload field definitions for receivables.
 *
 * @standard EN-16931:2017 invoice-fields
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @see docs/STANDARDS.md §5
 */

export const createInvoiceNumberField = (fieldName: string = 'invoiceNumber') => ({
  name: fieldName,
  type: 'text',
  required: true,
  unique: true,
  admin: {
    description: 'Invoice number (e.g., INV-2026-001)',
  },
  validate: (value: string) => {
    if (!/^[A-Z]{3}-\d{4}-\d{3}$/.test(value)) {
      return 'Invalid invoice number format (use: XXX-YYYY-ZZZ)'
    }
    return true
  },
})

export const createInvoiceStatusField = (fieldName: string = 'status') => ({
  name: fieldName,
  type: 'select',
  required: true,
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Issued', value: 'issued' },
    { label: 'Partial', value: 'partial' },
    { label: 'Overdue', value: 'overdue' },
    { label: 'Paid', value: 'paid' },
    { label: 'Written Off', value: 'written_off' },
  ],
  defaultValue: 'draft',
  admin: {
    description: 'Current invoice status',
  },
})

export const createDueDateField = (fieldName: string = 'dueDate') => ({
  name: fieldName,
  type: 'date',
  required: true,
  admin: {
    description: 'Invoice due date (ISO 8601 format)',
  },
  validate: (value: string) => {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      return 'Invalid date format'
    }
    return true
  },
})

export const createPaymentTermsField = (fieldName: string = 'paymentTerms') => ({
  name: fieldName,
  type: 'select',
  required: true,
  options: [
    { label: 'Due on receipt', value: '0' },
    { label: 'Net 15', value: '15' },
    { label: 'Net 30', value: '30' },
    { label: 'Net 60', value: '60' },
    { label: 'Net 90', value: '90' },
    { label: 'Custom', value: 'custom' },
  ],
  defaultValue: '30',
  admin: {
    description: 'Standard payment terms',
  },
})

export const createARAnalysisFields = () => [
  {
    name: 'daysOverdue',
    type: 'number',
    admin: {
      description: 'Calculated: Days since due date (read-only)',
      readOnly: true,
    },
  },
  {
    name: 'arAge',
    type: 'number',
    admin: {
      description: 'Calculated: Days since invoice date (read-only)',
      readOnly: true,
    },
  },
  {
    name: 'agingBucket',
    type: 'select',
    options: [
      { label: 'Current', value: 'current' },
      { label: '31-60 days', value: '31-60' },
      { label: '61-90 days', value: '61-90' },
      { label: '90+ days', value: '90+' },
    ],
    admin: {
      description: 'Aging category (read-only)',
      readOnly: true,
    },
  },
  {
    name: 'isAtRisk',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Flag for collections attention (read-only)',
      readOnly: true,
    },
  },
]

export * from './aging'

export * from './allowance'

export * from './analytics'

export * from './workflow'
