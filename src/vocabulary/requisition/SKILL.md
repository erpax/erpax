---
name: requisition
description: Use when modelling one requisition — the singular model of the requisitions collection (the plural store); a formal internal request to procure goods.
atomPath: "vocabulary/requisition"
coordinate: "vocabulary/requisition · 5/round · 43ef7b2b"
contentUuid: "e0fb6100-c0d5-5fba-9673-3840d787cccc"
diamondUuid: "4d8cc59c-1272-8eb5-836f-2bd68e01911d"
uuid: "43ef7b2b-5279-88bf-b54e-5307bf29c8f4"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "0c74360b-4299-8941-8a71-480a07a2c743"
  stages:
    - stage: path
      stageUuid: "0c054de3-2e64-8188-870e-901a33f79ed5"
    - stage: trinity
      stageUuid: "8559039f-fd58-8d99-98ce-38ff4771a9eb"
    - stage: boundary
      stageUuid: "38cd3870-f001-8e84-b169-ff9fb3da07aa"
    - stage: links
      stageUuid: "7d727585-16f4-8209-828c-46dedfebfc94"
    - stage: horo
      stageUuid: "94e9ebb8-88b6-8a6b-b8c7-c376628ab8c2"
    - stage: seal
      stageUuid: "48c41563-66f9-8fcc-9a22-76f8892f1f49"
    - stage: uuid
      stageUuid: "5b64967c-9ed7-8eb9-b0c7-e08dcdd454e7"
version: 2
---
# requisition — the model of one [[requisitions]] row

A formal internal request to procure goods. The singular model whose plural store is the [[requisitions]] collection ([[balance]]: every collection has its model).

Composes [[requisitions]] · [[purchase]] · [[balance]].

**Law — [[law]]: a requisition is a request, never a purchase — it commits no funds and conserves no value until it is approved into one, so demand and procurement stay double-entry separate.**
