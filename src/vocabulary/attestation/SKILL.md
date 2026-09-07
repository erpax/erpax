---
name: attestation
description: Use when modelling one attestation — the singular model of the attestations collection (the plural store); a signed assertion that a statement or record is true.
atomPath: "vocabulary/attestation"
coordinate: "vocabulary/attestation · 2/share · c0d8a932"
contentUuid: "e032d432-3be4-5e68-911d-8d95743b9e35"
diamondUuid: "9efd68f9-58b6-8961-b2a6-f555dcf405e2"
uuid: "c0d8a932-d970-8390-a3b9-e4a0c622ff73"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "2c3ee59a-e788-893a-a857-555089362e2f"
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
      stageUuid: "e27ecd59-01ce-8f46-ad80-b068284a4215"
    - stage: seal
      stageUuid: "17cdc10a-ed0d-87cd-a0aa-963d3655f4da"
    - stage: uuid
      stageUuid: "1cef8fad-2573-8ca4-9a49-8450993e7069"
version: 2
---
# attestation — the model of one [[attestations]] row

A signed assertion that a statement or record is true. The singular model whose plural store is the [[attestations]] collection ([[balance]]: every collection has its model).

Composes [[attestations]] · [[audit]] · [[balance]].

**Law — [[law]]: one attestation is the singular model of one attestations row — a signed assertion that a statement or record is true ([[audit]]); every collection has its model ([[balance]]).**
