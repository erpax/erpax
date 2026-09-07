---
name: attestation
description: Use when modelling one attestation — the singular model of the attestations collection (the plural store); a signed assertion that a statement or record is true.
atomPath: "vocabulary/attestation"
coordinate: "vocabulary/attestation · 7/descent · 1fad8ac6"
contentUuid: "5a1a0ce0-615c-5981-ae7c-d68f28d41dcf"
diamondUuid: "cb0595e7-cc80-8659-a8e5-bd1be01fb98f"
uuid: "1fad8ac6-8087-8660-93ce-3079b2728eb5"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "ac6e0b3c-1ace-81a5-9c7d-861ff0738957"
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
      stageUuid: "272b841f-abd0-80a6-9073-c21650947fdc"
    - stage: seal
      stageUuid: "17cdc10a-ed0d-87cd-a0aa-963d3655f4da"
    - stage: uuid
      stageUuid: "46c82f10-ae92-82ca-9c4f-c74f933c9934"
version: 2
---
# attestation — the model of one [[attestations]] row

A signed assertion that a statement or record is true. The singular model whose plural store is the [[attestations]] collection ([[balance]]: every collection has its model).

Composes [[attestations]] · [[audit]] · [[balance]].

**Law — [[law]]: one attestation is the singular model of one attestations row — a signed assertion that a statement or record is true ([[audit]]); every collection has its model ([[balance]]).**
