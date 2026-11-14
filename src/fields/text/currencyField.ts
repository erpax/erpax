import type { Field } from 'payload'
import { DEFAULT_CURRENCY as CANON_DEFAULT_CURRENCY, isIso4217Currency } from '@/utilities/config/regional/defaults'

/**
 * Currency select field. Pass a custom `name` for FX-pair fields like
 * `fromCurrency` / `toCurrency`; defaults to `currency` for the typical
 * single-currency case. Default value is the canonical `DEFAULT_CURRENCY`
 * (EUR by house default, env-overridable via `ERPAX_DEFAULT_CURRENCY`).
 *
 * Slice LLLLLLLLL (2026-05-11) — `allowBlank: true` adds ISO 4217 XXX
 * (No currency) to the option list AND forces `required: false`. The
 * field's runtime fallback is `resolveCurrency()` from
 * `@/services/currency-fallback` — null/empty inputs round-trip to XXX
 * rather than throwing. Use `allowBlank: true` on collections where a
 * provisional or non-monetary row is legitimate (drafts, imports,
 * non-monetary lines).
 */
export const currencyField = (
  defaultValueOrOptions: string | { name?: string; defaultValue?: string; required?: boolean; allowBlank?: boolean } = CANON_DEFAULT_CURRENCY,
): Field => {
  const opts =
    typeof defaultValueOrOptions === 'string'
      ? { defaultValue: defaultValueOrOptions }
      : defaultValueOrOptions;
  // ISO 4217 §6.1 — ANY valid currency code is accepted (the `currency` skill),
  // not a closed list; SUPPORTED_CURRENCIES are admin suggestions, not the bound.
  // allowBlank permits the XXX identity element (§6.5 "no currency"); required off then.
  const includeBlank = opts.allowBlank === true;
  return {
    name: opts.name ?? 'currency',
    type: 'text',
    defaultValue: opts.defaultValue ?? CANON_DEFAULT_CURRENCY,
    ...(opts.required && !includeBlank ? { required: true } : {}),
    validate: (value: unknown) => {
      if (value === undefined || value === null || value === '') return true;
      if (includeBlank && value === 'XXX') return true;
      return isIso4217Currency(value) ? true : 'Must be a valid ISO 4217 currency code';
    },
    admin: { description: 'ISO 4217 currency code — any valid code accepted (e.g. EUR, USD, BGN).' },
  };
};
