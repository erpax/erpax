import type { Access } from 'payload'

import { commerceHasStaffRole } from '@/ecommerce/access/utilities'

/** Plugin-ecommerce expects this export name for full admin access to commerce collections. */
export const isAdmin: Access = ({ req }) => commerceHasStaffRole(req.user)
