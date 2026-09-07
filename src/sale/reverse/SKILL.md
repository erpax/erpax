---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 5/round · 043adc9a"
contentUuid: "3de2f337-d53c-52c4-a6d6-5e7ecca69d84"
diamondUuid: "ffc54193-13bf-8a9c-9de7-e2daa6aa10ab"
uuid: "043adc9a-7013-87ca-8470-294159eaf165"
horo: 5
typography:
  partition: sale
  bondDegree: 62
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "efb76b63-dbf4-8a9b-837c-cf595063d48a"
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
      stageUuid: "ac87fc6c-6f85-839e-999f-d7ff23553896"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "0d11d9e4-ad1d-8b0e-a86e-1baa3cb8426c"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
