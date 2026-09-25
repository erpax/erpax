---
name: signature
description: Use when modelling one signature — the singular model of the signatures collection (the plural store); a cryptographic or written mark binding a signer to content.
atomPath: signature
coordinate: "signature · 8/crest · ccf51553"
contentUuid: "57bf8b96-4492-55f4-8637-a5262a6894b7"
diamondUuid: "397e3237-6bb4-8a14-bf77-9725efb7990b"
uuid: "ccf51553-4742-80ea-aacf-4e7436e5ef0c"
horo: 8
typography:
  partition: signature
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "f5ff0691-e86c-8e76-837a-92d3ae027ec4"
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
      stageUuid: "c6fe631f-83fa-80b8-a24f-d7f5002a5688"
    - stage: seal
      stageUuid: "e6b3eb66-892f-85e8-8d21-53c2b2041871"
    - stage: uuid
      stageUuid: "b90ea0eb-474d-8814-a0d9-845e57b9c016"
version: 2
---
# signature — the model of one [[signatures]] row

A cryptographic or written mark binding a signer to content. The singular model whose plural store is the [[signatures]] collection ([[balance]]: every collection has its model).

Composes [[signatures]] · [[identity]] · [[balance]].

**Law — [[law]]: a signature binds one signer to specific content — break the binding (alter the content or the mark) and the signature no longer verifies; it is the cryptographic tie between an [[identity]] and what it attests.**
