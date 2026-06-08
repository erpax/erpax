---
name: reconciliation
description: "Use when closing a multi-currency period — verify each currency's closed revenues equal its closed expenses within tolerance, revalue non-reporting currencies at the period-end rate for unrealized gain/loss, and fold it all into one reporting currency with a chain-linked audit leaf."
atomPath: currency/reconciliation
coordinate: currency/reconciliation · 7/descent · f42ca11c
contentUuid: "a3c1cd39-7e3e-5bb5-83bd-59cf064a83a0"
diamondUuid: "cab8219b-e9ce-8643-9a48-fbd646fea1c0"
uuid: "f42ca11c-d7cf-8c4f-ac60-e3d180dc20e2"
horo: 7
bonds:
  in:
    - accounting
    - balance
    - currency
    - law
    - reconciliations
  out:
    - accounting
    - balance
    - law
    - reconciliations
typography:
  partition: currency
  bondDegree: 17
  neighbors: []
standards:
  - "Conservation Law 60 chain-leaf binding; never hand-asserted"
  - "IAS 21 §38 presentation-currency translation · IFRS 9 FX gains/losses · ISO 4217"
  - "IFRS-21:2023 (translation of foreign operations)"
  - "IFRS-9"
  - "IFRS-9:2023 (foreign exchange gains/losses)"
  - "ISO-4217:2023 (currency codes, decimal places)"
  - "SAF-T"
  - "SAF-T:3.0.2 (multi-currency period coding)"
bindings: []
neighbors:
  wikilink:
    - balance
    - currency
    - law
    - proof
    - uuid
  matrix:
    - accounting
    - balance
    - law
    - reconciliations
  backlinks:
    - accounting
    - balance
    - law
    - reconciliations
signatures:
  computationUuid: "c6d5611f-a5bc-8137-b7d3-9d353d86e60d"
  stages:
    - stage: path
      stageUuid: "624214ed-b26b-84f2-815c-83c436116027"
    - stage: trinity
      stageUuid: "3d916cef-7860-850a-a036-2563eaddbc4f"
    - stage: boundary
      stageUuid: "ae156718-540c-88cf-8dfb-f4dc0f63269a"
    - stage: links
      stageUuid: "4dd476e7-4495-8679-a8ee-34c3a2cba3a9"
    - stage: horo
      stageUuid: "30bfc530-aa58-8fea-b8ff-43cb604eb97f"
    - stage: seal
      stageUuid: "03be08b4-c7b9-81d2-a912-6676c8db4a55"
    - stage: uuid
      stageUuid: "2d2076f7-fa43-83b8-be1c-a8042d1a1f41"
version: 2
---
# currency/reconciliation — multi-currency period closing

Period closing across currencies is one balanced fold. `validateClosingBalanceByCurrency` checks, per [[currency]], that closed revenues equal closed expenses within a rounding tolerance (default `0.01`) — the difference is the imbalance, `isBalanced` the verdict. `computeUnrealizedExchangeGainLoss` revalues a net amount at the period-end rate against its historical rate; the gap is the unrealized FX gain/loss (IAS 21 §38 / IFRS 9). `reconcileMultiCurrency` composes the two: it validates every currency, skips the reporting currency (no revaluation of self), records a missing-rate error rather than crashing, sums the unrealized lines, and seals the result with a `chainLeafUuid` (Conservation [[law]] 60) so the close is replay-verifiable. Every method is pure — no mutation, JSON-serializable in and out.

Matter-twin: `src/currency/reconciliation/index.ts` (`CurrencyReconciliation` static class — `validateClosingBalanceByCurrency` ⊕ `computeUnrealizedExchangeGainLoss` · `reconcileMultiCurrency` · `validateCurrencyCode` · `computeChainLeaf`). Composes [[currency]] · [[law]] · [[balance]] · [[uuid]] · [[proof]].

**Law — [[law]]: a multi-[[currency]] close balances per currency within tolerance, revalues every non-reporting currency at the period-end rate for unrealized gain/loss, and folds into the reporting currency under a chain-linked [[uuid]] leaf (Law 60) — pure, missing rates recorded as errors, never thrown.**

@standard IAS 21 §38 presentation-currency translation · IFRS 9 FX gains/losses · ISO 4217
@audit Conservation Law 60 chain-leaf binding; never hand-asserted
