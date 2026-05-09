/**
 * Locale-scoped not-found page.
 *
 * @rfc 9110 §15.5.5 404-not-found
 * @standard schema.org WebPage
 * @standard BCP-47 language-tag
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Link, routing } from '@/i18n/routing'

type Args = {
  /** Missing during some static-generation paths (e.g. prerender retries); fall back below. */
  params?: Promise<{ locale?: string }>
}

export default async function LocaleNotFound({ params }: Args) {
  const resolved = params ? await params : {}
  const locale = resolved.locale

  const effectiveLocale =
    locale && routing.locales.includes(locale as (typeof routing.locales)[number])
    ? locale
    : routing.defaultLocale

  setRequestLocale(effectiveLocale)
  const t = await getTranslations()

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">{t('page-not-found')}</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">{t('go-home')}</Link>
      </Button>
    </div>
  )
}
