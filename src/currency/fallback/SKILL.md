---
name: fallback
description: "Use when a currency value is missing, blank, or unknown — the blank currency XXX (ISO 4217 §6.5 \"No currency\") is the identity element of the currency category, so every row, hook, formatter, and conversion resolves cleanly to it instead of crashing."
atomPath: "currency/fallback"
coordinate: "currency/fallback · 2/share · f941eb83"
contentUuid: "d45eedd3-b213-5dc2-bb72-12d14bee07f6"
diamondUuid: "a72cb100-e2f2-8ca1-9f11-4a73944a3993"
uuid: "f941eb83-7a20-84a1-9276-326ac8af175a"
horo: 2
typography:
  partition: currency
  bondDegree: 24
standards:
  - "EN 16931 §BG-7 currency-code element (XXX accepted)"
  - "EN-16931"
  - "IAS 21 §38 presentation-currency translation"
  - "IFRS 1 §IG7 non-monetary items presentation"
  - "IFRS 7 §22 fair-value hierarchy (each quote's source maps to a level)"
  - ISO 20022 pacs.008.001.10 §Ccy attribute (XXX accepted)
  - "ISO 4217 §6.5 \"No currency\" — code XXX, numeric 999"
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "7bfa7817-391e-81c8-8cb8-5661952c602b"
  stages:
    - stage: path
      stageUuid: "d7b844f9-d0e5-8dc9-bc13-82697a218af1"
    - stage: trinity
      stageUuid: "55ab54a0-4883-80c6-8760-1902ca5b8270"
    - stage: boundary
      stageUuid: "27befdcd-f439-8380-875c-e4323ea1b017"
    - stage: links
      stageUuid: "fd20a679-3f0d-87a8-9573-8b08bef6207d"
    - stage: horo
      stageUuid: "8be4cb02-84ad-82ba-85f0-1c1a37380a1e"
    - stage: seal
      stageUuid: "71165a1d-9b0b-819b-8287-0db243548164"
    - stage: uuid
      stageUuid: "8985f420-a46e-868c-99c1-b3c2c313eca5"
version: 2
---
# currency/fallback — the blank currency as identity element

Every category that admits a "missing" value defines that missing case as a first-class typed entity. For [[currency]], ISO 4217 already did the work — code `XXX` (numeric 999, "No currency"). `resolveCurrency(code)` normalises `null` / `undefined` / `''` / whitespace / unknown to `XXX`, so imports without a currency column don't reject, foreign-key joins don't dangle, and money math degenerates cleanly (XXX has 0 decimals, no symbol). The blank currency is **universal**: `currenciesCompatible('EUR', 'XXX')` is true, and any conversion touching XXX short-circuits to the identity rate (`1.0`, `source: 'identity'`) — `realtimeRate` / `convertMoney` / `aggregateBalancesAcrossCurrencies` never throw; a down provider degrades to identity rather than failing. This is Conservation [[law]] 53 self-referential closure at the value level: when the external source is unreachable, the system answers itself with the identity element.

Matter-twin: `src/currency/fallback/index.ts` (`resolveCurrency` ⊕ `BLANK_CURRENCY` · `currenciesCompatible` · `currencyDecimals` · `realtimeRate` · `convertMoney` · `aggregateBalancesAcrossCurrencies`, each quote carrying a provenance [[uuid]]). Composes [[currency]] · [[law]] · [[uuid]] · [[balance]].

**Law — [[law]]: the blank [[currency]] XXX is the identity element of the currency category — every missing/blank/unknown value resolves to it, it is compatible with every code, and every conversion touching it degrades to the identity rate so the platform never crashes on a missing currency.**

@standard ISO 4217 §6.5 "No currency" — code XXX, numeric 999
@audit Conservation Law 53 self-referential-closure (currency identity element); never hand-asserted
