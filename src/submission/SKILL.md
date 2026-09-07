---
name: submission
description: Use when modelling one submission — the singular model of the submissions collection (the plural store); a record sent in for review or processing.
atomPath: submission
coordinate: "submission · 5/round · 4b9f8068"
contentUuid: "163659c4-4b9b-5dd3-a793-99c130b9d672"
diamondUuid: "8459fb7d-244f-88e4-848e-f7a26ba239cb"
uuid: "4b9f8068-800d-8786-893f-120f064cf7eb"
horo: 5
typography:
  partition: submission
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "0c799048-1350-8b0c-8699-eef4368584ca"
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
      stageUuid: "07930e90-4d4b-88c6-90d0-ad45fa44a122"
    - stage: seal
      stageUuid: "1c1baf53-3662-87ce-9b5f-03f3b6b55610"
    - stage: uuid
      stageUuid: "0d611b48-b4ac-8489-951f-785a88f47aa3"
version: 2
---
# submission — the model of one [[submissions]] row

A record sent in for review or processing. The singular model whose plural store is the [[submissions]] collection ([[balance]]: every collection has its model).

Composes [[submissions]] · [[workflow]] · [[balance]].
