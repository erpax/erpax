---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 7/descent · 827b2aa2"
contentUuid: "eacdbefd-e6ae-5ddc-86d7-32a6768adb03"
diamondUuid: "72ffa08d-eb42-8983-bd47-ffdf693e4057"
uuid: "827b2aa2-ba82-834a-a65b-9a5c14a2828f"
horo: 7
typography:
  partition: sale
  bondDegree: 86
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "624bd849-e4b6-8763-9b44-474cbd38235f"
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
      stageUuid: "52cd05f7-0cbd-84d2-b7c7-e9e12ea85a10"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "25c1ccbb-a2e3-8d5d-892f-233528cc29e3"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
