---
name: push
description: "Use when a sealed tree should land by itself — the stop-hook body that runs the full seal, then commits and pushes, detached and lock-guarded, and touches nothing when the seal is red."
atomPath: "confirm/push"
coordinate: "confirm/push · 8/crest · bf537010"
contentUuid: "f5b6055e-1953-50a7-bbdd-ab821c2fac1c"
diamondUuid: "14e1813b-3519-830e-a8c6-09ae6b16e6ef"
uuid: "bf537010-d1ff-8dd5-93c8-1c45d6130c20"
horo: 8
typography:
  partition: confirm
  bondDegree: 9
standards:
  - "ISO-19011:2018 audit-trail self-heal-visible-in-git-log"
bindings: []
signatures:
  computationUuid: "5b0744e5-a733-8ae2-aa0c-432c21f5a3fc"
  stages:
    - stage: path
      stageUuid: "4eee8a73-e6ba-8e8a-8752-45eed9f6ce45"
    - stage: trinity
      stageUuid: "f18563b0-30f9-8212-ac61-31173b4aebe7"
    - stage: boundary
      stageUuid: "52801d71-e681-8f0e-ab71-54c20fbb1275"
    - stage: links
      stageUuid: "cfba91b0-d1f1-8b9c-99d3-e710bdcbf5a2"
    - stage: horo
      stageUuid: "ebbe669f-e01b-8fc7-a88a-5b6beb379b0a"
    - stage: seal
      stageUuid: "dbc69dbd-904e-8f6c-9bf6-5ed9dddf9b2f"
    - stage: uuid
      stageUuid: "ebfa8136-61f3-81be-9ee2-f8b5e34ea54a"
version: 2
---
# confirm/push — a green seal lands itself

When a turn leaves a complete sealed tree, this is what saves it: `confirm --full`, then commit (firing pre-commit), then push (firing pre-push). Only a GREEN seal may commit; an unsealed tree is left exactly as it was.

It runs DETACHED so a turn never blocks on the integration lane, and a single lock keeps two waves from interleaving.

**Honest boundary.** This proves the seal was green *at the moment it ran*, never that the push will survive CI — the remote gate is a different environment and remains the final arbiter.

Composes: [[confirm]] · [[gate]] · [[seal]].
