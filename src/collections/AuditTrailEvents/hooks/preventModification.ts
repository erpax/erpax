import { CollectionBeforeChangeHook } from 'payload'

/**
 * Prevent modification of audit trail events (immutable append-only log).
 *
 * Audit trail events can only be created; never updated or deleted.
 * This ensures tamper-resistance and compliance with audit standards.
 */
export const preventAuditTrailModification: CollectionBeforeChangeHook = async ({
  operation,
}) => {
  if (operation === 'update') {
    throw new Error('Audit trail events are immutable; cannot be updated.')
  }
  if (operation === 'delete') {
    throw new Error('Audit trail events cannot be deleted.')
  }
}
