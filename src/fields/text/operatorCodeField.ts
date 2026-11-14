import type { Field } from 'payload'

/** 4-digit operator code — second УНП segment (defaults to the 0000 identity element). */
export const operatorCodeField = (): Field => ({
  name: 'operatorCode',
  type: 'text',
  defaultValue: '0000',
  validate: (value: string | string[] | null | undefined) =>
    value == null || (typeof value === 'string' && /^\d{1,4}$/.test(value))
      ? true
      : 'Operator code must be up to 4 digits.',
})
