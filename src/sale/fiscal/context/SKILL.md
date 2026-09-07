---
name: context
description: "Use when resolving which fiscal device, tenant and operator apply to a sale — the context every downstream fiscal step is computed against, so a wrong context silently fiscalises against the wrong device."
atomPath: "sale/fiscal/context"
coordinate: "sale/fiscal/context · 4/weave · 20fac72d"
contentUuid: "cb11b779-0e58-5708-a238-f07fc9dcd7a4"
diamondUuid: "7dea09b1-050e-80df-a5d0-8e64d80309d7"
uuid: "20fac72d-3d90-88d6-8132-21cadf8abe7a"
horo: 4
typography:
  partition: sale
  bondDegree: 29
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-regime"
  - "ISO-3166-1:2020 country-codes (jurisdiction) · ISO-4217:2015 currency"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "04003029-d16a-8115-a5de-9f74e74fb4a8"
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
      stageUuid: "a8e50ec7-0c1c-87b4-9a0e-d02833c15406"
    - stage: seal
      stageUuid: "d9fc8e2b-2c80-8a5c-b019-55a6eb56abe7"
    - stage: uuid
      stageUuid: "e84a8627-8721-880a-a496-a6a100cee246"
version: 2
---
# context

Resolves the fiscal context of a sale: the tenant, the device, and the operator on whose authority the receipt is issued. Everything downstream is computed **against** this, so an unresolved or wrong context does not fail loudly — it fiscalises correctly-shaped documents against the wrong device.

Composes: [[sale]] · [[law]].
