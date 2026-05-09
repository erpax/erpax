/**
 * `authenticated` access predicate — requires `req.user`.
 *
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see src/standards/iso-27002/types.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { AccessArgs } from 'payload'
import type { Iso27002ControlId } from '@/standards/iso-27002'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * Canonical ISO 27002 controls this predicate exercises:
 *   5.15 — Access control (gates the resource)
 *   5.16 — Identity management (user identity must exist)
 *   8.5  — Secure authentication (session must be valid)
 */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = [
  '5.15',
  '5.16',
  '8.5',
] as const
