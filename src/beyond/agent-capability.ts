/**
 * Law 17 — Agent capability matrix.
 *
 * Slice ZZZZZ. Per user insight 'each agent has specific roles and
 * access'. Every agent declares (roleId, read scopes, write scopes,
 * MCP-tool permissions, jurisdictions). The runtime enforces:
 *
 *   - MCP tool calls — `assertAgentCanCallTool(agent, toolName)`
 *     refuses calls outside the agent's declared `mcpToolPermissions`.
 *   - Data reads/writes — `assertAgentCanRead(agent, slug)` and
 *     `assertAgentCanWrite(agent, slug)` refuse access outside the
 *     declared scopes.
 *   - Jurisdictional binding — when configured, refuses operations
 *     that target tenants in jurisdictions the agent isn't licensed
 *     for (combines with Law 13 tenant isolation).
 *
 * Conservation invariant `checkAgentCapabilityCoverage`: every
 * registered DomainAgent has a non-default `capability` block.
 *
 * Composes with:
 *   - WWWW ROLES_REGISTRY (existing role-defines-standards)
 *   - Law 13 (tenant isolation; intra-tenant role-based slice)
 *   - Law 22 (AI audit; AI invocations respect caller's permissions)
 *
 * @standard NIST INCITS 359 RBAC (Role-Based Access Control)
 * @standard ISO/IEC 27002:2022 A.5.18 access-rights
 * @standard EU GDPR Art. 25 data-protection-by-design
 * @standard EU AI Act Art. 14 human-oversight (role-bound oversight)
 */

import type { AgentId, DomainAgent } from '@/agent'

/** What an agent is licensed to do. Wildcards: '*' = any, 'collection.*' = any field. */
export interface AgentCapability {
  /** ROLES_REGISTRY id — the agent's organisational role. */
  readonly roleId: string
  /** Collection slugs (or '*') the agent may read. */
  readonly readScopes: ReadonlyArray<string>
  /** Collection slugs (or '*') the agent may write. */
  readonly writeScopes: ReadonlyArray<string>
  /** MCP tool name globs the agent may call (e.g. 'erpax.audit.*', 'erpax.spec.getCollection'). */
  readonly mcpToolPermissions: ReadonlyArray<string>
  /** ISO 3166-1 alpha-2 jurisdiction codes the agent operates in. '*' = any. */
  readonly jurisdictions: ReadonlyArray<string>
  /** Maximum allowed cost per operation (Law 15) — guard against runaway agents. */
  readonly maxCostPerOpMicroUsd?: number
}

/** Sentinel used when an agent registers without a declared capability. */
export const DEFAULT_DENY: AgentCapability = {
  roleId: 'unknown',
  readScopes: [],
  writeScopes: [],
  mcpToolPermissions: [],
  jurisdictions: [],
}

const CAPABILITIES = new Map<AgentId, AgentCapability>()

export function declareAgentCapability(agentId: AgentId, capability: AgentCapability): void {
  CAPABILITIES.set(agentId, capability)
}

export function getAgentCapability(agentId: AgentId): AgentCapability {
  return CAPABILITIES.get(agentId) ?? DEFAULT_DENY
}

/** Glob match — supports '*' suffix wildcards (`erpax.audit.*`) and exact match. */
function matches(pattern: string, value: string): boolean {
  if (pattern === '*' || pattern === value) return true
  if (pattern.endsWith('.*')) return value.startsWith(pattern.slice(0, -1))
  return false
}

export function assertAgentCanCallTool(agentId: AgentId, toolName: string): void {
  const cap = getAgentCapability(agentId)
  const allowed = cap.mcpToolPermissions.some((p) => matches(p, toolName))
  if (!allowed) {
    throw new Error(
      `Conservation Law 17 violation: agent '${agentId}' (role '${cap.roleId}') ` +
      `not permitted to call MCP tool '${toolName}' — permissions: [${cap.mcpToolPermissions.join(', ')}]`,
    )
  }
}

export function assertAgentCanRead(agentId: AgentId, collection: string): void {
  const cap = getAgentCapability(agentId)
  const allowed = cap.readScopes.some((p) => matches(p, collection))
  if (!allowed) {
    throw new Error(
      `Conservation Law 17 violation: agent '${agentId}' (role '${cap.roleId}') ` +
      `cannot read '${collection}' — readScopes: [${cap.readScopes.join(', ')}]`,
    )
  }
}

export function assertAgentCanWrite(agentId: AgentId, collection: string): void {
  const cap = getAgentCapability(agentId)
  const allowed = cap.writeScopes.some((p) => matches(p, collection))
  if (!allowed) {
    throw new Error(
      `Conservation Law 17 violation: agent '${agentId}' (role '${cap.roleId}') ` +
      `cannot write '${collection}' — writeScopes: [${cap.writeScopes.join(', ')}]`,
    )
  }
}

export function assertAgentJurisdiction(agentId: AgentId, jurisdiction: string): void {
  const cap = getAgentCapability(agentId)
  const allowed = cap.jurisdictions.some((p) => matches(p, jurisdiction))
  if (!allowed) {
    throw new Error(
      `Conservation Law 17 violation: agent '${agentId}' (role '${cap.roleId}') ` +
      `not licensed for jurisdiction '${jurisdiction}' — jurisdictions: [${cap.jurisdictions.join(', ')}]`,
    )
  }
}

/** Sanity check: every registered agent has a non-DEFAULT_DENY capability. */
export function findAgentsWithoutCapability(agents: ReadonlyArray<DomainAgent>): AgentId[] {
  return agents
    .filter((a) => getAgentCapability(a.id) === DEFAULT_DENY)
    .map((a) => a.id)
}

export function listAgentCapabilities(): ReadonlyMap<AgentId, AgentCapability> {
  return CAPABILITIES
}

export function __resetCapabilities(): void { CAPABILITIES.clear() }
