import { CollectionBeforeChangeHook } from 'payload'

/**
 * Hook that ensures tenant field is set to user's tenant on create.
 * Prevents users from creating records in other tenants.
 */
export const enforceTenantOnCreate: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  if (operation === 'create' && req.user) {
    // Always set tenant to user's tenant
    data.tenant = req.user.tenant
  }

  return data
}

/**
 * Hook that prevents updating the tenant field.
 * Once a record is assigned to a tenant, it cannot be moved.
 */
export const preventTenantChange: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  if (operation === 'update' && data.tenant) {
    // Superadmins only
    if (req.user?.role !== 'superadmin') {
      throw new Error('Cannot change tenant assignment. Contact administrator.')
    }
  }

  return data
}

/**
 * Hook that validates user can only read/update records from their tenant.
 */
export const validateTenantAccess: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  if (!req.user || req.user.role === 'superadmin') {
    return data
  }

  // Check if record's tenant matches user's tenant
  if (data.tenant && data.tenant !== req.user.tenant) {
    throw new Error('Access denied: Record belongs to different tenant')
  }

  return data
}
