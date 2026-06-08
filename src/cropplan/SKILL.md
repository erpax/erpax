---
name: cropplan
description: "Use when converting a sales/yield goal into what to grow, how much, when, and where — the crop plan (the what/how-much: quantities, seed, beds) and its spatial twin the field plan/map (the where: each succession assigned to a bed/block). The master planning document of a market farm; the backward demand→land calculation made concrete and recorded."
atomPath: cropplan
coordinate: cropplan · 7/descent · 000a71f1
contentUuid: "1d6b0c66-2b4f-5ebb-a63a-8d0e859f6da8"
diamondUuid: "f61b1cf1-f7d3-8b21-8158-a46293fcceb3"
uuid: "000a71f1-3c4b-875a-bc12-e032bd32da23"
horo: 7
bonds:
  in:
    - agriculture
    - allocation
    - crop
    - enterprisebudget
    - forecast
    - harvest
    - items
    - law
    - manufacturing
    - planting
    - rotation
    - schedule
    - season
    - seed
    - variant
    - version
    - yield
  out:
    - agriculture
    - allocation
    - crop
    - enterprisebudget
    - forecast
    - harvest
    - items
    - law
    - manufacturing
    - planting
    - rotation
    - schedule
    - season
    - seed
    - variant
    - version
    - yield
typography:
  partition: cropplan
  bondDegree: 53
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - allocation
    - crop
    - forecast
    - harvest
    - law
    - manufacturing
    - planting
    - rotation
    - schedule
    - season
    - seed
    - version
    - yield
  matrix:
    - agriculture
    - allocation
    - crop
    - enterprisebudget
    - forecast
    - harvest
    - items
    - law
    - manufacturing
    - planting
    - rotation
    - schedule
    - season
    - seed
    - variant
    - version
    - yield
  backlinks:
    - agriculture
    - allocation
    - crop
    - enterprisebudget
    - forecast
    - harvest
    - items
    - law
    - manufacturing
    - planting
    - rotation
    - schedule
    - season
    - seed
    - variant
    - version
    - yield
signatures:
  computationUuid: "e25a8b0b-1736-8db3-a6d9-2ab1b127bb14"
  stages:
    - stage: path
      stageUuid: "3fce129a-850b-895a-9175-5226c73854f0"
    - stage: trinity
      stageUuid: "7b3f34e7-9b97-83af-9f9d-f52a32409cc8"
    - stage: boundary
      stageUuid: "0497b643-7f6d-85f1-8b3a-df63b5156b02"
    - stage: links
      stageUuid: "4d36b976-e690-83c9-b6c6-5b3c7dbeaf8e"
    - stage: horo
      stageUuid: "5e631afe-becf-82e5-8ab6-3c16645619bf"
    - stage: seal
      stageUuid: "251c4bd7-0bfc-88d4-ad11-2a777a7ea179"
    - stage: uuid
      stageUuid: "c7d8e7ae-ef2a-8254-b193-721d819f9b82"
version: 2
---
# cropplan — the document that turns a sales goal into what/how-much/when/where

A **crop plan** is the master planning document that converts a sales/[[yield]] goal into **what to grow, how much, when, and where** — [[agriculture]]'s backward demand→land calculation made concrete and recorded. Its two faces: the **crop plan** proper (the *what/how-much*: quantities per [[crop]], [[seed]] order, bed-feet, [[planting]] dates) and the **field plan / map** (the *where*: each [[planting|succession]] assigned to a bed/block — the spatial [[allocation]] that also drives [[rotation]]). Flattened and sorted by date, it becomes the field planting [[schedule]] that runs the [[season]].

The crop plan is the recorded, re-runnable form of the planning chain — demand → units → bed-feet → [[seed]] + inputs → [[forecast|availability]]. It closes the loop with field/[[harvest]] records: actuals refine next year's [[yield]] coefficients and buffers, so the plan is a [[version|versioned]] document, not a one-shot. It is the [[manufacturing|MRP]] run-sheet of the farm.

## Standards
- CEFS / NC State — *Planning Spreadsheets for CSA and Farmers' Markets* (the source artifact); Brookfield Farm crop planning
- Coleman / Fortier — the crop plan & field map; UMN Extension — crop & field planning tools
- Wiswall — crop plan tied to enterprise budgets

Composes [[agriculture]] · [[crop]] · [[planting]] · [[seed]] · [[yield]] · [[rotation]] · [[allocation]] · [[schedule]] · [[forecast]] · [[season]] · [[harvest]] · [[manufacturing]] · [[version]].

**Law — [[law]]: a crop plan is the recorded, re-runnable backward computation from a sales/[[yield]] goal to what/how-much/when/where (demand → units → bed-feet → [[seed]]); actuals feed back to refine next year's coefficients, so it is versioned, never a one-shot.**
