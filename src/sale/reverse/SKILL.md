---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 7/descent · 63dfa287"
contentUuid: "90163707-a0fb-5bb5-8ad8-f654db2371b6"
diamondUuid: "6ad13697-a200-8f9d-8eed-4b736887adab"
uuid: "63dfa287-d65c-86ff-a3fd-55265318acf8"
horo: 7
typography:
  partition: sale
  bondDegree: 21
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "d9a78bad-cf7d-81a9-8616-0908d011e3e9"
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
      stageUuid: "8dd6ada4-172d-8457-83c9-0bf5193be9bd"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "b986f17a-79f3-814f-9dac-dd5d621a83e9"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
