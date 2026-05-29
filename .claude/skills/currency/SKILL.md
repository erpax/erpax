---
name: currency
description: Use when a value carries money — amount + ISO-4217 currency, exchange rates, rounding, multi-currency ledgers/totals. The CurrencyConcern/AmountConcern field-factory; money is amount+currency, never a currency-baked field name.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# currency — money is amount + ISO-4217 code (never baked into the name)

`currency` is the money field-factory atom (Rails `CurrencyConcern`/`AmountConcern`, Money gem `monetize`), sequence position **1** ([[fields]]). Law: a monetary value is a **minor-unit integer `amount` + an ISO-4217 `currency`** — NEVER a currency-baked name (`monthlyUSD` → `price` + `currency`). Multi-currency everywhere: each amount keeps its own currency; an `exchangeRate` converts to the entity's functional currency *at a point in time* ([[versions]]). A blank currency routes to its identity element **`XXX`** ([[identity]] categorical currency — never an ad-hoc `?? 'EUR'` default). Rates fall back along the jurisdiction cascade **БНБ → ECB** (matter = the rate-fetch via [[hooks]]/[[jobs]]; antimatter = the cascade fallback).

Composes: [[accounting]] (multi-currency journals), [[commerce]] (totals), [[identity]] (`XXX` element + rates), [[fields]], [[bindings]] (rate-sync job).

## Common mistakes
- Currency baked into a field name (`amountUSD`) — split into `amount` + `currency`.
- Float money — store minor-unit integers.
- An ad-hoc default currency (`?? 'EUR'`) — route blanks to `XXX` (the identity element).
