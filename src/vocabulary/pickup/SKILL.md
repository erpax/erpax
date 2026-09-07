---
name: pickup
description: "Use when a buyer collects pre-ordered goods at a point rather than having them delivered — the CSA pickup/drop site, on-farm pickup, host-site/neighborhood pod, and the generic click-and-collect (BOPIS) locker. A collection node in distribution: the seller aggregates to a point, the buyer covers the last mile — lower cost than home delivery, at the buyer's travel friction."
atomPath: "vocabulary/pickup"
coordinate: "vocabulary/pickup · 5/round · 26835157"
contentUuid: "1dd11039-acf7-5b12-83a7-902d10d2c358"
diamondUuid: "dc77585f-4960-849a-a317-02d796131e86"
uuid: "26835157-e912-8774-90e6-3605eb4ee60e"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "b0fcf1ce-904c-8085-b894-202309511130"
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
      stageUuid: "5691f9ba-50f1-8c77-a1ff-c2989ba9a266"
    - stage: seal
      stageUuid: "20e5b400-c4ab-81bf-aa62-704047cac2f5"
    - stage: uuid
      stageUuid: "71e95ed9-cfd3-8e2a-8458-451ecf665564"
version: 2
---
# pickup — the buyer-collection point in distribution

A **pickup** is a point where a buyer collects pre-ordered goods rather than receiving them by [[carriers|delivery]] — the [[distribution]] node where the seller aggregates to a location and the **buyer covers the last mile**. In CSA it is the **pickup / drop site** (a central location or host business), the **neighborhood pod** (one member hosts several), or **on-farm pickup** (lowest cost, often paired with member participation). Generically it is **click-and-collect / BOPIS** (buy-online-pickup-in-store) and the parcel **locker**.

Pickup trades **home-delivery [[cost]]** for the buyer's **travel [[friction]]** — the same status⊥friction trade the [[market]] atom names: cheaper for the farm, less convenient for the member, and a [[retention]] risk when pickup windows collide with work schedules. It composes the [[share]] box's fulfilment with [[distribution]]: the box is [[packs|packed]], routed to the pickup, and collected.

## Standards
- USDA AMS — CSA distribution models; Oregon State / NC State Extension — CSA pickup & drop-site logistics
- Retail BOPIS / click-and-collect omnichannel fulfilment practice

Composes [[distribution]] · [[share]] · [[packs]] · [[carriers]] · [[commerce]] · [[cost]] · [[friction]] · [[retention]] · [[agriculture]].
