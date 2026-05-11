/**
 * UUID-based sharing with RBAC — Conservation Law 59.
 *
 * Slice SSSSSSSSS-cut1 (2026-05-11). Per user 'uuid based sharing
 * with rbac'.
 *
 * A "share" is a binding `(granteeUuid, accessRole, targetUuid)`
 * persisted as a chain-linked audit leaf + a row in the `shares`
 * collection. Every grant has its own content-uuid; revoking is a
 * second chain-linked event referencing the same shareUuid. RBAC
 * is enforced at access time by walking the share graph and
 * checking the rolesCompatible predicate.
 *
 * The five `AccessRole` values form a lattice (ordered by privilege):
 *
 *   read  < write  < sign  < admin
 *   audit                                  (orthogonal — observation only)
 *
 * Compatibility: a grantee with `admin` satisfies any required role;
 * `sign` satisfies write + read; `write` satisfies read; `audit`
 * satisfies only audit (orthogonal — admin DOES NOT implicitly grant
 * audit access because audit is a separate observation role).
 *
 * Composition with prior slices:
 *   - Law 8: contentUuid for the share itself + target.
 *   - Law 47: type-branded GranteeUuid + TargetUuid + ShareUuid.
 *   - Law 53: missing share is the identity (denied) — never throws.
 *   - Law 55: tamper cost on share decisions cascades through the
 *             chain leaf signing the grant.
 *   - Law 56: dynamic trust — grants live in the chain, not in static
 *             ACL tables. Revocation is a roll-forward leaf.
 *   - Law 57: shares are UuidMap entries (granteeUuid → shareUuid).
 *   - Law 58: SafetyMode guards on registry escape hatches apply.
 *
 * Sign and admin grants are sealed at write time (signatureRequired:
 * true) so federation peers reconcile to the seal. Read/write/audit
 * grants are chain-linked but not sealed — much cheaper.
 *
 * Standards alignment:
 *   - NIST SP 800-162 §3 (Attribute-Based Access Control terminology)
 *   - ISO/IEC 27001 Annex A.9.2.3 (privileged access rights)
 *   - ISO/IEC 27001 Annex A.9.4.1 (information access restriction)
 *   - eIDAS §3 (signed grants for legally-binding access)
 *   - GDPR Article 32(1)(b) (ability to ensure ongoing confidentiality)
 *   - SOX §404 (access controls audit-evidenced via chain)
 *
 * @standard NIST SP 800-162 ABAC
 * @standard ISO/IEC 27001 Annex A.9.2.3 + A.9.4.1
 * @standard eIDAS §3 (sealed grants)
 * @standard GDPR Article 32(1)(b)
 * @audit Conservation Law 59 uuid-based-sharing
 * @feature uuid_share
 * @see /src/services/audit-trail/write-audit-event.ts (chain-linked grant events)
 * @see /src/services/integrity/signatures.ts (sealed sign/admin grants)
 */

import type { Payload } from 'payload'
import { computeContentUuid } from '@/services/integrity/content-uuid'
import type { ContentUuid } from '@/services/integrity/content-uuid'
import { writeAuditEvent } from '@/services/audit-trail/write-audit-event'
import type { UuidLinkedLeaf } from '@/services/integrity/uuid-linked-chain'

/** RBAC access roles — a lattice ordered read < write < sign < admin; audit orthogonal. */
export type AccessRole = 'read' | 'write' | 'sign' | 'admin' | 'audit'

/** Type-branded grantee identifier (user uuid, role uuid, tenant uuid, DID, etc.). */
export type GranteeUuid<G = unknown> = ContentUuid<{ kind: 'grantee'; subject: G }>

/** Type-branded resource identifier (any contentUuid'd target). */
export type TargetUuid<T = unknown> = ContentUuid<T>

/** Content-uuid of an entire share-binding (grantee, role, target, tenant). */
export type ShareUuid = ContentUuid<{
  grantee: string
  accessRole: AccessRole
  target: string
  tenantId: string
}>

export interface ShareBinding<G = unknown, T = unknown> {
  readonly shareUuid: ShareUuid
  readonly granteeUuid: GranteeUuid<G>
  readonly targetUuid: TargetUuid<T>
  readonly accessRole: AccessRole
  readonly tenantId: string
  readonly grantedAt: string
  /** Chain leaf attesting to this grant. Null when no mediator was available at write. */
  readonly chainLeafUuid: string | null
  /** True iff the leaf was sealed (sign/admin grants only). */
  readonly sealed: boolean
}

// ─── Lattice comparison ─────────────────────────────────────────────

const PRIVILEGE_RANK: Readonly<Record<AccessRole, number>> = {
  read:  1,
  write: 2,
  sign:  3,
  admin: 4,
  audit: 0,   // orthogonal — see rolesCompatible logic
}

/**
 * True iff `held` role satisfies the `required` role per the lattice.
 *
 *   rolesCompatible('admin', 'write') → true   (admin > write)
 *   rolesCompatible('write', 'admin') → false
 *   rolesCompatible('admin', 'audit') → false  (orthogonal)
 *   rolesCompatible('audit', 'audit') → true
 *   rolesCompatible('audit', 'read')  → false  (audit is observation-only)
 */
export function rolesCompatible(held: AccessRole, required: AccessRole): boolean {
  if (required === 'audit') return held === 'audit'
  if (held === 'audit') return false
  return PRIVILEGE_RANK[held] >= PRIVILEGE_RANK[required]
}

// ─── Share-uuid computation ─────────────────────────────────────────

/**
 * Compute the deterministic content-uuid of a share binding. Per-
 * tenant namespaced — the same (grantee, role, target) in two
 * tenants produce distinct ShareUuids.
 */
export function computeShareUuid<G, T>(args: {
  granteeUuid: GranteeUuid<G>
  targetUuid: TargetUuid<T>
  accessRole: AccessRole
  tenantId: string
}): ShareUuid {
  return computeContentUuid(
    {
      grantee: args.granteeUuid,
      accessRole: args.accessRole,
      target: args.targetUuid,
    },
    args.tenantId,
  ) as ShareUuid
}

// ─── Grant ──────────────────────────────────────────────────────────

export interface GrantParams<G, T> {
  readonly tenantId: string
  readonly granteeUuid: GranteeUuid<G>
  readonly targetUuid: TargetUuid<T>
  readonly accessRole: AccessRole
  /** Optional narrative (audit row payload). */
  readonly description?: string
  /** Optional grantor user id (audit row payload). */
  readonly grantedByUserId?: string
}

export interface GrantContext {
  readonly payload: Payload
  readonly mediator?: {
    auditChainAppendLinked(payload: Record<string, unknown>): Promise<UuidLinkedLeaf | null>
    signUuid?: <T>(uuid: string, kid?: string) => Promise<unknown>
  }
}

export interface GrantResult<G, T> {
  readonly binding: ShareBinding<G, T>
  readonly auditEventId: string
}

/**
 * Create a share. Sign + admin grants are SEALED (signatureRequired:
 * true on the audit leaf) — they're stream pause points. Read/write/
 * audit grants are chain-linked but not sealed (much cheaper).
 *
 * Idempotency: if the same (grantee, role, target, tenant) tuple is
 * granted twice, the function returns the EXISTING binding from the
 * shares collection rather than producing a second leaf. The share
 * row is uniqued on `shareUuid`.
 */
export async function grantShare<G, T>(
  params: GrantParams<G, T>,
  ctx: GrantContext,
): Promise<GrantResult<G, T>> {
  const shareUuid = computeShareUuid({
    granteeUuid: params.granteeUuid,
    targetUuid: params.targetUuid,
    accessRole: params.accessRole,
    tenantId: params.tenantId,
  })
  const grantedAt = new Date().toISOString()
  const requiresSeal = params.accessRole === 'sign' || params.accessRole === 'admin'

  // Idempotency: look up an existing share with this uuid + tenant.
  // If present and not revoked, return it without writing a new leaf.
  const existing = await ctx.payload.find({
    collection: 'shares' as never,
    where: {
      and: [
        { tenant: { equals: params.tenantId } },
        { shareUuid: { equals: shareUuid } },
        { revoked: { not_equals: true } },
      ],
    } as never,
    limit: 1,
  } as never) as { docs: Array<Record<string, unknown>> }
  if (existing.docs && existing.docs.length > 0) {
    const row = existing.docs[0]!
    return {
      binding: {
        shareUuid,
        granteeUuid: params.granteeUuid,
        targetUuid: params.targetUuid,
        accessRole: params.accessRole,
        tenantId: params.tenantId,
        grantedAt: (row.grantedAt as string) ?? grantedAt,
        chainLeafUuid: (row.chainLeafUuid as string | null) ?? null,
        sealed: (row.sealed as boolean) ?? false,
      },
      auditEventId: (row.id as string) ?? '',
    }
  }

  // Chain-linked audit event (sealed for sign/admin).
  const auditResult = await writeAuditEvent(ctx, {
    tenantId: params.tenantId,
    eventName: 'share:granted',
    subjectCollection: 'shares',
    subjectId: shareUuid,
    action: `grant:${params.accessRole}`,
    userId: params.grantedByUserId,
    signatureRequired: requiresSeal,
    payload: {
      shareUuid,
      granteeUuid: params.granteeUuid,
      targetUuid: params.targetUuid,
      accessRole: params.accessRole,
      description: params.description,
    },
  })

  const sealed = auditResult.chainLinkStatus === 'sealed'

  // Persist the share row. The `shares` collection (separate cut)
  // carries: tenant, shareUuid, granteeUuid, targetUuid, accessRole,
  // grantedAt, chainLeafUuid, sealed, revoked, revokedAt.
  const row = await ctx.payload.create({
    collection: 'shares' as never,
    data: {
      tenant: params.tenantId,
      shareUuid,
      granteeUuid: params.granteeUuid,
      targetUuid: params.targetUuid,
      accessRole: params.accessRole,
      grantedAt,
      chainLeafUuid: auditResult.chainLeafUuid,
      sealed,
      revoked: false,
    } as never,
  }) as { id: string }

  return {
    binding: {
      shareUuid,
      granteeUuid: params.granteeUuid,
      targetUuid: params.targetUuid,
      accessRole: params.accessRole,
      tenantId: params.tenantId,
      grantedAt,
      chainLeafUuid: auditResult.chainLeafUuid,
      sealed,
    },
    auditEventId: row.id,
  }
}

// ─── Check (the RBAC enforcement point) ─────────────────────────────

export interface CheckParams<G, T> {
  readonly tenantId: string
  readonly granteeUuid: GranteeUuid<G>
  readonly targetUuid: TargetUuid<T>
  readonly requiredRole: AccessRole
}

export interface CheckResult {
  readonly granted: boolean
  /** The held role that satisfied the request (when granted). */
  readonly heldRole?: AccessRole
  /** The share row id that authorised the access (when granted). */
  readonly shareId?: string
  /** Reason text useful for audit logs / UI hints. */
  readonly reason: string
}

/**
 * Check whether a grantee has the required role over a target.
 * Returns granted/denied with the reason; does NOT throw. Callers
 * branch on `granted` and produce 403 / 401 themselves.
 *
 * The check walks the `shares` collection for non-revoked rows
 * matching (tenant, grantee, target). The lattice compatibility
 * (rolesCompatible) determines whether any held role satisfies the
 * required role.
 */
export async function checkShare<G, T>(
  params: CheckParams<G, T>,
  ctx: { payload: Payload },
): Promise<CheckResult> {
  const res = await ctx.payload.find({
    collection: 'shares' as never,
    where: {
      and: [
        { tenant: { equals: params.tenantId } },
        { granteeUuid: { equals: params.granteeUuid } },
        { targetUuid: { equals: params.targetUuid } },
        { revoked: { not_equals: true } },
      ],
    } as never,
    limit: 50,
  } as never) as { docs: Array<{ id: string; accessRole: AccessRole }> }

  if (!res.docs || res.docs.length === 0) {
    return {
      granted: false,
      reason: `no share binding from grantee ${String(params.granteeUuid)} to target ${String(params.targetUuid)} under tenant ${params.tenantId}`,
    }
  }

  for (const row of res.docs) {
    if (rolesCompatible(row.accessRole, params.requiredRole)) {
      return {
        granted: true,
        heldRole: row.accessRole,
        shareId: row.id,
        reason: `grantee holds ${row.accessRole} which satisfies required ${params.requiredRole}`,
      }
    }
  }

  const heldRoles = res.docs.map((d) => d.accessRole).join(',')
  return {
    granted: false,
    reason: `grantee holds [${heldRoles}] but required role is ${params.requiredRole}`,
  }
}

// ─── Revoke ─────────────────────────────────────────────────────────

export interface RevokeParams {
  readonly tenantId: string
  readonly shareUuid: ShareUuid
  readonly revokedByUserId?: string
  readonly reason?: string
}

export interface RevokeResult {
  readonly revoked: boolean
  readonly chainLeafUuid: string | null
  readonly reason: string
}

/**
 * Revoke a share. The revocation is itself a chain-linked event
 * (sealed if the original grant was sealed — symmetry). The
 * `revoked: true` flag on the share row makes subsequent
 * `checkShare` calls return `granted: false`.
 *
 * Returns `{ revoked: false }` if no matching share exists (rather
 * than throwing) — idempotent semantics.
 */
export async function revokeShare(
  params: RevokeParams,
  ctx: GrantContext,
): Promise<RevokeResult> {
  const res = await ctx.payload.find({
    collection: 'shares' as never,
    where: {
      and: [
        { tenant: { equals: params.tenantId } },
        { shareUuid: { equals: params.shareUuid } },
        { revoked: { not_equals: true } },
      ],
    } as never,
    limit: 1,
  } as never) as { docs: Array<{ id: string; accessRole: AccessRole; sealed: boolean }> }

  if (!res.docs || res.docs.length === 0) {
    return {
      revoked: false,
      chainLeafUuid: null,
      reason: `no active share with uuid ${String(params.shareUuid)} under tenant ${params.tenantId}`,
    }
  }

  const row = res.docs[0]!
  const requiresSeal = row.sealed   // revoke a sealed share with a sealed leaf
  const audit = await writeAuditEvent(ctx, {
    tenantId: params.tenantId,
    eventName: 'share:revoked',
    subjectCollection: 'shares',
    subjectId: params.shareUuid,
    action: `revoke:${row.accessRole}`,
    userId: params.revokedByUserId,
    signatureRequired: requiresSeal,
    payload: { reason: params.reason, originalAccessRole: row.accessRole },
  })

  await ctx.payload.update({
    collection: 'shares' as never,
    id: row.id,
    data: {
      revoked: true,
      revokedAt: new Date().toISOString(),
      revokeChainLeafUuid: audit.chainLeafUuid,
    } as never,
  })

  return {
    revoked: true,
    chainLeafUuid: audit.chainLeafUuid,
    reason: `share ${String(params.shareUuid)} revoked (originalRole=${row.accessRole}, sealed=${row.sealed})`,
  }
}

// ─── List ───────────────────────────────────────────────────────────

export interface ListParams {
  readonly tenantId: string
  readonly granteeUuid?: GranteeUuid<unknown>
  readonly targetUuid?: TargetUuid<unknown>
  readonly includeRevoked?: boolean
  readonly limit?: number
}

/**
 * List share bindings filtered by grantee or target (or both). At
 * least one of `granteeUuid` / `targetUuid` must be provided to
 * keep the query bounded.
 */
export async function listShares(
  params: ListParams,
  ctx: { payload: Payload },
): Promise<ReadonlyArray<ShareBinding<unknown, unknown>>> {
  if (!params.granteeUuid && !params.targetUuid) {
    throw new Error('listShares: at least one of granteeUuid / targetUuid is required')
  }
  const where: Record<string, unknown> = {
    and: [
      { tenant: { equals: params.tenantId } },
      ...(params.includeRevoked === true ? [] : [{ revoked: { not_equals: true } }]),
      ...(params.granteeUuid ? [{ granteeUuid: { equals: params.granteeUuid } }] : []),
      ...(params.targetUuid ? [{ targetUuid: { equals: params.targetUuid } }] : []),
    ],
  }
  const res = await ctx.payload.find({
    collection: 'shares' as never,
    where: where as never,
    limit: params.limit ?? 100,
  } as never) as { docs: Array<Record<string, unknown>> }

  return res.docs.map((row) => ({
    shareUuid: row.shareUuid as ShareUuid,
    granteeUuid: row.granteeUuid as GranteeUuid<unknown>,
    targetUuid: row.targetUuid as TargetUuid<unknown>,
    accessRole: row.accessRole as AccessRole,
    tenantId: row.tenant as string,
    grantedAt: row.grantedAt as string,
    chainLeafUuid: (row.chainLeafUuid as string | null) ?? null,
    sealed: (row.sealed as boolean) ?? false,
  }))
}
