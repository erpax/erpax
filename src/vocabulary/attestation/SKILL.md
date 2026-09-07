---
name: attestation
description: Use when modelling one attestation — the singular model of the attestations collection (the plural store); a signed assertion that a statement or record is true.
atomPath: "vocabulary/attestation"
coordinate: "vocabulary/attestation · 5/round · 95301394"
contentUuid: "5aeda1f5-9aeb-5c91-bd35-e181528772ed"
diamondUuid: "5e5ab030-4af9-83e8-930d-649aad3945ed"
uuid: "95301394-a614-8fdd-bb58-fffe39f689b1"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "8f012928-c100-8282-b52b-34e0a1143268"
  stages:
    - stage: path
      stageUuid: "b032fdd8-80c2-8d5d-b53c-41a21cd251d3"
    - stage: trinity
      stageUuid: "b56ebdf9-2042-8e8b-a62b-526e3edad819"
    - stage: boundary
      stageUuid: "8deccfb5-a420-82a3-bce4-85f178299056"
    - stage: links
      stageUuid: "bbe1c3fe-33d2-8885-a5de-97c57f1f4469"
    - stage: horo
      stageUuid: "c238931b-bba5-868d-bbec-4ec694f4898e"
    - stage: seal
      stageUuid: "17cdc10a-ed0d-87cd-a0aa-963d3655f4da"
    - stage: uuid
      stageUuid: "c1e8ceed-6869-8906-9519-4eccea0bbd40"
version: 2
---
# attestation — the model of one [[attestations]] row

A signed assertion that a statement or record is true. The singular model whose plural store is the [[attestations]] collection ([[balance]]: every collection has its model).

Composes [[attestations]] · [[audit]] · [[balance]].

**Law — [[law]]: one attestation is the singular model of one attestations row — a signed assertion that a statement or record is true ([[audit]]); every collection has its model ([[balance]]).**
