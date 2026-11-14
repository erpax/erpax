import type { Field } from 'payload'

/**
 * Notes field for additional context
 */
export const notesField = (label = 'Notes'): Field => ({
  name: 'notes',
  type: 'textarea',
  label,
});
