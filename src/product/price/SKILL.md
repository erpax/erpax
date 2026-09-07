---
name: price
description: "Use when reasoning about price — The ecommerce plugin generates one column per supported currency. resolves the right one for the requested currency and renders it, so application code never names and never…"
atomPath: "product/price"
coordinate: "product/price · 5/round · bb1d9109"
contentUuid: "64780520-fa5a-59e4-8ee6-ab8a17b3be00"
diamondUuid: "ec4385bb-6ec9-80ee-9bd1-fab5d8b95472"
uuid: "bb1d9109-2713-84c1-9f21-9ac410d4a9cb"
horo: 5
typography:
  partition: product
  bondDegree: 57
standards:
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-4217:2015 currency-codes"
  - "US-GAAP ASC-830 foreign-currency-matters"
bindings: []
signatures:
  computationUuid: "de48924f-d789-8d8d-a1e7-e7bc66db01e3"
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
      stageUuid: "c33f06d0-7872-85f7-bf0a-832c827641e4"
    - stage: seal
      stageUuid: "6fd6c77e-fbf9-8d29-8a8d-5ec62fec0335"
    - stage: uuid
      stageUuid: "ccb325bd-9b9d-888c-adc8-75dcac0f5b2f"
version: 2
---
# product/price — a price is asked for in a currency, never read from a hardcoded column

The ecommerce plugin generates one column per supported currency. `getProductPrice` resolves the
right one for the requested currency and `formatProductPrice` renders it, so application code
never names `priceInEUR` and never breaks when a tenant adds a currency.

Composes: [[law]].
