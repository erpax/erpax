---
name: products
description: "Use when reasoning about products — is the Payload definition: the product's fields, its access rules, and the hooks beside it that manage the images a product carries."
atomPath: "media/products"
coordinate: "media/products · 8/crest · 3c7d72c0"
contentUuid: "8b82d50b-b5a1-5379-866e-dcdadcf1d00a"
diamondUuid: "4e106642-f1cc-8989-adee-c09b1d031332"
uuid: "3c7d72c0-50ef-8868-a442-b5d8b3728275"
horo: 8
typography:
  partition: media
  bondDegree: 3
standards:
  - "3986 uri slug-to-url"
  - "BCP-47 language-tag i18n"
  - "GS1 GTIN global-trade-item-number"
  - "GS1-GTIN"
  - "ISO-4217:2015 currency-codes"
  - "UN-CEFACT"
  - "UN-CEFACT UNSPSC product-classification"
  - UNSPSC
  - "WCAG-2.1 level-AA accessibility"
  - schema.org Product
bindings: []
signatures:
  computationUuid: "4ea943b9-98fe-87bd-ae70-6456e7ca4fba"
  stages:
    - stage: path
      stageUuid: "6d17f7b4-092c-8431-8a26-2c3b210994ac"
    - stage: trinity
      stageUuid: "5de914aa-ad71-8875-92d8-75b825edbe6e"
    - stage: boundary
      stageUuid: "7b8c7443-3a02-8c94-b30b-ed88f20f82e6"
    - stage: links
      stageUuid: "e991132e-e6cd-8d03-b6a1-e8eff8fc5f12"
    - stage: horo
      stageUuid: "229eb79a-3d8b-8574-9084-e5c49e0f1e95"
    - stage: seal
      stageUuid: "93c9b436-4103-893b-8ae2-a729e632da26"
    - stage: uuid
      stageUuid: "a4b1c8ae-0315-8f3c-9cd8-b690fe4c5e45"
version: 2
---
# media/products — the storefront's product collection, with its media handled at the collection

`ProductsCollection` is the Payload definition: the product's fields, its access rules, and the
hooks beside it that manage the images a product carries.

The media belongs to the product rather than to a gallery that references it, so deleting a
product does not leave an orphaned upload nothing can reach.

Composes: [[law]].
