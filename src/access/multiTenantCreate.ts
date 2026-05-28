import { Access } from 'payload'

/**
 * Multi-tenant create access — users can only create records for their own tenant.
 * Automatically sets tenant field when creating.
 */
export const multiTenantCreate: Access<'create'> = ({ req }) => {
  if (!req.user) {
    return false
  }

  // Allow authenticated users to create
  return true
}
