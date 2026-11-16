import type { Field } from 'payload'

import { countryOptions } from '@/utilities/iso/3166/1'

/**
 * An ISO 3166-1 alpha-2 country: a select over every code (src/utilities/iso/3166/1), one shared
 * generated type (`Iso3166Country`), indexed for filtering by country.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 */
export const countryCodeField = (opts: { name?: string; required?: boolean; description?: string } = {}): Field => ({
  name: opts.name ?? 'countryCode',
  type: 'select',
  interfaceName: 'Iso3166Country',
  options: countryOptions,
  ...(opts.required ? { required: true } : {}),
  index: true,
  admin: { description: opts.description ?? 'ISO 3166-1 alpha-2 country.' },
})
