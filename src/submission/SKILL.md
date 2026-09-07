---
name: submission
description: Use when modelling one submission — the singular model of the submissions collection (the plural store); a record sent in for review or processing.
atomPath: submission
coordinate: "submission · 1/base · 03de0d23"
contentUuid: "8852befc-7707-56b7-80d3-aafd05a2a8f8"
diamondUuid: "d94f4a6e-7e12-8301-b8a9-1c2b4198ce7c"
uuid: "03de0d23-26f1-867e-9829-2e33f1afdd6d"
horo: 1
typography:
  partition: submission
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "4d8f2d08-d837-887f-a29c-06b03b16c32d"
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
      stageUuid: "5adbfcc0-8c85-822e-831b-e115f78aa55e"
    - stage: seal
      stageUuid: "1c1baf53-3662-87ce-9b5f-03f3b6b55610"
    - stage: uuid
      stageUuid: "298b5ef0-275b-8024-96ab-403a87a79907"
version: 2
---
# submission — the model of one [[submissions]] row

A record sent in for review or processing. The singular model whose plural store is the [[submissions]] collection ([[balance]]: every collection has its model).

Composes [[submissions]] · [[workflow]] · [[balance]].
