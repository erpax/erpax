---
name: deduction
description: "Use when reasoning about deduction — Use for tax-deductible expenses and deduction timing — permanent (non-deductible) vs temporary (deductible in different period) per IAS-12; central to tax provision and deferred-ta"
atomPath: deduction
coordinate: deduction · 5/round · 8ce749ad
contentUuid: "d97ea28b-5914-53e0-822d-60dd1e204eec"
diamondUuid: "cec4f8d7-85d7-8a79-9ad9-75b458266dae"
uuid: "8ce749ad-e643-80e5-b1c7-ae25b9f1fa63"
horo: 5
bonds:
  in:
    - accrual
    - calculations
    - entries
    - items
    - law
    - standard
    - tax
    - taxexempt
    - variance
  out:
    - accrual
    - calculations
    - entries
    - items
    - law
    - standard
    - tax
    - taxexempt
    - variance
typography:
  partition: deduction
  bondDegree: 27
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accrual
    - calculations
    - entries
    - items
    - law
    - standard
    - tax
    - taxexempt
    - variance
  matrix:
    - accrual
    - calculations
    - entries
    - items
    - law
    - standard
    - tax
    - taxexempt
    - variance
  backlinks:
    - accrual
    - calculations
    - entries
    - items
    - law
    - standard
    - tax
    - taxexempt
    - variance
signatures:
  computationUuid: "1173692e-b7c4-88af-bdbd-91ef40003f55"
  stages:
    - stage: path
      stageUuid: "8a9a8c60-4cd4-8146-abde-eeeefff0c13e"
    - stage: trinity
      stageUuid: "60f14a70-dae0-8ec0-8e2a-9eda99492d2e"
    - stage: boundary
      stageUuid: "c1517b61-58ab-8c74-aeb3-3e7a7b1aef3f"
    - stage: links
      stageUuid: "97fbd29d-1e47-8de5-9982-bb01063214b1"
    - stage: horo
      stageUuid: "94e3ee87-0510-8782-b2ad-25582a8d4629"
    - stage: seal
      stageUuid: "ebdd9396-92e4-8ab2-8617-d56e7beba300"
    - stage: uuid
      stageUuid: "13c6c069-f94e-8813-850c-aaf7aa386d1b"
version: 2
---
# deduction

Use for tax-deductible expenses and deduction timing — permanent (non-deductible) vs temporary (deductible in different period) per IAS-12; central to tax provision and deferred-tax calculation

Composes: [[tax]] · [[tax/jurisdictions/deferred/tax/items]] · [[journal/entries]] · [[gl/accounts/tax/calculations]] · [[variance]] · [[accrual]] · [[standard]] · [[taxexempt]].

**Law — [[law]]: a deduction is a tax-deductible expense classified by timing — permanent (non-deductible) vs temporary (deductible in a different period per IAS-12) — the split that drives the deferred-[[tax]] calculation.**

## Standards
- IAS-12 §15 (deductible temporary difference)
- IAS-12 §65-97 (deferred tax asset/liability)
- FASB ASC 740 (income taxes)
