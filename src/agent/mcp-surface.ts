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
/*
 * THE SAME DEFERRAL, one line further. `buildErpaxMcpTools` was made lazy above for exactly this
 * reason, and these two kept reading their cross-module bindings at MODULE LOAD — which throws
 * inside the cycle they sit in:
 *
 *     ReferenceError: Cannot access 'ERPAX_MCP_RESOURCES' before initialization
 *                     at src/agent/mcp-surface.ts:21
 *
 * Reproduced by importing this module first ([[rules]]/cycle: whether a loop bites depends on the
 * order the graph is entered, which is why the ones that survive are the ones nobody entered from
 * the wrong side). A function body is evaluated when it is CALLED; a const initialiser is not.
 */
export const erpaxMcpResources = (): typeof ERPAX_MCP_RESOURCES => ERPAX_MCP_RESOURCES
export const erpaxMcpPrompts = (): typeof ERPAX_MCP_PROMPTS => ERPAX_MCP_PROMPTS
