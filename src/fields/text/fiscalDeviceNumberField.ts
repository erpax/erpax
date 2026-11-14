import type { Field } from 'payload'

/** 8-digit fiscal-device (ФУ) individual number — first УНП segment. */
export const fiscalDeviceNumberField = (required = true): Field => ({
  name: 'fiscalDeviceNumber',
  type: 'text',
  required,
  index: true,
  validate: (value: string | string[] | null | undefined) =>
    (!required && (value == null || value === '')) || (typeof value === 'string' && /^\d{8}$/.test(value))
      ? true
      : 'Fiscal-device number must be exactly 8 digits (Наредба Н-18).',
  admin: { description: '8-digit ФУ individual number — first УНП segment.' },
})
