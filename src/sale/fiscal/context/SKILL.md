---
name: context
description: "Use when resolving which fiscal device, tenant and operator apply to a sale — the context every downstream fiscal step is computed against, so a wrong context silently fiscalises against the wrong device."
atomPath: "sale/fiscal/context"
coordinate: "sale/fiscal/context · 8/crest · 997b76c0"
contentUuid: "68600f94-21b5-5672-9d96-e4b33639af27"
diamondUuid: "5691cd37-aaf3-83c8-acee-682707e78f6a"
uuid: "997b76c0-9eab-8213-9023-f3c8c8580d1a"
horo: 8
typography:
  partition: sale
  bondDegree: 29
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-regime"
  - "ISO-3166-1:2020 country-codes (jurisdiction) · ISO-4217:2015 currency"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "11344881-d63f-8f46-8d5b-4ddcc3abd55e"
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
      stageUuid: "598836a9-4a72-8d35-900f-b752bb74e5ca"
    - stage: seal
      stageUuid: "d9fc8e2b-2c80-8a5c-b019-55a6eb56abe7"
    - stage: uuid
      stageUuid: "130e80c6-5c98-8343-a37d-bcc5d5e1eaa2"
version: 2
---
# context

Resolves the fiscal context of a sale: the tenant, the device, and the operator on whose authority the receipt is issued. Everything downstream is computed **against** this, so an unresolved or wrong context does not fail loudly — it fiscalises correctly-shaped documents against the wrong device.

Composes: [[sale]] · [[law]].
