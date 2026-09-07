---
name: submission
description: Use when modelling one submission — the singular model of the submissions collection (the plural store); a record sent in for review or processing.
atomPath: submission
coordinate: "submission · 5/round · 17b82db9"
contentUuid: "ec978f52-f832-5708-a557-df7bce99db2b"
diamondUuid: "2809bbaa-faaf-88af-b272-18a62698570f"
uuid: "17b82db9-c93d-89b7-83f4-34f02b07e6c7"
horo: 5
typography:
  partition: submission
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "ca372265-12c8-8188-bc3f-f772b8cf1be7"
  stages:
    - stage: path
      stageUuid: "901a0970-6b71-8b98-ba09-0c7fd7a3f185"
    - stage: trinity
      stageUuid: "2828ff03-f05b-87eb-ade3-77e387a343f1"
    - stage: boundary
      stageUuid: "712c1451-8639-8184-8a9a-ad50a8f6430c"
    - stage: links
      stageUuid: "9c7e82c0-bccd-89ab-86ff-7cd8b5fdccc9"
    - stage: horo
      stageUuid: "d59864a1-563c-8f9e-b5e2-5af058c71131"
    - stage: seal
      stageUuid: "1c1baf53-3662-87ce-9b5f-03f3b6b55610"
    - stage: uuid
      stageUuid: "c4ada0e0-3012-8cbf-b97b-c6a19bc9e3c6"
version: 2
---
# submission — the model of one [[submissions]] row

A record sent in for review or processing. The singular model whose plural store is the [[submissions]] collection ([[balance]]: every collection has its model).

Composes [[submissions]] · [[workflow]] · [[balance]].
