---
name: grazing
description: "Use when livestock consume standing forage in place — grazing on pasture/rangeland, the rotational/managed/adaptive (AMP) move through paddocks (short impact, long recovery), stocking rate and carrying capacity in animal-unit-months. The range-management activity; its rotation reuses the crop rotation atom."
atomPath: grazing
coordinate: grazing · 2/share · 19575fd9
contentUuid: "2c34034b-8eb2-5a1b-a393-d2f9f8486ef0"
diamondUuid: "d5192004-75fd-81af-944a-1f2b9b8f11fd"
uuid: "19575fd9-f338-8697-a46d-a3004b5df68d"
horo: 2
bonds:
  in:
    - capacity
    - fertility
    - flow
    - fodder
    - herd
    - law
    - leases
    - livestock
    - manure
    - measure
    - pasture
    - rotation
    - soil
    - throughput
  out:
    - capacity
    - fertility
    - flow
    - fodder
    - herd
    - law
    - leases
    - livestock
    - manure
    - measure
    - pasture
    - rotation
    - soil
    - throughput
typography:
  partition: grazing
  bondDegree: 47
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - capacity
    - fertility
    - flow
    - fodder
    - herd
    - law
    - leases
    - livestock
    - manure
    - measure
    - pasture
    - rotation
    - soil
    - throughput
  matrix:
    - capacity
    - fertility
    - flow
    - fodder
    - herd
    - law
    - leases
    - livestock
    - manure
    - measure
    - pasture
    - rotation
    - soil
    - throughput
  backlinks:
    - capacity
    - fertility
    - flow
    - fodder
    - herd
    - law
    - leases
    - livestock
    - manure
    - measure
    - pasture
    - rotation
    - soil
    - throughput
signatures:
  computationUuid: "b928d72f-dad1-8b4f-8fe1-d311087fe034"
  stages:
    - stage: path
      stageUuid: "6f385ad1-e02a-822a-84ca-6edc1264c103"
    - stage: trinity
      stageUuid: "928b0eaa-7bb2-83c8-ac3e-0ded53dcb5f6"
    - stage: boundary
      stageUuid: "a47392a8-eb37-844f-9379-47f4168e8592"
    - stage: links
      stageUuid: "c9c6ce2d-e609-833c-9529-4c75f972562f"
    - stage: horo
      stageUuid: "40f96731-711a-80a3-bab3-466fbc1e74b9"
    - stage: seal
      stageUuid: "873ff206-e3d6-86eb-8d35-c6a9f46a3d8c"
    - stage: uuid
      stageUuid: "ab02e8a1-3f5c-8c04-a0f8-d083c8427dec"
version: 2
---
# grazing — livestock eating standing forage in place

**grazing** is [[livestock]] consuming standing forage in situ on [[pasture]] or rangeland — the core range-management activity, the animal-shaped alternative to harvested [[fodder]]. **Rotational / managed / adaptive multi-paddock (AMP)** grazing moves the [[herd]] through paddocks with short impact + long recovery to lift forage and [[soil]] carbon — this is the SAME [[rotation]] atom as crop rotation (method is a field, paddocks ↔ fields), not a parallel concept.

Its constraint is [[capacity]] — the **carrying capacity** (sustainable **stocking rate**), measured in **animal-unit-months (AUM)**, a [[measure]] of forage demand the pasture [[leases|lease]] is priced in. Forage **utilization** (the fraction actually eaten) is the [[throughput]] multiplier. Grazing closes to [[fertility]] via deposited [[manure]] ([[flow]]: the nutrient cycle).

## Standards
- USDA-NRCS (carrying capacity & stocking-rate determination); UNL / extension (AUM)
- Savory Institute / AMP grazing science (adaptive multi-paddock); FAO grazing systems

**Law — [[law]]: livestock consuming standing forage in place, bounded by carrying [[capacity]] (the stocking rate in AUM); its paddock move is the SAME [[rotation]] atom as crop rotation, and it closes to [[fertility]] via deposited manure.**

Composes [[livestock]] · [[pasture]] · [[herd]] · [[rotation]] · [[capacity]] · [[measure]] · [[throughput]] · [[fodder]] · [[manure]] · [[fertility]] · [[soil]] · [[flow]] · [[leases]].
