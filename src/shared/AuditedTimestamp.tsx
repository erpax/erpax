/**
 * AuditedTimestamp — canonical date/time renderer for audit-trail evidence.
 *
 * Storage: ISO 8601-1:2019 UTC string (the only acceptable storage form
 * across the codebase). Display: locale-formatted via Intl.DateTimeFormat
 * (ECMA-402). Always renders a `<time datetime>` element so screen
 * readers and search engines get the canonical machine-readable form.
 *
 * Format options follow the user's `tenant.config.localization.dateFormat`
 * preference (`iso` / `eu` / `us` / `locale`); pass `'auto'` to defer
 * to the BCP 47 locale's standard.
 *
 * @standard ISO-8601-1:2019 date-time utc-canonical
 * @standard W3C HTML5 time-element
 * @standard ECMA-402 internationalization-api intl-datetimeformat
 * @standard BCP-47 language-tag locale-formatting
 * @audit ISO-19011:2018 audit-trail consistent-timestamps
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships time-semantics
 * @see src/config/regional-defaults.ts
 * @see src/utilities/tenant-context.ts
 */

import React from 'react'
import { DEFAULT_LOCALE } from '@/config/regional-defaults'

interface AuditedTimestampProps {
  /** ISO 8601 string or Date. */
  value: string | Date
  /** BCP 47 locale tag. */
  locale?: string
  /** Display preset; defaults to the BCP 47 locale's standard. */
  format?: 'iso' | 'eu' | 'us' | 'locale' | 'auto'
  /** Render with both date and time, or date only. */
  precision?: 'date' | 'datetime'
  /** Show the relative-time suffix ("3 days ago"). */
  relative?: boolean
  /** Wrapping element class. */
  className?: string
}

const formatters = {
  iso: (d: Date) => d.toISOString().slice(0, 19).replace('T', ' '),
  eu: (d: Date, locale: string) =>
    new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d),
  us: (d: Date, locale: string) =>
    new Intl.DateTimeFormat(locale, { month: '2-digit', day: '2-digit', year: 'numeric' }).format(d),
}

function formatRelative(d: Date, locale: string): string {
  const ms = Date.now() - d.getTime()
  const sec = Math.round(ms / 1000)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  if (Math.abs(sec) < 60) return rtf.format(-sec, 'second')
  const min = Math.round(sec / 60)
  if (Math.abs(min) < 60) return rtf.format(-min, 'minute')
  const hr = Math.round(min / 60)
  if (Math.abs(hr) < 48) return rtf.format(-hr, 'hour')
  const day = Math.round(hr / 24)
  if (Math.abs(day) < 60) return rtf.format(-day, 'day')
  const month = Math.round(day / 30)
  if (Math.abs(month) < 24) return rtf.format(-month, 'month')
  const year = Math.round(day / 365)
  return rtf.format(-year, 'year')
}

export default function AuditedTimestamp({
  value,
  locale = DEFAULT_LOCALE,
  format = 'auto',
  precision = 'datetime',
  relative = false,
  className,
}: AuditedTimestampProps) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return <span className={className}>—</span>
  }

  let display: string
  switch (format) {
    case 'iso':
      display = precision === 'date' ? date.toISOString().slice(0, 10) : formatters.iso(date)
      break
    case 'eu':
      display = formatters.eu(date, locale)
      break
    case 'us':
      display = formatters.us(date, locale)
      break
    case 'locale':
    case 'auto':
    default:
      display = new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        ...(precision === 'datetime' ? { timeStyle: 'short' } : {}),
      }).format(date)
  }

  return (
    <time
      dateTime={date.toISOString()}
      className={['tabular-nums', className].filter(Boolean).join(' ')}
      title={date.toISOString()}
    >
      {display}
      {relative && (
        <span className="ml-2 text-xs text-muted-foreground" aria-hidden="true">
          ({formatRelative(date, locale)})
        </span>
      )}
    </time>
  )
}
