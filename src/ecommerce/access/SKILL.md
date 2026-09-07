---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 3/3 · bd81e629"
contentUuid: "f40dbdf6-f333-539e-bc0b-a8294810faad"
diamondUuid: "1d721aaf-0b05-8d42-8d7b-1a70fe31e3dd"
uuid: "bd81e629-011e-8d35-b677-83f990c1500e"
horo: 3
typography:
  partition: ecommerce
  bondDegree: 416
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "5aac46d1-9d69-838f-b17b-facbbb78fc0a"
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
      stageUuid: "9cb82fad-5f63-8327-a504-74c81102da93"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "b5c2b6b2-c71e-872d-8c35-e6842efe9155"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
