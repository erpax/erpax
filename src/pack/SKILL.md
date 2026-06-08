---
name: pack
description: Use when modelling one pack — the singular model of the packs collection (the plural store); a bundled unit of items handled as one.
atomPath: pack
coordinate: pack · 1/base · 931ea2d8
contentUuid: "4d75dec3-4315-5957-871c-14325ac74c8c"
diamondUuid: "679dfb50-35d8-8598-9290-da5af5b2b435"
uuid: "931ea2d8-08d3-8841-8283-a42ef33fc52b"
horo: 1
bonds:
  in:
    - balance
    - law
    - packs
    - product
  out:
    - balance
    - law
    - packs
    - product
typography:
  partition: pack
  bondDegree: 12
  neighbors: []
standards:
  - "ISA-95"
  - "ISO/IEC-29119"
  - "UN-CEFACT"
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - packs
    - product
  matrix:
    - balance
    - law
    - packs
    - product
  backlinks:
    - balance
    - law
    - packs
    - product
signatures:
  computationUuid: "e042e7ff-e3b9-8e11-8d20-6422dd6a4bef"
  stages:
    - stage: path
      stageUuid: "840b847c-f83b-8e52-9b65-f101339b6658"
    - stage: trinity
      stageUuid: "45f95f12-d1bf-8e06-a56e-f96d74e6e99b"
    - stage: boundary
      stageUuid: "51a340da-0a56-8b05-8bd6-055635b32ce6"
    - stage: links
      stageUuid: "2b633144-9f2a-84da-a07f-65ed382ae12a"
    - stage: horo
      stageUuid: "cc43518e-55a2-8bc7-95d3-bc6b9c4cf311"
    - stage: seal
      stageUuid: "38e37203-96ea-85e9-94aa-e1d2c99a04d1"
    - stage: uuid
      stageUuid: "ccdca0a5-3fbd-8913-97ff-c477a0907381"
version: 2
---
# pack — the model of one [[packs]] row

A bundled unit of items handled as one. The singular model whose plural store is the [[packs]] collection ([[balance]]: every collection has its model).

Composes [[packs]] · [[product]] · [[balance]].

**Law — [[law]]: a pack is the singular model of one packs row — a bundled unit of [[product]] items handled as one.**
