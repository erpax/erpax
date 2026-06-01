import { Access } from 'payload'
import { isSuperAdmin } from '../isSuperAdmin'
import { getUserContext } from '../auth'

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
export const auditTrailCreate: Access<'create'> = ({ req }) => {
  return isSuperAdmin(req.user)
}

/**
 * Audit trail update/delete access — NEVER allowed.
 * Enforced by beforeChange hook, but this provides additional safety.
 */
export const auditTrailModifyDenied: Access = () => {
  return false
}
