import type { Access, CollectionSlug } from 'payload'

import { isSuperAdmin } from '@/access/collections/shared/superAdminOnly'

/** The collections the public site routes by slug: [locale]/[slug], /posts/[slug], /products/[slug]. */
export const PUBLIC_COLLECTIONS = ['pages', 'posts', 'products'] as const satisfies readonly CollectionSlug[]

/**
 * Search:read access. The index holds one row per document of every collection, and a row carries
 * no tenant, so only a super-admin reads all of it. Everyone else reads the rows of the public
 * collections, which the plugin syncs only once published.
 *
 * @security ISO-27001 A.5.15 access-control
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 */
export const searchReadAccess: Access = ({ req }) =>
  isSuperAdmin(req?.user) || { 'doc.relationTo': { in: [...PUBLIC_COLLECTIONS] } }
