/**
 * Messages — internal user-to-user messaging with threading.
 *
 * Fills the ceccec/erpax `messages` / `messages_users` gap: a subject/body
 * note sent from one user to one or more recipients, optionally threaded
 * (`parentMessage`, replacing Rails `ancestry`) and optionally attached to
 * any business record (`relatedDocument`). Distinct from the polymorphic
 * `comment` concern (annotations ON a record) — these are addressed
 * messages between people.
 *
 * @standard ISO-8601-1:2019 date-time sent-read-timestamps
 * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail message-provenance
 * @compliance GDPR Art 5(1)(e) storage-limitation retention
 * @see ./Comments (polymorphic annotations)
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { statusField, auditFields } from '@/fields/base-accounting-fields'

const Messages: CollectionConfig = {
  slug: 'messages',
  labels: { singular: 'Message', plural: 'Messages' },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'priority', 'status', 'createdAt'],
    description:
      'Internal message between users (subject/body, threaded via parentMessage). Attachable to any record. Distinct from polymorphic record comments.',
  },
  access: accountingCollectionAccess(),
  fields: [
    { name: 'subject', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'priority', type: 'select', defaultValue: 'normal',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Normal', value: 'normal' },
        { label: 'Low', value: 'low' },
      ] },
    { name: 'recipients', type: 'relationship', relationTo: 'users', hasMany: true, index: true,
      admin: { description: 'Addressed recipients (Rails messages_users join).' } },
    { name: 'parentMessage', type: 'relationship', relationTo: 'messages',
      admin: { description: 'Message this one replies to — thread root chain (replaces Rails ancestry).' } },
    {
      name: 'relatedDocument',
      type: 'relationship',
      relationTo: ['invoices', 'customers', 'vendors', 'sales-orders', 'purchase-orders'],
      admin: { description: 'Optional business record this message concerns.' },
    },
    { name: 'readAt', type: 'date',
      admin: { readOnly: true, description: 'ISO 8601 — when the message was first read.' } },
    statusField(
      [
        { label: 'Unread', value: 'unread' },
        { label: 'Read', value: 'read' },
        { label: 'Archived', value: 'archived' },
      ],
      'unread',
    ),
    ...auditFields({ readOnly: true }),
  ],
  hooks: standardCollectionHooks('messages'),
  timestamps: true,
}

export default Messages
