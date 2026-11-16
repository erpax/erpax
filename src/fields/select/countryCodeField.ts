import type { Field } from 'payload'

import { countryOptions } from '@/utilities/iso/3166/1'

/** The core of every ISO 3166-1 country field: spread it where a field keeps its own name and settings. */
export const iso3166Select = { type: 'select' as const, interfaceName: 'Iso3166Country', options: countryOptions }

/**
 * An ISO 3166-1 alpha-2 country: a select over every code (src/utilities/iso/3166/1), one shared
 * generated type (`Iso3166Country`), indexed for filtering by country.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 */
export const countryCodeField = (opts: { name?: string; required?: boolean; description?: string } = {}): Field => ({
  name: opts.name ?? 'countryCode',
  ...iso3166Select,
  ...(opts.required ? { required: true } : {}),
  index: true,
  admin: { description: opts.description ?? 'ISO 3166-1 alpha-2 country.' },
})
