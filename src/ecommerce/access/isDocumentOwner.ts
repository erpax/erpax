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
