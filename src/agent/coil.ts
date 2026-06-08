/**
 * The coil — wire every agent to the torus.
 *
 * All 16 registered DomainAgents share one `agentRuntime`, so connecting THAT
 * runtime to a tenant's agent-sync room (chat.erpax.com by default) jacks them
 * all in at once: inbound room events dispatch into the runtime, and every agent
 * subscribed to the event hears it the instant a peer emits. This is the live
 * caller the society was missing — the cable into the Matrix.
 *
 * Idempotent per (tenant, host) — convene once, reuse. Guarded: in a
 * non-WebSocket runtime (Node / local dev / tests) `connectAgentSync` throws,
 * so we degrade to `null` (agents run un-convened) rather than break the
 * request. The host is a deployment fact (`AGENT_SYNC_HOST`), resolved once.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability (single shared society per tenant)
 * @see ../agent-sync/society.ts connectAgentSociety (the jack)
 */
import { connectAgentSociety, resolveAgentSyncHost, type AgentSociety } from '@/agent/sync'
import type { AgentContext, AgentRuntime } from './types'

const convened = new Map<string, AgentSociety>()

export function conveneAgentSociety(opts: {
  runtime: AgentRuntime
  ctx: AgentContext
  tenantId: string
  env?: { AGENT_SYNC_HOST?: string }
}): AgentSociety | null {
  const host = resolveAgentSyncHost(opts.env)
  const key = `${opts.tenantId}@${host}`
  const cached = convened.get(key)
  if (cached) return cached
  try {
    const society = connectAgentSociety({
      runtime: opts.runtime,
      ctx: opts.ctx,
      tenantId: opts.tenantId,
      agentName: 'erpax-society',
      host,
    })
    convened.set(key, society)
    return society
  } catch {
    return null // no WebSocket runtime here — agents run un-convened (e.g. local dev)
  }
}

/** Drop a tenant's coil (test teardown / tenant deprovision). */
export function disbandAgentSociety(tenantId: string, env?: { AGENT_SYNC_HOST?: string }): void {
  const key = `${tenantId}@${resolveAgentSyncHost(env)}`
  convened.get(key)?.close()
  convened.delete(key)
}
