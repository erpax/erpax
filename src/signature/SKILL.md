---
name: signature
description: Use when modelling one signature — the singular model of the signatures collection (the plural store); a cryptographic or written mark binding a signer to content.
atomPath: signature
coordinate: "signature · 8/crest · cf4dd177"
contentUuid: "2cea6f37-d5df-5f28-8670-ad6bac356449"
diamondUuid: "3bb8b2e4-6c3b-8433-a46c-73f4c4c35608"
uuid: "cf4dd177-bf7f-8d6b-a504-14f073c87cab"
horo: 8
typography:
  partition: signature
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "9f423e7b-362b-85de-bcac-b5a208787a14"
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
      stageUuid: "5101f098-42a8-83f1-9a73-693fb73380cb"
    - stage: seal
      stageUuid: "e6b3eb66-892f-85e8-8d21-53c2b2041871"
    - stage: uuid
      stageUuid: "f234ac41-798c-85ca-af20-8c447ca34bfc"
version: 2
---
# signature — the model of one [[signatures]] row

A cryptographic or written mark binding a signer to content. The singular model whose plural store is the [[signatures]] collection ([[balance]]: every collection has its model).

Composes [[signatures]] · [[identity]] · [[balance]].

**Law — [[law]]: a signature binds one signer to specific content — break the binding (alter the content or the mark) and the signature no longer verifies; it is the cryptographic tie between an [[identity]] and what it attests.**
