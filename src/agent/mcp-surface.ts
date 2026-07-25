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

// LAZY (run/load law): buildErpaxMcpTools reads module consts (e.g. kv.ts `I18N`) that are still in their TDZ
// if this runs at module load during the import cycle (mcp-surface → @/agents/mcp → tool → kv → …). Calling it
// at top level threw `Cannot access 'I18N' before initialization` and broke every test:int batch. Deferring to
// first access lets all modules finish initialising — no top-level call that reads a cross-module binding.
let _erpaxMcpTools: ReturnType<typeof buildErpaxMcpTools> | null = null
export const erpaxMcpTools = (): ReturnType<typeof buildErpaxMcpTools> =>
  (_erpaxMcpTools ??= buildErpaxMcpTools(agentRegistry))
export const erpaxMcpResources = ERPAX_MCP_RESOURCES
export const erpaxMcpPrompts = ERPAX_MCP_PROMPTS
