---
name: products
description: "Use when reasoning about products — is the Payload definition: the product's fields, its access rules, and the hooks beside it that manage the images a product carries."
atomPath: "media/products"
coordinate: "media/products · 1/base · e3326959"
contentUuid: "b66be402-e4ff-5676-b7e7-1051ef3368d2"
diamondUuid: "a7689693-b40e-8f1c-b45f-632ae9a3f6ca"
uuid: "e3326959-89b9-80e7-890d-907d5c9c0251"
horo: 1
typography:
  partition: media
  bondDegree: 11
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
  computationUuid: "e86859b2-d1cb-82b4-81f8-5f3ae27f80a4"
  stages:
    - stage: path
      stageUuid: "6d17f7b4-092c-8431-8a26-2c3b210994ac"
    - stage: trinity
      stageUuid: "5de914aa-ad71-8875-92d8-75b825edbe6e"
    - stage: boundary
      stageUuid: "1768f889-bf37-8f8b-a86f-2754a4d980f3"
    - stage: links
      stageUuid: "e991132e-e6cd-8d03-b6a1-e8eff8fc5f12"
    - stage: horo
      stageUuid: "cc60f328-60da-823a-85b9-7e31e3fd3137"
    - stage: seal
      stageUuid: "93c9b436-4103-893b-8ae2-a729e632da26"
    - stage: uuid
      stageUuid: "8474cca8-58dd-822e-9fc9-ae007a5a52ce"
version: 2
---
# media/products — the storefront's product collection, with its media handled at the collection

`ProductsCollection` is the Payload definition: the product's fields, its access rules, and the
hooks beside it that manage the images a product carries.

The media belongs to the product rather than to a gallery that references it, so deleting a
product does not leave an orphaned upload nothing can reach.

Composes: [[law]].
