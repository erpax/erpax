/**
 * Locale-scoped layout — validates `[locale]`, sets `<html lang>` + i18n chrome,
 * tenant context, and ecommerce client provider.
 *
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @rfc 4647 matching-of-language-tags
 * @standard ECMA-402 internationalization-api
 * @standard Unicode-CLDR locale-data
 * @standard W3C HTML5 lang-attribute
 * @compliance WCAG-2.1 §3.1.1 language-of-page
 * @compliance WCAG-2.1 §3.1.2 language-of-parts
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-from-request
 * @see src/app/README.md
 */

import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'

import { EcommerceClientProvider } from '@/ecommerce/client/provider'
import { IntlChrome } from '@/intl/chrome'
import { routing } from '@/i18n/routing'
import localization from '@/i18n/localization'
import { resolvePublicSiteUrlFromHeaders as resolvePublicSiteUrl } from '@/rfc/3986'
import { getTenantFromRequest } from '@/get/tenant/from/request'

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
