/**
 * Audit Committee Members — single-folder collection node.
 *
 * @compliance SOX §301 audit-committee-composition
 * @standard SEC Rule 10A-3 audit-committee-independence
 * @standard NYSE 303A.07 audit-committee
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/roleBasedAccess'

export const AuditCommitteeMembers: CollectionConfig = {
  slug: 'audit-committee-members',
  admin: {
    useAsTitle: 'memberName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'committee',
      type: 'relationship',
      relationTo: 'audit-committees',
      required: true,
    },
    {
      name: 'memberName',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'affiliation',
      type: 'select',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'External', value: 'external' },
        { label: 'Independent', value: 'independent' },
      ],
      required: true,
    },
    {
      name: 'appointedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'termEndDate',
      type: 'date',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Chair', value: 'chair' },
        { label: 'Vice Chair', value: 'vice-chair' },
        { label: 'Member', value: 'member' },
        { label: 'Financial Expert', value: 'financial-expert' },
      ],
    },
    {
      name: 'expertise',
      type: 'array',
      fields: [
        {
          name: 'area',
          type: 'text',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Resigned', value: 'resigned' },
        { label: 'Removed', value: 'removed' },
      ],
      defaultValue: 'active',
    },
  ],
}
