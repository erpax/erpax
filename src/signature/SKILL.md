---
name: signature
description: Use when modelling one signature — the singular model of the signatures collection (the plural store); a cryptographic or written mark binding a signer to content.
atomPath: signature
coordinate: signature · 4/weave · 8ad3b058
contentUuid: "a26761c4-40c1-5c9f-b8f8-ce0fa77a1684"
diamondUuid: "f9e4404d-3beb-89dd-a5e0-6c8c7a3ad520"
uuid: "8ad3b058-67ac-8a78-8579-466bf2394a86"
horo: 4
bonds:
  in:
    - balance
    - identity
    - law
    - pqc
    - signatures
  out:
    - balance
    - identity
    - law
    - pqc
    - signatures
typography:
  partition: signature
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - identity
    - law
    - signatures
  matrix:
    - balance
    - identity
    - law
    - pqc
    - signatures
  backlinks:
    - balance
    - identity
    - law
    - pqc
    - signatures
signatures:
  computationUuid: "14527869-7532-89b0-bf95-21c18b8a47ab"
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
      stageUuid: "ef388e7f-bc96-80a3-8b36-a9b37c5943b5"
    - stage: seal
      stageUuid: "f1806fef-33ea-88d5-90e5-8dbbb3d5b400"
    - stage: uuid
      stageUuid: "638630da-c167-8953-824a-373b173eaddf"
version: 2
---
# signature — the model of one [[signatures]] row

A cryptographic or written mark binding a signer to content. The singular model whose plural store is the [[signatures]] collection ([[balance]]: every collection has its model).

Composes [[signatures]] · [[identity]] · [[balance]].

**Law — [[law]]: a signature binds one signer to specific content — break the binding (alter the content or the mark) and the signature no longer verifies; it is the cryptographic tie between an [[identity]] and what it attests.**
