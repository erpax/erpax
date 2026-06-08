/**
 * MCP tool surface — bound after the agent registry finishes bootstrapping.
 *
 * Split from `bootstrap.ts` so `@/collections` → invariant checks → `@/agent`
 * does not re-enter `buildErpaxMcpTools` while `REGISTERED_AGENTS` is still in TDZ.
 */
import {
  buildErpaxMcpTools,
  ERPAX_MCP_PROMPTS,
  ERPAX_MCP_RESOURCES,
} from '@/agents/mcp'
import { agentRegistry } from './bootstrap'

export const erpaxMcpTools = buildErpaxMcpTools(agentRegistry)
export const erpaxMcpResources = ERPAX_MCP_RESOURCES
export const erpaxMcpPrompts = ERPAX_MCP_PROMPTS
