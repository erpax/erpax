---
name: probe
description: "Use when gateTypecheck needs a compile-load target — the minimal uuid-substrate probe, deliberately importing nothing that imports it back."
atomPath: "confirm/probe"
coordinate: "confirm/probe · 8/crest · aa1c520c"
contentUuid: "4e20e48d-4aa1-551d-bf14-489a11b02f12"
diamondUuid: "5f910153-2d51-8fc7-b1de-4c2fa690aa48"
uuid: "aa1c520c-c8c3-8ad7-bcc9-ba0edb6a705b"
horo: 8
typography:
  partition: confirm
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "f6e6878e-cf4c-8ea5-bf7b-3f62bad98b2a"
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
      stageUuid: "0da95d5e-335d-8abf-b056-b77f8dfbfcb6"
    - stage: seal
      stageUuid: "cacf9ed4-f522-8196-85e0-55330aa4e484"
    - stage: uuid
      stageUuid: "fd603e3f-4a6e-8594-bc1f-cccff8ab62cd"
version: 2
---
# confirm/probe — the smallest thing that proves the substrate compiles

`gateTypecheck` asks one question: does the uuid substrate still compile and load? It answers it by importing this atom, which touches [[guardian]] and [[seal]] and nothing else.

The point is what it does NOT import. A probe that loaded the gate stack would import the module that spawns it, and the answer would be about the probe's own recursion rather than the substrate ([[rules]]/cycle: an import loop makes initialisation order an accident).

Composes: [[confirm]] · [[guardian]] · [[seal]].
