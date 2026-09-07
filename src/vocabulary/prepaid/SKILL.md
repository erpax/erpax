---
name: prepaid
description: "Use when reasoning about prepaid — Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period"
atomPath: "vocabulary/prepaid"
coordinate: "vocabulary/prepaid · 2/share · c8eb094f"
contentUuid: "1434d71d-05fd-5d26-91da-27286fd26ef5"
diamondUuid: "01925762-d4db-8596-b157-835b2d7c501b"
uuid: "c8eb094f-5732-8fc1-bdd2-f681a2354157"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "fb509a1b-90c2-8ae0-a393-7b60eb6a821e"
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
      stageUuid: "8ab8a503-ee92-803a-ae66-ee278763afca"
    - stage: seal
      stageUuid: "04b25a46-3e5e-8561-bcaf-e1ef8f77c3cb"
    - stage: uuid
      stageUuid: "f5a0c062-490f-8d12-bf0b-e35ba9c6d0e6"
version: 2
---
# prepaid

Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period

Composes: [[journal/entries]] · [[deferral]] · [[fixed/assets]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[deferredrevenue]] · [[recognition]].

## Standards
- IAS-1 §27 (accrual basis reporting)
- Not IFRS-specific; implicit in expense recognition

**Law — [[law]]: a prepaid is an asset only until its benefit is consumed — it must be drawn down to expense across the period it serves, never recognized all at once or left to overstate assets.**
