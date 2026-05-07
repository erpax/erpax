import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'

import { EcommerceClientProvider } from '@/components/EcommerceClientProvider'
import { IntlChrome } from '@/components/IntlChrome'
import { routing } from '@/i18n/routing'
import localization from '@/i18n/localization'
import { resolvePublicSiteUrl } from '@/utilities/getURL'
import { getTenantFromRequest } from '@/utilities/getTenantFromRequest'

type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleLayout({ children, params }: Args) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const h = await headers()
  const tenant = await getTenantFromRequest(h)
  const serverURL = resolvePublicSiteUrl(h, tenant)
  const stripePublishableKey =
    tenant?.stripePublishableKey?.trim() ||
    (process.env.NODE_ENV !== 'production' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY : '') ||
    ''

  const currentLocale = localization.locales.find((loc) => loc.code === locale)
  const direction = currentLocale?.rtl ? 'rtl' : 'ltr'

  return (
    <div dir={direction} lang={locale}>
      <EcommerceClientProvider
        serverURL={serverURL}
        stripePublishableKey={stripePublishableKey}
      >
        <IntlChrome locale={locale}>{children}</IntlChrome>
      </EcommerceClientProvider>
    </div>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
