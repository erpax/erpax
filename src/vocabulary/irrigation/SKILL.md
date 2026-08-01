---
name: irrigation
description: "Use when water is supplied to a crop on a managed schedule — drip/trickle vs overhead application, fertigation (fertilizer through the line), and evapotranspiration-based scheduling (the water budget). Irrigation credits the soil-water reservoir that evapotranspiration debits; schedule it like a checkbook — replace the deficit before the crop hits stress."
atomPath: "vocabulary/irrigation"
coordinate: "vocabulary/irrigation · 1/base · 374cf760"
contentUuid: "8334d75b-9daa-5b93-9d47-4c1a69c4de52"
diamondUuid: "ab20b043-503b-8905-9904-2a120ff947b4"
uuid: "374cf760-5cec-8a6a-ab2b-a2a7622f3579"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "b9e4e20a-939c-88b0-b29d-5503cce58907"
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
      stageUuid: "beaf602f-b642-81a2-a6ab-51899e9d149d"
    - stage: seal
      stageUuid: "b7aa3672-c46f-8f8c-b5f7-d564fd36978c"
    - stage: uuid
      stageUuid: "63936e71-a344-869f-9e39-d318fa03b8b5"
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
