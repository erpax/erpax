/**
 * Chat — the agent-society room, native to Payload.
 *
 * "Build the chat using payload": the per-tenant agent-sync room is a
 * CONTENT-ADDRESSED collection, not an external chat.erpax.com Durable Object.
 * Each row is an `ErpaxEvent` envelope an agent published; the contentUuid
 * plugin stamps its tamper-proof `uuid`, the multi-tenant plugin scopes it to
 * the room (tenant), and the akashic record IS the chat history — queryable,
 * auditable, federable. Internalising the external room removes a dependency,
 * which lifts the self-sufficiency floor (tamper-cost) and costs nothing extra:
 * the messages were already content-addressed; now they are also durable.
 *
 * Distinct from `messages` (user-to-user mail) — this is the agent bus.
 *
 * @standard W3C ActivityPub server-to-server activity-distribution (the model)
 * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
 * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { chatBroadcastAfterChange } from '../../services/agent-sync/chat-broadcast'

const Chat: CollectionConfig = {
  slug: 'chat',
  labels: { singular: 'Chat message', plural: 'Chat' },
  admin: {
    useAsTitle: 'event',
    defaultColumns: ['event', 'agent', 'aggregateId', 'createdAt'],
    description:
      'The agent-society room, native to Payload — each row is a content-addressed agent event (ErpaxEvent envelope), scoped per-tenant (the room). The akashic chat history; replaces the external chat.erpax.com Durable Object. Distinct from `messages` (user mail).',
  },
  access: accountingCollectionAccess(),
  fields: [
    {
      name: 'event',
      type: 'text',
      required: true,
      index: true,
      admin: { description: "Event name — e.g. 'invoice:activated', 'society:discovery'." },
    },
    {
      name: 'eventUuid',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description:
          'Envelope content-uuid — the idempotency key. Same content ⇒ same uuid ⇒ no double-processing (dedupe on this, never the row id).',
      },
    },
    {
      name: 'aggregateId',
      type: 'text',
      index: true,
      admin: { description: 'Content-uuid of the aggregate the event is about (never a row id).' },
    },
    {
      name: 'agent',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'The publishing agent (a typeless user).' },
    },
    {
      name: 'payload',
      type: 'json',
      admin: { description: 'The event payload.' },
    },
    {
      name: 'depth',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Cascade hop count — the broadcast hook stops re-dispatching past MAX_BROADCAST_DEPTH (runaway-loop guard). An original publish is 0; an agent reaction is parent+1.',
      },
    },
  ],
  // afterChange broadcast — a new chat row dispatches its embedded event into
  // the shared society runtime (Payload's hook IS the broadcast; runs before
  // the audit hook). Best-effort + guarded; never breaks the write.
  hooks: standardCollectionHooks('chat', { afterChange: [chatBroadcastAfterChange()] }),
  timestamps: true,
}

export default Chat
