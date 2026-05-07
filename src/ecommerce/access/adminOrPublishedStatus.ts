import type { Access } from 'payload'

import { commerceHasStaffRole } from '@/ecommerce/access/utilities'

export const adminOrPublishedStatus: Access = ({ req: { user } }) => {
  if (commerceHasStaffRole(user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
