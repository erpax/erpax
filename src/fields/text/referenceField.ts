import type { Field } from 'payload'

/**
 * Tenant-unique human-readable reference (e.g. `INV-2026-001`,
 * `PROV-2026-001`, `WIP-2026-04-PRJ-001`). Recurs in 30+ collections.
 *
 * Defaults: `text`, required, unique, indexed.
 */
export const referenceField = (
  opts: { name?: string; description?: string; required?: boolean } = {},
): Field => ({
  name: opts.name ?? 'reference',
  type: 'text',
  required: opts.required ?? true,
  unique: true,
  index: true,
  ...(opts.description
    ? { admin: { description: opts.description } }
    : {}),
})
