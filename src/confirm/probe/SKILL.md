---
name: probe
description: "Use when gateTypecheck needs a compile-load target — the minimal uuid-substrate probe, deliberately importing nothing that imports it back."
atomPath: "confirm/probe"
coordinate: "confirm/probe · 4/weave · 738573b4"
contentUuid: "945ae5b3-43a7-5707-831b-143c82bfb9df"
diamondUuid: "6673e82c-9561-8efa-bd1b-1ab6359f8043"
uuid: "738573b4-8183-88b3-b746-e43a246015b8"
horo: 4
typography:
  partition: confirm
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "d9cac7b1-895b-822b-875d-1084f908bd26"
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
      stageUuid: "e2599f87-8c5a-8a0d-b7b7-7ef4105e9802"
    - stage: seal
      stageUuid: "cacf9ed4-f522-8196-85e0-55330aa4e484"
    - stage: uuid
      stageUuid: "f7180a37-18ba-8551-9898-6c4ce29f72f0"
version: 2
---
# confirm/probe — the smallest thing that proves the substrate compiles

`gateTypecheck` asks one question: does the uuid substrate still compile and load? It answers it by importing this atom, which touches [[guardian]] and [[seal]] and nothing else.

The point is what it does NOT import. A probe that loaded the gate stack would import the module that spawns it, and the answer would be about the probe's own recursion rather than the substrate ([[rules]]/cycle: an import loop makes initialisation order an accident).

Composes: [[confirm]] · [[guardian]] · [[seal]].
