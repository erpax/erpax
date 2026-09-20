/**
 * Tenant Scope Middleware — enforce GL-posting tenant isolation.
 *
 * @deprecated Slices PP+CCC+FFF: this middleware was the only writer to
 * `req.payload.requestContext.hostId`, but that property was never wired
 * into Payload's request lifecycle (zero readers found at the time).
 * Callers should derive the active tenant directly from
 * `req.user.tenants[0]?.tenant` (canonical multi-tenant plugin shape) —
 * see `@/access/auth.ts` `getUserContext` for the pattern. Kept
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
import { getUser } from '@/auth'

interface MiddlewareResponse {
  status: (code: number) => { json: (body: unknown) => void }
}
type MiddlewareNext = () => void
