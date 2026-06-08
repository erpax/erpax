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
// Side-effect — register the erpax-platform self-tenant role. Relative import
// (not `@/self/reference` barrel) avoids pulling `agentRegistry` during TDZ and
// stays off the `@/` import-purity ratchet.
import '../self/reference/erpax.profile'

import { FinanceAgent } from '@/agents/accounting'
import { SalesAgent } from '@/agents/registered'
import { MarketingAgent } from '@/agents/registered'
import { HrAgent } from '@/agents/registered'
import { LegalAgent } from '@/agents/registered'
import { OpsAgent } from '@/agents/registered'
import { EngineeringAgent } from '@/agents/registered'
import { CustomerSupportAgent } from '@/agents/registered'
import { DataAgent } from '@/agents/registered'
import { DesignAgent } from '@/agents/registered'
import { ProductAgent } from '@/agents/registered'
import { ProductivityAgent } from '@/agents/registered'
import { EnterpriseSearchAgent } from '@/agents/registered'
import { PluginsAgent } from '@/agents/registered'
import { MetaSkillAgent } from '@/agents/registered'
// Slice ZZZZZZZZ (2026-05-11) — ConsistencyAgent owns code-consistency
// gap closure: factory `emits:` not hooked, services pointing at
// missing slugs, static relationTo orphans, chain emits without
// producers. Subscribes to invariant:warned/failed; cron offset 30min
// from MetaSkillAgent so they don't contend on the invariant suite.
import { ConsistencyAgent } from '@/agents/registered'
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
