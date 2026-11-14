/**
 * Chat — rooms, messages, connections.
 *
 * One erpax app, delivered as one Payload plugin. It names only its anchors; the collections it
 * brings are computed from the relationship graph (see ../engine).
 *
 * @see src/packages/index.ts (the apps in order) · src/packages/engine/index.ts (the rule)
 */
import type { App } from '@/packages/engine'

export const chat: App = {
  slug: 'chat',
  title: 'Chat',
  anchors: ['chat', 'messages', 'connections'],
}
