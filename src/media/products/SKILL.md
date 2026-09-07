---
name: products
description: "Use when reasoning about products — is the Payload definition: the product's fields, its access rules, and the hooks beside it that manage the images a product carries."
atomPath: "media/products"
coordinate: "media/products · 5/round · 15c17db0"
contentUuid: "b62b0b7f-295b-5f99-9adc-78aaaa077e07"
diamondUuid: "8c4f59eb-8ac0-8933-befd-aaedb7c10f13"
uuid: "15c17db0-fb7c-8c6d-b84b-3cfdb0626696"
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
  computationUuid: "4474428c-2626-8daa-99b2-189128c8ab0f"
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
      stageUuid: "18964653-c89e-8b6e-8e51-6f09c246093a"
    - stage: seal
      stageUuid: "93c9b436-4103-893b-8ae2-a729e632da26"
    - stage: uuid
      stageUuid: "a95dc3d2-4b91-85fb-af17-69c25ab4eb2c"
version: 2
---
# media/products — the storefront's product collection, with its media handled at the collection

`ProductsCollection` is the Payload definition: the product's fields, its access rules, and the
hooks beside it that manage the images a product carries.

The media belongs to the product rather than to a gallery that references it, so deleting a
product does not leave an orphaned upload nothing can reach.

Composes: [[law]].
