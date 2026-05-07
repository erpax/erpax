import type { FieldAccess } from 'payload'

import { commerceHasCustomerRole } from '@/ecommerce/access/utilities'

/** Customer-only fields (non-staff shoppers). Prefer over deprecated `customerOnlyFieldAccess`. */
export const isCustomer: FieldAccess = ({ req }) =>
  Boolean(req.user && commerceHasCustomerRole(req.user))
