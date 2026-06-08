---
name: request
description: Use when modelling one request — the singular model of the requests collection (the plural store); a submitted ask for an action or resource.
atomPath: request
coordinate: request · 1/base · f2eb4d44
contentUuid: "4be12b71-6a0c-5938-873c-02b9939c7305"
diamondUuid: "d8b3b3e9-9686-88c9-8a41-73c397e68ca1"
uuid: "f2eb4d44-81eb-8ebb-a799-ee1067056700"
horo: 1
bonds:
  in:
    - balance
    - law
    - request
    - requests
    - workflow
  out:
    - balance
    - law
    - request
    - requests
    - workflow
typography:
  partition: request
  bondDegree: 32
  neighbors:
    - agent
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - requests
    - workflow
  matrix:
    - balance
    - law
    - request
    - requests
    - workflow
  backlinks:
    - balance
    - law
    - request
    - requests
    - workflow
signatures:
  computationUuid: "0c07218a-a479-8e5b-91a3-b474cef5fcdd"
  stages:
    - stage: path
      stageUuid: "1ee5a515-476b-84b7-b1e7-9ea7f5e9de3a"
    - stage: trinity
      stageUuid: "2dfa6fc7-7279-83bb-b32f-329a0e54292d"
    - stage: boundary
      stageUuid: "357be5a0-8f06-8ab6-87af-2f08b331d313"
    - stage: links
      stageUuid: "c3de9dba-eb63-868c-9f60-e0c92f26046a"
    - stage: horo
      stageUuid: "0a703474-0331-84a2-9fc4-2a5728afea0d"
    - stage: seal
      stageUuid: "2d89b565-2c16-8d41-837d-3547d85a9487"
    - stage: uuid
      stageUuid: "03b029c1-2909-84a1-81b7-8db76a6002d0"
version: 2
---
# request — the model of one [[requests]] row

A submitted ask for an action or resource. The singular model whose plural store is the [[requests]] collection ([[balance]]: every collection has its model).

Composes [[requests]] · [[workflow]] · [[balance]].

**Law — [[law]]: one request is the singular model of the [[requests]] plural store — a submitted ask for an action or resource; every collection has exactly its model ([[balance]]).**
