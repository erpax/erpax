/**
 * Groups — a named set of users (and of other groups) inside a tenant.
 *
 * A group is the directory's unit of "these people together": a team, a mailing address, a set a
 * role or a document is shared with. Membership is a list ON the group — each row one member with
 * its role in the group — so a group and its members are one document, and "which groups is this
 * user in" is a query on `members.member`.
 *
 * The shape is Payload's (a relationship per member, a select for the role); directory providers
 * (Google Workspace, and any other added later) map onto it in `src/packages/admin/providers`.
 *
 * @standard RFC-7643 §4.2 SCIM group resource — displayName, members
 * @standard NIST INCITS-359-2012 §5.1 users and groups
 * @security ISO-27001 A.5.15 access-control · A.5.18 access-rights
 * @see src/packages/admin/providers/google/index.ts (Group, Member → this collection)
 */
import type { CollectionConfig } from 'payload'
import { scopedAccess, tenantAdmin } from '@/access/collections/shared/multiTenantRead'

/** A member's standing in a group. */
export const GROUP_ROLES = ['owner', 'manager', 'member'] as const
export type GroupRole = (typeof GROUP_ROLES)[number]

export const Groups: CollectionConfig = {
  slug: 'groups',
  labels: { singular: 'Group', plural: 'Groups' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'updatedAt'],
    description: 'A named set of users and groups. Members are listed on the group, each with a role.',
  },
  access: {
    read: scopedAccess(),
    create: tenantAdmin,
    update: tenantAdmin,
    delete: tenantAdmin,
  },
  // An address belongs to one group PER TENANT. A field-level `unique` would be collection-wide —
  // two tenants could not both have sales@… — so the rule is a compound index with the tenant.
  indexes: [{ fields: ['tenant', 'email'], unique: true }],
  fields: [
    { name: 'name', type: 'text', required: true, index: true },
    { name: 'email', type: 'email', admin: { description: "The group's address, when it has one." } },
    { name: 'description', type: 'textarea' },
    { name: 'aliases', type: 'text', hasMany: true, admin: { description: 'Other addresses that reach this group.' } },
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'team',
      options: [
        { label: 'Team — people who work together', value: 'team' },
        { label: 'Security — a set that access is granted to', value: 'security' },
        { label: 'Distribution — an address that reaches its members', value: 'distribution' },
      ],
    },
    {
      name: 'externalIds',
      type: 'array',
      admin: { description: 'This group in other systems: the provider or system, and the id it uses.' },
      fields: [
        { name: 'type', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'adminCreated',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Created by an administrator rather than by a user.' },
    },
    {
      // virtual: counted from the list at read time, never stored
      name: 'memberCount',
      type: 'number',
      virtual: true,
      admin: { readOnly: true },
      hooks: { afterRead: [({ siblingData }) => (Array.isArray(siblingData?.members) ? siblingData.members.length : 0)] },
    },
    {
      name: 'members',
      type: 'array',
      admin: { description: 'Who is in the group. A member is a user or another group; an outside address has only an email.' },
      fields: [
        { name: 'member', type: 'relationship', relationTo: ['users', 'groups'] },
        { name: 'email', type: 'email', admin: { description: 'For a member outside the directory.' } },
        {
          name: 'role',
          type: 'select',
          required: true,
          defaultValue: 'member',
          options: GROUP_ROLES.map((role) => ({ label: role.replace(/^./, (c) => c.toUpperCase()), value: role })),
        },
      ],
    },
  ],
}

export default Groups
