---
name: context
description: "Use when resolving which fiscal device, tenant and operator apply to a sale — the context every downstream fiscal step is computed against, so a wrong context silently fiscalises against the wrong device."
atomPath: "sale/fiscal/context"
coordinate: "sale/fiscal/context · 2/share · eff4570d"
contentUuid: "0358ec39-ebe4-558e-afee-42dc2699cec3"
diamondUuid: "17d38740-22d4-859a-a3a4-a61ca90284ba"
uuid: "eff4570d-f69f-8c37-95f0-7c576016b6de"
horo: 2
typography:
  partition: sale
  bondDegree: 29
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-regime"
  - "ISO-3166-1:2020 country-codes (jurisdiction) · ISO-4217:2015 currency"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "809be99a-a9ed-8e63-bbd6-61ca3c289ff4"
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
      stageUuid: "4e4d44b1-8981-86cd-b126-2a3a9d346a50"
    - stage: seal
      stageUuid: "d9fc8e2b-2c80-8a5c-b019-55a6eb56abe7"
    - stage: uuid
      stageUuid: "614e5d03-0ab0-8df0-8d65-f55192f7c6ec"
version: 2
---
# context

Resolves the fiscal context of a sale: the tenant, the device, and the operator on whose authority the receipt is issued. Everything downstream is computed **against** this, so an unresolved or wrong context does not fail loudly — it fiscalises correctly-shaped documents against the wrong device.

Composes: [[sale]] · [[law]].
