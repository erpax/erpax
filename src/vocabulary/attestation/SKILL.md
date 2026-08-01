---
name: attestation
description: Use when modelling one attestation — the singular model of the attestations collection (the plural store); a signed assertion that a statement or record is true.
atomPath: "vocabulary/attestation"
coordinate: "vocabulary/attestation · 2/share · 8de8635f"
contentUuid: "9eedb545-74e6-54b2-91a6-dcdcfceb1ca6"
diamondUuid: "ff8fefd7-aead-88cd-a437-76e47f9718ab"
uuid: "8de8635f-6dc0-8f5e-baeb-e959a9f87ff3"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "2f384618-b08e-8d49-ac4e-6f75b23df650"
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
      stageUuid: "5369b9ed-fadd-845e-b2ad-1d07bf6256ab"
    - stage: seal
      stageUuid: "a5b4ea78-b58d-891d-baef-b976f99f5c63"
    - stage: uuid
      stageUuid: "89f991d0-53bb-8f3b-9a82-93d967d46be8"
version: 2
---
# attestation — the model of one [[attestations]] row

A signed assertion that a statement or record is true. The singular model whose plural store is the [[attestations]] collection ([[balance]]: every collection has its model).

Composes [[attestations]] · [[audit]] · [[balance]].

**Law — [[law]]: one attestation is the singular model of one attestations row — a signed assertion that a statement or record is true ([[audit]]); every collection has its model ([[balance]]).**
