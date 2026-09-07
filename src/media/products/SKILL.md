---
name: products
description: "Use when reasoning about products — is the Payload definition: the product's fields, its access rules, and the hooks beside it that manage the images a product carries."
atomPath: "media/products"
coordinate: "media/products · 2/share · c7fd6bf5"
contentUuid: "5872285b-cc61-5682-866c-bc100b59124e"
diamondUuid: "947237e5-7ccd-8cc2-86c6-5e482f51af47"
uuid: "c7fd6bf5-15fd-839b-8fd8-051985b404f7"
horo: 2
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
  computationUuid: "332f93e1-cd2c-8928-9984-7b8fad22ff78"
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
      stageUuid: "c87142dd-5a63-8b07-926f-dd62ca9c059a"
    - stage: seal
      stageUuid: "93c9b436-4103-893b-8ae2-a729e632da26"
    - stage: uuid
      stageUuid: "0ea959e0-39f6-8ab5-b43a-fa45fa7e0bf8"
version: 2
---
# media/products — the storefront's product collection, with its media handled at the collection

`ProductsCollection` is the Payload definition: the product's fields, its access rules, and the
hooks beside it that manage the images a product carries.

The media belongs to the product rather than to a gallery that references it, so deleting a
product does not leave an orphaned upload nothing can reach.

Composes: [[law]].
