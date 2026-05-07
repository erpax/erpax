import { notFound } from 'next/navigation'
import React from 'react'

import { IntlChrome } from '@/components/IntlChrome'
import { routing } from '@/i18n/routing'
import localization from '@/i18n/localization'

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

  const currentLocale = localization.locales.find((loc) => loc.code === locale)
  const direction = currentLocale?.rtl ? 'rtl' : 'ltr'

  return (
    <div dir={direction} lang={locale}>
      <IntlChrome locale={locale}>{children}</IntlChrome>
    </div>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
