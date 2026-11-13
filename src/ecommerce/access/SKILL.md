---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 3/3 · 6d637ae1"
contentUuid: "8a1566c6-cb66-533a-b768-6e013f12292b"
diamondUuid: "0abf4c82-4d2d-8c63-a46e-bc187cf61335"
uuid: "6d637ae1-c573-8a35-ac23-27d337b3c1f5"
horo: 3
typography:
  partition: ecommerce
  bondDegree: 414
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "7469b1b4-e11d-8813-8851-8d14a3bf6eac"
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
      stageUuid: "cbf2ca75-0997-8014-91e9-09d07a579b56"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "7a05e9a1-1e9a-8e26-9782-3eb51b5e2814"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
