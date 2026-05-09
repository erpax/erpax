/**
 * `authenticated` access predicate — requires `req.user`.
 *
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */

import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}
