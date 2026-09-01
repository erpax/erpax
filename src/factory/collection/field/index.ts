/**
 * factory/collection/field — the small field builders the factory hands out.
 *
 * A calculated field (value computed in beforeChange, never typed by a user), a
 * GL-account select built from a named list, and a line-item array. Each is the
 * ask a collection would otherwise re-type ([[rules]]/ask: if the system can
 * derive it, the user confirms rather than types).
 *
 * @see ./SKILL.md
 */
import type { Field } from 'payload'
// ─── Helpers retained for backwards compat ─────────────────────────

/**
 * Create calculated field with beforeChange hook
 */
export const createCalculatedField = (
  fieldName: string,
  calculator: (data: Record<string, unknown>) => number,
  description?: string,
) => {
  return {
    name: fieldName,
    type: 'number' as const,
    defaultValue: 0,
    admin: { disabled: true, description },
    _calculator: calculator, // Store for use in hooks
  }
}

/**
 * Create GL account mapping fields (asset, liability, expense accounts)
 */
export const createGLAccountFields = (accounts: { name: string; description: string }[]) => {
  return accounts.map((acc): Field => ({
    name: acc.name,
    type: 'relationship' as const,
    relationTo: 'gl-accounts',
    required: true,
    admin: { description: acc.description },
  }))
}

/**
 * Create line item array field with standard structure
 */
export const createLineItemArray = (
  lineItemFields: { name: string; type: string; required?: boolean; options?: unknown }[],
) => {
  return {
    name: 'lineItems',
    type: 'array' as const,
    minRows: 1,
    fields: lineItemFields,
  }
}

/** @index-cross.foldback child=factory/collection/field parent=factory/collection — this cross folds back into its parent. */
