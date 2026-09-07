---
name: signature
description: Use when modelling one signature — the singular model of the signatures collection (the plural store); a cryptographic or written mark binding a signer to content.
atomPath: signature
coordinate: "signature · 2/share · 3cfca13b"
contentUuid: "9a4f7776-f9bd-5b12-b7e1-cf1adba9a7f9"
diamondUuid: "d08fc3c5-6402-8e0c-a68e-4d767bafd713"
uuid: "3cfca13b-8619-88e6-a0f8-2296b85f7ab1"
horo: 2
typography:
  partition: signature
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "54c21a97-674b-86f6-bddb-65f1d5c54bd5"
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
      stageUuid: "667339d5-6673-802b-aeec-adc5588f8d5b"
    - stage: seal
      stageUuid: "e6b3eb66-892f-85e8-8d21-53c2b2041871"
    - stage: uuid
      stageUuid: "493fb3af-1afc-8f5a-bee9-51d4d5aaffd4"
version: 2
---
# signature — the model of one [[signatures]] row

A cryptographic or written mark binding a signer to content. The singular model whose plural store is the [[signatures]] collection ([[balance]]: every collection has its model).

Composes [[signatures]] · [[identity]] · [[balance]].

**Law — [[law]]: a signature binds one signer to specific content — break the binding (alter the content or the mark) and the signature no longer verifies; it is the cryptographic tie between an [[identity]] and what it attests.**
