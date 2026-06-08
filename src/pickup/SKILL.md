---
name: pickup
description: "Use when a buyer collects pre-ordered goods at a point rather than having them delivered — the CSA pickup/drop site, on-farm pickup, host-site/neighborhood pod, and the generic click-and-collect (BOPIS) locker. A collection node in distribution: the seller aggregates to a point, the buyer covers the last mile — lower cost than home delivery, at the buyer's travel friction."
atomPath: pickup
coordinate: pickup · 2/share · 85236415
contentUuid: "16165b50-165d-54ff-b74e-9bd6b386d12e"
diamondUuid: "32d8b09f-9e5b-8b82-95b0-26fbe866c51b"
uuid: "85236415-f6ff-8911-ac1b-85dafc72d5be"
horo: 2
bonds:
  in:
    - agriculture
    - carriers
    - commerce
    - cost
    - distribution
    - friction
    - location
    - market
    - packs
    - retention
    - share
  out:
    - agriculture
    - carriers
    - commerce
    - cost
    - distribution
    - friction
    - location
    - market
    - packs
    - retention
    - share
typography:
  partition: pickup
  bondDegree: 35
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - carriers
    - commerce
    - cost
    - distribution
    - friction
    - market
    - packs
    - retention
    - share
  matrix:
    - agriculture
    - carriers
    - commerce
    - cost
    - distribution
    - friction
    - location
    - market
    - packs
    - retention
    - share
  backlinks:
    - agriculture
    - carriers
    - commerce
    - cost
    - distribution
    - friction
    - location
    - market
    - packs
    - retention
    - share
signatures:
  computationUuid: "4d55e0d7-acd5-8474-bfdb-035553b5900f"
  stages:
    - stage: path
      stageUuid: "989dfc0e-88ce-806e-8add-d6c251b74f36"
    - stage: trinity
      stageUuid: "a8ce6fad-5b35-8d43-af88-2ce8f6a1d6f6"
    - stage: boundary
      stageUuid: "2f61ccda-7e38-89dc-af83-08c4348de8ac"
    - stage: links
      stageUuid: "dd573a6a-bb0b-81d8-bd3b-b01cc9a6f267"
    - stage: horo
      stageUuid: "d90dab62-98fa-8b20-9ddb-f1e41feef5c1"
    - stage: seal
      stageUuid: "0a386b2c-2b6d-8665-bbe4-3a037925d941"
    - stage: uuid
      stageUuid: "c9fb2998-ada6-8132-b0d9-5021ea7b7612"
version: 2
---
# pickup — the buyer-collection point in distribution

A **pickup** is a point where a buyer collects pre-ordered goods rather than receiving them by [[carriers|delivery]] — the [[distribution]] node where the seller aggregates to a location and the **buyer covers the last mile**. In CSA it is the **pickup / drop site** (a central location or host business), the **neighborhood pod** (one member hosts several), or **on-farm pickup** (lowest cost, often paired with member participation). Generically it is **click-and-collect / BOPIS** (buy-online-pickup-in-store) and the parcel **locker**.

Pickup trades **home-delivery [[cost]]** for the buyer's **travel [[friction]]** — the same status⊥friction trade the [[market]] atom names: cheaper for the farm, less convenient for the member, and a [[retention]] risk when pickup windows collide with work schedules. It composes the [[share]] box's fulfilment with [[distribution]]: the box is [[packs|packed]], routed to the pickup, and collected.

## Standards
- USDA AMS — CSA distribution models; Oregon State / NC State Extension — CSA pickup & drop-site logistics
- Retail BOPIS / click-and-collect omnichannel fulfilment practice

Composes [[distribution]] · [[share]] · [[packs]] · [[carriers]] · [[commerce]] · [[cost]] · [[friction]] · [[retention]] · [[agriculture]].
