/**
 * Customer-only field access — non-staff shoppers only.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27002 §5.15 access-control
 * @compliance GDPR Art.5(1)(c) data-minimization
 * @see docs/STANDARDS.md §4.4
 */

import type { FieldAccess } from 'payload'

import { commerceHasCustomerRole } from './utilities'

export const customerOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  if (user) return commerceHasCustomerRole(user)

  return false
}
