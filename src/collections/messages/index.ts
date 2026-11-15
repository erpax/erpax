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
 * Mail from outside arrives here too: Cloudflare Email Routing → worker.ts `email()` →
 * `POST /api/messages/inbound` (src/utilities/email/inbound), which files it for the user it is
 * addressed to, with the sender and Message-ID in `email`.
 *
 * @see ./Comments (polymorphic annotations)
 */

/** Written by the inbound endpoint only (it runs with overrideAccess): no caller can claim a message came by email. */
const serverOnly: FieldAccess = () => false

import type { CollectionConfig, FieldAccess } from 'payload'
import { receiveInbound } from '@/utilities/email/inbound'
import { standardCollectionHooks } from '@/utilities/standard/collection/hook'
import { accountingCollectionAccess } from '@/access/collections/shared/multiTenantRead'
import { statusField } from '@/fields/select/statusField'
import { auditFields } from '@/fields/relationship/auditFields'

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
  // the door the Worker's email() handler knocks on, with its internal token
  endpoints: [{ path: '/inbound', method: 'post', handler: receiveInbound }],
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
      relationTo: ['invoices', 'parties', 'orders'],
      admin: { description: 'Optional business record this message concerns.' },
    },
    { name: 'readAt', type: 'date',
      admin: { readOnly: true, description: 'ISO 8601 — when the message was first read.' } },
    {
      name: 'email',
      type: 'group',
      admin: { description: 'Set when the message arrived by email (Cloudflare Email Routing).' },
      access: { create: serverOnly, update: serverOnly },
      fields: [
        { name: 'from', type: 'text', index: true, admin: { readOnly: true, description: 'The sender (SMTP envelope).' } },
        { name: 'to', type: 'text', admin: { readOnly: true, description: 'The address it was sent to.' } },
        { name: 'messageId', type: 'text', index: true, admin: { readOnly: true, description: 'RFC 5322 Message-ID — a message is filed once.' } },
        { name: 'inReplyTo', type: 'text', admin: { readOnly: true } },
        { name: 'authenticated', type: 'checkbox', admin: { readOnly: true, description: 'DMARC passed at the Cloudflare mail server.' } },
      ],
    },
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
