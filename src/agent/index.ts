/**
 * agent — the one accountable object, barrel of all its facets.
 *
 * Two facets of ONE concept merge here (singular `agent` + plural `agents`):
 *   - the SELF-REPLICATION law (`./service`): an agent IS its content; cloning is
 *     content-addressing (AgentDef · agentUuid · cloneAgent · distinctAgents), with
 *     the team scale (`./team`). Identical clones merge; specialised clones are
 *     content-addressed children.
 *   - the RUNTIME coupling layer (the A-vortex of the three-vortex automated-system
 *     architecture, Slice DDDDD 2026-05-11; see
 *     docs/superpowers/specs/2026-05-11-automated-system-three-vortex-architecture-design.md):
 *     the pure DomainAgent contract, the registry, the runtime, the effect-processor,
 *     the agent-sync coil, the MCP wiring, and the bootstrap singletons.
 *
 * @standard ISO/IEC 25010:2023 §5.4 modularity
 * @standard RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)
 */

// The self-replication law — an agent IS its content (cloning = content-addressing),
// plus the team scale (re-exported through ./service).
export * from '@/agent/service'

export type {
  AgentId, DomainAgent, AgentContext, AgentEffect,
  AgentRegistry, AgentRuntime,
  DomainEvent, AuditLeaf, EvidenceFrame, GapSeverity,
} from '@/agent/types'

export { createAgentRegistry } from '@/agent/registry'
export { processEffect, processEffects } from '@/agent/effect-processor'
export { createAgentRuntime } from '@/agent/runtime'

// The coil — wire every agent to the tenant's agent-sync room (chat.erpax.com).
export { conveneAgentSociety, disbandAgentSociety } from '@/agent/coil'

// MCP wiring — Slice DDDDD Phase B
export type { McpClient, McpToolDescriptor } from '@/agents/mcp/in-process-client'
export { createInProcessMcpClient } from '@/agents/mcp/in-process-client'
export type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'
export { buildErpaxMcpTools } from '@/agents/mcp/tool-defs'
export type { ErpaxMcpResource } from '@/agents/mcp/resource-defs'
export { ERPAX_MCP_RESOURCES } from '@/agents/mcp/resource-defs'
export type { ErpaxMcpPrompt } from '@/agents/mcp/prompt-defs'
export { ERPAX_MCP_PROMPTS } from '@/agents/mcp/prompt-defs'

// Bootstrap singletons
export { agentRegistry, agentRuntime, erpaxMcpTools, erpaxMcpResources, erpaxMcpPrompts } from '@/agent/bootstrap'
