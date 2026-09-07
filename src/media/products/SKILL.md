---
name: products
description: "Use when reasoning about products — is the Payload definition: the product's fields, its access rules, and the hooks beside it that manage the images a product carries."
atomPath: "media/products"
coordinate: "media/products · 5/round · 5c59ec93"
contentUuid: "a1e9b367-af8b-5559-9e4d-8278ee586386"
diamondUuid: "f8fd9cdc-4419-887f-904f-ffab5a1b29fa"
uuid: "5c59ec93-6b0e-8f86-9279-640654839912"
horo: 5
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
  computationUuid: "8dadd8ae-06f7-8e96-92db-ab16286c2f72"
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
      stageUuid: "5a69e962-1bb3-8825-83db-822923983eb3"
    - stage: seal
      stageUuid: "93c9b436-4103-893b-8ae2-a729e632da26"
    - stage: uuid
      stageUuid: "14aad2ad-ff68-840d-a56b-87336a220069"
version: 2
---
# media/products — the storefront's product collection, with its media handled at the collection

`ProductsCollection` is the Payload definition: the product's fields, its access rules, and the
hooks beside it that manage the images a product carries.

The media belongs to the product rather than to a gallery that references it, so deleting a
product does not leave an orphaned upload nothing can reach.

Composes: [[law]].
