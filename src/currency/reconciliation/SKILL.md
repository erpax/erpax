---
name: reconciliation
description: "Use when closing a multi-currency period — verify each currency's closed revenues equal its closed expenses within tolerance, revalue non-reporting currencies at the period-end rate for unrealized gain/loss, and fold it all into one reporting currency with a chain-linked audit leaf."
atomPath: "currency/reconciliation"
coordinate: "currency/reconciliation · 4/weave · 3e9c9e9c"
contentUuid: "80007e47-bf06-550f-8ead-a5e3428c8533"
diamondUuid: "e7545c41-b4dc-877d-8854-835482272e65"
uuid: "3e9c9e9c-2b57-8e2f-bda5-6f985fc1defa"
horo: 4
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
  computationUuid: "3fe0ca57-f75e-801d-8daa-9e1efa999ba0"
  stages:
    - stage: path
      stageUuid: "624214ed-b26b-84f2-815c-83c436116027"
    - stage: trinity
      stageUuid: "3d916cef-7860-850a-a036-2563eaddbc4f"
    - stage: boundary
      stageUuid: "547973ae-267a-82e3-bcdf-9e0010115d78"
    - stage: links
      stageUuid: "82e027a9-444f-8fd1-a986-6bff737bced8"
    - stage: horo
      stageUuid: "fd79b549-59fe-8c39-80c5-b4be6ee9eb0b"
    - stage: seal
      stageUuid: "ccc10216-324f-8fc0-a4f2-25e47449a463"
    - stage: uuid
      stageUuid: "b1e272d2-68f6-8d77-b3fb-4c04f0db7a7f"
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
