---
name: order
description: "Use when reasoning about order — An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer."
atomPath: "vocabulary/order"
coordinate: "vocabulary/order · 2/share · e9a08c44"
contentUuid: "ca1e3aca-98a4-554c-9f95-552242036fa6"
diamondUuid: "bc2f5b3e-5a57-8b5a-b375-0ddd24ec3fc6"
uuid: "e9a08c44-e571-80d7-a637-54430ef9ed2d"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 66
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "6040d186-9009-8da2-9f7f-d302277ce75a"
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
      stageUuid: "4d64962c-a627-8b7f-a4c3-5ab192c216a4"
    - stage: seal
      stageUuid: "9cd51493-5bd7-885c-b2e7-741afb12420f"
    - stage: uuid
      stageUuid: "1ebe80b0-a45b-8970-b695-18f840629a5a"
version: 2
---
# order

An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer.

Entangled with — [[item]] · [[list]] · [[type]] · [[action]] · [[status]] · [[pre]] · [[date]] · [[delivery]] · [[number]] · [[percentage]] · [[quantity]] · [[value]] · [[part]] · [[references]]

Attested in schema.org — ItemListOrderType · Order · OrderAction · OrderItem · OrderStatus · PreOrderAction · itemListOrder · orderDate · orderDelivery · orderItemNumber · orderItemStatus · orderNumber · orderPercentage · orderQuantity · orderStatus · orderValue · partOfOrder · referencesOrder

**Law — [[law]]: an order confirms accepted offers — its value equals the sum of its line items, and it advances through its statuses in one direction.**

@standard schema.org — the type vocabulary, collided to single words
