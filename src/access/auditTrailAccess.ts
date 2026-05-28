import { Access } from 'payload'

/**
 * Audit trail read access — authenticated users can read audit events,
 * but only for their own tenant. Superadmins can read all.
 */
export const auditTrailRead: Access<'read'> = ({ req }) => {
  if (!req.user) {
    return false
  }

  // Superadmins can read all audit trails
  if (req.user.role === 'superadmin') {
    return true
  }

  // Other users can only read audit trails for their tenant
  return {
    tenant: {
      equals: req.user.tenant,
    },
  }
}

/**
 * Audit trail create access — only superadmins can create audit events.
 * In practice, audit events are created automatically via hooks.
 */
export const auditTrailCreate: Access<'create'> = ({ req }) => {
  return req.user?.role === 'superadmin' || false
}

/**
 * Audit trail update/delete access — NEVER allowed.
 * Enforced by beforeChange hook, but this provides additional safety.
 */
export const auditTrailModifyDenied: Access = ({ req }) => {
  return false
}
