---
name: choice
description: "Use when a buyer selects items up to a value or quantity cap instead of receiving a fixed bundle — the market-style / customizable CSA share (members pick at a table or online to a limit, swap unwanted items), and the generic pick-mix / deli-counter / configure-to-order pattern. The selection model: the inverse of a fixed bundle, trading packing simplicity for member satisfaction."
atomPath: choice
coordinate: choice · 5/round · ea914267
contentUuid: "687e0706-5a03-5efe-b110-61b02375b5c4"
diamondUuid: "2ecb61b4-7e1c-8a73-bd7a-6a048bfa500a"
uuid: "ea914267-e00d-8f2d-a985-4da0dfc358c3"
horo: 5
bonds:
  in:
    - agriculture
    - bundle
    - commerce
    - harvest
    - limit
    - orders
    - packs
    - retention
    - share
  out:
    - agriculture
    - bundle
    - commerce
    - harvest
    - limit
    - orders
    - packs
    - retention
    - share
typography:
  partition: choice
  bondDegree: 29
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - bundle
    - commerce
    - harvest
    - limit
    - orders
    - packs
    - retention
    - share
  matrix:
    - agriculture
    - bundle
    - commerce
    - harvest
    - limit
    - orders
    - packs
    - retention
    - share
  backlinks:
    - agriculture
    - bundle
    - commerce
    - harvest
    - limit
    - orders
    - packs
    - retention
    - share
signatures:
  computationUuid: "48e1400d-455b-8d27-ba20-c684cd5aa710"
  stages:
    - stage: path
      stageUuid: "2576053c-f520-814d-972e-aa8af2551e51"
    - stage: trinity
      stageUuid: "47b08ee1-cb74-8532-a16d-6a04fe8d58c6"
    - stage: boundary
      stageUuid: "41ed4e9e-f25e-8b49-a160-e5508c602c73"
    - stage: links
      stageUuid: "33d2be0a-2161-8bd9-beea-51c66218fbb7"
    - stage: horo
      stageUuid: "b10a97b4-d7fb-81c4-8616-e83df11d2ab8"
    - stage: seal
      stageUuid: "687507e3-2e25-82c3-a9da-1c0c9005c256"
    - stage: uuid
      stageUuid: "ee53b6a2-d0bd-849b-99f1-cdc1b97f4c74"
version: 2
---
# choice — selecting items up to a cap (the customizable order)

**choice** is an order model where the buyer **selects items up to a value or quantity cap** instead of receiving a fixed [[bundle]] — the **market-style** or **customizable** CSA [[share]] (members pick at a distribution table or online to a limit, and a **swap box** lets them trade an unwanted item). Generically it is the **pick-mix**, deli-counter, and configure-to-order pattern: a constrained selection, not a predetermined set.

Choice is the direct answer to the **customization paradox** the [[share]] atom names — members want to choose, the fixed box imposes the farmer's plan — so it trades **packing simplicity** (uniform boxes) for **member satisfaction** ([[retention]]). It sits between a fixed [[bundle]] and an open [[customers/sales/orders|order]]: bounded by a cap ([[limit]]), priced by the cap not the picks, and it complicates the [[harvest]]/[[packs]] plan (you must grow a surplus to offer real choice).

## Standards
- USDA AMS / extension — market-style & customizable CSA models; Galt et al. (2018) — the customization paradox
- Retail assortment / configure-to-order (CTO) practice

Composes [[share]] · [[bundle]] · [[customers/sales/orders]] · [[limit]] · [[retention]] · [[harvest]] · [[packs]] · [[commerce]] · [[agriculture]].
