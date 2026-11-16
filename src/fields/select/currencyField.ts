import type { Field } from 'payload'

import { DEFAULT_CURRENCY } from '@/utilities/config/regional/defaults'
import { currencyOptions } from '@/utilities/iso/4217'

/**
 * An ISO 4217 currency: a select over every code (src/utilities/iso/4217), one shared generated type
 * (`Iso4217Currency`). Pass a `name` for FX pairs (`fromCurrency`, `toCurrency`); it defaults to
 * `currency`, and its default value is the house currency. `allowBlank: true` leaves the field
 * optional for rows where no currency applies yet (drafts, imports); XXX, ISO 4217's "no currency",
 * is always one of the options.
 *
 * @standard ISO-4217:2015 currency-codes
 */
export const currencyField = (
  defaultValueOrOptions: string | { name?: string; defaultValue?: string; required?: boolean; allowBlank?: boolean } = DEFAULT_CURRENCY,
): Field => {
  const opts = typeof defaultValueOrOptions === 'string' ? { defaultValue: defaultValueOrOptions } : defaultValueOrOptions
  return {
    name: opts.name ?? 'currency',
    type: 'select',
    interfaceName: 'Iso4217Currency',
    options: currencyOptions,
    defaultValue: opts.defaultValue ?? DEFAULT_CURRENCY,
    ...(opts.required && opts.allowBlank !== true ? { required: true } : {}),
    admin: { description: 'ISO 4217 currency.' },
  }
}
