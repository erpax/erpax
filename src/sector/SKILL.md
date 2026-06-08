---
name: sector
description: Use when modelling one sector — the singular model of the sectors collection (the plural store); a broad division of economic activity.
atomPath: sector
coordinate: sector · 2/share · cd44fb79
contentUuid: "d60bdd91-354d-5751-8cc4-a988f4f6f418"
diamondUuid: "3a3f785f-713e-89ea-9cb1-cb89c42712f8"
uuid: "cd44fb79-89e0-8465-a83f-02defc835f1f"
horo: 2
bonds:
  in:
    - balance
    - industry
    - law
    - sectors
  out:
    - balance
    - industry
    - law
    - sectors
typography:
  partition: sector
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - industry
    - law
    - sectors
  matrix:
    - balance
    - industry
    - law
    - sectors
  backlinks:
    - balance
    - industry
    - law
    - sectors
signatures:
  computationUuid: "9f41ce4d-4833-8429-9b29-8a25090e3ff6"
  stages:
    - stage: path
      stageUuid: "4a9478b3-2da5-80a3-8c00-9c565fde233f"
    - stage: trinity
      stageUuid: "0c002dcc-82b6-860b-b92f-ca50d5f57604"
    - stage: boundary
      stageUuid: "17cb2f7f-cfcb-8f9f-aff2-dfb8236a3344"
    - stage: links
      stageUuid: "9b01254f-cef8-8490-a5a1-fc2698acf0df"
    - stage: horo
      stageUuid: "f241a740-72fc-8a1a-aafd-e276fbab3946"
    - stage: seal
      stageUuid: "0f93c59f-af0a-83ac-8cc1-8bd44e8969e4"
    - stage: uuid
      stageUuid: "ce1d5633-09b2-883b-b4a1-d71495a2723d"
version: 2
---
# sector — the model of one [[sectors]] row

A broad division of economic activity. The singular model whose plural store is the [[sectors]] collection ([[balance]]: every collection has its model).

Composes [[sectors]] · [[industry]] · [[balance]].

**Law — [[law]]: a sector is the singular model of exactly one [[sectors]] row — one broad division of economic activity; the model and its plural store always [[balance]].**
