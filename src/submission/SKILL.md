---
name: submission
description: Use when modelling one submission — the singular model of the submissions collection (the plural store); a record sent in for review or processing.
atomPath: submission
coordinate: "submission · 5/round · 877dda8f"
contentUuid: "e4e4caa6-403b-5496-a8a3-b02b67a60baf"
diamondUuid: "8c427539-d848-8513-929e-f0a2cb2d2535"
uuid: "877dda8f-2c02-8b2b-bd2a-8e1883815d26"
horo: 5
typography:
  partition: submission
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "eccc878a-ee49-85b4-ae59-e6b28213ab0a"
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
      stageUuid: "a7bc32ef-3083-8605-b6fc-f671c26caf56"
    - stage: seal
      stageUuid: "1c1baf53-3662-87ce-9b5f-03f3b6b55610"
    - stage: uuid
      stageUuid: "36675646-686a-897c-a758-52a9f63cc3d0"
version: 2
---
# submission — the model of one [[submissions]] row

A record sent in for review or processing. The singular model whose plural store is the [[submissions]] collection ([[balance]]: every collection has its model).

Composes [[submissions]] · [[workflow]] · [[balance]].
