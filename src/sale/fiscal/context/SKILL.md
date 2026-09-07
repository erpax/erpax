---
name: context
description: "Use when resolving which fiscal device, tenant and operator apply to a sale — the context every downstream fiscal step is computed against, so a wrong context silently fiscalises against the wrong device."
atomPath: "sale/fiscal/context"
coordinate: "sale/fiscal/context · 2/share · 4c8cb82b"
contentUuid: "00e154a4-8fa3-5804-a066-fbafa5208ad0"
diamondUuid: "7b58c45d-439c-80cd-a1f3-1991994dcf17"
uuid: "4c8cb82b-874d-8e24-a9b8-8c19b59a0493"
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
  computationUuid: "6add6785-7df0-837f-9f17-e5c1d092612a"
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
      stageUuid: "ada0c770-7f60-8494-b4b9-d1fe4e5c8c10"
    - stage: seal
      stageUuid: "d9fc8e2b-2c80-8a5c-b019-55a6eb56abe7"
    - stage: uuid
      stageUuid: "2e4e3acf-7bf1-8e18-82ee-19c8de942bee"
version: 2
---
# context

Resolves the fiscal context of a sale: the tenant, the device, and the operator on whose authority the receipt is issued. Everything downstream is computed **against** this, so an unresolved or wrong context does not fail loudly — it fiscalises correctly-shaped documents against the wrong device.

Composes: [[sale]] · [[law]].
