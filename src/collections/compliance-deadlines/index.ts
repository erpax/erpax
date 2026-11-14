/**
 * Compliance Deadlines — single-folder collection node.
 *
 * @standard ISO-37301:2021 compliance-management-systems
 * @standard ISO-8601-1:2019 due-date
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/collections/shared/roleBasedAccess'

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
      relationTo: 'tax-jurisdictions',
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
    {
      name: 'notifications',
      type: 'array',
      admin: { description: 'The reminders scheduled for this deadline (formerly the compliance-notifications collection — a reminder has no life apart from its deadline).' },
      fields: [
        {
          name: 'notificationTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'notificationContent',
          type: 'richText',
        },
        {
          name: 'notificationType',
          type: 'select',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'In-App', value: 'in-app' },
            { label: 'SMS', value: 'sms' },
            { label: 'Calendar Event', value: 'calendar-event' },
          ],
          hasMany: true,
        },
        {
          name: 'recipients',
          type: 'array',
          fields: [
            {
              name: 'recipientEmail',
              type: 'email',
            },
            {
              name: 'recipientRole',
              type: 'text',
            },
          ],
        },
        {
          name: 'daysBeforeDue',
          type: 'number',
          required: true,
        },
        {
          name: 'sentDate',
          type: 'date',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Scheduled', value: 'scheduled' },
            { label: 'Sent', value: 'sent' },
            { label: 'Delivered', value: 'delivered' },
            { label: 'Failed', value: 'failed' },
          ],
          defaultValue: 'scheduled',
        },
      ],
    },
  ],
}
