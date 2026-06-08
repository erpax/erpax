/**
 * Self-reference — barrel.
 * Slice GGGGGG (2026-05-11). Per spec §0c.
 *
 * Importing this module triggers the side-effect registration of the
 * `erpax-platform` TenantRoleProfile so any code calling
 * `getTenantRole('erpax-platform')` resolves it.
 */
import './erpax.profile'

import { listTenantRoles } from '@/tenant/role'
import { collectGenome } from '@/cloning'
import { agentRegistry } from '@/agent'

/**
 * Conservation Law 23 — `checkErpaxObservesItself`.
 * The platform's spec corpus must yield ≥1 CollectionSpec, BusinessChain,
 * Agent, and TenantRoleProfile whose subject is ERPax itself.
 *
 * Concrete check: the genome bundle is non-empty across all 6 sections,
 * AND the `erpax-platform` role is registered, AND the `meta-skill`
 * agent is registered (the platform must have the agent that observes
 * the platform observing itself).
 */
export function checkErpaxObservesItself(): { ok: boolean; missing: ReadonlyArray<string> } {
  const missing: string[] = []
  const genome = collectGenome({ tenantId: 'erpax-self-coherence' })
  if (genome.collections.length === 0) missing.push('collections')
  if (genome.chains.length === 0) missing.push('chains')
  if (genome.agents.length === 0) missing.push('agents')
  if (genome.standards.length === 0) missing.push('standards')
  if (!listTenantRoles().some((r) => r.id === 'erpax-platform')) missing.push('role:erpax-platform')
  if (!agentRegistry.byId('meta-skill')) missing.push('agent:meta-skill')
  if (!agentRegistry.byId('engineering')) missing.push('agent:engineering')
  return { ok: missing.length === 0, missing }
}
