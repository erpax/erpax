---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 7/descent · 34ea9ddf"
contentUuid: "3976f4e4-02b2-5bff-9141-598ca0c5f435"
diamondUuid: "f1f2cbf2-940e-8d61-99e2-90d796c96c33"
uuid: "34ea9ddf-11c8-882d-928c-29409ee697c8"
horo: 7
typography:
  partition: sale
  bondDegree: 86
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "b6ae0e7f-ebd4-8728-a38a-27b265ab1c78"
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
      stageUuid: "68c62098-3eb6-879a-ace2-f60c15667ee1"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "683a954b-4a0d-8e92-9f16-72174de4c302"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
