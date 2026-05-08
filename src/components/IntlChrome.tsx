import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { DocumentHtmlLang } from '@/components/DocumentHtmlLang'
import { Footer } from '@/components/Footer/Component'
import { Header } from '@/components/Header/Component'
import type { SupportedLocale } from '@/i18n/localization'

export async function IntlChrome({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  const localeCode = locale as SupportedLocale
  noStore()
  setRequestLocale(locale)
  const messages = await getMessages()
  const { isEnabled: preview } = await draftMode()

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <DocumentHtmlLang locale={locale} />
      <AdminBar adminBarProps={{ preview }} />
      <Header key={locale} locale={localeCode} />
      {children}
      <Footer key={locale} locale={localeCode} />
    </NextIntlClientProvider>
  )
}
