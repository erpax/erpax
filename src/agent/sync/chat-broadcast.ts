/**
 * chat-broadcast — the Payload room's afterChange IS the society breath.
 *
 * "Build the chat using payload" made live: when a `chat` row is created, this
 * afterChange hook reconstructs the embedded DomainEvent, dispatches it into the
 * shared agentRuntime (every subscribed agent reacts), AND processes the agents'
 * returned effects through a context whose `emit` is backed by the chat itself —
 * so an agent's reaction becomes the next chat row, and the society cascades.
 * No WebSocket, no Durable Object, no polling: Payload's lifecycle hook is the
 * bus, and it works in EVERY runtime — strictly more available than the external
 * WebSocket coil (services/agents/coil.ts), which it complements.
 *
 * `depth` bounds the cascade: each emitted row carries depth+1, and the hook
 * stops past MAX_BROADCAST_DEPTH — the runaway-loop guard. The whole dispatch is
 * guarded so a reaction never breaks the original write (the durable row is the
 * source of truth, replayable later).
 *
 * The reconstruct (`chatDocToDomainEvent`) and the dispatch (`broadcastChatRow`)
 * are pure / injected and tested; the hook is the thin impure glue, mirroring
 * the minimal-context pattern of services/agents/mcp/tools/events.ts.
 *
 * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
 * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
 */
import type { CollectionAfterChangeHook } from 'payload'
import type { AgentContext, AgentEffect, AgentRuntime, DomainEvent } from '@/agent/types'
import { processEffects } from '@/agent/effect-processor'
import { createAgentContext } from '@/agent/context'
import { chatEmit, type ChatClient } from '@/agent/sync/payload-chat'

/** Past this many cascade hops the broadcast stops re-dispatching — runaway guard. */
export const MAX_BROADCAST_DEPTH = 32

/** Reconstruct the embedded DomainEvent from a `chat` afterChange doc (null if not a valid event row). */
export function chatDocToDomainEvent(doc: Record<string, unknown>): DomainEvent | null {
  const id = typeof doc.event === 'string' ? doc.event : ''
  if (!id) return null
  const t = doc.tenant
  const tenantId =
    typeof t === 'string'
      ? t
      : t && typeof t === 'object' && typeof (t as { id?: unknown }).id === 'string'
        ? (t as { id: string }).id
        : null
  if (!tenantId) return null // missing tenant ⇒ not routable; never invent 'unknown' (cross-tenant safety)
  const payload = doc.payload && typeof doc.payload === 'object' ? (doc.payload as Record<string, unknown>) : {}
  const emittedAt = typeof doc.createdAt === 'string' ? doc.createdAt : ''
  return { id, tenantId, payload, emittedAt }
}

/** Dispatch a chat row's embedded event into the runtime — returns the agents' effects (empty if not an event row). */
export async function broadcastChatRow(
  runtime: AgentRuntime,
  ctx: AgentContext,
  doc: Record<string, unknown>,
): Promise<readonly AgentEffect[]> {
  const ev = chatDocToDomainEvent(doc)
  if (!ev) return []
  return runtime.dispatchEvent(ctx, ev)
}

/**
 * The afterChange hook for the `chat` collection — on create, broadcast the row
 * into the shared society runtime and process the agents' effects (their emits
 * become the next chat rows, depth+1). Guarded + depth-capped; dynamic imports
 * avoid a static cycle with the agent bootstrap.
 */
export function chatBroadcastAfterChange(): CollectionAfterChangeHook {
  return async ({ doc, req, operation }) => {
    if (operation !== 'create') return doc
    const row = doc as Record<string, unknown>
    const ev = chatDocToDomainEvent(row)
    if (!ev) return doc
    const depth = typeof row.depth === 'number' ? row.depth : 0
    if (depth >= MAX_BROADCAST_DEPTH) return doc // runaway-loop guard
    try {
      const { agentRuntime } = await import('@/agent/bootstrap')
      const { createInProcessMcpClient } = await import('@/agents/mcp/in-process-client')
      const { buildErpaxMcpTools } = await import('@/agents/mcp/tool-defs')
      const client = req.payload as unknown as ChatClient
      const ctx: AgentContext = createAgentContext({
        runtime: agentRuntime,
        payload: req.payload,
        tenantId: ev.tenantId,
        mcp: createInProcessMcpClient(buildErpaxMcpTools(agentRuntime.registry as never), req),
        emit: chatEmit(client, depth + 1), // a reaction becomes the next row (one hop deeper)
      })
      const effects = await broadcastChatRow(agentRuntime, ctx, row)
      await processEffects(effects, ctx)
    } catch (err) {
      req.payload.logger.warn({ err }, `society chat broadcast failed for ${ev.id}`)
    }
    return doc
  }
}
