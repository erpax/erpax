---
name: submission
description: Use when modelling one submission — the singular model of the submissions collection (the plural store); a record sent in for review or processing.
atomPath: submission
coordinate: "submission · 5/round · cb2d1c7e"
contentUuid: "ae648463-78b8-5379-82cb-d2b142be6ffe"
diamondUuid: "7160ed7a-69fc-8d7d-bb87-08f2baebb300"
uuid: "cb2d1c7e-acd9-88ac-affc-2a217bdcd34c"
horo: 5
typography:
  partition: submission
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "07790051-59a2-84ce-aae1-b3366e170bd8"
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
      stageUuid: "dd4e76ed-11dc-826e-aef1-b17aa647ec33"
    - stage: seal
      stageUuid: "1c1baf53-3662-87ce-9b5f-03f3b6b55610"
    - stage: uuid
      stageUuid: "2176fab0-720c-8d6d-b25c-161df7315392"
version: 2
---
# submission — the model of one [[submissions]] row

A record sent in for review or processing. The singular model whose plural store is the [[submissions]] collection ([[balance]]: every collection has its model).

Composes [[submissions]] · [[workflow]] · [[balance]].
