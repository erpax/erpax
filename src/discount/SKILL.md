---
name: discount
description: "Use when applying promotional/volume/loyalty price reductions — percent or fixed amount, scope (item/order/customer), validity period, approval workflow."
atomPath: discount
coordinate: discount · 8/crest · d552e4cb
contentUuid: "2664bd3c-8d31-5a6e-a7fc-a760a3c3a314"
diamondUuid: "73d30d97-4482-876e-a444-e2ea6a28b06f"
uuid: "d552e4cb-afc8-8f3c-ba71-4dec6f3c074b"
horo: 8
bonds:
  in:
    - bundle
    - currency
    - orders
    - quotes
    - rate
  out:
    - bundle
    - currency
    - orders
    - quotes
    - rate
typography:
  partition: discount
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - currency
    - orders
    - quotes
    - rate
  matrix:
    - bundle
    - currency
    - orders
    - quotes
    - rate
  backlinks:
    - bundle
    - currency
    - orders
    - quotes
    - rate
signatures:
  computationUuid: "1eb07acb-6e44-83e0-b593-69cfc4a9c37e"
  stages:
    - stage: path
      stageUuid: "946e9bca-056b-83e6-85b8-f95b3e8611cd"
    - stage: trinity
      stageUuid: "3eeb77d3-0e53-800e-83db-0212fee6d5fa"
    - stage: boundary
      stageUuid: "b232ef3c-b43b-837d-b33e-d41c7cd000b5"
    - stage: links
      stageUuid: "48a47d85-edbe-8114-a32a-8e94405c16b2"
    - stage: horo
      stageUuid: "e73380e0-405d-8f42-89e9-18515bbe43e1"
    - stage: seal
      stageUuid: "d89a57b7-b262-8e91-b9f6-87578a7ed711"
    - stage: uuid
      stageUuid: "9bbd4727-3209-8bce-8d42-f158e9340d02"
version: 2
---
# discount

Use when applying promotional/volume/loyalty price reductions — percent or fixed amount, scope (item/order/customer), validity period, approval workflow.

Composes: [[customers/sales/orders]] · [[Quotes]] · [[currency]] · [[rate]].

## Standards
- EN-16931
