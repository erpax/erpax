import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const RemediationPlans: CollectionConfig = {
  slug: 'remediation-plans',
  admin: {
    useAsTitle: 'planTitle',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin', 'audit-staff'],
    update: ['superadmin', 'admin', 'audit-staff'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'planTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'finding',
      type: 'relationship',
      relationTo: 'audit-findings',
    },
    {
      name: 'gap',
      type: 'relationship',
      relationTo: 'compliance-gaps',
    },
    {
      name: 'remediationType',
      type: 'select',
      options: [
        { label: 'Design Change', value: 'design-change' },
        { label: 'Process Change', value: 'process-change' },
        { label: 'System Implementation', value: 'system-implementation' },
        { label: 'Training', value: 'training' },
        { label: 'Documentation', value: 'documentation' },
        { label: 'Resource Addition', value: 'resource-addition' },
        { label: 'Policy Update', value: 'policy-update' },
        { label: 'Organizational Change', value: 'organizational-change' },
      ],
      required: true,
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Critical', value: 'critical' },
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
    },
    {
      name: 'owner',
      type: 'text',
    },
    {
      name: 'actionSteps',
      type: 'array',
      fields: [
        {
          name: 'sequence',
          type: 'number',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'stepOwner',
          type: 'text',
        },
        {
          name: 'targetDate',
          type: 'date',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Not Started', value: 'not-started' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' },
            { label: 'Delayed', value: 'delayed' },
          ],
        },
        {
          name: 'completedDate',
          type: 'date',
        },
      ],
    },
    {
      name: 'targetDate',
      type: 'date',
      required: true,
    },
    {
      name: 'completionDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Planned', value: 'planned' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Delayed', value: 'delayed' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Superseded', value: 'superseded' },
      ],
      defaultValue: 'planned',
    },
    {
      name: 'budget',
      type: 'number',
    },
    {
      name: 'riskOfDelay',
      type: 'richText',
    },
  ],
}
