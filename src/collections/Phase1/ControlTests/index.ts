import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ControlTests: CollectionConfig = {
  slug: 'control-tests',
  admin: {
    useAsTitle: 'testName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin', 'audit-staff'],
    update: ['super-admin', 'admin', 'audit-staff'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'control',
      type: 'relationship',
      relationTo: 'internal-controls',
      required: true,
    },
    {
      name: 'testName',
      type: 'text',
      required: true,
    },
    {
      name: 'testDesign',
      type: 'richText',
    },
    {
      name: 'samplingMethodology',
      type: 'select',
      options: [
        { label: 'Statistical', value: 'statistical' },
        { label: 'Judgmental', value: 'judgmental' },
        { label: 'All Items', value: 'all-items' },
        { label: 'Risk-Based', value: 'risk-based' },
      ],
    },
    {
      name: 'sampleSize',
      type: 'number',
    },
    {
      name: 'testStatus',
      type: 'select',
      options: [
        { label: 'Not Started', value: 'not-started' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'not-started',
    },
    {
      name: 'result',
      type: 'select',
      options: [
        { label: 'Effective', value: 'effective' },
        { label: 'Deviations', value: 'deviations' },
        { label: 'Not Operating', value: 'not-operating' },
        { label: 'Unable to Determine', value: 'unable-determine' },
      ],
    },
    {
      name: 'deviationCount',
      type: 'number',
    },
    {
      name: 'deviationRate',
      type: 'number',
    },
  ],
}
