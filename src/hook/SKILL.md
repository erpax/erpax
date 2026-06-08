---
name: hook
description: Use when modelling one hook — the singular model of the hooks collection (the plural store); a lifecycle gateway where logic runs on a record event.
atomPath: hook
coordinate: hook · 4/weave · 45c4bba0
contentUuid: "35039865-e723-516a-8de0-38c8dd4e8f11"
diamondUuid: "b5918b39-537f-8357-80bd-f1180c6841ec"
uuid: "45c4bba0-0e68-888a-b610-fd146e93d816"
horo: 4
bonds:
  in:
    - balance
    - event
    - hooks
    - law
  out:
    - balance
    - event
    - hooks
    - law
typography:
  partition: hook
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - event
    - hooks
    - law
  matrix:
    - balance
    - event
    - hooks
    - law
  backlinks:
    - balance
    - event
    - hooks
    - law
signatures:
  computationUuid: "586f0a33-5b17-8e90-91f4-e6cadf5f5e92"
  stages:
    - stage: path
      stageUuid: "fa9625f4-d8ce-886f-a0bf-627e5fab748a"
    - stage: trinity
      stageUuid: "897a75a6-4a78-8194-90ca-c3f4806482a2"
    - stage: boundary
      stageUuid: "6ae30910-d294-8c88-b68a-d528c4203fa1"
    - stage: links
      stageUuid: "d4818e0d-a12d-8142-a5b2-d90976cd7b91"
    - stage: horo
      stageUuid: "e11091ab-c875-8443-afd9-20aa2ff93967"
    - stage: seal
      stageUuid: "df13f931-0601-8214-af3d-a832844f9a73"
    - stage: uuid
      stageUuid: "40cc27e3-9b83-8f1f-b59c-47d2d2e6c87f"
version: 2
---
# hook — the model of one [[hooks]] row

A lifecycle gateway where logic runs on a record event. The singular model whose plural store is the [[hooks]] collection ([[balance]]: every collection has its model).

Composes [[hooks]] · [[event]] · [[balance]].

**Law — [[law]]: a hook is the one place logic runs on a record event — the singular model whose plural store is the [[hooks]] collection, so behaviour lives through the lifecycle gateway, never scattered ([[balance]]: every collection has its model).**
