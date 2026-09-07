---
name: pickup
description: "Use when a buyer collects pre-ordered goods at a point rather than having them delivered — the CSA pickup/drop site, on-farm pickup, host-site/neighborhood pod, and the generic click-and-collect (BOPIS) locker. A collection node in distribution: the seller aggregates to a point, the buyer covers the last mile — lower cost than home delivery, at the buyer's travel friction."
atomPath: "vocabulary/pickup"
coordinate: "vocabulary/pickup · 1/base · c796be01"
contentUuid: "40a262c9-471a-5af8-8c66-29419cf515ce"
diamondUuid: "fcde907e-29c7-8033-bea1-2cc16029ee5e"
uuid: "c796be01-a40f-8836-b738-fca8ff1e12af"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "ca117034-945c-8cf3-919c-e07fac5ac9d2"
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
      stageUuid: "ea2ba23b-f20a-8abb-9077-c139767859f7"
    - stage: seal
      stageUuid: "20e5b400-c4ab-81bf-aa62-704047cac2f5"
    - stage: uuid
      stageUuid: "648fb672-ceeb-8b77-9c69-7f8337b44788"
version: 2
---
# pickup — the buyer-collection point in distribution

A **pickup** is a point where a buyer collects pre-ordered goods rather than receiving them by [[carriers|delivery]] — the [[distribution]] node where the seller aggregates to a location and the **buyer covers the last mile**. In CSA it is the **pickup / drop site** (a central location or host business), the **neighborhood pod** (one member hosts several), or **on-farm pickup** (lowest cost, often paired with member participation). Generically it is **click-and-collect / BOPIS** (buy-online-pickup-in-store) and the parcel **locker**.

Pickup trades **home-delivery [[cost]]** for the buyer's **travel [[friction]]** — the same status⊥friction trade the [[market]] atom names: cheaper for the farm, less convenient for the member, and a [[retention]] risk when pickup windows collide with work schedules. It composes the [[share]] box's fulfilment with [[distribution]]: the box is [[packs|packed]], routed to the pickup, and collected.

## Standards
- USDA AMS — CSA distribution models; Oregon State / NC State Extension — CSA pickup & drop-site logistics
- Retail BOPIS / click-and-collect omnichannel fulfilment practice

Composes [[distribution]] · [[share]] · [[packs]] · [[carriers]] · [[commerce]] · [[cost]] · [[friction]] · [[retention]] · [[agriculture]].
