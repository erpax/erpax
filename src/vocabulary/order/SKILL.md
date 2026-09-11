---
name: order
description: "Use when reasoning about order — An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer."
atomPath: "vocabulary/order"
coordinate: "vocabulary/order · 7/descent · 3fa71d42"
contentUuid: "48caf84f-e8b7-5548-a3b8-f37fac9ed540"
diamondUuid: "2f6877ed-0bbd-8bcb-88c3-146b3be0b3ac"
uuid: "3fa71d42-7271-84c3-9d42-857e04da61a6"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 66
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "5b81820c-2e02-8937-b92c-141fcf5e3fee"
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
      stageUuid: "9692bcf1-7da0-828e-a2e2-0eaee9f8b58f"
    - stage: seal
      stageUuid: "9cd51493-5bd7-885c-b2e7-741afb12420f"
    - stage: uuid
      stageUuid: "b3764ba9-9edd-8ca1-8299-a23d9f1f6fd4"
version: 2
---
# order

An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer.

Entangled with — [[item]] · [[list]] · [[type]] · [[action]] · [[status]] · [[pre]] · [[date]] · [[delivery]] · [[number]] · [[percentage]] · [[quantity]] · [[value]] · [[part]] · [[references]]

Attested in schema.org — ItemListOrderType · Order · OrderAction · OrderItem · OrderStatus · PreOrderAction · itemListOrder · orderDate · orderDelivery · orderItemNumber · orderItemStatus · orderNumber · orderPercentage · orderQuantity · orderStatus · orderValue · partOfOrder · referencesOrder

**Law — [[law]]: an order confirms accepted offers — its value equals the sum of its line items, and it advances through its statuses in one direction.**

@standard schema.org — the type vocabulary, collided to single words
