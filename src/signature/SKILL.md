---
name: signature
description: Use when modelling one signature — the singular model of the signatures collection (the plural store); a cryptographic or written mark binding a signer to content.
atomPath: signature
coordinate: "signature · 5/round · 2f9e808d"
contentUuid: "9c1e9287-77f8-51ea-90fb-2f6bb1e2475b"
diamondUuid: "a328f7ea-bc0b-8aa4-8f75-6c0bdbf489e1"
uuid: "2f9e808d-2323-8f3a-9529-12ae7f96eefd"
horo: 5
typography:
  partition: signature
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "83d8ec2a-6817-8991-b5da-d0818be90ae8"
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
      stageUuid: "a3c900af-3770-8579-8734-53fbd52562a3"
    - stage: seal
      stageUuid: "e6b3eb66-892f-85e8-8d21-53c2b2041871"
    - stage: uuid
      stageUuid: "ef2119dd-326e-805d-8c66-8b810fd40b4d"
version: 2
---
# signature — the model of one [[signatures]] row

A cryptographic or written mark binding a signer to content. The singular model whose plural store is the [[signatures]] collection ([[balance]]: every collection has its model).

Composes [[signatures]] · [[identity]] · [[balance]].

**Law — [[law]]: a signature binds one signer to specific content — break the binding (alter the content or the mark) and the signature no longer verifies; it is the cryptographic tie between an [[identity]] and what it attests.**
