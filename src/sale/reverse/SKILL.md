---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 7/descent · 18632e21"
contentUuid: "cce3c6dd-206a-54f3-87b8-d87bfccbd2cd"
diamondUuid: "c234d6dd-4033-8d02-96f0-c290a7ee6e2e"
uuid: "18632e21-7003-8562-8de9-dc1e76ad4d2a"
horo: 7
typography:
  partition: sale
  bondDegree: 86
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "8474c722-21ed-8045-ad13-18d90546b044"
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
      stageUuid: "e8086fda-2b40-8fb0-9f83-2e343b5e24c4"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "387965e3-4cd9-8c97-ab0e-a12380440ab9"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
