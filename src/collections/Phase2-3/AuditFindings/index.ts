import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const AuditFindings: CollectionConfig = {
  slug: 'audit-findings',
  admin: {
    useAsTitle: 'findingTitle',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin', 'audit-staff'],
    update: ['superadmin', 'admin', 'audit-staff'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'findingTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'findingType',
      type: 'select',
      options: [
        { label: 'Control Deficiency', value: 'control-deficiency' },
        { label: 'Significant Deficiency', value: 'significant-deficiency' },
        { label: 'Material Weakness', value: 'material-weakness' },
        { label: 'Misstatement', value: 'misstatement' },
        { label: 'Exception', value: 'exception' },
        { label: 'Observation', value: 'observation' },
      ],
      required: true,
    },
    {
      name: 'severity',
      type: 'select',
      options: [
        { label: 'Critical', value: 'critical' },
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'rootCause',
      type: 'richText',
    },
    {
      name: 'potentialImpact',
      type: 'richText',
    },
    {
      name: 'frequencyOfOccurrence',
      type: 'select',
      options: [
        { label: 'Isolated', value: 'isolated' },
        { label: 'Occasional', value: 'occasional' },
        { label: 'Recurring', value: 'recurring' },
        { label: 'Pervasive', value: 'pervasive' },
      ],
    },
    {
      name: 'riskCategory',
      type: 'select',
      options: [
        { label: 'Financial Reporting', value: 'financial-reporting' },
        { label: 'Compliance', value: 'compliance' },
        { label: 'Operational', value: 'operational' },
        { label: 'Security', value: 'security' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'In Remediation', value: 'in-remediation' },
        { label: 'Remediated Pending', value: 'remediated-pending' },
        { label: 'Remediated Confirmed', value: 'remediated-confirmed' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
    },
    {
      name: 'evidence',
      type: 'relationship',
      relationTo: 'audit-evidence',
      hasMany: true,
    },
    {
      name: 'remediationPlan',
      type: 'relationship',
      relationTo: 'remediation-plans',
    },
  ],
}
