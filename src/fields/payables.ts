/**
 * A/P Field Factories — reusable Payload field definitions for payables.
 *
 * @standard EN-16931:2017 §BG-4 seller
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting US-GAAP ASC-405 liabilities
 * @see docs/STANDARDS.md §5
 */

export const createBillNumberField = (fieldName: string = 'billNumber') => ({
  name: fieldName,
  type: 'text',
  required: true,
  unique: true,
  admin: {
    description: 'Bill number (e.g., BILL-2026-001)',
  },
  validate: (value: string) => {
    if (!/^[A-Z]{4}-\d{4}-\d{3}$/.test(value)) {
      return 'Invalid bill number format (use: XXXX-YYYY-ZZZ)'
    }
    return true
  },
})

export const createBillStatusField = (fieldName: string = 'status') => ({
  name: fieldName,
  type: 'select',
  required: true,
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Received', value: 'received' },
    { label: 'Approved', value: 'approved' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Partial', value: 'partial' },
    { label: 'Paid', value: 'paid' },
    { label: 'Disputed', value: 'disputed' },
  ],
  defaultValue: 'draft',
})

export const createAPAnalysisFields = () => [
  {
    name: 'daysUntilDue',
    type: 'number',
    admin: {
      description: 'Calculated: Days until due date (read-only)',
      readOnly: true,
    },
  },
  {
    name: 'daysOverdue',
    type: 'number',
    admin: {
      description: 'Calculated: Days since due date (read-only)',
      readOnly: true,
    },
  },
  {
    name: 'billAge',
    type: 'number',
    admin: {
      description: 'Calculated: Days since bill date (read-only)',
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
]

export const createPaymentScheduleFields = () => [
  {
    name: 'scheduledPaymentDate',
    type: 'date',
    admin: {
      description: 'Scheduled payment date',
    },
  },
  {
    name: 'scheduledPaymentAmount',
    type: 'number',
    admin: {
      description: 'Amount to pay on scheduled date (cents)',
    },
  },
  {
    name: 'paymentMethod',
    type: 'select',
    options: [
      { label: 'Check', value: 'check' },
      { label: 'Bank Transfer (ACH)', value: 'bank_transfer' },
      { label: 'Credit Card', value: 'credit_card' },
      { label: 'Cash', value: 'cash' },
    ],
  },
]

export const createEarlyPaymentDiscountFields = () => [
  {
    name: 'discountAvailable',
    type: 'number',
    admin: {
      description: 'Early payment discount amount (cents)',
    },
  },
  {
    name: 'discountDeadline',
    type: 'date',
    admin: {
      description: 'Last date to claim discount',
    },
  },
  {
    name: 'discountPercentage',
    type: 'number',
    admin: {
      description: 'Discount as percentage of bill (read-only)',
      readOnly: true,
    },
  },
  {
    name: 'discountTaken',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Whether discount was claimed',
    },
  },
]
