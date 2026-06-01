import { Access } from 'payload'
import type { UserRole } from '@/types/auth'
import { getUser } from '../auth'

export interface RoleAccessConfig {
  read?: UserRole[]
  create?: UserRole[]
  update?: UserRole[]
  delete?: UserRole[]
}

/**
 * Factory function for role-based access control.
 * Specify which roles can perform which operations. A user passes when
 * any role they hold (`User.roles[]`) is in the allowed list. `allowed`
 * omitted → use `fallback` (read defaults open for authenticated users;
 * writes default closed).
 */
export const roleBasedAccess = (
  config: RoleAccessConfig,
): Record<'read' | 'create' | 'update' | 'delete', Access> => {
  const check = (allowed: UserRole[] | undefined, fallback: boolean): Access => ({ req }) => {
    const user = getUser(req)
    if (!user) return false
    if (!allowed) return fallback
    const roles = (user.roles ?? []) as UserRole[]
    return allowed.some((r) => roles.includes(r))
  }
  return {
    read: check(config.read, true),
    create: check(config.create, false),
    update: check(config.update, false),
    delete: check(config.delete, false),
  }
}
