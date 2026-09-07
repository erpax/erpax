---
name: attestation
description: Use when modelling one attestation — the singular model of the attestations collection (the plural store); a signed assertion that a statement or record is true.
atomPath: "vocabulary/attestation"
coordinate: "vocabulary/attestation · 8/crest · d248d04c"
contentUuid: "5279f4b7-dff1-5888-891d-531eba3fec63"
diamondUuid: "485539d9-17ac-83ca-b7e2-d9dc901af6cd"
uuid: "d248d04c-e321-8729-91cc-4da1e17aae71"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "06f6dd6f-0a10-8d30-91cc-a44f7ece162e"
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
      stageUuid: "9d0d224f-8178-8f15-a3a6-2a63da8c1491"
    - stage: seal
      stageUuid: "17cdc10a-ed0d-87cd-a0aa-963d3655f4da"
    - stage: uuid
      stageUuid: "d5bda762-3ba6-8a9b-93e1-509c6f19002f"
version: 2
---
# attestation — the model of one [[attestations]] row

A signed assertion that a statement or record is true. The singular model whose plural store is the [[attestations]] collection ([[balance]]: every collection has its model).

Composes [[attestations]] · [[audit]] · [[balance]].

**Law — [[law]]: one attestation is the singular model of one attestations row — a signed assertion that a statement or record is true ([[audit]]); every collection has its model ([[balance]]).**
