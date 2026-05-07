import type { FieldAccess } from 'payload'

import { commerceHasCustomerRole } from '@/ecommerce/access/utilities'

export const customerOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  if (user) return commerceHasCustomerRole(user)

  return false
}
