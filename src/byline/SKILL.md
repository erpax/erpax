---
name: byline
description: Use when modelling one byline — the singular model of the bylines collection (the plural store); the credited author line on a published article.
atomPath: byline
coordinate: byline · 7/descent · 54f337ce
contentUuid: "4c1de17e-7d2f-55f1-a16f-2a64d3b8d7df"
diamondUuid: "3f781fa3-fc4c-893f-a4b0-98978c76619b"
uuid: "54f337ce-6a7d-8f2d-8b0f-70207cd4224b"
horo: 7
bonds:
  in:
    - article
    - balance
    - bylines
  out:
    - article
    - balance
    - bylines
typography:
  partition: byline
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - article
    - balance
    - bylines
  matrix:
    - article
    - balance
    - bylines
  backlinks:
    - article
    - balance
    - bylines
signatures:
  computationUuid: "810e37a0-c31c-8e0f-aeb4-0ddd6e4f1269"
  stages:
    - stage: path
      stageUuid: "69c3d997-487f-8641-a9e1-5bd98d5393d0"
    - stage: trinity
      stageUuid: "ff01cdc2-aafa-8463-9827-d9c6d98dcdde"
    - stage: boundary
      stageUuid: "935b96a2-3a3e-871e-9964-83e141b5b347"
    - stage: links
      stageUuid: "7b401ba5-2d07-870d-8f67-ce5e5c62580c"
    - stage: horo
      stageUuid: "eaae9cf8-267a-8c2e-8e38-09793d42e6c8"
    - stage: seal
      stageUuid: "df6b7083-abef-82ff-aa9b-cae7b19fe0a0"
    - stage: uuid
      stageUuid: "3aa20e15-f7ca-813d-bf65-3e8ac0886630"
version: 2
---
# byline — the model of one [[bylines]] row

The credited author line on a published article. The singular model whose plural store is the [[bylines]] collection ([[balance]]: every collection has its model).

Composes [[bylines]] · [[article]] · [[balance]].
