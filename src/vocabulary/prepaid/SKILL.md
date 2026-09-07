---
name: prepaid
description: "Use when reasoning about prepaid — Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period"
atomPath: "vocabulary/prepaid"
coordinate: "vocabulary/prepaid · 5/round · d45d63fe"
contentUuid: "ae872ad0-1f60-5995-bfab-197ff455ea11"
diamondUuid: "5e3a0f64-9604-8ca9-8c83-c43d00ac814e"
uuid: "d45d63fe-567a-8c63-bf4e-57dcc3f0ecb3"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "8f635cf7-d954-88f7-a7bf-3ee92fe7d0f9"
  stages:
    - stage: path
      stageUuid: "8b909b3a-bc7f-8339-8155-7a1f50eb7b8a"
    - stage: trinity
      stageUuid: "217db4a7-b2a4-8a61-b0e4-d192f390563c"
    - stage: boundary
      stageUuid: "288e3564-6328-84ed-b049-3bfec01aa2b4"
    - stage: links
      stageUuid: "aedf76c3-1015-82a3-b4e3-8ce0b4a3af1d"
    - stage: horo
      stageUuid: "6517309a-e779-89aa-9f22-94ceb35d03e7"
    - stage: seal
      stageUuid: "04b25a46-3e5e-8561-bcaf-e1ef8f77c3cb"
    - stage: uuid
      stageUuid: "73cc5ee1-9f98-847b-9fa4-b5e9e3a8928e"
version: 2
---
# prepaid

Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period

Composes: [[journal/entries]] · [[deferral]] · [[fixed/assets]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[deferredrevenue]] · [[recognition]].

## Standards
- IAS-1 §27 (accrual basis reporting)
- Not IFRS-specific; implicit in expense recognition

**Law — [[law]]: a prepaid is an asset only until its benefit is consumed — it must be drawn down to expense across the period it serves, never recognized all at once or left to overstate assets.**
