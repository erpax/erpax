/**
 * Board Actions — single-folder collection node.
 *
 * @standard OECD G20 principles-of-corporate-governance
 * @compliance SOX §404 governance
 * @standard ISO-37000:2021 governance-of-organizations
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/roleBasedAccess'

export const BoardActions: CollectionConfig = {
  slug: 'board-actions',
  admin: {
    useAsTitle: 'actionTitle',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'actionTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'actionType',
      type: 'select',
      options: [
        { label: 'Resolution', value: 'resolution' },
        { label: 'Policy Approval', value: 'policy-approval' },
        { label: 'Risk Assessment', value: 'risk-assessment' },
        { label: 'Control Enhancement', value: 'control-enhancement' },
        { label: 'Committee Report', value: 'committee-report' },
        { label: 'Attestation', value: 'attestation' },
      ],
      required: true,
    },
    {
      name: 'meetingDate',
      type: 'date',
      required: true,
    },
    {
      name: 'actionDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Tabled', value: 'tabled' },
        { label: 'Withdrawn', value: 'withdrawn' },
      ],
      required: true,
    },
    {
      name: 'voteTally',
      type: 'group',
      fields: [
        { name: 'votesFor', type: 'number' },
        { name: 'votesAgainst', type: 'number' },
        { name: 'abstentions', type: 'number' },
      ],
    },
    {
      name: 'minutes',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedControls',
      type: 'relationship',
      relationTo: 'internal-controls',
      hasMany: true,
    },
  ],
}
