'use client'

import React, { useCallback, useTransition } from 'react'
import { useLocale } from 'next-intl'

import localization from '@/i18n/localization'
import { usePathname, useRouter } from '@/i18n/routing'

/**
 * Frontend locale switcher.
 *
 * Switches the active locale by routing to the same pathname under the chosen
 * locale. After `router.replace`, force a **fresh** RSC payload:
 *
 * - **`router.refresh()`** invalidates the Flight/Router cache so layouts pick up
 *   new `next-intl` messages (shared shells otherwise reuse prefetched segments).
 * - **`experimental.staleTimes`** in `next.config.ts` keeps the client router
 *   from hanging onto static prefetches across navigations.
 *
 * Refresh is deferred with **`requestAnimationFrame`** so it runs after the
 * navigation commits (microtasks alone can race the router cache update).
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
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            router.refresh()
          })
        })
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
