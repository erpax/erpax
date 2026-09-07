---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 3/3 · da83ec69"
contentUuid: "3b360e11-fe34-55e4-83e3-22000c1edfc4"
diamondUuid: "5d6cfd06-002d-8eb2-8269-4d477d78e314"
uuid: "da83ec69-3395-88ea-8c08-6c467a479762"
horo: 3
typography:
  partition: ecommerce
  bondDegree: 416
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "a6ec4f79-fc98-818e-8dc5-31e709a06ca2"
  stages:
    - stage: path
      stageUuid: "d374def4-c97f-88ab-86f4-1a4516b20db7"
    - stage: trinity
      stageUuid: "5bbeb2d8-ff62-8fda-8580-5dd51498a3a4"
    - stage: boundary
      stageUuid: "a1013345-3188-85b9-9bfb-613cc2a0bb63"
    - stage: links
      stageUuid: "ac95d255-28eb-8747-9c5c-8a4f8ee74379"
    - stage: horo
      stageUuid: "93a4a5d2-5346-8f60-ad2f-ce5beedc1bf3"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "7bed32a1-b63a-86c0-b766-a27fa011b491"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
