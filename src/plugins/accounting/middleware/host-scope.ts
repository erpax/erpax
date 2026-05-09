/**
 * Host Scope Middleware — enforce GL-posting tenant isolation.
 *
 * @deprecated Slices PP+CCC+FFF: this middleware was the only writer to
 * `req.payload.requestContext.hostId`, but that property was never wired
 * into Payload's request lifecycle (zero readers found at the time).
 * Callers should derive the active tenant directly from
 * `req.user.tenants[0]?.tenant` (canonical multi-tenant plugin shape) —
 * see `@/plugins/auth/access.ts` `getUserContext` for the pattern. Kept
 * as a thin gate that 401s when the user has no tenant; remove once the
 * accounting plugin no longer exports it.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance GDPR Art.32 security-of-processing
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.4
 */

import type { PayloadRequest } from 'payload'
export const hostScopeMiddleware = async (
  req: PayloadRequest,
  res: any,
  next: any,
): Promise<void> => {
  try {
    // Active tenant from canonical multi-tenant plugin shape.
    const tenantId = req.user?.tenants?.[0]?.tenant;

    if (tenantId === undefined || tenantId === null) {
      return res.status(401).json({
        error: 'Tenant context required for GL posting operations',
      });
    }

    // Log for audit trail.
    req.payload.logger.info(`✓ Tenant scope verified: ${tenantId} for user ${req.user?.email}`);

    next();
  } catch (error) {
    req.payload.logger.error({ err: error }, `✗ Error verifying tenant scope:`);
    return res.status(500).json({ error: 'Failed to verify tenant scope' });
  }
};

/**
 * Tenant scope validation. Validates that GL-posting operations stay
 * within the current tenant. Used by `glPostingService` to ensure
 * multi-tenant isolation.
 */
export const validateHostScope = (
  requestTenantId: string | number | undefined,
  documentTenantId: string | number | undefined,
): boolean => {
  if (requestTenantId === undefined || requestTenantId === null) return false;
  if (documentTenantId === undefined || documentTenantId === null) return false;
  return String(requestTenantId) === String(documentTenantId);
};

/**
 * Enrich a GL entry with tenant context — automatically adds `tenant`
 * before posting. Field name updated to match the post-Slice-CCC schema.
 */
export const enrichGLEntryWithHostContext = (
  glEntry: any,
  tenantId: string | number,
): any => {
  return {
    ...glEntry,
    tenant: tenantId,
    createdAt: new Date(),
  };
};
