/**
 * Admin-only field access for ecommerce — staff role required.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @see docs/STANDARDS.md §4.4
 */

import type { FieldAccess } from 'payload'

import { commerceHasStaffRole } from '@/ecommerce/access/utilities'

export const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) =>
  commerceHasStaffRole(user)
