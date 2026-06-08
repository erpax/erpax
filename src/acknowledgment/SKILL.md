---
name: acknowledgment
description: Use when modelling one acknowledgment — the singular model of the acknowledgments collection (the plural store); a formal confirmation that something was received or accepted.
atomPath: acknowledgment
coordinate: acknowledgment · 2/share · 0cded450
contentUuid: "cbe3dfb4-4ef8-56b4-b78f-00e21bcbac78"
diamondUuid: "38f79d08-a542-882d-b307-d21fa45b8740"
uuid: "0cded450-d73e-8c8c-be36-b1fdf0bbf6f7"
horo: 2
bonds:
  in:
    - acknowledgments
    - balance
    - document
  out:
    - acknowledgments
    - balance
    - document
typography:
  partition: acknowledgment
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - acknowledgments
    - balance
    - document
  matrix:
    - acknowledgments
    - balance
    - document
  backlinks:
    - acknowledgments
    - balance
    - document
signatures:
  computationUuid: "c186b2c8-8a8c-8f85-8ec1-f0e5a1e7ec75"
  stages:
    - stage: path
      stageUuid: "339c414d-2eeb-8ef5-a64c-22b0c14eaaae"
    - stage: trinity
      stageUuid: "9b6354ae-fca3-86a1-b53b-38a12dd6f201"
    - stage: boundary
      stageUuid: "836885f3-c255-8956-bdb2-06595ca55282"
    - stage: links
      stageUuid: "3018b8f1-a690-89f7-a8b6-a344fed75764"
    - stage: horo
      stageUuid: "337dde74-4986-80e8-9141-ac5ff61ddd4e"
    - stage: seal
      stageUuid: "5057a168-35a4-89f5-bbc2-d221beb12afc"
    - stage: uuid
      stageUuid: "b8532bd9-d3f4-84e2-a23a-1da49beb8b89"
version: 2
---
# acknowledgment — the model of one [[acknowledgments]] row

A formal confirmation that something was received or accepted. The singular model whose plural store is the [[acknowledgments]] collection ([[balance]]: every collection has its model).

Composes [[acknowledgments]] · [[document]] · [[balance]].
