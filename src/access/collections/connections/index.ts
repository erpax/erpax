import type { Access, Where } from 'payload'

import { isSuperAdmin } from '@/access/collections/shared/superAdminOnly'

/**
 * Connections access: an edge is read by the two users on it and changed by the one who drew it (`from`).
 * A super-admin reaches every edge. Connections carry no tenant, so no tenant filter applies.
 *
 * @security ISO-27001 A.5.15 access-control
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 */
const onEdge = (side: 'from' | 'either'): Access => ({ req }) => {
  if (!req.user) return false
  if (isSuperAdmin(req.user)) return true
  const drawn: Where = { from: { equals: req.user.id } }
  return side === 'from' ? drawn : { or: [drawn, { to: { equals: req.user.id } }] }
}

export const connectionAccess: { read: Access; create: Access; update: Access; delete: Access } = {
  read: onEdge('either'),
  create: ({ req }) => Boolean(req.user),
  update: onEdge('from'),
  delete: onEdge('from'),
}
