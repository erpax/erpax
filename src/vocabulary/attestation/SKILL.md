---
name: attestation
description: Use when modelling one attestation — the singular model of the attestations collection (the plural store); a signed assertion that a statement or record is true.
atomPath: "vocabulary/attestation"
coordinate: "vocabulary/attestation · 8/crest · 007e40af"
contentUuid: "c6f30abf-2a9a-55a3-80ac-e087cf5045f2"
diamondUuid: "2f02d067-01cc-8b32-94a7-e101fd09a429"
uuid: "007e40af-3588-8800-9fb5-3f7533523cee"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "a64c7c0e-9f57-8524-9fb2-188f4277c3c4"
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
      stageUuid: "f8fd8d1a-0677-8750-83be-e6dc83d2742d"
    - stage: seal
      stageUuid: "17cdc10a-ed0d-87cd-a0aa-963d3655f4da"
    - stage: uuid
      stageUuid: "0a3f372d-0d64-8db1-9fb6-5e6d4ac65d6d"
version: 2
---
# attestation — the model of one [[attestations]] row

A signed assertion that a statement or record is true. The singular model whose plural store is the [[attestations]] collection ([[balance]]: every collection has its model).

Composes [[attestations]] · [[audit]] · [[balance]].

**Law — [[law]]: one attestation is the singular model of one attestations row — a signed assertion that a statement or record is true ([[audit]]); every collection has its model ([[balance]]).**
