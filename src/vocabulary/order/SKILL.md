---
name: order
description: "Use when reasoning about order — An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer."
atomPath: "vocabulary/order"
coordinate: "vocabulary/order · 8/crest · 6d6b0015"
contentUuid: "d5d3aa6b-5782-503e-b5d6-af50dbe513d9"
diamondUuid: "513098ea-da34-880f-861f-4dd1fdc3bbe5"
uuid: "6d6b0015-0cc4-8f46-9aed-e3ad2845cfbc"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 66
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "58741053-ea99-8017-b0e1-a76a78016133"
  stages:
    - stage: path
      stageUuid: "44c06513-31df-865b-b240-a887d80a95c2"
    - stage: trinity
      stageUuid: "8a60eaea-7bea-8f6d-9f6f-9017a3dac3ad"
    - stage: boundary
      stageUuid: "6790d8ee-cfd9-81d0-86d3-8a7272fab07e"
    - stage: links
      stageUuid: "59c0f551-a936-85eb-bbfc-e89820c1c98f"
    - stage: horo
      stageUuid: "874e868e-77a1-8dd0-b46a-77dd1e599bd6"
    - stage: seal
      stageUuid: "9cd51493-5bd7-885c-b2e7-741afb12420f"
    - stage: uuid
      stageUuid: "85476fba-1d62-8d37-8a25-0db2aadbc1c4"
version: 2
---
# order

An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer.

Entangled with — [[item]] · [[list]] · [[type]] · [[action]] · [[status]] · [[pre]] · [[date]] · [[delivery]] · [[number]] · [[percentage]] · [[quantity]] · [[value]] · [[part]] · [[references]]

Attested in schema.org — ItemListOrderType · Order · OrderAction · OrderItem · OrderStatus · PreOrderAction · itemListOrder · orderDate · orderDelivery · orderItemNumber · orderItemStatus · orderNumber · orderPercentage · orderQuantity · orderStatus · orderValue · partOfOrder · referencesOrder

**Law — [[law]]: an order confirms accepted offers — its value equals the sum of its line items, and it advances through its statuses in one direction.**

@standard schema.org — the type vocabulary, collided to single words
