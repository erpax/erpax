---
name: price
description: "Use when reasoning about price — The ecommerce plugin generates one column per supported currency. resolves the right one for the requested currency and renders it, so application code never names and never…"
atomPath: "product/price"
coordinate: "product/price · 4/weave · f6083cb0"
contentUuid: "3b142528-3252-5bdc-84fa-4a3e5f343336"
diamondUuid: "4886462f-c681-84ed-b621-9e4434af01e6"
uuid: "f6083cb0-f685-8525-8aa2-586c7ce099c0"
horo: 4
typography:
  partition: product
  bondDegree: 57
standards:
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-4217:2015 currency-codes"
  - "US-GAAP ASC-830 foreign-currency-matters"
bindings: []
signatures:
  computationUuid: "c03d2eeb-3ec4-8e47-bcef-48ac87ea6e51"
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
      stageUuid: "b3ac124d-b758-8e44-933f-6263d95aed24"
    - stage: seal
      stageUuid: "6fd6c77e-fbf9-8d29-8a8d-5ec62fec0335"
    - stage: uuid
      stageUuid: "63936b92-aff8-8f5d-bd7c-4d11b5659389"
version: 2
---
# product/price — a price is asked for in a currency, never read from a hardcoded column

The ecommerce plugin generates one column per supported currency. `getProductPrice` resolves the
right one for the requested currency and `formatProductPrice` renders it, so application code
never names `priceInEUR` and never breaks when a tenant adds a currency.

Composes: [[law]].
