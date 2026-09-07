---
name: probe
description: "Use when gateTypecheck needs a compile-load target — the minimal uuid-substrate probe, deliberately importing nothing that imports it back."
atomPath: "confirm/probe"
coordinate: "confirm/probe · 8/crest · 663e130e"
contentUuid: "5d7dfeca-c0ee-5456-b6b4-c2da77a7f233"
diamondUuid: "d2c29d3e-0e06-865e-8f0c-3c5cad96c245"
uuid: "663e130e-5935-8e0f-b811-93948050b2cb"
horo: 8
typography:
  partition: confirm
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "7e7c9db0-cec5-8c11-8beb-c1e415411357"
  stages:
    - stage: path
      stageUuid: "f0efc312-fb74-86d6-a032-231d76a6079e"
    - stage: trinity
      stageUuid: "d94e00d1-9400-8583-b9d2-46085cd3d95c"
    - stage: boundary
      stageUuid: "e2b28e80-2645-87d8-8099-c42763a1fa31"
    - stage: links
      stageUuid: "ecb3608d-648e-8547-83fc-18e54c8fcd18"
    - stage: horo
      stageUuid: "6ea5ac1a-620b-84cd-b2a0-ef2d495b13b2"
    - stage: seal
      stageUuid: "cacf9ed4-f522-8196-85e0-55330aa4e484"
    - stage: uuid
      stageUuid: "28cb0bd4-64c4-858a-91a9-24f264b39d62"
version: 2
---
# confirm/probe — the smallest thing that proves the substrate compiles

`gateTypecheck` asks one question: does the uuid substrate still compile and load? It answers it by importing this atom, which touches [[guardian]] and [[seal]] and nothing else.

The point is what it does NOT import. A probe that loaded the gate stack would import the module that spawns it, and the answer would be about the probe's own recursion rather than the substrate ([[rules]]/cycle: an import loop makes initialisation order an accident).

Composes: [[confirm]] · [[guardian]] · [[seal]].
