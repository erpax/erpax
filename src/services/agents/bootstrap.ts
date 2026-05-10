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
import type { DomainAgent } from './types'

/**
 * Static list of every registered DomainAgent. Append to this array as
 * each domain-agent slice lands (EEEEE finance → IIIII meta-skill).
 */
const REGISTERED_AGENTS: ReadonlyArray<DomainAgent> = [
  // EEEEE adds the FinanceAgent here.
  // GGGGG adds sales / marketing / hr / legal / ops.
  // HHHHH adds engineering / customer-support / data / design / product.
  // IIIII adds productivity / enterprise-search / plugins / meta-skill.
]

/** Single shared registry instance — import from this module. */
export const agentRegistry = createAgentRegistry(REGISTERED_AGENTS)

/** Single shared runtime instance — wraps `agentRegistry`. */
export const agentRuntime = createAgentRuntime(agentRegistry)
