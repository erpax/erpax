---
name: probe
description: "Use when gateTypecheck needs a compile-load target — the minimal uuid-substrate probe, deliberately importing nothing that imports it back."
atomPath: "confirm/probe"
coordinate: "confirm/probe · 5/round · 3d2c4726"
contentUuid: "c3a88cb5-6ed1-5681-9e90-dce75e57dd03"
diamondUuid: "78eb40b5-4801-8e41-b51e-36a28f9dbef3"
uuid: "3d2c4726-d62d-87b0-a553-3600a22e1c4b"
horo: 5
typography:
  partition: confirm
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "3d5c63d6-7263-8e1b-a437-6b40ca1a6273"
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
      stageUuid: "176b8c71-eade-8a8f-a5b7-cb4e3ea28eac"
    - stage: seal
      stageUuid: "cacf9ed4-f522-8196-85e0-55330aa4e484"
    - stage: uuid
      stageUuid: "e3f47604-2e98-813a-be72-5dacf5d0b4d7"
version: 2
---
# confirm/probe — the smallest thing that proves the substrate compiles

`gateTypecheck` asks one question: does the uuid substrate still compile and load? It answers it by importing this atom, which touches [[guardian]] and [[seal]] and nothing else.

The point is what it does NOT import. A probe that loaded the gate stack would import the module that spawns it, and the answer would be about the probe's own recursion rather than the substrate ([[rules]]/cycle: an import loop makes initialisation order an accident).

Composes: [[confirm]] · [[guardian]] · [[seal]].
