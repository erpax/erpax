/**
 * access — computed access control at all levels (the 3·6·9 governing axis).
 *
 * Access is derived from actor identity + live policy — never hand-pinned role
 * strings scattered at call sites. One `accessVerdict(actor, resource, action)`
 * dispatches to existing policy fns (cross lattice, MCP tenant guards,
 * team/comms tenantMatchVerdict, sandbox permits) without duplicating them.
 *
 * Levels (L1–L8):
 *   L1 payload  — collection CRUD (cross capability lattice)
 *   L2 field    — field-level booleans (same lattice; no Where at field scope)
 *   L3 global   — globals access (same factory as L1)
 *   L4 mcp      — MCP tool tenant + admin-mutate guards
 *   L5 agent    — dispatch / call / effect tenant isolation
 *   L6 emit     — team/comms realtime emit (delegates tenantMatchVerdict)
 *   L7 sandbox  — capability grant + allowlist (permits)
 *   L8 docs     — vitepress antimatter routes (public read by construction)
 *
 * @standard NIST SP 800-162 ABAC
 * @standard ISO 27001 A.5.10 access-control-policy
 * @see ./SKILL.md · ../cross · ../team/comms · ../sandbox · ../receipt
 */
import type { PayloadRequest } from 'payload'

import {
  decideCross,
  capabilityOfRole,
  roleForOperation,
  type CrudOp,
} from '@/cross'
import { tenantMatchVerdict } from '@/team/comms'
import { permits, type ToolGrant, type ToolAction } from '@/sandbox'
import type { UserRole } from '@/types/auth'

/** Access surface tier — maps to enforcement layer in the stack. */
export type AccessLevel =
  | 'payload'
  | 'field'
  | 'global'
  | 'mcp'
  | 'agent'
  | 'emit'
  | 'sandbox'
  | 'docs'

export type AccessAction =
  | CrudOp
  | 'execute'
  | 'emit'
  | 'call'
  | 'dispatch'
  | 'admin-mutate'
  | 'read-docs'

/** Acting identity — tenant, roles, or trusted internal context (no user). */
export interface AccessActor {
  readonly tenantId?: string
  readonly roles?: readonly string[]
  /** Boot, cron, in-process agent runtime without req.user — trusted. */
  readonly internal?: boolean
}

/** Resource under evaluation — level selects which policy fn runs. */
export interface AccessResource {
  readonly level: AccessLevel
  readonly tenantId?: string
  readonly collection?: string
  readonly toolName?: string
  readonly docsRoute?: string
}

export interface AccessVerdict {
  readonly allowed: boolean
  readonly reason?: string
  readonly level: AccessLevel
}

const ADMIN_MUTATE_ROLES = new Set(['super-admin', 'admin', 'tenant-admin', 'auditor'])

const CRUD_OPS = new Set<string>(['create', 'read', 'update', 'delete'])

/** Normalize actor from PayloadRequest — mirrors MCP _guards user shape. */
export function actorFromRequest(req: PayloadRequest): AccessActor {
  const user = req.user as { tenant?: string; roles?: readonly string[] } | undefined
  if (!user) return { internal: true }
  return {
    tenantId: user.tenant ?? 'platform',
    roles: Array.isArray(user.roles) ? user.roles : [],
    internal: false,
  }
}

/** Agent society path — scope tenant is the dispatch boundary. */
export function actorFromScope(tenantId: string, actorLabel?: string): AccessActor {
  return { tenantId, roles: actorLabel ? [actorLabel] : [], internal: false }
}

/**
 * L4 MCP tenant guard — pure twin of `assertTenantMatch` (_guards.ts).
 * Internal context and super-admin bypass; otherwise caller tenant must match claim.
 */
export function mcpTenantVerdict(actor: AccessActor, claimedTenantId: string): AccessVerdict {
  if (actor.internal) return { allowed: true, level: 'mcp' }
  if (actor.roles?.includes('super-admin')) return { allowed: true, level: 'mcp' }
  const callerTenant = actor.tenantId ?? 'platform'
  if (claimedTenantId !== callerTenant) {
    return {
      allowed: false,
      level: 'mcp',
      reason: `tenant guard: caller scoped to tenant='${callerTenant}' but claimed tenantId='${claimedTenantId}'`,
    }
  }
  return { allowed: true, level: 'mcp' }
}

/** L4 MCP admin-mutate — pure twin of `assertAdminOnTenant`. */
export function mcpAdminMutateVerdict(actor: AccessActor, claimedTenantId: string): AccessVerdict {
  const base = mcpTenantVerdict(actor, claimedTenantId)
  if (!base.allowed) return base
  if (actor.internal) return { allowed: true, level: 'mcp' }
  const roles = actor.roles ?? []
  if (roles.some((r) => ADMIN_MUTATE_ROLES.has(r))) return { allowed: true, level: 'mcp' }
  return {
    allowed: false,
    level: 'mcp',
    reason: `caller lacks admin/auditor role required for state-mutating MCP tool on tenant='${claimedTenantId}'`,
  }
}

/**
 * L1–L3 Payload CRUD — cross capability lattice (roles → merged capability → op).
 * Live collection `access` fns still run at Payload boundary with overrideAccess:false;
 * this is the synchronous capability floor agents and MCP can evaluate without I/O.
 */
export function crossCrudVerdict(actor: AccessActor, op: CrudOp): AccessVerdict {
  if (actor.internal) return { allowed: true, level: 'payload' }
  const roles = (actor.roles ?? []) as UserRole[]
  const caps = roles.map((r) => capabilityOfRole(r))
  const allowed = decideCross(op, caps)
  return {
    allowed,
    level: 'payload',
    reason: allowed
      ? undefined
      : `merged capability does not reach '${roleForOperation(op)}' for op '${op}'`,
  }
}

/**
 * L5/L6 tenant isolation — delegates to team/comms `tenantMatchVerdict` (no duplication).
 */
export function agentTenantVerdict(scopeTenantId: string, targetTenantId: string): AccessVerdict {
  const v = tenantMatchVerdict(scopeTenantId, targetTenantId)
  return { allowed: v.ok, level: 'agent', reason: v.reason }
}

/** L7 sandbox — delegates to sandbox `permits`. */
export function sandboxVerdict(grant: ToolGrant, action: ToolAction): AccessVerdict {
  const p = permits(grant, action)
  return { allowed: p.allowed, level: 'sandbox', reason: p.reason }
}

/** L8 docs — vitepress SKILL routes are antimatter; public read by corpus construction. */
export function docsReadVerdict(_route?: string): AccessVerdict {
  return { allowed: true, level: 'docs' }
}

/**
 * Unified computed access check — allow/deny + reason from live policy delegation.
 */
export function accessVerdict(
  actor: AccessActor,
  resource: AccessResource,
  action: AccessAction,
  opts?: { readonly grant?: ToolGrant; readonly sandboxAction?: ToolAction },
): AccessVerdict {
  switch (resource.level) {
    case 'mcp': {
      const tid = resource.tenantId
      if (!tid) return { allowed: true, level: 'mcp' }
      return action === 'admin-mutate'
        ? mcpAdminMutateVerdict(actor, tid)
        : mcpTenantVerdict(actor, tid)
    }
    case 'payload':
    case 'field':
    case 'global': {
      if (CRUD_OPS.has(action)) {
        return crossCrudVerdict(actor, action as CrudOp)
      }
      return { allowed: false, level: resource.level, reason: `unsupported payload action: ${action}` }
    }
    case 'agent':
    case 'emit': {
      const tid = resource.tenantId
      if (!tid || !actor.tenantId) {
        return { allowed: false, level: resource.level, reason: 'missing tenant — not routable' }
      }
      return agentTenantVerdict(actor.tenantId, tid)
    }
    case 'sandbox': {
      const grant = opts?.grant
      const sandboxAction = opts?.sandboxAction
      if (!grant || !sandboxAction) {
        return { allowed: false, level: 'sandbox', reason: 'sandbox verdict requires grant + action' }
      }
      return sandboxVerdict(grant, sandboxAction)
    }
    case 'docs':
      return action === 'read-docs'
        ? docsReadVerdict(resource.docsRoute)
        : { allowed: false, level: 'docs', reason: 'docs routes are read-only' }
    default: {
      const _exhaustive: never = resource.level
      return { allowed: false, level: _exhaustive, reason: 'unknown access level' }
    }
  }
}

/** Namespace export for callers that import the layer as a unit. */
export const computedAccess = {
  accessVerdict,
  actorFromRequest,
  actorFromScope,
  mcpTenantVerdict,
  mcpAdminMutateVerdict,
  crossCrudVerdict,
  agentTenantVerdict,
  sandboxVerdict,
  docsReadVerdict,
} as const

export { tenantMatchVerdict } from '@/team/comms'
export type { CrudOp } from '@/cross'
