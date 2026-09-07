---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 6/6 · 794e72e1"
contentUuid: "1839d8a7-a4dd-5bd5-b7db-b7c5aae23145"
diamondUuid: "cf229c25-b548-8bc4-89a1-93e50086f4a9"
uuid: "794e72e1-c67b-8639-9c79-b3f762b699c8"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 436
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "a26bce50-e84c-8ea2-9309-3ab345a5d1a4"
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
      stageUuid: "4bfdf187-90f0-8761-aaa9-1ecbb8fcc34c"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "fc334a3e-a229-82ff-99e1-dc18168273c2"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
