import { HeaderClient } from '@/globals/header/Component.client'
import type { SupportedLocale } from '@/i18n/localization'

import { getCachedGlobal } from '@/utilities/rfc/9110'
import React from 'react'

export async function Header({ locale }: { locale: SupportedLocale }) {
  const headerData = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} locale={locale} />
}
