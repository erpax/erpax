'use client'

/**
 * Custom link wrapper — internal Payload doc reference or external URL.
 *
 * @rfc 3986 uniform-resource-identifier
 * @standard W3C HTML5 anchor-element
 * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
 * @compliance WCAG-2.1 §2.4.9 link-purpose-link-only
 * @standard BCP-47 language-tag locale-aware-routing
 * @see src/components/README.md
 */

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import React from 'react'

import type { SupportedLocale } from '@/i18n/localization'
import { supportedLocales } from '@/i18n/localization'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

/** Prefix internal paths with `/[locale]/…` when using `localePrefix: 'always'`. */
function withLocalePrefix(path: string, locale: string): string {
  if (
    !path ||
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  const first = normalized.split('/').filter(Boolean)[0]
  if (first !== undefined && supportedLocales.includes(first as SupportedLocale)) {
    return normalized
  }

  return `/${locale}${normalized}`
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const locale = useLocale()
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const rawHref =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url ?? ''

  const href = rawHref ? withLocalePrefix(rawHref, locale) : ''

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
