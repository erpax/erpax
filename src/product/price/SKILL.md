---
name: price
description: "Use when reasoning about price — The ecommerce plugin generates one column per supported currency. resolves the right one for the requested currency and renders it, so application code never names and never…"
atomPath: "product/price"
coordinate: "product/price · 8/crest · 71507af5"
contentUuid: "7e35474e-daf3-5138-bcbb-983727856cf6"
diamondUuid: "552b8ee0-f06a-8a2c-9e08-19f593e87f85"
uuid: "71507af5-3a76-8305-ac5c-8d42e7a61e8d"
horo: 8
typography:
  partition: product
  bondDegree: 57
standards:
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-4217:2015 currency-codes"
  - "US-GAAP ASC-830 foreign-currency-matters"
bindings: []
signatures:
  computationUuid: "8f4d578e-1b42-810c-b089-acc2be9c6b41"
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
      stageUuid: "2467f188-600d-851c-b37e-67e742a1179b"
    - stage: seal
      stageUuid: "6fd6c77e-fbf9-8d29-8a8d-5ec62fec0335"
    - stage: uuid
      stageUuid: "e947c256-9116-88c9-ab53-ae5061cb916c"
version: 2
---
# product/price — a price is asked for in a currency, never read from a hardcoded column

The ecommerce plugin generates one column per supported currency. `getProductPrice` resolves the
right one for the requested currency and `formatProductPrice` renders it, so application code
never names `priceInEUR` and never breaks when a tenant adds a currency.

Composes: [[law]].
