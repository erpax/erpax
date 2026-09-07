---
name: order
description: "Use when reasoning about order — An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer."
atomPath: "vocabulary/order"
coordinate: "vocabulary/order · 7/descent · 7f8cc5b7"
contentUuid: "9a4eced7-51a2-50fd-8607-6eae13368a4d"
diamondUuid: "e131a03f-da34-843b-bc35-4ed8e090e2ea"
uuid: "7f8cc5b7-8bb9-814b-8df1-f2c811bf6455"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 66
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "92baaee8-0f9f-8d3c-97b0-8a4d9b4d0b13"
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
      stageUuid: "419f3f4e-cd49-8045-8186-c07f8f373bc9"
    - stage: seal
      stageUuid: "9cd51493-5bd7-885c-b2e7-741afb12420f"
    - stage: uuid
      stageUuid: "9a678af6-ba68-81c5-b5d8-bf1feeb8f349"
version: 2
---
# order

An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer.

Entangled with — [[item]] · [[list]] · [[type]] · [[action]] · [[status]] · [[pre]] · [[date]] · [[delivery]] · [[number]] · [[percentage]] · [[quantity]] · [[value]] · [[part]] · [[references]]

Attested in schema.org — ItemListOrderType · Order · OrderAction · OrderItem · OrderStatus · PreOrderAction · itemListOrder · orderDate · orderDelivery · orderItemNumber · orderItemStatus · orderNumber · orderPercentage · orderQuantity · orderStatus · orderValue · partOfOrder · referencesOrder

**Law — [[law]]: an order confirms accepted offers — its value equals the sum of its line items, and it advances through its statuses in one direction.**

@standard schema.org — the type vocabulary, collided to single words
