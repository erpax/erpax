---
name: attestation
description: Use when modelling one attestation — the singular model of the attestations collection (the plural store); a signed assertion that a statement or record is true.
atomPath: attestation
coordinate: attestation · 2/share · f5d12072
contentUuid: "7bcbe732-a404-5bd8-aed5-f7298bbce924"
diamondUuid: "23bedcf9-388f-84e0-9da7-6f8b9e0ced11"
uuid: "f5d12072-9176-8555-bfb0-1e81f210ec54"
horo: 2
bonds:
  in:
    - attestations
    - audit
    - balance
    - law
  out:
    - attestations
    - audit
    - balance
    - law
typography:
  partition: attestation
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - attestations
    - audit
    - balance
    - law
  matrix:
    - attestations
    - audit
    - balance
    - law
  backlinks:
    - attestations
    - audit
    - balance
    - law
signatures:
  computationUuid: "ba7e89fd-1beb-878a-a287-b7888743c8f2"
  stages:
    - stage: path
      stageUuid: "c8290fe5-7bdf-8cb7-9c8d-cf765a2d366e"
    - stage: trinity
      stageUuid: "889fd982-3c61-8b8c-81aa-ad650d0b56e6"
    - stage: boundary
      stageUuid: "fc30b8e8-1b63-8a61-b0ac-6324988f96f9"
    - stage: links
      stageUuid: "fb4129e0-69de-86f5-940e-3dfb5c61f5d6"
    - stage: horo
      stageUuid: "1d03dd25-e681-80cc-84fe-c909884b5b45"
    - stage: seal
      stageUuid: "f205f8d9-c481-8111-aade-c503dbf2db5f"
    - stage: uuid
      stageUuid: "b1463da8-49cc-8a4e-b7bd-1628620c6544"
version: 2
---
# attestation — the model of one [[attestations]] row

A signed assertion that a statement or record is true. The singular model whose plural store is the [[attestations]] collection ([[balance]]: every collection has its model).

Composes [[attestations]] · [[audit]] · [[balance]].

**Law — [[law]]: one attestation is the singular model of one attestations row — a signed assertion that a statement or record is true ([[audit]]); every collection has its model ([[balance]]).**
