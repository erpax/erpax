/**
 * Management Certifications — single-folder collection node.
 *
 * @compliance SOX §302 corporate-responsibility
 * @compliance SOX §906 criminal-certification
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/role/based/access'

export const ManagementCertifications: CollectionConfig = {
  slug: 'management-certifications',
  admin: {
    useAsTitle: 'certificationName',
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
      name: 'certificationName',
      type: 'text',
      required: true,
    },
    {
      name: 'certifyingOfficer',
      type: 'text',
      required: true,
    },
    {
      name: 'certificationDate',
      type: 'date',
      required: true,
    },
    {
      name: 'certificationType',
      type: 'select',
      options: [
        { label: 'SOX 302', value: 'sox-302' },
        { label: 'SOX 906', value: 'sox-906' },
        { label: 'Section 13 or 15(d)', value: 'section-13-15d' },
        { label: 'Internal Controls', value: 'internal-controls' },
        { label: 'Financial Statement', value: 'financial-statement' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'scope',
      type: 'richText',
    },
    {
      name: 'assertions',
      type: 'array',
      fields: [
        {
          name: 'assertion',
          type: 'text',
        },
        {
          name: 'certificationLevel',
          type: 'select',
          options: [
            { label: 'Fully Certified', value: 'fully-certified' },
            { label: 'With Reservations', value: 'with-reservations' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'Adverse', value: 'adverse' },
          ],
        },
      ],
    },
    {
      name: 'relatedFindings',
      type: 'relationship',
      relationTo: 'audit-findings',
      hasMany: true,
    },
    {
      name: 'signedDocument',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Current', value: 'current' },
        { label: 'Expired', value: 'expired' },
        { label: 'Superseded', value: 'superseded' },
      ],
      defaultValue: 'current',
    },
  ],
}
