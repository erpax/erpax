---
name: price
description: "Use when reasoning about price — The ecommerce plugin generates one column per supported currency. resolves the right one for the requested currency and renders it, so application code never names and never…"
atomPath: "product/price"
coordinate: "product/price · 1/base · d90994af"
contentUuid: "4a35fff2-f335-55ff-8bd0-8a66ac630073"
diamondUuid: "14ee600d-820a-8754-a435-f8bd6c01ef3b"
uuid: "d90994af-2256-8315-8a23-29b7d76bd44e"
horo: 1
typography:
  partition: product
  bondDegree: 57
standards:
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-4217:2015 currency-codes"
  - "US-GAAP ASC-830 foreign-currency-matters"
bindings: []
signatures:
  computationUuid: "6fa67425-33c4-88cd-b144-b7afc2adcaee"
  stages:
    - stage: path
      stageUuid: "dabfc230-83e8-8f5c-9007-68050a5ac9a3"
    - stage: trinity
      stageUuid: "4a0c7113-e936-871c-bd19-5655555e1484"
    - stage: boundary
      stageUuid: "0bc5f087-6f4d-8811-83c8-b49f1aaaa7c2"
    - stage: links
      stageUuid: "e62843ff-79f6-85b1-b98a-ebdc341b818c"
    - stage: horo
      stageUuid: "669b89ab-adf5-8a0f-b13a-3b14382b0a1e"
    - stage: seal
      stageUuid: "6fd6c77e-fbf9-8d29-8a8d-5ec62fec0335"
    - stage: uuid
      stageUuid: "c03ecbd5-22cc-837a-861d-df0e7c77ba7d"
version: 2
---
# product/price — a price is asked for in a currency, never read from a hardcoded column

The ecommerce plugin generates one column per supported currency. `getProductPrice` resolves the
right one for the requested currency and `formatProductPrice` renders it, so application code
never names `priceInEUR` and never breaks when a tenant adds a currency.

Composes: [[law]].
