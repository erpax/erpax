---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 3/3 · 6d637ae1"
contentUuid: "5f0ef3fb-4653-547e-81a4-6824b62fdcf2"
diamondUuid: "95f3191d-bf58-89ae-8bcf-4a7ed28dcf9a"
uuid: "6d637ae1-c573-8a35-ac23-27d337b3c1f5"
horo: 3
typography:
  partition: ecommerce
  bondDegree: 443
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "311e5db2-cb01-8fd3-ac94-7fc90af9a46b"
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
      stageUuid: "3487282e-8a9d-8469-8109-4c4c8adaabf6"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "8ca03dc3-37e5-8ff7-aaa4-c685a1135814"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
