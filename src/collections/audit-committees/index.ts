/**
 * Audit Committees — single-folder collection node.
 *
 * @compliance SOX §301 audit-committee
 * @standard SEC Rule 10A-3 audit-committee
 * @audit ISO-19011:2018 oversight
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/collections/shared/roleBasedAccess'

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
      defaultValue: () => new Date().toISOString(),
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
      // The roster IS part of the committee: a member row had no life apart from its committee and the
      // two were linked in both directions (committee.members ⇄ member.committee). One array now.
      name: 'members',
      type: 'array',
      admin: { description: 'The committee roster (formerly the audit-committee-members collection).' },
      fields: [
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
          defaultValue: () => new Date().toISOString(),
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
    },
  ],
}
