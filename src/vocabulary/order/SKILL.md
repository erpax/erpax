---
name: order
description: "Use when reasoning about order — An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer."
atomPath: "vocabulary/order"
coordinate: "vocabulary/order · 8/crest · 665564fe"
contentUuid: "792e7622-2534-580c-b808-15f69e667389"
diamondUuid: "8d7d38b8-314b-8e57-9ebd-85bfa459e487"
uuid: "665564fe-4ee7-8af7-9266-27b7eb34adac"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 61
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "4190d2ec-fb3a-80e6-b157-6fbd415ac2e6"
  stages:
    - stage: path
      stageUuid: "44c06513-31df-865b-b240-a887d80a95c2"
    - stage: trinity
      stageUuid: "8a60eaea-7bea-8f6d-9f6f-9017a3dac3ad"
    - stage: boundary
      stageUuid: "214a1566-8207-88cb-b873-f29f82530bd6"
    - stage: links
      stageUuid: "7fba98ff-9295-8875-8911-502be417fcc3"
    - stage: horo
      stageUuid: "5999ce9d-949e-8e77-a166-ef23cc05c662"
    - stage: seal
      stageUuid: "9cd51493-5bd7-885c-b2e7-741afb12420f"
    - stage: uuid
      stageUuid: "466f543b-f141-8dc8-8737-0b846f082086"
version: 2
---
# order

An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer.

Entangled with — [[item]] · [[list]] · [[type]] · action · [[status]] · [[pre]] · [[date]] · [[delivery]] · [[number]] · [[percentage]] · [[quantity]] · value · [[part]] · [[references]]

Attested in schema.org — ItemListOrderType · Order · OrderAction · OrderItem · OrderStatus · PreOrderAction · itemListOrder · orderDate · orderDelivery · orderItemNumber · orderItemStatus · orderNumber · orderPercentage · orderQuantity · orderStatus · orderValue · partOfOrder · referencesOrder

**Law — [[law]]: an order confirms accepted offers — its value equals the sum of its line items, and it advances through its statuses in one direction.**

@standard schema.org — the type vocabulary, collided to single words
