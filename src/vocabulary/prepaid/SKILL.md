---
name: prepaid
description: "Use when reasoning about prepaid — Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period"
atomPath: "vocabulary/prepaid"
coordinate: "vocabulary/prepaid · 8/crest · 5bae38d8"
contentUuid: "8857bd78-6b4d-5e38-b00f-c2b3ab20bab3"
diamondUuid: "81f17949-9a10-8c60-98e4-c0bd917f90b1"
uuid: "5bae38d8-a934-8710-b0fb-77f358c079a0"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "fc5cc4d7-9915-8b66-9938-b55ec89c9fa9"
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
      stageUuid: "c1f1a6dd-2fc3-8045-bed7-d9f7e2e5386b"
    - stage: seal
      stageUuid: "04b25a46-3e5e-8561-bcaf-e1ef8f77c3cb"
    - stage: uuid
      stageUuid: "3619fe6a-0af1-8d8f-abc6-1c66427ff635"
version: 2
---
# prepaid

Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period

Composes: [[journal/entries]] · [[deferral]] · [[fixed/assets]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[deferredrevenue]] · [[recognition]].

## Standards
- IAS-1 §27 (accrual basis reporting)
- Not IFRS-specific; implicit in expense recognition

**Law — [[law]]: a prepaid is an asset only until its benefit is consumed — it must be drawn down to expense across the period it serves, never recognized all at once or left to overstate assets.**
