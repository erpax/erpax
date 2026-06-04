/**
 * Audit Committees — single-folder collection node.
 *
 * @compliance SOX §301 audit-committee
 * @standard SEC Rule 10A-3 audit-committee
 * @audit ISO-19011:2018 oversight
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/role/based/access'

export const AuditCommittees: CollectionConfig = {
  slug: 'audit-committees',
  admin: {
    useAsTitle: 'name',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'charter',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'establishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'meetingFrequency',
      type: 'select',
      options: [
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Semi-annual', value: 'semi-annual' },
        { label: 'Annual', value: 'annual' },
        { label: 'As needed', value: 'as-needed' },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Dissolved', value: 'dissolved' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'audit-committee-members',
      hasMany: true,
    },
  ],
}
