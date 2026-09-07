---
name: irrigation
description: "Use when water is supplied to a crop on a managed schedule — drip/trickle vs overhead application, fertigation (fertilizer through the line), and evapotranspiration-based scheduling (the water budget). Irrigation credits the soil-water reservoir that evapotranspiration debits; schedule it like a checkbook — replace the deficit before the crop hits stress."
atomPath: "vocabulary/irrigation"
coordinate: "vocabulary/irrigation · 5/round · ed5feda8"
contentUuid: "320d7845-548e-55fb-bd22-ee85c462ce5a"
diamondUuid: "9a90d58e-1ff1-8055-9432-2e8fa63612d8"
uuid: "ed5feda8-1168-8904-973a-7aa8fa72c1c8"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "6cc280ae-30cc-846a-8d22-c47ada3b26cd"
  stages:
    - stage: path
      stageUuid: "3c76b43d-6b4d-8646-91e0-43e933818f97"
    - stage: trinity
      stageUuid: "187014c4-28f1-895a-95b7-96bef73d1ba0"
    - stage: boundary
      stageUuid: "bcf65ade-e13d-8079-b8d3-c7f028c51e51"
    - stage: links
      stageUuid: "b90e42aa-f125-8707-9492-ed74b9dd6474"
    - stage: horo
      stageUuid: "998df077-2a50-8086-9502-dceac958e39a"
    - stage: seal
      stageUuid: "453caa60-e2cf-86ea-b787-abc32b16c8f8"
    - stage: uuid
      stageUuid: "9089d519-0d03-8a05-9c2b-1b2a02224564"
version: 2
---
# irrigation — supplying water on a managed schedule

**irrigation** supplies water to the [[crop]] on a managed [[schedule]]. **Drip/trickle** wets the root zone directly (frequent, localized, low-loss, the partner of plastic [[mulch]]); **overhead** sprinkles the canopy. **Fertigation** injects soluble N/K through the drip line — the intersection of irrigation and [[fertility]], achieving 4R *right-time / right-place* at once.

Scheduling is a **water budget** ([[balance]]): rain + irrigation are deposits, **[[evapotranspiration]]** (ET) the daily withdrawal, and **[[moisture|available water]]** the conserved reservoir held between field capacity and wilting point. Replace what ET removed before the crop hits stress — the "checkbook" method. Irrigation is one input line of [[agriculture]]'s plan: a [[rate]] (volume per area per time) metered against [[soil]] [[capacity]].

## Standards
- UMass / UMN Extension — drip & ET-based irrigation scheduling (the water-balance method)
- UC / land-grant extension — crop water use, evapotranspiration
- 4R Nutrient Stewardship — fertigation (right time / right place)

Composes [[agriculture]] · [[crop]] · [[moisture]] · [[evapotranspiration]] · [[fertility]] · [[balance]] · [[rate]] · [[schedule]] · [[soil]] · [[capacity]].

**Law — [[law]]: irrigation credits the soil-water reservoir that [[evapotranspiration]] debits — a water-budget [[balance]] scheduled to replace the deficit before the [[crop]] hits stress.**
