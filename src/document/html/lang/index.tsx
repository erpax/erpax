'use client'

import { useEffect } from 'react'

/** Keeps `<html lang>` in sync with the active `[locale]` (layout alone cannot update `<html>`). */
export function DocumentHtmlLang({ locale }: { locale: string }): null {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
