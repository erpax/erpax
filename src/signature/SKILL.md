---
name: signature
description: Use when modelling one signature — the singular model of the signatures collection (the plural store); a cryptographic or written mark binding a signer to content.
atomPath: signature
coordinate: "signature · 2/share · db63d7cb"
contentUuid: "7f9e7d89-aada-506b-a880-6c476a909fe0"
diamondUuid: "c50627f3-9c8f-8984-ba2f-0ff4891ed44f"
uuid: "db63d7cb-14c5-8e8a-af5a-c5265326b4b5"
horo: 2
typography:
  partition: signature
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "d0682a64-36a7-8897-bab0-5cd791eac6a2"
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
      stageUuid: "d922651b-6fae-8965-8087-1f10e4d92c9e"
    - stage: seal
      stageUuid: "e6b3eb66-892f-85e8-8d21-53c2b2041871"
    - stage: uuid
      stageUuid: "be5bd6cf-f1ec-8897-9b31-c1b617afb44d"
version: 2
---
# signature — the model of one [[signatures]] row

A cryptographic or written mark binding a signer to content. The singular model whose plural store is the [[signatures]] collection ([[balance]]: every collection has its model).

Composes [[signatures]] · [[identity]] · [[balance]].

**Law — [[law]]: a signature binds one signer to specific content — break the binding (alter the content or the mark) and the signature no longer verifies; it is the cryptographic tie between an [[identity]] and what it attests.**
