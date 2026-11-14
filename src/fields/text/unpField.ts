import type { Field } from 'payload'

/** The УНП text field — unique, indexed, assigned + frozen by the sequence hook. */
export const unpField = (): Field => ({
  name: 'unp',
  type: 'text',
  unique: true,
  index: true,
  admin: { readOnly: true, description: 'Unique sales number (УНП) — assigned + frozen on create.' },
})
