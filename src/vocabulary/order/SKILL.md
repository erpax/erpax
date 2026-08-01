---
name: order
description: "Use when reasoning about order — An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer."
atomPath: "vocabulary/order"
coordinate: "vocabulary/order · 1/base · 6af7a811"
contentUuid: "2bf21c38-11b9-51a5-8aa5-e85d20e9e014"
diamondUuid: "e06ca532-00ca-8dc5-ba2c-c06fef26701a"
uuid: "6af7a811-cdc2-8cae-8d2a-874f84b848ac"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 70
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "8713d2f7-67d9-8907-b549-e63f3b7132ff"
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
      stageUuid: "3d7ee240-8046-86e6-9f1e-587484272603"
    - stage: seal
      stageUuid: "871fa972-80fe-8673-9f8a-6c78a7436079"
    - stage: uuid
      stageUuid: "e595bbe9-9673-88e8-9dae-bf2f44ea252f"
version: 2
---
# order

An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer.

Entangled with — [[item]] · [[list]] · [[type]] · [[action]] · [[status]] · [[pre]] · [[date]] · [[delivery]] · [[number]] · [[percentage]] · [[quantity]] · [[value]] · [[part]] · [[references]]

Attested in schema.org — ItemListOrderType · Order · OrderAction · OrderItem · OrderStatus · PreOrderAction · itemListOrder · orderDate · orderDelivery · orderItemNumber · orderItemStatus · orderNumber · orderPercentage · orderQuantity · orderStatus · orderValue · partOfOrder · referencesOrder

**Law — [[law]]: an order confirms accepted offers — its value equals the sum of its line items, and it advances through its statuses in one direction.**

@standard schema.org — the type vocabulary, collided to single words
