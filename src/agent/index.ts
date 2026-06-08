/**
 * agent — the one accountable object, barrel of all its facets.
 */
export * from './service'
export { createAgentContext } from './context'

export type {
  AgentId, DomainAgent, AgentContext, AgentEffect, AgentLawState,
  AgentRegistry, AgentRuntime,
  DomainEvent, AuditLeaf, EvidenceFrame, GapSeverity,
} from './types'

export {
  StrictApplyViolation,
  AGENT_RUNTIME_GRANT,
  defaultAgentLawState,
  strictApplyDispatch,
  strictApplyEffect,
  strictApplyMcpCall,
  assertStrictDispatch,
  assertStrictEffect,
  assertStrictMcpCall,
} from './strict-apply'

export { createAgentRegistry } from './registry'
export { processEffect, processEffects } from './effect-processor'
export { createAgentRuntime } from './runtime'
export { conveneAgentSociety, disbandAgentSociety } from './coil'

export type { McpClient, McpToolDescriptor } from '@/agents/mcp'
export { createInProcessMcpClient } from '@/agents/mcp'
export type { ErpaxMcpTool } from '@/agents/mcp'
export { buildErpaxMcpTools } from '@/agents/mcp'
export type { ErpaxMcpResource } from '@/agents/mcp'
export { ERPAX_MCP_RESOURCES } from '@/agents/mcp'
export type { ErpaxMcpPrompt } from '@/agents/mcp'
export { ERPAX_MCP_PROMPTS } from '@/agents/mcp'

export { agentRegistry, agentRuntime } from './bootstrap'
export { erpaxMcpTools, erpaxMcpResources, erpaxMcpPrompts } from './mcp-surface'
export { manifestOf, buildBlockCatalog, composeBlocks, validateComposition, chainBlocks, checkRegistryCoupling, chainsAsBlockCompositions } from './blocks'
