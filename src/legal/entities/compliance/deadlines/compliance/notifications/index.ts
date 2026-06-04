/**
 * Compliance Notifications — single-folder collection node.
 *
 * @standard ISO-37301:2021 compliance-management
 * @standard ISO-8601-1:2019 notified-at
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/role/based/access'

export const ComplianceNotifications: CollectionConfig = {
  slug: 'compliance-notifications',
  admin: {
    useAsTitle: 'notificationTitle',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'deadline',
      type: 'relationship',
      relationTo: 'compliance-deadlines',
      required: true,
    },
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
}
