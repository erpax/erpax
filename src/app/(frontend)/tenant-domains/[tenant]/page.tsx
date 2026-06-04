/**
 * Tenant-domain root — re-exports the deep-slug renderer.
 *
 * @rfc 3986 uniform-resource-identifier host-component
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./[...slug]/page.tsx
 * @see src/app/README.md
 */

import Page from '@/app/(frontend)/tenant-domains/[tenant]/[...slug]/page'

export default Page
