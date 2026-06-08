---
name: fallback
description: "Use when a currency value is missing, blank, or unknown — the blank currency XXX (ISO 4217 §6.5 \\\"No currency\\\") is the identity element of the currency category, so every row, hook, formatter, and conversion resolves cleanly to it instead of crashing."
atomPath: currency/fallback
coordinate: currency/fallback · 4/weave · fc53af55
contentUuid: "d0217f8b-44e8-5c94-b827-01d4e6035a46"
diamondUuid: "ae8d804e-21b7-8acd-bf6c-d17d1e27afe4"
uuid: "fc53af55-fea5-828a-b5ab-4f1c6819df8d"
horo: 4
bonds:
  in:
    - collapse
    - currency
    - law
    - merge
    - science
    - sti
    - unlabelled
  out:
    - collapse
    - law
    - merge
    - science
    - sti
    - unlabelled
typography:
  partition: currency
  bondDegree: 26
  neighbors: []
standards:
  - "Conservation Law 53 self-referential-closure (currency identity element)"
  - "Conservation Law 53 self-referential-closure (currency identity element); never hand-asserted"
  - "EN 16931 §BG-7 currency-code element (XXX accepted)"
  - "EN-16931"
  - "EU-2002/58"
  - "IAS 21 §38 presentation-currency translation"
  - "IFRS 1 §IG7 non-monetary items presentation"
  - "IFRS 7 §22 fair-value hierarchy (each quote's source maps to a level)"
  - ISO 20022 pacs.008.001.10 §Ccy attribute (XXX accepted)
  - "ISO 4217 §6.5 \"No currency\" — code XXX, numeric 999"
  - "ISO-20022"
  - "RFC-8785"
bindings: []
neighbors:
  wikilink:
    - balance
    - currency
    - law
    - uuid
  matrix:
    - collapse
    - law
    - merge
    - science
    - sti
    - unlabelled
  backlinks:
    - collapse
    - law
    - merge
    - science
    - sti
    - unlabelled
signatures:
  computationUuid: "aed5f0af-f48a-892b-935a-f38b5ef1083a"
  stages:
    - stage: path
      stageUuid: "d7b844f9-d0e5-8dc9-bc13-82697a218af1"
    - stage: trinity
      stageUuid: "55ab54a0-4883-80c6-8760-1902ca5b8270"
    - stage: boundary
      stageUuid: "8ba1e105-1098-8c57-a2d5-0bc0ae80490b"
    - stage: links
      stageUuid: "fd20a679-3f0d-87a8-9573-8b08bef6207d"
    - stage: horo
      stageUuid: "14a58a13-b88f-883d-9bca-8bfda68c879c"
    - stage: seal
      stageUuid: "63f7b931-ade8-8883-abd1-1925380669ed"
    - stage: uuid
      stageUuid: "47b2756f-1bb1-8eb2-85ec-ed9c6c242932"
version: 2
---
# currency/fallback — the blank currency as identity element

Every category that admits a "missing" value defines that missing case as a first-class typed entity. For [[currency]], ISO 4217 already did the work — code `XXX` (numeric 999, "No currency"). `resolveCurrency(code)` normalises `null` / `undefined` / `''` / whitespace / unknown to `XXX`, so imports without a currency column don't reject, foreign-key joins don't dangle, and money math degenerates cleanly (XXX has 0 decimals, no symbol). The blank currency is **universal**: `currenciesCompatible('EUR', 'XXX')` is true, and any conversion touching XXX short-circuits to the identity rate (`1.0`, `source: 'identity'`) — `realtimeRate` / `convertMoney` / `aggregateBalancesAcrossCurrencies` never throw; a down provider degrades to identity rather than failing. This is Conservation [[law]] 53 self-referential closure at the value level: when the external source is unreachable, the system answers itself with the identity element.

Matter-twin: `src/currency/fallback/index.ts` (`resolveCurrency` ⊕ `BLANK_CURRENCY` · `currenciesCompatible` · `currencyDecimals` · `realtimeRate` · `convertMoney` · `aggregateBalancesAcrossCurrencies`, each quote carrying a provenance [[uuid]]). Composes [[currency]] · [[law]] · [[uuid]] · [[balance]].

**Law — [[law]]: the blank [[currency]] XXX is the identity element of the currency category — every missing/blank/unknown value resolves to it, it is compatible with every code, and every conversion touching it degrades to the identity rate so the platform never crashes on a missing currency.**

@standard ISO 4217 §6.5 "No currency" — code XXX, numeric 999
@audit Conservation Law 53 self-referential-closure (currency identity element); never hand-asserted
