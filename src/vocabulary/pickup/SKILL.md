---
name: pickup
description: "Use when a buyer collects pre-ordered goods at a point rather than having them delivered — the CSA pickup/drop site, on-farm pickup, host-site/neighborhood pod, and the generic click-and-collect (BOPIS) locker. A collection node in distribution: the seller aggregates to a point, the buyer covers the last mile — lower cost than home delivery, at the buyer's travel friction."
atomPath: "vocabulary/pickup"
coordinate: "vocabulary/pickup · 1/base · ae8e1bf6"
contentUuid: "4dc185d2-aad9-5006-ba7e-4c9b1e42b58d"
diamondUuid: "650981dd-1db0-8960-b886-5e1edf1da486"
uuid: "ae8e1bf6-53aa-821b-8c56-2d6dbaa7bd8f"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "a01704ce-9868-8a50-b32f-fc31cc047441"
  stages:
    - stage: path
      stageUuid: "582d591b-3881-8437-9356-806234339c23"
    - stage: trinity
      stageUuid: "fa133d81-e373-8753-b0c0-1a512a8ffe05"
    - stage: boundary
      stageUuid: "412cddac-2f96-8459-aca5-48ac00cf9889"
    - stage: links
      stageUuid: "bd43c8d7-a2e4-8254-8a6d-92782bb263c9"
    - stage: horo
      stageUuid: "3485402c-ae9f-807c-bb61-6f9fb86a7801"
    - stage: seal
      stageUuid: "db645e40-c79b-85b8-942e-6a1231173ed1"
    - stage: uuid
      stageUuid: "e0b78d64-c2a4-8a8d-bca3-ca905bc6b456"
version: 2
---
# pickup — the buyer-collection point in distribution

A **pickup** is a point where a buyer collects pre-ordered goods rather than receiving them by [[carriers|delivery]] — the [[distribution]] node where the seller aggregates to a location and the **buyer covers the last mile**. In CSA it is the **pickup / drop site** (a central location or host business), the **neighborhood pod** (one member hosts several), or **on-farm pickup** (lowest cost, often paired with member participation). Generically it is **click-and-collect / BOPIS** (buy-online-pickup-in-store) and the parcel **locker**.

Pickup trades **home-delivery [[cost]]** for the buyer's **travel [[friction]]** — the same status⊥friction trade the [[market]] atom names: cheaper for the farm, less convenient for the member, and a [[retention]] risk when pickup windows collide with work schedules. It composes the [[share]] box's fulfilment with [[distribution]]: the box is [[packs|packed]], routed to the pickup, and collected.

## Standards
- USDA AMS — CSA distribution models; Oregon State / NC State Extension — CSA pickup & drop-site logistics
- Retail BOPIS / click-and-collect omnichannel fulfilment practice

Composes [[distribution]] · [[share]] · [[packs]] · [[carriers]] · [[commerce]] · [[cost]] · [[friction]] · [[retention]] · [[agriculture]].
