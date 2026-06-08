---
name: binding
description: Use when modelling one binding — the singular model of the bindings collection (the plural store); a configured link between a name and the resource that backs it.
atomPath: binding
coordinate: binding · 7/descent · c11e45eb
contentUuid: "6e87067d-36e9-5818-96b1-d0f254fb84e7"
diamondUuid: "0ea51b9d-a1f5-833e-9805-a853dd6fdc55"
uuid: "c11e45eb-bc69-88c9-a07c-87ab5d47f736"
horo: 7
bonds:
  in:
    - balance
    - bindings
    - config
  out:
    - balance
    - bindings
    - config
typography:
  partition: binding
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - bindings
    - config
  matrix:
    - balance
    - bindings
    - config
  backlinks:
    - balance
    - bindings
    - config
signatures:
  computationUuid: "0da6225f-ba6f-8f66-80eb-ec106b2f951f"
  stages:
    - stage: path
      stageUuid: "61e38930-1e4f-8a62-b965-d29faf6238eb"
    - stage: trinity
      stageUuid: "f5b15057-9f73-89b1-aaf3-dbdcb5891c70"
    - stage: boundary
      stageUuid: "231a6685-dc5f-8d3b-954a-e729f6152c53"
    - stage: links
      stageUuid: "23df5138-943a-8f7c-8fbd-cd5bb065d7af"
    - stage: horo
      stageUuid: "097640b2-9820-82c0-a43b-c3c6e62315ec"
    - stage: seal
      stageUuid: "22b4d167-80b8-821a-bfed-84a0a3dd8691"
    - stage: uuid
      stageUuid: "b578a670-caf1-8761-8759-ae13fdc3d5ed"
version: 2
---
# binding — the model of one [[bindings]] row

A configured link between a name and the resource that backs it. The singular model whose plural store is the [[bindings]] collection ([[balance]]: every collection has its model).

Composes [[bindings]] · [[config]] · [[balance]].
