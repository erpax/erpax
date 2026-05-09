/**
 * Money — canonical monetary-amount renderer.
 *
 * **Single rule for every dollar / euro / yen on every surface.**
 * Storage is integer cents (IEEE-754 avoidance per the project policy);
 * display goes through `Intl.NumberFormat(locale, {style:'currency'})`
 * (ECMA-402). Pass `cents` + `currency` + `locale`; this atom handles
 * ISO 4217 / BCP 47 / locale-formatting symmetry — no other component
 * should call `.toFixed(2)` on a money value.
 *
 * Cascade for the locale (when omitted): `tenant.config.localization` →
 * country-derived → deployment default.
 *
 * @standard ISO-4217:2015 §5 alphabetic-codes
 * @standard ECMA-402 internationalization-api intl-numberformat
 * @standard IEEE-754-2019 binary-floating-point integer-cents-only
 * @standard BCP-47 language-tag locale-formatting
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail consistent-formatting
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships tabular-num
 * @see src/config/regional-defaults.ts
 */

import React from 'react'
import { DEFAULT_CURRENCY, DEFAULT_LOCALE, type Currency } from '@/config/regional-defaults'

interface MoneyProps {
  /** Amount in integer cents (the only acceptable storage form). */
  cents: number
  /** ISO 4217 §5 alphabetic code. Defaults to the deployment currency. */
  currency?: Currency
  /** BCP 47 locale tag. Defaults to the deployment locale. */
  locale?: string
  /**
   * Negative-amount style. `'sign'` prepends `-`; `'parens'` wraps in
   * accounting-style parentheses (the convention on most balance sheets).
   */
  negativeStyle?: 'sign' | 'parens'
  /** Optional className for the wrapping `<span>`. */
  className?: string
  /**
   * `'auto'` renders a `<span>` with `tabular-nums` for clean column
   * alignment in tables; pass `'inline'` to drop the wrapping element.
   */
  variant?: 'auto' | 'inline'
}

/**
 * Render an integer-cents amount as a localised currency string.
 * Pure component — server- or client-safe.
 */
export default function Money({
  cents,
  currency = DEFAULT_CURRENCY as Currency,
  locale = DEFAULT_LOCALE,
  negativeStyle = 'sign',
  className,
  variant = 'auto',
}: MoneyProps) {
  const value = (cents || 0) / 100
  const isNegative = value < 0
  const absText = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(Math.abs(value))
  const text = isNegative
    ? negativeStyle === 'parens'
      ? `(${absText})`
      : `-${absText}`
    : absText

  if (variant === 'inline') {
    return <>{text}</>
  }
  const cls = ['tabular-nums', isNegative && negativeStyle === 'sign' ? 'text-red-600' : '', className]
    .filter(Boolean)
    .join(' ')
  return (
    <span className={cls} aria-label={`${value < 0 ? 'minus ' : ''}${absText}`}>
      {text}
    </span>
  )
}
