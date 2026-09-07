---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 1/base · 5aa6cb34"
contentUuid: "980b28ee-15c0-55ab-b598-a2c2993499ea"
diamondUuid: "59d3e726-7229-8f5c-bf8d-4c31ac11efbe"
uuid: "5aa6cb34-5b50-833f-b6bc-879e970024e0"
horo: 1
typography:
  partition: sale
  bondDegree: 86
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "81f6163a-8e7b-8e95-ad50-1c37bb89ecb8"
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
      stageUuid: "e0ea1425-6ffa-8bb5-934a-ace0cf03b2d6"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "ce17a485-5cd4-8470-95d5-e55c85e718a7"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
