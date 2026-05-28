import { Access } from 'payload'

type Role = 'superadmin' | 'admin' | 'audit-staff' | 'compliance-officer' | 'finance' | 'user'

export interface RoleAccessConfig {
  read?: Role[]
  create?: Role[]
  update?: Role[]
  delete?: Role[]
}

/**
 * Factory function for role-based access control.
 * Specify which roles can perform which operations.
 */
export const roleBasedAccess = (
  config: RoleAccessConfig
): Record<'read' | 'create' | 'update' | 'delete', Access> => {
  return {
    read: ({ req }) => {
      if (!req.user) return false
      if (!config.read) return true // If no restriction, allow all authenticated users
      return config.read.includes(req.user.role as Role)
    },
    create: ({ req }) => {
      if (!req.user) return false
      if (!config.create) return false // If not specified, deny creation
      return config.create.includes(req.user.role as Role)
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (!config.update) return false
      return config.update.includes(req.user.role as Role)
    },
    delete: ({ req }) => {
      if (!req.user) return false
      if (!config.delete) return false
      return config.delete.includes(req.user.role as Role)
    },
  }
}
