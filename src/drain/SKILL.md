---
name: drain
description: Use when modelling one drain — the singular model of the drains collection (the plural store); a sink that draws down a resource or stock.
atomPath: drain
coordinate: drain · 2/share · 4901ee01
contentUuid: "63f67179-549c-54af-91ff-fa4c919a950c"
diamondUuid: "0a7bed9d-a315-811d-af5b-7399be81df8e"
uuid: "4901ee01-6e89-8c91-8e97-9f14a58d2a0a"
horo: 2
bonds:
  in:
    - balance
    - drains
    - resource
  out:
    - balance
    - drains
    - resource
typography:
  partition: drain
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - drains
    - resource
  matrix:
    - balance
    - drains
    - resource
  backlinks:
    - balance
    - drains
    - resource
signatures:
  computationUuid: "db97cd30-a200-8630-80c1-88a5282e940b"
  stages:
    - stage: path
      stageUuid: "a540b599-2105-8328-b822-d265cd7d7c24"
    - stage: trinity
      stageUuid: "89be87a5-007e-8de2-92d4-f5ebf97be61b"
    - stage: boundary
      stageUuid: "e37c7109-d5aa-876b-a6d9-29d98b7aaff6"
    - stage: links
      stageUuid: "79a49415-8f0b-80b0-b68e-7441b54f4a25"
    - stage: horo
      stageUuid: "24100df5-6dcd-8cab-921c-80e49a2aad55"
    - stage: seal
      stageUuid: "46bcce10-65fe-8c4b-a7a6-4bde8aa83fed"
    - stage: uuid
      stageUuid: "e326e99b-c5b8-8b02-92c4-7f256066cc85"
version: 2
---
# drain — the model of one [[drains]] row

A sink that draws down a resource or stock. The singular model whose plural store is the [[drains]] collection ([[balance]]: every collection has its model).

Composes [[drains]] · [[resource]] · [[balance]].
