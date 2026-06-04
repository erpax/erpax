import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from '@/is/super/admin'
import { scopeResourceCollections } from '@/nist/incits/359'

import { validateRoleDefinition } from '@/roles/hooks/validateRoleDefinition'

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
    // ─── The Role HOLDS the role skills (capability + skillRoutes) ───
    // A role is not just a name+scope (Rolify) — it carries what it can DO and what it KNOWS,
    // so users inherit both through assignment ([[access]] cross + [[classroom]] skillRoute).
    // Access-bearing roles (admin, accountant…) set `capability`; pure party/type roles
    // (seller, buyer…) may leave it empty and carry only skillRoutes/logic.
    {
      name: 'capability',
      type: 'select',
      label: 'Capability',
      options: [
        { label: 'read', value: 'read' },
        { label: 'write', value: 'write' },
        { label: 'sign', value: 'sign' },
        { label: 'admin', value: 'admin' },
        { label: 'audit', value: 'audit' },
      ],
      admin: {
        description:
          'What the role can do on its scope — the rodin 3·6·9 governing axis (read<write<sign<admin; audit ⊥). The Role holds the capability; users inherit it by assignment.',
      },
    },
    {
      name: 'skillRoutes',
      type: 'text',
      hasMany: true,
      index: true,
      label: 'Skill routes',
      admin: {
        description:
          'The skills/logic this role attaches (e.g. accounting/journal-entry, commerce/order). The Role holds the role skills.',
      },
    },
  ],
  hooks: {
    beforeValidate: [validateRoleDefinition],
  },
}
