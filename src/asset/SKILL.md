---
name: asset
description: Use when modelling one asset — the singular model of the assets collection (the plural store); a resource the organization owns or controls that carries economic value.
atomPath: asset
coordinate: asset · 2/share · e264acbe
contentUuid: "384fca3c-04ee-53b0-8831-a85de73c4270"
diamondUuid: "24affd62-6d37-80a6-b142-ac589935880b"
uuid: "e264acbe-4350-8a36-901d-916c0330525f"
horo: 2
bonds:
  in:
    - accounting
    - assets
    - balance
    - law
    - readme
  out:
    - accounting
    - assets
    - balance
    - law
    - readme
typography:
  partition: asset
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - assets
    - balance
    - law
  matrix:
    - accounting
    - assets
    - balance
    - law
    - readme
  backlinks:
    - accounting
    - assets
    - balance
    - law
    - readme
signatures:
  computationUuid: "00783c71-61b3-8f97-ab95-825e5c9e2e05"
  stages:
    - stage: path
      stageUuid: "2037b2cf-965e-8d35-b4ad-ff95bbfe25e1"
    - stage: trinity
      stageUuid: "230fe776-38ae-8e88-bcc9-d67044bebf15"
    - stage: boundary
      stageUuid: "7ffacbd4-2cd9-8185-b2fb-32c819036f1c"
    - stage: links
      stageUuid: "f34ea957-8370-80e6-a6c7-ce917e354a9c"
    - stage: horo
      stageUuid: "ca9cf1c4-212a-8423-9bca-ddd2a6a95e86"
    - stage: seal
      stageUuid: "88152fd8-d452-8020-bc56-16efcb9083b4"
    - stage: uuid
      stageUuid: "83be88b2-66fe-8ac3-afd7-496aea68f662"
version: 2
---
# asset — the model of one [[assets]] row

A resource the organization owns or controls that carries economic value. The singular model whose plural store is the [[assets]] collection ([[balance]]: every collection has its model).

Composes [[assets]] · [[accounting]] · [[balance]].

**Law — [[law]]: asset is the singular model of exactly one [[assets]] row — a resource the organization owns or controls carrying economic value; every collection has its model ([[balance]]).**
