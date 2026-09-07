---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 5/round · 0f4582da"
contentUuid: "0f49d608-952b-5c16-b5d5-5812517fee8f"
diamondUuid: "971cb4e4-90c8-81c8-9b61-bf12a95e1e0a"
uuid: "0f4582da-51f4-8279-9c0d-5c4bdd8671dd"
horo: 5
typography:
  partition: sale
  bondDegree: 62
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "6725c2e6-97f6-8f30-a5b4-0ead64b35371"
  stages:
    - stage: path
      stageUuid: "9475047f-d863-8072-9363-8f96fa850263"
    - stage: trinity
      stageUuid: "b956d6df-8c6f-849e-b262-461e833a56ed"
    - stage: boundary
      stageUuid: "2b624144-ef54-8df8-b907-6aaf792a67ce"
    - stage: links
      stageUuid: "26ee034d-11b0-82ad-9eec-fe59d0bfe14a"
    - stage: horo
      stageUuid: "ad0d96c5-ac55-8e05-af73-602fc137708e"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "49574035-7346-84eb-a158-105355529bb9"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
