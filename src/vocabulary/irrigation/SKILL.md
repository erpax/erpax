---
name: irrigation
description: "Use when water is supplied to a crop on a managed schedule — drip/trickle vs overhead application, fertigation (fertilizer through the line), and evapotranspiration-based scheduling (the water budget). Irrigation credits the soil-water reservoir that evapotranspiration debits; schedule it like a checkbook — replace the deficit before the crop hits stress."
atomPath: "vocabulary/irrigation"
coordinate: "vocabulary/irrigation · 5/round · 7dcfcec2"
contentUuid: "f51eb388-4969-5a71-9e75-4b60f64ada2a"
diamondUuid: "90245f1c-caf8-8487-ba17-1c21107d5f14"
uuid: "7dcfcec2-45e4-8595-a63e-b2fea754b7ea"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "cb3c53c6-c2d8-881d-a7f2-232eb7b96f85"
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
      stageUuid: "1abc037b-98d2-8bdc-9710-079652d82877"
    - stage: seal
      stageUuid: "453caa60-e2cf-86ea-b787-abc32b16c8f8"
    - stage: uuid
      stageUuid: "711129e7-1b69-85d3-b318-06bd64eaf087"
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
