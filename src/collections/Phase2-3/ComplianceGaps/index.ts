import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ComplianceGaps: CollectionConfig = {
  slug: 'compliance-gaps',
  admin: {
    useAsTitle: 'gapTitle',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin', 'audit-staff'],
    update: ['superadmin', 'admin', 'audit-staff'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'requirement',
      type: 'relationship',
      relationTo: 'compliance-requirements',
      required: true,
    },
    {
      name: 'gapTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'gapType',
      type: 'select',
      options: [
        { label: 'Missing Control', value: 'missing-control' },
        { label: 'Design Deficiency', value: 'design-deficiency' },
        { label: 'Operating Deficiency', value: 'operating-deficiency' },
        { label: 'Documentation Gap', value: 'documentation-gap' },
        { label: 'Resource Gap', value: 'resource-gap' },
        { label: 'System Gap', value: 'system-gap' },
        { label: 'Process Gap', value: 'process-gap' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Identified', value: 'identified' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Remediation Planned', value: 'remediation-planned' },
        { label: 'In Remediation', value: 'in-remediation' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'identified',
    },
    {
      name: 'remediationPlan',
      type: 'relationship',
      relationTo: 'remediation-plans',
    },
  ],
}
