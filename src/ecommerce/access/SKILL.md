---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 6/6 · f8c13959"
contentUuid: "93fdc2e9-0071-519a-b8a7-ef0dcd05da38"
diamondUuid: "1fe98c64-768e-8207-a14f-06401e013fc4"
uuid: "f8c13959-fb74-8266-a2a2-49d010ff9333"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 416
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "8ca1265f-9f6f-80c1-ae2b-92bb8613e7fa"
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
      stageUuid: "6c2f8988-3c6e-899d-be0e-c9dd26def04b"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "6d9460af-91bd-892d-b1b7-65a57f6a7298"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
