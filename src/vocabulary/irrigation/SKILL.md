---
name: irrigation
description: "Use when water is supplied to a crop on a managed schedule — drip/trickle vs overhead application, fertigation (fertilizer through the line), and evapotranspiration-based scheduling (the water budget). Irrigation credits the soil-water reservoir that evapotranspiration debits; schedule it like a checkbook — replace the deficit before the crop hits stress."
atomPath: "vocabulary/irrigation"
coordinate: "vocabulary/irrigation · 1/base · 42c0a1e1"
contentUuid: "6557001c-a737-59d5-86ff-40678ed7e324"
diamondUuid: "f606aedf-0fd4-87df-8bf9-8940a35b64d1"
uuid: "42c0a1e1-b5f3-83d1-8686-98dfef937e2f"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "bb331bde-5da4-8a0a-88e7-401d6b19148d"
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
      stageUuid: "63b8841b-c046-877a-ace2-363b179372d2"
    - stage: seal
      stageUuid: "453caa60-e2cf-86ea-b787-abc32b16c8f8"
    - stage: uuid
      stageUuid: "5cd2a9da-4097-8699-99f4-91165bb686c2"
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
