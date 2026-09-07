---
name: push
description: "Use when a sealed tree should land by itself — the stop-hook body that runs the full seal, then commits and pushes, detached and lock-guarded, and touches nothing when the seal is red."
atomPath: "confirm/push"
coordinate: "confirm/push · 2/share · 3ab5c4de"
contentUuid: "771a1232-7026-54ee-90c4-239242464ab7"
diamondUuid: "99d23461-f66e-8e9e-8041-19a43bdaa5a6"
uuid: "3ab5c4de-5a6d-8f32-8aee-b023462d8e22"
horo: 2
typography:
  partition: confirm
  bondDegree: 9
standards:
  - "ISO-19011:2018 audit-trail self-heal-visible-in-git-log"
bindings: []
signatures:
  computationUuid: "4baccf95-26d9-8408-9bc8-359701e0ceff"
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
      stageUuid: "02b5cbe1-9687-8e6a-96fc-3836707779bb"
    - stage: seal
      stageUuid: "dbc69dbd-904e-8f6c-9bf6-5ed9dddf9b2f"
    - stage: uuid
      stageUuid: "68b95935-c61f-8ae8-b94a-fa575c35cf30"
version: 2
---
# confirm/push — a green seal lands itself

When a turn leaves a complete sealed tree, this is what saves it: `confirm --full`, then commit (firing pre-commit), then push (firing pre-push). Only a GREEN seal may commit; an unsealed tree is left exactly as it was.

It runs DETACHED so a turn never blocks on the integration lane, and a single lock keeps two waves from interleaving.

**Honest boundary.** This proves the seal was green *at the moment it ran*, never that the push will survive CI — the remote gate is a different environment and remains the final arbiter.

Composes: [[confirm]] · [[gate]] · [[seal]].
