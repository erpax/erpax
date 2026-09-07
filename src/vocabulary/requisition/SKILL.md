---
name: requisition
description: Use when modelling one requisition — the singular model of the requisitions collection (the plural store); a formal internal request to procure goods.
atomPath: "vocabulary/requisition"
coordinate: "vocabulary/requisition · 5/round · a643c21e"
contentUuid: "41c432b5-f36e-5c65-96ad-92795e647a0f"
diamondUuid: "9c80aa1b-556a-80ca-9866-e30f72a87baa"
uuid: "a643c21e-6241-8cc9-be3d-9e1712743119"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "d6543634-d964-8ddb-87b0-853494aec371"
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
      stageUuid: "b45f0082-3800-8d4d-8294-d3887d6411cb"
    - stage: seal
      stageUuid: "48c41563-66f9-8fcc-9a22-76f8892f1f49"
    - stage: uuid
      stageUuid: "c11cf02a-8c84-82d4-8650-ebe878e0cca7"
version: 2
---
# requisition — the model of one [[requisitions]] row

A formal internal request to procure goods. The singular model whose plural store is the [[requisitions]] collection ([[balance]]: every collection has its model).

Composes [[requisitions]] · [[purchase]] · [[balance]].

**Law — [[law]]: a requisition is a request, never a purchase — it commits no funds and conserves no value until it is approved into one, so demand and procurement stay double-entry separate.**
