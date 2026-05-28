import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from '../../access/isSuperAdmin'
import { scopeResourceCollections } from '../../standards/nist-incits-359'

import { validateRoleDefinition } from './hooks/validateRoleDefinition'

/**
 * Role **definitions** (`name` + binding). Assign users via {@link ../UserRoles `user_roles`}.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §5.16 identity-management
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.4
 */
export const Roles: CollectionConfig = {
  slug: 'roles',
  labels: {
    singular: 'Role',
    plural: 'Roles',
  },
  admin: {
    defaultColumns: ['name', 'binding', 'scopedCollection', 'resource', 'updatedAt'],
    description:
      'Role name plus optional scope: entire app (global), any row in a collection (class), or one referenced document.',
    useAsTitle: 'name',
  },
  access: {
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: isSuperAdminAccess,
    update: isSuperAdminAccess,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      index: true,
      label: 'Role name',
      required: true,
    },
    {
      name: 'binding',
      type: 'select',
      label: 'Scope',
      required: true,
      defaultValue: 'global',
      options: [
        { label: 'Global (app-wide)', value: 'global' },
        { label: 'Collection (any row in collection)', value: 'collection' },
        { label: 'Document (specific row)', value: 'document' },
      ],
      admin: {
        description:
          'Matches stored role rows: global → no resource; collection → slug only; document → polymorphic reference.',
      },
    },
    {
      name: 'scopedCollection',
      type: 'select',
      label: 'Collection',
      admin: {
        condition: (_, siblingData) => siblingData?.binding === 'collection',
        description: 'When scope is collection-level, pick which Payload collection this role applies to.',
      },
      options: scopeResourceCollections.map((slug) => ({
        label: slug,
        value: slug,
      })),
    },
    {
      name: 'resource',
      type: 'relationship',
      label: 'Document',
      relationTo: [...scopeResourceCollections],
      admin: {
        condition: (_, siblingData) => siblingData?.binding === 'document',
        description: 'When scope is document-level, choose the exact record.',
      },
    },
  ],
  hooks: {
    beforeValidate: [validateRoleDefinition],
  },
}
