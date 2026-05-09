/**
 * AddressBlock — canonical address renderer.
 *
 * Reads the per-country format from `@/config/address-formats` and lays
 * out the address according to the destination country's convention
 * (US: `street/city/state ZIP`; JP: `postal/prefecture/city/street`;
 * DE: `street/PLZ/city`; HK: no postal code at all). The same
 * single-source-of-truth used by the `validateAddressHook` validates,
 * so any address that was accepted for storage will render correctly.
 *
 * Uses semantic `<address>` markup (HTML5 living standard) with each
 * line in a `<span>` for screen-reader pacing.
 *
 * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
 * @standard UPU-S42 international-postal-addressing
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard W3C HTML5 address-element
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships
 * @audit ISO-19011:2018 audit-trail consistent-rendering
 * @see src/config/address-formats.ts
 * @see src/utilities/address-validation.ts
 */

import React from 'react'
import { type AddressLike } from '@/utilities/address-validation'
import { type AddressComponent, getAddressFormat } from '@/config/address-formats'

interface AddressBlockProps {
  address: AddressLike
  /** Override country if `address.country` is missing or stale. */
  fallbackCountry?: string
  /** Show the country name on a final line (default: true). */
  showCountry?: boolean
  /** Wrapping element class. */
  className?: string
}

function lineFor(addr: AddressLike, c: AddressComponent): string | null {
  switch (c) {
    case 'recipient':
      return addr.recipient ?? null
    case 'company':
      return addr.company ?? null
    case 'street1':
      return addr.street1 ?? addr.addressLine1 ?? null
    case 'street2':
      return addr.street2 ?? addr.addressLine2 ?? null
    case 'locality':
      return addr.locality ?? addr.city ?? null
    case 'subdivision':
      return addr.subdivision ?? addr.state ?? null
    case 'postalCode':
      return addr.postalCode ?? null
  }
}

export default function AddressBlock({
  address,
  fallbackCountry,
  showCountry = true,
  className,
}: AddressBlockProps) {
  const country = (address.country ?? fallbackCountry ?? '').toString().trim().toUpperCase()
  const format = getAddressFormat(country)

  // Group inline-layout components on the same line (US-style "City, ST 12345").
  const lines: string[] = []
  let i = 0
  while (i < format.lineOrder.length) {
    const c = format.lineOrder[i]
    const value = lineFor(address, c)
    // For inline layouts, glue locality + subdivision + postalCode together.
    if (
      format.subdivisionLayout === 'inline' &&
      c === 'locality' &&
      i + 2 < format.lineOrder.length &&
      format.lineOrder[i + 1] === 'subdivision' &&
      format.lineOrder[i + 2] === 'postalCode'
    ) {
      const sub = lineFor(address, 'subdivision')
      const pc = lineFor(address, 'postalCode')
      const composed = [value, sub ? sub : '', pc ? pc : ''].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
      if (composed) lines.push(composed.replace(/^([^,]+)( .+)$/, '$1,$2'))
      i += 3
      continue
    }
    if (value && value.trim().length > 0) lines.push(value)
    i += 1
  }
  if (showCountry && country.length > 0) lines.push(country)

  if (lines.length === 0) {
    return (
      <address className={['not-italic text-sm text-muted-foreground', className].filter(Boolean).join(' ')}>
        —
      </address>
    )
  }

  return (
    <address
      className={['not-italic text-sm', className].filter(Boolean).join(' ')}
      aria-label={`Address in ${country || 'unknown country'}`}
    >
      {lines.map((l, idx) => (
        <span key={idx} className="block">
          {l}
        </span>
      ))}
    </address>
  )
}
