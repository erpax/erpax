import { Access } from 'payload'
import { isSuperAdmin, superAdminOnly } from '@/is/super/admin'
import { getUserContext, neverDelete } from '@/auth'

/**
 * Audit trail read access — authenticated users can read audit events,
 * but only for their own tenant. Super-admins can read all.
 */
export const auditTrailRead: Access<'read'> = ({ req }) => {
  if (!req.user) {
    return false
  }

  // Super-admins can read all audit trails
  if (isSuperAdmin(req.user)) {
    return true
  }

  // Other users can only read audit trails for their tenant
  return {
    tenant: {
      equals: getUserContext(req)?.tenant ?? '',
    },
  }
}

/**
 * Audit trail create access — only super-admins can create audit events.
 * In practice, audit events are created automatically via hooks.
 */
export const auditTrailCreate: Access<'create'> = superAdminOnly

/**
 * Audit trail update/delete access — NEVER allowed.
 * Enforced by beforeChange hook, but this provides additional safety.
 */
export const auditTrailModifyDenied: Access = neverDelete

/** @index-cross.foldback child=audit/trail/access parent=audit/trail — this cross folds back into its parent. */
