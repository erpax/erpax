import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'

export async function IntlChrome({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  )
}
