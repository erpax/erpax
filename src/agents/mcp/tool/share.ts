/**
 * UUID-share MCP tool family — Slice SSSSSSSSS-cut1 (2026-05-11).
 *
 * Per user 'implement in mcp and erpax in sync'. Surfaces the
 * uuid-based RBAC sharing layer (Conservation Law 59) as MCP tools.
 *
 *   erpax.share.grant     — create a chain-linked share
 *   erpax.share.check     — RBAC check (lattice-aware)
 *   erpax.share.revoke    — chain-linked revoke + flag
 *   erpax.share.list      — list shares filtered by grantee or target
 *   erpax.share.uuid      — compute the deterministic shareUuid
 *
 * @standard NIST SP 800-162 ABAC
 * @standard MCP 0.6 tools/list + tools/call
 * @audit Conservation Law 59 uuid-based-sharing-with-rbac
 * @feature uuid_share
 * @see /src/services/uuid-share/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import {
  grantShare, checkShare, revokeShare, listShares, computeShareUuid,
  type AccessRole, type GranteeUuid, type TargetUuid, type ShareUuid,
} from '@/uuid/share'
import { assertTenantMatch, assertAdminOnTenant } from '@/agents/mcp/tool/_guards'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const ROLE_ENUM = z.enum(['read', 'write', 'sign', 'admin', 'audit'])

const I18N: Record<string, LocalizedString> = {
  uuid: {
    en: 'Compute the deterministic shareUuid for a (grantee, target, role, tenant) tuple. Stable across re-invocations; federation peers and audit verifiers reconcile by this uuid alone.',
    bg: 'Изчислява детерминистичен shareUuid за двойка (получател, цел, роля, наемател). Стабилен; федерационни партньори/одитори сравняват само по този uuid.',
    de: 'Berechnet die deterministische shareUuid für ein (Berechtigter, Ziel, Rolle, Tenant)-Tupel. Stabil; Föderationspeers/Audit gleichen allein über diese uuid ab.',
    fr: 'Calcule la shareUuid déterministe pour un tuple (bénéficiaire, cible, rôle, tenant). Stable ; les pairs fédérés/auditeurs réconcilient via cette uuid seule.',
  },
  grant: {
    en: 'Create a chain-linked RBAC share binding. read/write/audit grants are chain-linked but not sealed; sign/admin grants are SEALED (signatureRequired:true → stream pause / merged-unity meeting point). Idempotent: re-granting the same tuple returns the existing binding.',
    bg: 'Създава chain-linked RBAC споделяне. read/write/audit грантовете са свързани с chain но не запечатани; sign/admin грантовете се ЗАПЕЧАТВАТ.',
    de: 'Erstellt eine chain-verknüpfte RBAC-Share-Bindung. read/write/audit-Grants sind verknüpft aber nicht versiegelt; sign/admin-Grants werden VERSIEGELT.',
    fr: 'Crée une liaison RBAC chain-linked. Les grants read/write/audit sont liés mais non scellés ; sign/admin sont SCELLÉS.',
  },
  check: {
    en: 'RBAC enforcement point — returns granted/denied + held-role + reason. Lattice: admin > sign > write > read (audit orthogonal). Does NOT throw — caller branches on `granted`.',
    bg: 'RBAC точка за контрол — връща granted/denied + държана роля + причина. Решетка: admin > sign > write > read (audit ортогонална).',
    de: 'RBAC-Durchsetzungspunkt — granted/denied + gehaltene Rolle + Grund. Lattice: admin > sign > write > read (audit orthogonal).',
    fr: 'Point d\'application RBAC — granted/denied + rôle détenu + raison. Treillis : admin > sign > write > read (audit orthogonal).',
  },
  revoke: {
    en: 'Revoke a share — chain-links a revoke event (sealed if the original grant was sealed) and flips the row\'s revoked:true flag. Idempotent: revoking a non-existent share returns revoked:false without throwing.',
    bg: 'Отменя споделяне — chain-links на revoke събитие (запечатано ако оригиналният грант е бил запечатан) и обръща revoked:true.',
    de: 'Widerruft eine Share — chain-verknüpft ein Revoke-Event (versiegelt wenn der Original-Grant versiegelt war) und setzt revoked:true.',
    fr: 'Révoque un partage — chain-link un événement de révocation (scellé si le grant initial était scellé) et bascule revoked:true.',
  },
  list: {
    en: 'List share bindings filtered by grantee OR target (at least one required for a bounded query). Default: excludes revoked rows; pass includeRevoked:true to include them.',
    bg: 'Списък със споделяния филтрирани по получател ИЛИ цел. По подразбиране изключва revoked редове.',
    de: 'Listet Share-Bindungen gefiltert nach Berechtigtem ODER Ziel. Standard: ohne revoked-Zeilen.',
    fr: 'Liste les liaisons de partage filtrées par bénéficiaire OU cible. Par défaut : exclut les lignes révoquées.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.share.${k}`, v)
}

export function buildShareTools(): ReadonlyArray<ErpaxMcpTool> {
  const tUuid = makeToolI18n('erpax.share.uuid')
  const tGrant = makeToolI18n('erpax.share.grant')
  const tCheck = makeToolI18n('erpax.share.check')
  const tRevoke = makeToolI18n('erpax.share.revoke')
  const tList = makeToolI18n('erpax.share.list')

  return [
    {
      name: 'erpax.share.uuid',
      description: tUuid.desc(I18N.uuid!),
      parameters: {
        granteeUuid: z.string(),
        targetUuid: z.string(),
        accessRole: ROLE_ENUM,
        tenantId: z.string(),
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        const shareUuid = computeShareUuid({
          granteeUuid: args.granteeUuid as GranteeUuid<unknown>,
          targetUuid: args.targetUuid as TargetUuid<unknown>,
          accessRole: args.accessRole as AccessRole,
          tenantId: String(args.tenantId),
        })
        return json({ shareUuid })
      },
    },
    {
      name: 'erpax.share.grant',
      description: tGrant.desc(I18N.grant!),
      parameters: {
        tenantId: z.string(),
        granteeUuid: z.string(),
        targetUuid: z.string(),
        accessRole: ROLE_ENUM,
        description: z.string().optional(),
        grantedByUserId: z.string().optional(),
      },
      async handler(args, req) {
        assertAdminOnTenant(String(args.tenantId), req)
        const out = await grantShare(
          {
            tenantId: String(args.tenantId),
            granteeUuid: args.granteeUuid as GranteeUuid<unknown>,
            targetUuid: args.targetUuid as TargetUuid<unknown>,
            accessRole: args.accessRole as AccessRole,
            description: args.description as string | undefined,
            grantedByUserId: args.grantedByUserId as string | undefined,
          },
          { payload: req.payload, mediator: undefined /* CLI / agent ctx */ },
        )
        return json(out)
      },
    },
    {
      name: 'erpax.share.check',
      description: tCheck.desc(I18N.check!),
      parameters: {
        tenantId: z.string(),
        granteeUuid: z.string(),
        targetUuid: z.string(),
        requiredRole: ROLE_ENUM,
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        const result = await checkShare(
          {
            tenantId: String(args.tenantId),
            granteeUuid: args.granteeUuid as GranteeUuid<unknown>,
            targetUuid: args.targetUuid as TargetUuid<unknown>,
            requiredRole: args.requiredRole as AccessRole,
          },
          { payload: req.payload },
        )
        return json(result)
      },
    },
    {
      name: 'erpax.share.revoke',
      description: tRevoke.desc(I18N.revoke!),
      parameters: {
        tenantId: z.string(),
        shareUuid: z.string(),
        revokedByUserId: z.string().optional(),
        reason: z.string().optional(),
      },
      async handler(args, req) {
        assertAdminOnTenant(String(args.tenantId), req)
        const result = await revokeShare(
          {
            tenantId: String(args.tenantId),
            shareUuid: args.shareUuid as ShareUuid,
            revokedByUserId: args.revokedByUserId as string | undefined,
            reason: args.reason as string | undefined,
          },
          { payload: req.payload, mediator: undefined },
        )
        return json(result)
      },
    },
    {
      name: 'erpax.share.list',
      description: tList.desc(I18N.list!),
      parameters: {
        tenantId: z.string(),
        granteeUuid: z.string().optional(),
        targetUuid: z.string().optional(),
        includeRevoked: z.boolean().optional(),
        limit: z.number().int().min(1).max(500).optional(),
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        const list = await listShares(
          {
            tenantId: String(args.tenantId),
            granteeUuid: args.granteeUuid as GranteeUuid<unknown> | undefined,
            targetUuid: args.targetUuid as TargetUuid<unknown> | undefined,
            includeRevoked: args.includeRevoked === true,
            limit: args.limit as number | undefined,
          },
          { payload: req.payload },
        )
        return json({ count: list.length, bindings: list })
      },
    },
  ]
}
