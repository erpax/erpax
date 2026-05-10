/**
 * Open tenant-role registry — `defineTenantRole` / `getTenantRole` /
 * `listTenantRoles` / `getEffectiveProfile`. The catalogue is open:
 * core ships reference profiles; third-party plugins (or runtime MCP
 * calls via `erpax.roles.declare`) extend it.
 *
 * Slice LLLLL (2026-05-11). Throws on duplicate id at registration —
 * DRY conservation enforced statically.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 */

import type { TenantRoleProfile } from './types'

const REGISTRY = new Map<string, TenantRoleProfile>()

/**
 * Register a new tenant-role profile. Called at module load by the
 * core reference profiles (MMMMM/NNNNN/OOOOO) and by third-party
 * plugins or `erpax.roles.declare` MCP tool at runtime.
 *
 * @throws if a profile with the same id is already registered
 */
export function defineTenantRole(profile: TenantRoleProfile): void {
  if (REGISTRY.has(profile.id)) {
    throw new Error(`duplicate tenant-role id: ${profile.id}`)
  }
  REGISTRY.set(profile.id, profile)
}

export function getTenantRole(id: string): TenantRoleProfile | undefined {
  return REGISTRY.get(id)
}

export function listTenantRoles(): ReadonlyArray<TenantRoleProfile> {
  return [...REGISTRY.values()]
}

/**
 * Resolve the EFFECTIVE profile for a role id by unioning all
 * inherited profiles' standards / collections / chains / agents /
 * mcpTools. Cycles in `inheritsFrom` raise; missing parents are
 * silently skipped (their absence is reported by
 * `checkRoleCoverage100Percent`).
 */
export function getEffectiveProfile(id: string): TenantRoleProfile | undefined {
  const seen = new Set<string>()
  const stack: string[] = [id]
  let head: TenantRoleProfile | undefined

  // First-seen wins for displayName / invariant / auditPolicy.
  // Standards / collections / chains / agents / mcpTools UNION across all parents.
  const standards = new Map<string, { body: string; id: string; description?: string }>()
  const collections = new Set<string>()
  const chains = new Set<string>()
  const agents = new Set<string>()
  const mcpTools = new Set<string>()

  while (stack.length > 0) {
    const cur = stack.shift()!
    if (seen.has(cur)) {
      if (cur === id) throw new Error(`tenant-role inherits cycle at: ${id}`)
      continue
    }
    seen.add(cur)
    const p = REGISTRY.get(cur); if (!p) continue
    if (!head) head = p
    for (const s of p.requiredStandards) standards.set(`${s.body}/${s.id}`, s)
    for (const c of p.requiredCollections) collections.add(c)
    for (const c of p.requiredChains) chains.add(c)
    for (const a of p.requiredAgents) agents.add(a)
    for (const t of p.mcpTools) mcpTools.add(t)
    for (const parent of p.inheritsFrom ?? []) stack.push(parent)
  }

  if (!head) return undefined
  return {
    ...head,
    requiredStandards: [...standards.values()],
    requiredCollections: [...collections],
    requiredChains: [...chains],
    requiredAgents: [...agents],
    mcpTools: [...mcpTools],
  }
}

/** Test-only — clear the registry between tests. NEVER call in production. */
export function __resetRegistryForTests(): void {
  REGISTRY.clear()
}
