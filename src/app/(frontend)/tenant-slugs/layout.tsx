/**
 * Tenant-slugs layout — wraps per-tenant routes resolved by URL path slug.
 *
 * @rfc 3986 uniform-resource-identifier path-component
 * @rfc 9110 http-semantics
 * @standard BCP-47 language-tag
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/app/README.md
 */

import { IntlChrome } from '@/components/IntlChrome'
import { routing } from '@/i18n/routing'
import React from 'react'

export default async function TenantSlugsLayout({ children }: { children: React.ReactNode }) {
  return <IntlChrome locale={routing.defaultLocale}>{children}</IntlChrome>
}
