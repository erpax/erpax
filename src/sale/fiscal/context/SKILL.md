---
name: context
description: "Use when resolving which fiscal device, tenant and operator apply to a sale — the context every downstream fiscal step is computed against, so a wrong context silently fiscalises against the wrong device."
atomPath: "sale/fiscal/context"
coordinate: "sale/fiscal/context · 5/round · 76c5b9b8"
contentUuid: "f6b97f3a-aa31-53e5-a1b6-6628f3cf90b0"
diamondUuid: "c63d462e-8169-88d7-a655-cba83c9919e1"
uuid: "76c5b9b8-9a1c-8068-b185-639e6796df96"
horo: 5
typography:
  partition: sale
  bondDegree: 29
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-regime"
  - "ISO-3166-1:2020 country-codes (jurisdiction) · ISO-4217:2015 currency"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "1dbc64c6-6f1e-8637-9e63-1a94ad13fd0e"
  stages:
    - stage: path
      stageUuid: "e6bd166c-1fe6-82ed-b676-4121bd1d4c59"
    - stage: trinity
      stageUuid: "f19e0f7c-31f3-8f39-94f6-f485596c977a"
    - stage: boundary
      stageUuid: "8229047e-a5f4-80e6-b1ae-26c13c7020d3"
    - stage: links
      stageUuid: "d05528e5-2827-8150-99a0-8effd71d3493"
    - stage: horo
      stageUuid: "5b26b7ce-1fd1-8744-84eb-a9f1fa64f3f4"
    - stage: seal
      stageUuid: "d9fc8e2b-2c80-8a5c-b019-55a6eb56abe7"
    - stage: uuid
      stageUuid: "f82fcf4c-5fd5-860e-b383-8427fbfa2d9d"
version: 2
---
# context

Resolves the fiscal context of a sale: the tenant, the device, and the operator on whose authority the receipt is issued. Everything downstream is computed **against** this, so an unresolved or wrong context does not fail loudly — it fiscalises correctly-shaped documents against the wrong device.

Composes: [[sale]] · [[law]].
