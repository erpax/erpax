---
name: price
description: "Use when reasoning about price — The ecommerce plugin generates one column per supported currency. resolves the right one for the requested currency and renders it, so application code never names and never…"
atomPath: "product/price"
coordinate: "product/price · 1/base · 92950f1d"
contentUuid: "609bbedf-9ea1-5db9-abf0-d23499bc0d19"
diamondUuid: "8a2e8932-d06f-872f-a31d-86fb43c53337"
uuid: "92950f1d-2fa1-89dc-b2fd-66d7a452504a"
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
  computationUuid: "4564fa09-5a71-86a9-8ca0-1164cec77cfc"
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
      stageUuid: "ebc200b1-2b31-85ac-9694-50d93cdbbd6a"
    - stage: seal
      stageUuid: "6fd6c77e-fbf9-8d29-8a8d-5ec62fec0335"
    - stage: uuid
      stageUuid: "155d9207-2a83-87e8-b274-5b9469236a98"
version: 2
---
# product/price — a price is asked for in a currency, never read from a hardcoded column

The ecommerce plugin generates one column per supported currency. `getProductPrice` resolves the
right one for the requested currency and `formatProductPrice` renders it, so application code
never names `priceInEUR` and never breaks when a tenant adds a currency.

Composes: [[law]].
