import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ComplianceFrameworks: CollectionConfig = {
  slug: 'compliance-frameworks',
  admin: {
    useAsTitle: 'name',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin'],
    update: ['superadmin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'frameworkType',
      type: 'select',
      options: [
        { label: 'GAAP', value: 'gaap' },
        { label: 'IFRS', value: 'ifrs' },
        { label: 'SOX', value: 'sox' },
        { label: 'COSO', value: 'coso' },
        { label: 'GDPR', value: 'gdpr' },
        { label: 'ISO', value: 'iso' },
        { label: 'Regulatory', value: 'regulatory' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'issuingBody',
      type: 'text',
    },
    {
      name: 'version',
      type: 'text',
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'applicableJurisdictions',
      type: 'relationship',
      relationTo: 'taxing-jurisdictions',
      hasMany: true,
    },
  ],
}
