/**
 * `isDocumentOwner` access predicate — staff or the document's user-owner.
 *
 * Used for cart, order, and address rows that should be readable by their
 * owning customer + ecommerce staff, but no one else.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */

import type { Access } from 'payload'

import { commerceHasStaffRole } from '@/ecommerce/access/utilities'

export const isDocumentOwner: Access = ({ req }) => {
  if (req.user && commerceHasStaffRole(req.user)) {
    return true
  }

  if (req.user?.id) {
    return {
      customer: {
        equals: req.user.id,
      },
    }
  }

  return false
}
