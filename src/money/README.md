# `_money` — Money value type

A composite, not a single standard. Combines:

- **ISO 4217** — currency code
- **Integer-cents convention** — store smallest-unit integer (`amountCents`),
  never floating point. Preserves audit trails and avoids `0.1 + 0.2` errors.
- **IFRS IAS 21 / ASC 830** — when crossing currencies, conversion happens at a
  declared rate sourced from `CurrencyRates`; we don't blend currencies in a
  single `Money`.

## Used by

Invoice line totals, payments, journal-entry amounts, FX-conversion services.

## Out of scope

- Currencies with non-100 minor-unit ratios (BHD, JOD, KWD, OMR — three
  decimals; CLF, IQD — two and three; ISK — zero). Today we still store
  `amountCents` and document the ratio at the calling site. A future
  refactor may introduce per-currency-minor-unit awareness via ISO 4217 §6
  numeric-code metadata.
