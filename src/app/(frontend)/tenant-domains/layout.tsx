import { IntlChrome } from '@/components/IntlChrome'
import { routing } from '@/i18n/routing'
import React from 'react'

export default async function TenantDomainsLayout({ children }: { children: React.ReactNode }) {
  return <IntlChrome locale={routing.defaultLocale}>{children}</IntlChrome>
}
