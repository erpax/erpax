---
name: irrigation
description: "Use when water is supplied to a crop on a managed schedule — drip/trickle vs overhead application, fertigation (fertilizer through the line), and evapotranspiration-based scheduling (the water budget). Irrigation credits the soil-water reservoir that evapotranspiration debits; schedule it like a checkbook — replace the deficit before the crop hits stress."
atomPath: irrigation
coordinate: irrigation · 7/descent · 4e9d7759
contentUuid: "01d6086e-1c03-5a1c-8aea-62b1b31cbc55"
diamondUuid: "6e281881-d237-8855-8511-46ebe8c0bb1d"
uuid: "4e9d7759-b6fd-8559-a6ad-65f95c4c8055"
horo: 7
bonds:
  in:
    - agriculture
    - balance
    - capacity
    - crop
    - evapotranspiration
    - fertility
    - law
    - moisture
    - mulch
    - permaculture
    - rate
    - salinity
    - schedule
    - soil
    - transplant
  out:
    - agriculture
    - balance
    - capacity
    - crop
    - evapotranspiration
    - fertility
    - law
    - moisture
    - mulch
    - permaculture
    - rate
    - salinity
    - schedule
    - soil
    - transplant
typography:
  partition: irrigation
  bondDegree: 50
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - balance
    - capacity
    - crop
    - evapotranspiration
    - fertility
    - law
    - moisture
    - mulch
    - rate
    - schedule
    - soil
  matrix:
    - agriculture
    - balance
    - capacity
    - crop
    - evapotranspiration
    - fertility
    - law
    - moisture
    - mulch
    - permaculture
    - rate
    - salinity
    - schedule
    - soil
    - transplant
  backlinks:
    - agriculture
    - balance
    - capacity
    - crop
    - evapotranspiration
    - fertility
    - law
    - moisture
    - mulch
    - permaculture
    - rate
    - salinity
    - schedule
    - soil
    - transplant
signatures:
  computationUuid: "b360af39-2779-8f4c-b250-cecc3ff7fbb3"
  stages:
    - stage: path
      stageUuid: "7dac7752-6f42-84c8-a1a9-23df10785baa"
    - stage: trinity
      stageUuid: "b1f2249a-d288-8027-b015-06dddd9ed901"
    - stage: boundary
      stageUuid: "731e40c8-2b41-8cb8-8c8f-28a51a96b3f3"
    - stage: links
      stageUuid: "2182561f-887b-8c55-b397-dfcbcfe00499"
    - stage: horo
      stageUuid: "246cf8ff-88ff-8986-af45-b5c2d3de7cbd"
    - stage: seal
      stageUuid: "5e075b86-3666-8e8e-91ec-4dfc006b3f18"
    - stage: uuid
      stageUuid: "b45fe346-fdff-8553-a3f6-b0e038c63671"
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
