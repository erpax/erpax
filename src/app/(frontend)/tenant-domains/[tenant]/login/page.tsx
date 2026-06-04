/**
 * Tenant-domain login page.
 *
 * @rfc 9110 http-semantics
 * @rfc 7519 jwt session-token
 * @rfc 6265 cookies
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import React from 'react'
import { getTranslations } from 'next-intl/server'

import { Login } from '@/login/client.page'

type RouteParams = {
  tenant: string
}

export default async function Page({ params: paramsPromise }: { params: Promise<RouteParams> }) {
  const params = await paramsPromise
  const t = await getTranslations()

  return (
    <Login
      tenantDomain={params.tenant}
      labels={{
        genericError: t('something-went-wrong-try-again'),
        login: t('login'),
        password: t('password'),
        username: t('username'),
      }}
    />
  )
}
