---
name: signature
description: Use when modelling one signature — the singular model of the signatures collection (the plural store); a cryptographic or written mark binding a signer to content.
atomPath: signature
coordinate: "signature · 5/round · 083931bc"
contentUuid: "88b1fbad-ea88-5f1c-974e-a9238cb1d808"
diamondUuid: "ecdad7bc-2083-85d9-9d9b-ef66c3dc32d7"
uuid: "083931bc-f788-8b5f-b086-8a6b3139fe01"
horo: 5
typography:
  partition: signature
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "7000cb02-3d2a-8a1d-8621-431df600485d"
  stages:
    - stage: path
      stageUuid: "3dfd453e-adae-8ba6-9f67-04894e3c4882"
    - stage: trinity
      stageUuid: "cabc7aa2-cc02-8cab-872b-2be606928af1"
    - stage: boundary
      stageUuid: "3d252e11-2cd4-8db3-a707-c9c1b8e17be1"
    - stage: links
      stageUuid: "3e461761-3d0e-84f2-b2e9-aaa368236d05"
    - stage: horo
      stageUuid: "9fd175fa-1c46-8754-9c90-f6466c49fb20"
    - stage: seal
      stageUuid: "e6b3eb66-892f-85e8-8d21-53c2b2041871"
    - stage: uuid
      stageUuid: "a14c85cd-b120-87a9-8374-e513ddaea65e"
version: 2
---
# signature — the model of one [[signatures]] row

A cryptographic or written mark binding a signer to content. The singular model whose plural store is the [[signatures]] collection ([[balance]]: every collection has its model).

Composes [[signatures]] · [[identity]] · [[balance]].

**Law — [[law]]: a signature binds one signer to specific content — break the binding (alter the content or the mark) and the signature no longer verifies; it is the cryptographic tie between an [[identity]] and what it attests.**
