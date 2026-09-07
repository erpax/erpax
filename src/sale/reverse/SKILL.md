---
name: reverse
description: "Use when correcting a fiscalised sale — issues the reversing entry that Наредба Н-18 requires, because a fiscal sale is never deleted and both entries remain visible."
atomPath: "sale/reverse"
coordinate: "sale/reverse · 5/round · 955109fd"
contentUuid: "31a8932b-df5a-5e9d-ac21-956dd5f1c4c7"
diamondUuid: "8a42115e-c441-8992-81a4-0ab9ef2c1a3a"
uuid: "955109fd-cb51-8747-a9bb-cd2c5b83d3cd"
horo: 5
typography:
  partition: sale
  bondDegree: 62
standards:
  - "BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original"
bindings: []
signatures:
  computationUuid: "51de10ad-5ca7-8780-a5e4-bdb4c1858b5f"
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
      stageUuid: "205fef58-2e4e-8951-b9d8-e8f984319252"
    - stage: seal
      stageUuid: "946122b7-ebd7-8c75-92ca-9898b7cd6de2"
    - stage: uuid
      stageUuid: "1bbc7b45-2c2b-8f7f-a05b-ffc6cbddb653"
version: 2
---
# reverse

Issues the reversal of a fiscalised sale. This is the ONLY lawful correction: the original stands, the reversal stands beside it, and the net is the truth. Deleting would destroy the very trail the regulation exists to preserve ([[sale/immutability]]).

Composes: [[sale]] · [[law]].
