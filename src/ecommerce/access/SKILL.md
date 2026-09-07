---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 9/unity · c3e0c814"
contentUuid: "b77caea0-a008-5ded-a599-4ff10ae66fee"
diamondUuid: "bfeda3a6-9c25-8b23-a0a3-9752e5cbdff7"
uuid: "c3e0c814-f998-8736-b0d8-42170658f967"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 436
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "334fb5c9-74bb-8774-ab62-d83fc4019a54"
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
      stageUuid: "922d083e-8aab-8015-8213-dca0022f8ddc"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "795c2124-86c0-8afd-b701-df1123aeec9e"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
