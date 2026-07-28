---
name: reconciliation
description: "Use when closing a multi-currency period — verify each currency's closed revenues equal its closed expenses within tolerance, revalue non-reporting currencies at the period-end rate for unrealized gain/loss, and fold it all into one reporting currency with a chain-linked audit leaf."
atomPath: "currency/reconciliation"
coordinate: "currency/reconciliation · 2/share · b3de6dda"
contentUuid: "315f9169-ce2b-5ff6-96e9-82ebe3228b9e"
diamondUuid: "ff77a6c5-91d8-823a-9149-be73152c7831"
uuid: "b3de6dda-2f4c-8eee-b20d-a7c3c76e0cce"
horo: 2
bonds:
  in:
    - balance
    - currency
    - law
    - proof
    - uuid
  out:
    - balance
    - currency
    - law
    - proof
    - uuid
typography:
  partition: currency
  bondDegree: 25
  neighbors: []
standards:
  - "IAS 21 §38 presentation-currency translation · IFRS 9 FX gains/losses · ISO 4217"
  - "IFRS-21:2023 (translation of foreign operations)"
  - "IFRS-21:2023 (translation of foreign operations)`"
  - "IFRS-9"
  - "IFRS-9:2023 (foreign exchange gains/losses)"
  - "IFRS-9:2023 (foreign exchange gains/losses)`"
  - "ISO-4217:2023 (currency codes, decimal places)"
  - "ISO-4217:2023 (currency codes, decimal places)`"
  - "SAF-T"
  - "SAF-T:3.0.2 (multi-currency period coding)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - balance
    - currency
    - law
    - proof
    - uuid
  matrix:
    - balance
    - currency
    - law
    - proof
    - uuid
  backlinks:
    - balance
    - currency
    - law
    - proof
    - uuid
signatures:
  computationUuid: "5f2e5897-824f-8da6-8947-3e4367454db7"
  stages:
    - stage: path
      stageUuid: "624214ed-b26b-84f2-815c-83c436116027"
    - stage: trinity
      stageUuid: "3d916cef-7860-850a-a036-2563eaddbc4f"
    - stage: boundary
      stageUuid: "4b0ef12b-3a8b-89f7-8d97-4ca0f944c766"
    - stage: links
      stageUuid: "4dd476e7-4495-8679-a8ee-34c3a2cba3a9"
    - stage: horo
      stageUuid: "ff8d879b-5ded-8f09-94d6-bd0a41cc7cd4"
    - stage: seal
      stageUuid: "ccc10216-324f-8fc0-a4f2-25e47449a463"
    - stage: uuid
      stageUuid: "d87b74e7-9d24-812c-a65c-b9ab332067cc"
version: 2
---
# currency/reconciliation — multi-currency period closing

Period closing across currencies is one balanced fold. `validateClosingBalanceByCurrency` checks, per [[currency]], that closed revenues equal closed expenses within a rounding tolerance (default `0.01`) — the difference is the imbalance, `isBalanced` the verdict. `computeUnrealizedExchangeGainLoss` revalues a net amount at the period-end rate against its historical rate; the gap is the unrealized FX gain/loss (IAS 21 §38 / IFRS 9). `reconcileMultiCurrency` composes the two: it validates every currency, skips the reporting currency (no revaluation of self), records a missing-rate error rather than crashing, sums the unrealized lines, and seals the result with a `chainLeafUuid` (Conservation [[law]] 60) so the close is replay-verifiable. Every method is pure — no mutation, JSON-serializable in and out.

Matter-twin: `src/currency/reconciliation/index.ts` (`CurrencyReconciliation` static class — `validateClosingBalanceByCurrency` ⊕ `computeUnrealizedExchangeGainLoss` · `reconcileMultiCurrency` · `validateCurrencyCode` · `computeChainLeaf`). Composes [[currency]] · [[law]] · [[balance]] · [[uuid]] · [[proof]].

**Law — [[law]]: a multi-[[currency]] close balances per currency within tolerance, revalues every non-reporting currency at the period-end rate for unrealized gain/loss, and folds into the reporting currency under a chain-linked [[uuid]] leaf (Law 60) — pure, missing rates recorded as errors, never thrown.**

@standard IAS 21 §38 presentation-currency translation · IFRS 9 FX gains/losses · ISO 4217
@audit Conservation Law 60 chain-leaf binding; never hand-asserted

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2023 (currency codes, decimal places)`
- `@standard IFRS-21:2023 (translation of foreign operations)`
- `@standard IFRS-9:2023 (foreign exchange gains/losses)`
