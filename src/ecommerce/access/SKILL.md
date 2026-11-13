---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 3/3 · 6d637ae1"
contentUuid: "ab835664-0a7f-59fc-92c2-d49a1ad60d15"
diamondUuid: "19c9e172-9d0a-8df9-ba30-7403fb81550d"
uuid: "6d637ae1-c573-8a35-ac23-27d337b3c1f5"
horo: 3
typography:
  partition: ecommerce
  bondDegree: 347
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "9a774716-6ecd-8383-9cb0-2e58d9cd829c"
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
      stageUuid: "b2aa9f5e-4b5a-8653-92e9-c1efa25f600b"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "d05cafb1-6dc9-88d8-92cd-aa5b15e4beab"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
