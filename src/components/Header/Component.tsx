import { HeaderClient } from './Component.client'
import type { SupportedLocale } from '@/i18n/localization'

import { getCachedGlobal } from '@/standards/rfc-9110/get-globals'
import React from 'react'

export async function Header({ locale }: { locale: SupportedLocale }) {
  const headerData = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} locale={locale} />
}
