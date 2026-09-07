---
name: push
description: "Use when a sealed tree should land by itself — the stop-hook body that runs the full seal, then commits and pushes, detached and lock-guarded, and touches nothing when the seal is red."
atomPath: "confirm/push"
coordinate: "confirm/push · 4/weave · 937bd183"
contentUuid: "c549454b-db8e-5ae1-9ea3-da71074c952f"
diamondUuid: "6aecd250-2adc-8a57-9c04-61a3af8fc98e"
uuid: "937bd183-db55-8e16-afa6-4a1e4f4167ec"
horo: 4
typography:
  partition: confirm
  bondDegree: 9
standards:
  - "ISO-19011:2018 audit-trail self-heal-visible-in-git-log"
bindings: []
signatures:
  computationUuid: "b6df4321-0049-8b01-803e-30594fb7c97c"
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
      stageUuid: "821e1700-140e-8055-b5f5-1bd2480799d3"
    - stage: seal
      stageUuid: "dbc69dbd-904e-8f6c-9bf6-5ed9dddf9b2f"
    - stage: uuid
      stageUuid: "2ba96e34-7b33-8c00-8db5-e9c12cfad69c"
version: 2
---
# confirm/push — a green seal lands itself

When a turn leaves a complete sealed tree, this is what saves it: `confirm --full`, then commit (firing pre-commit), then push (firing pre-push). Only a GREEN seal may commit; an unsealed tree is left exactly as it was.

It runs DETACHED so a turn never blocks on the integration lane, and a single lock keeps two waves from interleaving.

**Honest boundary.** This proves the seal was green *at the moment it ran*, never that the push will survive CI — the remote gate is a different environment and remains the final arbiter.

Composes: [[confirm]] · [[gate]] · [[seal]].
