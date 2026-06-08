---
name: tagging
description: Use when modelling one tagging — the singular model of the taggings collection (the plural store); the act of attaching a tag to a record.
atomPath: tagging
coordinate: tagging · 4/weave · c2cf4f43
contentUuid: "978cd9a6-8532-522d-9da2-4f4364b72186"
diamondUuid: "99e1223f-965e-8aa3-8a79-7fae50f19316"
uuid: "c2cf4f43-1415-87cd-98ec-293f365596bd"
horo: 4
bonds:
  in:
    - balance
    - tag
    - taggings
  out:
    - balance
    - tag
    - taggings
typography:
  partition: tagging
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - tag
    - taggings
  matrix:
    - balance
    - tag
    - taggings
  backlinks:
    - balance
    - tag
    - taggings
signatures:
  computationUuid: "e57e358c-9781-8b4d-a00f-a1309b67c04b"
  stages:
    - stage: path
      stageUuid: "0229d620-d8ef-853f-a1a3-2937bad0631f"
    - stage: trinity
      stageUuid: "873403e1-3d9d-80fb-90d6-e7ebd574dd14"
    - stage: boundary
      stageUuid: "60f26b84-cd93-876d-857e-a6f0dd0a024e"
    - stage: links
      stageUuid: "9b59a0c0-349a-8324-8785-f87212382e89"
    - stage: horo
      stageUuid: "0f27af3d-8739-8a70-870a-3a4fa23cb855"
    - stage: seal
      stageUuid: "8ad2fad1-24aa-8396-bd89-d666fbd64d8e"
    - stage: uuid
      stageUuid: "e00f7314-b812-82a8-bb4f-c88aa4978dc8"
version: 2
---
# tagging — the model of one [[taggings]] row

The act of attaching a tag to a record. The singular model whose plural store is the [[taggings]] collection ([[balance]]: every collection has its model).

Composes [[taggings]] · [[tag]] · [[balance]].
