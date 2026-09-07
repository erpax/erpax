---
name: push
description: "Use when a sealed tree should land by itself — the stop-hook body that runs the full seal, then commits and pushes, detached and lock-guarded, and touches nothing when the seal is red."
atomPath: "confirm/push"
coordinate: "confirm/push · 2/share · 05d3da27"
contentUuid: "443c6258-39a3-5e41-8cd9-9453db6b041a"
diamondUuid: "a773ea40-1722-8d4f-9066-146fa246a837"
uuid: "05d3da27-15a4-83ec-a3f6-8c5e85250f5c"
horo: 2
typography:
  partition: confirm
  bondDegree: 9
standards:
  - "ISO-19011:2018 audit-trail self-heal-visible-in-git-log"
bindings: []
signatures:
  computationUuid: "dd25bf5a-0b34-8832-b33a-e6e4de001d55"
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
      stageUuid: "c91c883d-807f-8bb9-a680-50e520cf0b66"
    - stage: seal
      stageUuid: "dbc69dbd-904e-8f6c-9bf6-5ed9dddf9b2f"
    - stage: uuid
      stageUuid: "9eb0b10c-624a-8367-bc81-983cd123511e"
version: 2
---
# confirm/push — a green seal lands itself

When a turn leaves a complete sealed tree, this is what saves it: `confirm --full`, then commit (firing pre-commit), then push (firing pre-push). Only a GREEN seal may commit; an unsealed tree is left exactly as it was.

It runs DETACHED so a turn never blocks on the integration lane, and a single lock keeps two waves from interleaving.

**Honest boundary.** This proves the seal was green *at the moment it ran*, never that the push will survive CI — the remote gate is a different environment and remains the final arbiter.

Composes: [[confirm]] · [[gate]] · [[seal]].
