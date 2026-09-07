---
name: reconciliation
description: "Use when closing a multi-currency period — verify each currency's closed revenues equal its closed expenses within tolerance, revalue non-reporting currencies at the period-end rate for unrealized gain/loss, and fold it all into one reporting currency with a chain-linked audit leaf."
atomPath: "currency/reconciliation"
coordinate: "currency/reconciliation · 7/descent · bf13ef48"
contentUuid: "2cc2fee7-d0c5-5581-b1cb-67a26c52d113"
diamondUuid: "b7adb612-a8c7-8eb6-8b41-c9582418fc87"
uuid: "bf13ef48-31c8-8b69-a4d9-aa351cf43e8c"
horo: 7
typography:
  partition: currency
  bondDegree: 35
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
signatures:
  computationUuid: "e99322c2-00cc-8136-a07b-996d4c884556"
  stages:
    - stage: path
      stageUuid: "624214ed-b26b-84f2-815c-83c436116027"
    - stage: trinity
      stageUuid: "3d916cef-7860-850a-a036-2563eaddbc4f"
    - stage: boundary
      stageUuid: "547973ae-267a-82e3-bcdf-9e0010115d78"
    - stage: links
      stageUuid: "1ca7ac81-3366-85de-aea3-dc234e0f5336"
    - stage: horo
      stageUuid: "cdf3c638-cc58-8ce9-8bbf-171cc4abc158"
    - stage: seal
      stageUuid: "ccc10216-324f-8fc0-a4f2-25e47449a463"
    - stage: uuid
      stageUuid: "47e01222-d17c-8c5a-ba30-e6e6435d4fce"
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

Composes: [[currency]].
