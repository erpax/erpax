'use client'

import React, { useCallback, useTransition } from 'react'
import { useLocale } from 'next-intl'

import localization from '@/i18n/localization'
import { usePathname, useRouter } from '@/i18n/routing'

/**
 * Frontend locale switcher.
 *
 * Switches the active locale by routing to the same pathname under the chosen
 * locale. After `router.replace` we call `router.refresh()` to evict the
 * Next.js Router Cache for the previous locale's RSC payload — otherwise the
 * client would re-display stale translations until the staleTimes window
 * expires (default 30s for dynamic, 5min for static).
 *
 * We do not use the `pathnames` routing setting, so the simple string form of
 * `router.replace(pathname, { locale })` is correct (per next-intl docs).
 */
export const FrontendLocaleSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const [isPending, startTransition] = useTransition()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextLocale = event.target.value
      if (nextLocale === currentLocale) return

      startTransition(() => {
        router.replace(pathname, { locale: nextLocale })
        router.refresh()
      })
    },
    [pathname, router, currentLocale],
  )

  return (
    <select
      aria-label="Select language"
      className={
        className ??
        'bg-transparent border border-border text-sm rounded px-2 py-1 cursor-pointer'
      }
      disabled={isPending}
      onChange={handleChange}
      value={currentLocale}
    >
      {localization.locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  )
}

export default FrontendLocaleSwitcher
