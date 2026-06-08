---
name: herd
description: "Use when a managed group of animals is the unit of aggregation — the herd (cattle/swine), flock (sheep/poultry), drove or mob; one production and accounting unit holding many animals. The livestock twin of lots/cohort: animals grouped, moved, grazed, and measured together."
atomPath: herd
coordinate: herd · 7/descent · 1b458d0b
contentUuid: "8683f80a-dc28-5516-ad7f-05ef95dd3733"
diamondUuid: "ecdd18f2-e849-8518-bb54-04141c085917"
uuid: "1b458d0b-8beb-8830-a831-cbc2858862d7"
horo: 7
bonds:
  in:
    - animal
    - assets
    - biomass
    - breed
    - capacity
    - cohort
    - fodder
    - grazing
    - law
    - livestock
    - lots
    - measure
    - mortality
    - part
    - pasture
    - rotation
    - whole
    - yield
  out:
    - animal
    - assets
    - biomass
    - breed
    - capacity
    - cohort
    - fodder
    - grazing
    - law
    - livestock
    - lots
    - measure
    - mortality
    - part
    - pasture
    - rotation
    - whole
    - yield
typography:
  partition: herd
  bondDegree: 59
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - animal
    - assets
    - breed
    - capacity
    - cohort
    - fodder
    - grazing
    - law
    - livestock
    - lots
    - measure
    - mortality
    - part
    - pasture
    - rotation
    - whole
    - yield
  matrix:
    - animal
    - assets
    - biomass
    - breed
    - capacity
    - cohort
    - fodder
    - grazing
    - law
    - livestock
    - lots
    - measure
    - mortality
    - part
    - pasture
    - rotation
    - whole
    - yield
  backlinks:
    - animal
    - assets
    - biomass
    - breed
    - capacity
    - cohort
    - fodder
    - grazing
    - law
    - livestock
    - lots
    - measure
    - mortality
    - part
    - pasture
    - rotation
    - whole
    - yield
signatures:
  computationUuid: "c3e7957f-0660-8d50-bf9e-15a1bc2ccbce"
  stages:
    - stage: path
      stageUuid: "cb78687f-1f03-81af-a9e5-825b9cf5279f"
    - stage: trinity
      stageUuid: "10a822f5-a069-8eea-abf9-567de497284f"
    - stage: boundary
      stageUuid: "a7dafd37-60f1-8244-8adc-013ea04f69bc"
    - stage: links
      stageUuid: "be40e1d2-08fb-898f-baaa-eccf6079c35d"
    - stage: horo
      stageUuid: "2fe07171-179c-8ac1-ad82-e3543a82cc51"
    - stage: seal
      stageUuid: "13751ec7-360f-8f7c-9bb0-78ddd65081ee"
    - stage: uuid
      stageUuid: "d775f60c-27f4-8edb-a206-312fab5c4c23"
version: 2
---
# herd — the managed animal group; the livestock unit of aggregation

A **herd** is a managed group of [[animal]]s held as one production and accounting unit — *flock* (sheep/poultry), *drove* / *mob* / *sounder* / *band* are the same atom, the species a field. It is the [[livestock]] twin of [[lots]] / [[cohort]]: the unit moved through [[pasture]] paddocks ([[grazing]] [[rotation]]), fed a [[fodder]] ration, bred ([[breed]]), and counted (size in *head*, a [[measure]]). Its [[capacity]] on a given pasture is the **carrying capacity** (stocking rate in animal-units).

The herd aggregates the [[biological/assets|biological-asset]] value of its members and the [[mortality]] that writes it down; the **calf / lamb crop** is its reproductive [[yield]] (a birth [[cohort]]). One herd, many animals — the [[whole]] / [[part]] relation, animal-shaped.

## Standards
- USDA AMS (cattle/livestock market terms — herd, head, classes); FAO
- IFRS IAS-41 (the herd as a group of biological assets)

Composes [[livestock]] · [[animal]] · [[grazing]] · [[pasture]] · [[breed]] · [[fodder]] · [[capacity]] · [[mortality]] · [[cohort]] · [[lots]] · [[yield]] · [[measure]] · [[rotation]] · [[whole]] · [[part]] · [[biological/assets]].

**Law — [[law]]: a herd is one production-and-accounting unit holding many [[animal]]s — the [[livestock]] twin of [[lots]]/[[cohort]], grouped, moved, grazed, and measured together; one whole, many parts.**
