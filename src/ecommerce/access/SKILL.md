---
name: access
description: "Use when reasoning about access — , and answer the access question; the field-level pair narrows it to particular fields; the role helpers are what they all ask."
atomPath: "ecommerce/access"
coordinate: "ecommerce/access · 6/6 · a273e9ea"
contentUuid: "fb73e8f8-ba7d-58e9-9554-a1fe5cb61cf3"
diamondUuid: "34ba6033-ed90-8008-a0d6-1b7fddef184b"
uuid: "a273e9ea-9d1c-81b5-bd7d-7817d2679863"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 436
standards:
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "e00697ef-d29f-8814-9b44-df6ff4720407"
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
      stageUuid: "bd513816-5e9d-8e2b-b0e8-7d240f709437"
    - stage: seal
      stageUuid: "22a73c6e-e8b4-88b6-9481-3722beed901e"
    - stage: uuid
      stageUuid: "03eeb2de-f0ee-89a3-a247-11500700d673"
version: 2
---
# ecommerce/access — who may see a storefront record, decided by predicates rather than by a screen

`isAdmin`, `isCustomer` and `isDocumentOwner` answer the access question; the field-level pair
narrows it to particular fields; the role helpers are what they all ask.

They are collection access rules, so the answer is the same whether the request arrives through the
storefront, the admin panel or the API — which is the whole reason not to gate in the UI
([[rules]]/bypass).

Composes: [[law]].
