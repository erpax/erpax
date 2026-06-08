/**
 * admin/ui/visibility — computed access → Payload admin.condition.
 *
 * Bridges L2 field access from @/access into edit-view visibility without
 * hand-pinned role strings at each field.
 */
import type { FieldAccess } from 'payload'

import { accessVerdict, actorFromRequest, type AccessActor } from '@/access'
import type { CrudOp } from '@/cross'

/** Build a Payload field `access` fn from computed cross CRUD verdict. */
export function fieldAccessFromComputed(op: CrudOp = 'read'): FieldAccess {
  return ({ req }) => {
    const actor = actorFromRequest(req)
    const v = accessVerdict(actor, { level: 'field', collection: undefined }, op)
    return v.allowed
  }
}

/**
 * Payload `admin.condition` — hide when actor lacks update capability.
 * Use on fiscal / admin-only fields alongside field-level access.
 */
export function adminFieldVisibleForUpdate(
  data: Record<string, unknown>,
  siblingData: Record<string, unknown>,
  ctx: { user?: unknown },
): boolean {
  void data
  void siblingData
  const actor = actorFromUser(ctx.user)
  return accessVerdict(actor, { level: 'field' }, 'update').allowed
}

/** Hide sensitive fields from read-only actors (merged cross < write). */
export function adminFieldVisibleForWrite(
  data: Record<string, unknown>,
  siblingData: Record<string, unknown>,
  ctx: { user?: unknown },
): boolean {
  void data
  void siblingData
  const actor = actorFromUser(ctx.user)
  const update = accessVerdict(actor, { level: 'field' }, 'update').allowed
  const create = accessVerdict(actor, { level: 'field' }, 'create').allowed
  return update || create
}

function actorFromUser(user: unknown): AccessActor {
  if (!user || typeof user !== 'object') return { internal: true }
  const u = user as { tenant?: string; roles?: readonly string[] }
  return {
    tenantId: typeof u.tenant === 'string' ? u.tenant : undefined,
    roles: Array.isArray(u.roles) ? u.roles : [],
    internal: false,
  }
}
