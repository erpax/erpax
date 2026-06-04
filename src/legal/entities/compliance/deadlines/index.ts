/**
 * Compliance Deadlines — single-folder collection node.
 *
 * @standard ISO-37301:2021 compliance-management-systems
 * @standard ISO-8601-1:2019 due-date
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/role/based/access'

export const ComplianceDeadlines: CollectionConfig = {
  slug: 'compliance-deadlines',
  admin: {
    useAsTitle: 'deadlineName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer', 'finance'],
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
      name: 'deadlineName',
      type: 'text',
      required: true,
    },
    {
      name: 'deadlineType',
      type: 'select',
      options: [
        { label: 'Filing Deadline', value: 'filing-deadline' },
        { label: 'Audit Deadline', value: 'audit-deadline' },
        { label: 'Certification Deadline', value: 'certification-deadline' },
        { label: 'Reporting Deadline', value: 'reporting-deadline' },
        { label: 'Payment Deadline', value: 'payment-deadline' },
        { label: 'Disclosure Deadline', value: 'disclosure-deadline' },
      ],
      required: true,
    },
    {
      name: 'jurisdiction',
      type: 'relationship',
      relationTo: 'taxing-jurisdictions',
    },
    {
      name: 'requirement',
      type: 'relationship',
      relationTo: 'compliance-requirements',
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
        { label: 'On Track', value: 'on-track' },
        { label: 'At Risk', value: 'at-risk' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'on-track',
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
      name: 'penalty',
      type: 'text',
    },
  ],
}
