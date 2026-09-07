---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 6/6 · f58303e4"
contentUuid: "f1e3448e-4826-57bb-af00-490a08aae0b6"
diamondUuid: "2781512c-01c0-8577-a8d5-99c5b9d7633e"
uuid: "f58303e4-d044-89d9-99f5-1e08259c6e08"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 436
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "873ed0f8-0776-8241-8eed-0269129c6e84"
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
      stageUuid: "259d0c07-0257-8e13-a185-72fca94a6c42"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "6617efe7-560c-8822-8c79-4c3798476b26"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
