---
name: prepaid
description: "Use when reasoning about prepaid — Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period"
atomPath: "vocabulary/prepaid"
coordinate: "vocabulary/prepaid · 4/weave · 9cdec26b"
contentUuid: "9a84d5cf-12dd-508e-a289-bdda4624464c"
diamondUuid: "d96082e7-68ab-8916-b7f0-b6f8da96a7e9"
uuid: "9cdec26b-8a95-8292-9c99-9034a1aab3eb"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "17bd736b-00e9-8750-93c0-86588a76119d"
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
      stageUuid: "7e3f8abf-a53c-8403-8cb5-72a19226a61a"
    - stage: seal
      stageUuid: "04b25a46-3e5e-8561-bcaf-e1ef8f77c3cb"
    - stage: uuid
      stageUuid: "69a99ffd-6960-8007-a250-cba511bb5ccf"
version: 2
---
# prepaid

Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period

Composes: [[journal/entries]] · [[deferral]] · [[fixed/assets]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[deferredrevenue]] · [[recognition]].

## Standards
- IAS-1 §27 (accrual basis reporting)
- Not IFRS-specific; implicit in expense recognition

**Law — [[law]]: a prepaid is an asset only until its benefit is consumed — it must be drawn down to expense across the period it serves, never recognized all at once or left to overstate assets.**
