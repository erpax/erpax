---
name: fallback
description: Use when a currency value is missing, blank, or unknown — the blank currency XXX (ISO 4217 §6.5 "No currency") is the identity element of the currency category, so every row, hook, formatter, and conversion resolves cleanly to it instead of crashing.
---

# currency/fallback — the blank currency as identity element

Every category that admits a "missing" value defines that missing case as a first-class typed entity. For [[currency]], ISO 4217 already did the work — code `XXX` (numeric 999, "No currency"). `resolveCurrency(code)` normalises `null` / `undefined` / `''` / whitespace / unknown to `XXX`, so imports without a currency column don't reject, foreign-key joins don't dangle, and money math degenerates cleanly (XXX has 0 decimals, no symbol). The blank currency is **universal**: `currenciesCompatible('EUR', 'XXX')` is true, and any conversion touching XXX short-circuits to the identity rate (`1.0`, `source: 'identity'`) — `realtimeRate` / `convertMoney` / `aggregateBalancesAcrossCurrencies` never throw; a down provider degrades to identity rather than failing. This is Conservation [[law]] 53 self-referential closure at the value level: when the external source is unreachable, the system answers itself with the identity element.

Matter-twin: `src/currency/fallback/index.ts` (`resolveCurrency` ⊕ `BLANK_CURRENCY` · `currenciesCompatible` · `currencyDecimals` · `realtimeRate` · `convertMoney` · `aggregateBalancesAcrossCurrencies`, each quote carrying a provenance [[uuid]]). Composes [[currency]] · [[law]] · [[uuid]] · [[balance]].

**Law — [[law]]: the blank [[currency]] XXX is the identity element of the currency category — every missing/blank/unknown value resolves to it, it is compatible with every code, and every conversion touching it degrades to the identity rate so the platform never crashes on a missing currency.**

@standard ISO 4217 §6.5 "No currency" — code XXX, numeric 999
@audit Conservation Law 53 self-referential-closure (currency identity element); never hand-asserted
