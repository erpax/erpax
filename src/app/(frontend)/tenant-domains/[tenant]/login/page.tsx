import React from 'react'
import { getTranslations } from 'next-intl/server'

import { Login } from '@/components/Login/client.page'

type RouteParams = {
  tenant: string
}

// eslint-disable-next-line no-restricted-exports
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
