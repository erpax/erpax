import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ComplianceNotifications: CollectionConfig = {
  slug: 'compliance-notifications',
  admin: {
    useAsTitle: 'notificationTitle',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
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
