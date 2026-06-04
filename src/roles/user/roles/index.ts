import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from '@/is/super/admin'

import { preventDuplicateAssignment } from '@/roles/user/roles/hooks/preventDuplicateAssignment'

/**
 * Join collection: users ↔ {@link ../Roles `roles`} definitions (`users_roles` HABTM equivalent).
 *
 * @standard NIST INCITS-359-2012 role-based-access-control role-assignment
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §5.4 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOC-2 CC6.3 access-removal
 * @see docs/STANDARDS.md §4.4
 */
export const UserRoles: CollectionConfig = {
  slug: 'user-roles',
  labels: {
    singular: 'User role assignment',
    plural: 'User role assignments',
  },
  admin: {
    defaultColumns: ['user', 'role', 'updatedAt'],
    description: 'Assigns users to role definitions.',
  },
  access: {
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: isSuperAdminAccess,
    update: isSuperAdminAccess,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      label: 'User',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'role',
      type: 'relationship',
      label: 'Role',
      relationTo: 'roles',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [preventDuplicateAssignment],
  },
}
