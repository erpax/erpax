/**
 * Boot-time agent registry — single shared instance bound at module
 * load. Domain agents register themselves here; conservation
 * invariants and MCP tool handlers resolve through this singleton.
 *
 * Slice DDDDD task 12 (2026-05-11). Currently empty —
 * the FinanceAgent lands in slice EEEEE; the other 14 agents in
 * GGGGG/HHHHH/IIIII. Until then, `checkAgentOwnsEveryStep` warns
 * (not fails) so the build stays green during the rollout.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability (single-source-of-truth registry)
 */

import { createAgentRegistry } from './registry'
import { createAgentRuntime } from './runtime'
import { buildErpaxMcpTools } from './mcp/tool-defs'
import { createInProcessMcpClient } from './mcp/in-process-client'
import { ERPAX_MCP_RESOURCES } from './mcp/resource-defs'
import { ERPAX_MCP_PROMPTS } from './mcp/prompt-defs'
// Side-effect imports — register the erpax-platform self-tenant role + load
// the rest of the substrate primitives so they're available at boot.
import '@/services/self-reference'

import { FinanceAgent } from '@/plugins/accounting/agents/finance.agent'
import { SalesAgent } from './registered/sales.agent'
import { MarketingAgent } from './registered/marketing.agent'
import { HrAgent } from './registered/hr.agent'
import { LegalAgent } from './registered/legal.agent'
import { OpsAgent } from './registered/ops.agent'
import { EngineeringAgent } from './registered/engineering.agent'
import { CustomerSupportAgent } from './registered/customer-support.agent'
import { DataAgent } from './registered/data.agent'
import { DesignAgent } from './registered/design.agent'
import { ProductAgent } from './registered/product.agent'
import { ProductivityAgent } from './registered/productivity.agent'
import { EnterpriseSearchAgent } from './registered/enterprise-search.agent'
import { PluginsAgent } from './registered/plugins.agent'
import { MetaSkillAgent } from './registered/meta-skill.agent'
// Slice ZZZZZZZZ (2026-05-11) — ConsistencyAgent owns code-consistency
// gap closure: factory `emits:` not hooked, services pointing at
// missing slugs, static relationTo orphans, chain emits without
// producers. Subscribes to invariant:warned/failed; cron offset 30min
// from MetaSkillAgent so they don't contend on the invariant suite.
import { ConsistencyAgent } from './registered/consistency.agent'
import type { DomainAgent } from './types'

/**
 * The 16 registered DomainAgents — one per skill-domain catalogue id,
 * plus ConsistencyAgent (Slice ZZZZZZZZ) which spans every domain by
 * owning structural-drift detection across the codebase.
 *
 * Append to this array when adding a new agent (e.g. for a tenant-role
 * profile that introduces a new domain — slice LLLLL+).
 */
const REGISTERED_AGENTS: ReadonlyArray<DomainAgent> = [
  FinanceAgent,           // EEEEE
  SalesAgent,             // GGGGG
  MarketingAgent,         // GGGGG
  HrAgent,                // GGGGG
  LegalAgent,             // GGGGG
  OpsAgent,               // GGGGG
  EngineeringAgent,       // HHHHH
  CustomerSupportAgent,   // HHHHH
  DataAgent,              // HHHHH
  DesignAgent,            // HHHHH
  ProductAgent,           // HHHHH
  ProductivityAgent,      // IIIII
  EnterpriseSearchAgent,  // IIIII
  PluginsAgent,           // IIIII
  MetaSkillAgent,         // IIIII
  ConsistencyAgent,       // ZZZZZZZZ
]

/** Single shared registry instance — import from this module. */
export const agentRegistry = createAgentRegistry(REGISTERED_AGENTS)

/** Single shared runtime instance — wraps `agentRegistry`. */
export const agentRuntime = createAgentRuntime(agentRegistry)

/**
 * Bound MCP tool list — fed to the @payloadcms/plugin-mcp plugin
 * config (over-the-wire) AND the in-process McpClient on AgentContext.
 * Single source of truth for the ERPax tool surface.
 */
export const erpaxMcpTools = buildErpaxMcpTools(agentRegistry)

/** MCP resources — read-only data exposed via uri (erpax://...). */
export const erpaxMcpResources = ERPAX_MCP_RESOURCES

/** MCP prompts — canned reasoning templates. */
export const erpaxMcpPrompts = ERPAX_MCP_PROMPTS

/** Re-export the in-process client factory for AgentContext.mcp wiring. */
export { createInProcessMcpClient }
