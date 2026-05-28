import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const InternalPolicies: CollectionConfig = {
  slug: 'internal-policies',
  admin: {
    useAsTitle: 'policyName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'policyName',
      type: 'text',
      required: true,
    },
    {
      name: 'policyNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'policyType',
      type: 'select',
      options: [
        { label: 'Accounting', value: 'accounting' },
        { label: 'Internal Control', value: 'internal-control' },
        { label: 'Compliance', value: 'compliance' },
        { label: 'Financial Reporting', value: 'financial-reporting' },
        { label: 'Risk Management', value: 'risk-management' },
        { label: 'Data Protection', value: 'data-protection' },
        { label: 'Conflict of Interest', value: 'conflict-of-interest' },
        { label: 'Code of Conduct', value: 'code-of-conduct' },
      ],
      required: true,
    },
    {
      name: 'owner',
      type: 'text',
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
    },
    {
      name: 'lastReviewDate',
      type: 'date',
    },
    {
      name: 'nextReviewDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Superseded', value: 'superseded' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'policyDocument',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'applicableControls',
      type: 'relationship',
      relationTo: 'internal-controls',
      hasMany: true,
    },
  ],
}
