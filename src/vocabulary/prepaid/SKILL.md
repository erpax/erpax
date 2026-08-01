---
name: prepaid
description: "Use when reasoning about prepaid — Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period"
atomPath: "vocabulary/prepaid"
coordinate: "vocabulary/prepaid · 1/base · b8a14db4"
contentUuid: "0348f386-1854-5760-8532-06b647317a77"
diamondUuid: "5d039275-3ccd-812b-bc93-f271adb8ceca"
uuid: "b8a14db4-a1d4-829c-afda-a79649f77633"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "1b950f5b-7f74-8e65-9e2e-ca4b6fa4ebc5"
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
      stageUuid: "781b771c-f752-8516-80e7-db6413bca785"
    - stage: seal
      stageUuid: "40ce7841-07e4-83c0-ad26-0b3ade21fa82"
    - stage: uuid
      stageUuid: "13ec94eb-3375-80c5-8ef7-473f9798bd92"
version: 2
---
# prepaid

Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period

Composes: [[journal/entries]] · [[deferral]] · [[fixed/assets]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[deferredrevenue]] · [[recognition]].

## Standards
- IAS-1 §27 (accrual basis reporting)
- Not IFRS-specific; implicit in expense recognition

**Law — [[law]]: a prepaid is an asset only until its benefit is consumed — it must be drawn down to expense across the period it serves, never recognized all at once or left to overstate assets.**
