---
name: probe
description: "Use when gateTypecheck needs a compile-load target — the minimal uuid-substrate probe, deliberately importing nothing that imports it back."
atomPath: "confirm/probe"
coordinate: "confirm/probe · 4/weave · 902705cd"
contentUuid: "142d1ccf-90f2-5bf9-b4b6-613209b294cf"
diamondUuid: "9527b040-f500-83b3-8792-239a036eed80"
uuid: "902705cd-f99f-8e91-a2ce-2548a2a079f4"
horo: 4
typography:
  partition: confirm
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "4b372f4d-8bd2-8fc0-ab33-a1b11f026222"
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
      stageUuid: "85f981ab-a7c6-8617-8a93-3a4313ad1176"
    - stage: seal
      stageUuid: "cacf9ed4-f522-8196-85e0-55330aa4e484"
    - stage: uuid
      stageUuid: "b821c42c-702a-8dd3-ae19-3284294c1583"
version: 2
---
# confirm/probe — the smallest thing that proves the substrate compiles

`gateTypecheck` asks one question: does the uuid substrate still compile and load? It answers it by importing this atom, which touches [[guardian]] and [[seal]] and nothing else.

The point is what it does NOT import. A probe that loaded the gate stack would import the module that spawns it, and the answer would be about the probe's own recursion rather than the substrate ([[rules]]/cycle: an import loop makes initialisation order an accident).

Composes: [[confirm]] · [[guardian]] · [[seal]].
