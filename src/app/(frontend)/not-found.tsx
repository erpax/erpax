/**
 * Root not-found page (frontend group).
 *
 * @rfc 9110 §15.5.5 404-not-found
 * @standard schema.org WebPage
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Button } from '@/ui'
import { Link } from '@/i18n/routing'
import { defaultLocale } from '@/i18n'

export default async function NotFound() {
  setRequestLocale(defaultLocale)
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
