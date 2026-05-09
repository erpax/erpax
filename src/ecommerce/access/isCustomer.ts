/**
 * `isCustomer` field access — non-staff shoppers only.
 *
 * Prefer over the older `customerOnlyFieldAccess`.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27002 §5.15 access-control
 * @see docs/STANDARDS.md §4.4
 */

import type { FieldAccess } from 'payload'

import { commerceHasCustomerRole } from '@/ecommerce/access/utilities'

export const isCustomer: FieldAccess = ({ req }) =>
  Boolean(req.user && commerceHasCustomerRole(req.user))
