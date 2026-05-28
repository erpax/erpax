import { Access } from 'payload'

/**
 * Multi-tenant read access — users can only read records from their own tenant.
 * Filters queries to match user's tenant ID.
 */
export const multiTenantRead: Access<'read'> = ({ req }) => {
  if (!req.user) {
    return false
  }

  // Superadmins can read all tenants
  if (req.user.role === 'superadmin') {
    return true
  }

  // Return a where clause that filters by user's tenant
  return {
    tenant: {
      equals: req.user.tenant,
    },
  }
}
