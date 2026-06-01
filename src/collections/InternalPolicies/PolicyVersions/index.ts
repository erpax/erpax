/**
 * Policy Versions — single-folder collection node.
 *
 * @security ISO-27001 A.5.1 policies
 * @standard ISO-9001:2015 §7.5 documented-information-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const PolicyVersions: CollectionConfig = {
  slug: 'policy-versions',
  admin: {
    useAsTitle: 'versionName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'policy',
      type: 'relationship',
      relationTo: 'internal-policies',
      required: true,
    },
    {
      name: 'versionNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'versionName',
      type: 'text',
      required: true,
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: true,
    },
    {
      name: 'changes',
      type: 'richText',
    },
    {
      name: 'documentUrl',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Final', value: 'final' },
        { label: 'Superseded', value: 'superseded' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
    },
  ],
}
