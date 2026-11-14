import type { Field } from 'payload'

/**
 * Status field with common accounting statuses
 */
export const statusField = (options: { label: string; value: string }[], defaultValue = 'draft'): Field => ({
  name: 'status',
  type: 'select',
  defaultValue,
  options,
});
