/**
 * Shares — uuid-based RBAC share bindings (Conservation Law 59).
 *
 * The durable, queryable projection of the share graph maintained by
 * `@/services/uuid-share`. A "share" is a binding
 * `(granteeUuid, accessRole, targetUuid)` per tenant: who may do what
 * over which content-uuid-addressed resource. Each binding carries the
 * deterministic `shareUuid` (structured uuidv8) computed by
 * `computeShareUuid`, and links to the chain-linked audit leaf that
 * attests the grant (and, after revocation, the revoke leaf).
 *
 * Service ↔ collection contract (the fields below are exactly what
 * `grantShare` / `checkShare` / `revokeShare` / `listShares` read and
 * write):
 *
 *   grantShare   → create { tenant, shareUuid, granteeUuid, targetUuid,
 *                           accessRole, grantedAt, chainLeafUuid, sealed,
 *                           revoked:false }
 *   checkShare   → find by (tenant, granteeUuid, targetUuid, revoked≠true)
 *   revokeShare  → update { revoked:true, revokedAt, revokeChainLeafUuid }
 *   listShares   → find by (tenant, granteeUuid?, targetUuid?, revoked?)
 *
 * `checkShare` is the RBAC enforcement point — it reads this collection,
 * so the collection IS the access-control source of truth at read time;
 * the audit-events chain is the tamper-evidence record of how each row
 * got here. The `shareUuid` is NOT unique: re-granting a revoked binding
 * adds a fresh active row alongside the prior revoked one.
 *
 * @standard NIST SP 800-162 §3 attribute-based-access-control
 * @standard ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights
 * @standard ISO/IEC 27001 Annex A.9.4.1 information-access-restriction
 * @standard eIDAS §3 sealed-grants (sign/admin)
 * @compliance GDPR Article 32(1)(b) ongoing-confidentiality
 * @compliance SOX §404 access-controls audit-evidenced-via-chain
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit Conservation Law 59 uuid-based-sharing-with-rbac
 * @see src/services/uuid-share/index.ts grantShare/checkShare/revokeShare/listShares
 * @see src/services/agents/mcp/tools/share.ts erpax.share.* MCP tools
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { scopedAccess, adminOrAccountant, tenantAdmin } from '../../access/auth'

const Shares: CollectionConfig = {
  slug: 'shares',
  labels: { singular: 'Share', plural: 'Shares' },
  admin: {
    useAsTitle: 'shareUuid',
    defaultColumns: ['shareUuid', 'granteeUuid', 'targetUuid', 'accessRole', 'revoked', 'grantedAt'],
    description:
      'UUID-based RBAC share bindings (Law 59). Created/revoked via the uuid-share service + erpax.share.* MCP tools; revocation is a soft flag (revoked:true), never a delete.',
  },
  // Tenant-scoped read; writes gated to the accounting/admin set. The
  // `tenant` field is injected by the multi-tenant plugin (see config).
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'shareUuid',
      type: 'text',
      required: true,
      index: true,
      admin: {
        readOnly: true,
        description:
          'Deterministic structured uuidv8 of the (grantee, role, target, tenant) binding (computeShareUuid). Not unique — re-granting a revoked binding adds a new active row.',
      },
    },
    {
      name: 'granteeUuid',
      type: 'text',
      required: true,
      index: true,
      admin: { readOnly: true, description: 'Content-uuid of the grantee (user / role / tenant / DID).' },
    },
    {
      name: 'targetUuid',
      type: 'text',
      required: true,
      index: true,
      admin: { readOnly: true, description: 'Content-uuid of the shared resource (any contentUuid-addressed target).' },
    },
    {
      name: 'accessRole',
      type: 'select',
      required: true,
      options: [
        { label: 'Read', value: 'read' },
        { label: 'Write', value: 'write' },
        { label: 'Sign', value: 'sign' },
        { label: 'Admin', value: 'admin' },
        { label: 'Audit', value: 'audit' },
      ],
      admin: {
        readOnly: true,
        description: 'RBAC lattice role — read < write < sign < admin; audit orthogonal (observation only).',
      },
    },
    {
      name: 'grantedAt',
      type: 'date',
      admin: { readOnly: true, description: 'ISO 8601 timestamp the grant was created.' },
    },
    {
      name: 'chainLeafUuid',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description: 'UUID of the chain-linked audit leaf attesting this grant. Null when no mediator was available at write.',
      },
    },
    {
      name: 'sealed',
      type: 'checkbox',
      defaultValue: false,
      admin: { readOnly: true, description: 'True iff the grant leaf was sealed (sign/admin grants — stream pause points).' },
    },
    {
      name: 'revoked',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { readOnly: true, description: 'Soft-revocation flag. checkShare ignores revoked rows; revocation is roll-forward, never a delete.' },
    },
    {
      name: 'revokedAt',
      type: 'date',
      admin: { readOnly: true, description: 'ISO 8601 timestamp the binding was revoked (set by revokeShare).' },
    },
    {
      name: 'revokeChainLeafUuid',
      type: 'text',
      admin: { readOnly: true, description: 'UUID of the chain-linked revoke leaf (sealed iff the original grant was sealed).' },
    },
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
  },
  timestamps: true,
}

export default Shares
