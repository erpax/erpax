---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 9/unity · 41f59783"
contentUuid: "9da4ef64-1889-5eb7-ab9e-2ce408ea2c84"
diamondUuid: "7606063e-518a-8a4f-b08d-b603ff56ec36"
uuid: "41f59783-cc12-844e-8dc6-ffe9241505c9"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 416
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "ea975026-187d-875f-a914-a4c4e8e25181"
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
      stageUuid: "c1aa8744-a4c3-8d82-aaae-384af9b6ce13"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "bd7b1c75-cd76-85fd-b899-70b5771a5f74"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
