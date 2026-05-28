import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const InternalControls: CollectionConfig = {
  slug: 'internal-controls',
  admin: {
    useAsTitle: 'controlName',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'controlName',
      type: 'text',
      required: true,
    },
    {
      name: 'controlType',
      type: 'select',
      options: [
        { label: 'Preventive', value: 'preventive' },
        { label: 'Detective', value: 'detective' },
        { label: 'Corrective', value: 'corrective' },
        { label: 'Compensating', value: 'compensating' },
      ],
      required: true,
    },
    {
      name: 'controlCategory',
      type: 'select',
      options: [
        { label: 'Preventive-General', value: 'preventive-general' },
        { label: 'Preventive-Specific', value: 'preventive-specific' },
        { label: 'Detective-Manual', value: 'detective-manual' },
        { label: 'Detective-Automated', value: 'detective-automated' },
        { label: 'Corrective', value: 'corrective' },
        { label: 'Monitoring', value: 'monitoring' },
        { label: 'Governance', value: 'governance' },
        { label: 'User-Access', value: 'user-access' },
      ],
      required: true,
    },
    {
      name: 'cosoComponent',
      type: 'select',
      options: [
        { label: 'Control Environment', value: 'control-environment' },
        { label: 'Risk Assessment', value: 'risk-assessment' },
        { label: 'Control Activities', value: 'control-activities' },
        { label: 'Information & Communication', value: 'information-communication' },
        { label: 'Monitoring', value: 'monitoring' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'owner',
      type: 'text',
    },
    {
      name: 'frequency',
      type: 'select',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Annually', value: 'annually' },
        { label: 'Continuous', value: 'continuous' },
      ],
    },
  ],
}
