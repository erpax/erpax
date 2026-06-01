/**
 * Regulatory Reports — single-folder collection node.
 *
 * @standard SAF-T OECD standard-audit-file-tax
 * @standard XBRL business-reporting
 * @compliance local-regulatory-filing
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const RegulatoryReports: CollectionConfig = {
  slug: 'regulatory-reports',
  admin: {
    useAsTitle: 'reportName',
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
      name: 'reportName',
      type: 'text',
      required: true,
    },
    {
      name: 'reportingStandard',
      type: 'relationship',
      relationTo: 'compliance-frameworks',
    },
    {
      name: 'jurisdiction',
      type: 'relationship',
      relationTo: 'taxing-jurisdictions',
      required: true,
    },
    {
      name: 'reportType',
      type: 'select',
      options: [
        { label: '10-K/20-F', value: 'annual-filing' },
        { label: '10-Q', value: 'quarterly-filing' },
        { label: 'Form 10-Q', value: 'form-10q' },
        { label: 'SOX Attestation', value: 'sox-attestation' },
        { label: 'Annual Report', value: 'annual-report' },
        { label: 'Compliance Report', value: 'compliance-report' },
        { label: 'Audit Report', value: 'audit-report' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'fiscalPeriodStart',
      type: 'date',
      required: true,
    },
    {
      name: 'fiscalPeriodEnd',
      type: 'date',
      required: true,
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'submissionDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In Review', value: 'in-review' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Overdue', value: 'overdue' },
      ],
      required: true,
    },
    {
      name: 'reportDocument',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'regulatoryFeedback',
      type: 'richText',
    },
    {
      name: 'findings',
      type: 'relationship',
      relationTo: 'audit-findings',
      hasMany: true,
    },
  ],
}
