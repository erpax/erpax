import type { Access } from 'payload'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdmin = (user: unknown): boolean => {
  if (!user || typeof user !== 'object' || !('roles' in user)) return false
  const roles = (user as { roles?: unknown }).roles
  return Array.isArray(roles) && roles.includes('super-admin')
}
