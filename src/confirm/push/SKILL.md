---
name: push
description: "Use when a sealed tree should land by itself — the stop-hook body that runs the full seal, then commits and pushes, detached and lock-guarded, and touches nothing when the seal is red."
atomPath: "confirm/push"
coordinate: "confirm/push · 1/base · 47126b33"
contentUuid: "69f8ac07-8091-5aad-a862-b485ffa2e113"
diamondUuid: "af9a39eb-258b-8c03-9f43-bec51b4ef68b"
uuid: "47126b33-ccb5-8fbf-bc55-819597aeadf1"
horo: 1
typography:
  partition: confirm
  bondDegree: 9
standards:
  - "ISO-19011:2018 audit-trail self-heal-visible-in-git-log"
bindings: []
signatures:
  computationUuid: "20df4306-5725-80ae-90d0-eca9a6c2b567"
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
      stageUuid: "6b1888a5-6a72-82ab-afec-b2a41361022c"
    - stage: seal
      stageUuid: "dbc69dbd-904e-8f6c-9bf6-5ed9dddf9b2f"
    - stage: uuid
      stageUuid: "e1bbf8d7-b5b5-830a-ac31-ae9a4fff347e"
version: 2
---
# confirm/push — a green seal lands itself

When a turn leaves a complete sealed tree, this is what saves it: `confirm --full`, then commit (firing pre-commit), then push (firing pre-push). Only a GREEN seal may commit; an unsealed tree is left exactly as it was.

It runs DETACHED so a turn never blocks on the integration lane, and a single lock keeps two waves from interleaving.

**Honest boundary.** This proves the seal was green *at the moment it ran*, never that the push will survive CI — the remote gate is a different environment and remains the final arbiter.

Composes: [[confirm]] · [[gate]] · [[seal]].
