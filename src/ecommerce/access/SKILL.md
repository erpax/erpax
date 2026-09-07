---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 6/6 · c7679f9b"
contentUuid: "bc945c18-6c6e-5e46-a9ca-4bf925cb2a59"
diamondUuid: "c007f0b0-ac70-8933-8cad-faa03eca8f7e"
uuid: "c7679f9b-6c79-8627-9067-5726e09fab7f"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 436
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "25ba6625-2883-834a-8d6b-074d3cee3c22"
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
      stageUuid: "3936a6b6-4527-8ab8-837e-28fc06e2d5f1"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "eb1cba94-70a9-8884-be5f-e20a85871af7"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
