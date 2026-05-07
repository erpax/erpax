import type { FieldAccess } from 'payload'

import { commerceHasStaffRole } from '@/ecommerce/access/utilities'

export const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) =>
  commerceHasStaffRole(user)
