/**
 * Org units — the tree a tenant sorts its users into.
 *
 * An org unit is a place in the organisation ("Sales / EMEA"), not a set of people: a user sits in
 * exactly one, and settings can be decided per unit and inherited down the tree. The tree is
 * Payload's nested documents — `parent` here, `breadcrumbs` added by the nested-docs plugin — so a
 * unit's path is its breadcrumbs, not a string kept in step by hand.
 *
 * @standard RFC-4519 §2.19 organizationalUnit (LDAP `ou`)
 * @standard NIST INCITS-359-2012 §5.1 users
 * @security ISO-27001 A.5.15 access-control
 * @see https://payloadcms.com/docs/plugins/nested-docs
 * @see src/packages/admin/providers/google/index.ts (OrgUnit → this collection)
 */
import type { CollectionConfig } from 'payload'
import { scopedAccess, tenantAdmin } from '@/access/collections/shared/multiTenantRead'

export const OrgUnits: CollectionConfig = {
  slug: 'org-units',
  labels: { singular: 'Org unit', plural: 'Org units' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'updatedAt'],
    description: 'The tree a tenant sorts its users into. A user sits in one unit.',
  },
  access: {
    read: scopedAccess(),
    create: tenantAdmin,
    update: tenantAdmin,
    delete: tenantAdmin,
  },
  // Two units under the same parent cannot share a name, within a tenant.
  indexes: [{ fields: ['tenant', 'parent', 'name'], unique: true }],
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'parent', type: 'relationship', relationTo: 'org-units', admin: { description: 'The unit this one sits under; empty for a top-level unit.' } },
    // joins: the other side of two relationships, read through this document and stored nowhere
    { name: 'children', type: 'join', collection: 'org-units', on: 'parent' },
    { name: 'users', type: 'join', collection: 'users', on: 'orgUnit' },
    {
      name: 'blockInheritance',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'When set, this unit does not take settings from the units above it.' },
    },
  ],
}

export default OrgUnits
