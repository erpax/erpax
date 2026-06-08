---
name: goodwill
description: "Use when reasoning about goodwill — Use for the excess of acquisition cost over fair value of identifiable net assets; subject to annual impairment testing under IFRS-3 and required cash-flow allocation to CGUs"
atomPath: goodwill
coordinate: goodwill · 1/base · 48cf547c
contentUuid: "bf50b86b-81fa-51e4-a227-0f64e19ca2b0"
diamondUuid: "f2ef12c8-6f48-8c0d-93c2-af8811629969"
uuid: "48cf547c-15f8-80b1-9aa8-729adf5431ab"
horo: 1
bonds:
  in:
    - assets
    - combinations
    - consolidations
    - impairment
    - law
    - measurements
  out:
    - assets
    - combinations
    - consolidations
    - impairment
    - law
    - measurements
typography:
  partition: goodwill
  bondDegree: 19
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - assets
    - combinations
    - consolidations
    - impairment
    - law
    - measurements
  matrix:
    - assets
    - combinations
    - consolidations
    - impairment
    - law
    - measurements
  backlinks:
    - assets
    - combinations
    - consolidations
    - impairment
    - law
    - measurements
signatures:
  computationUuid: "fde70175-ddb2-800a-baad-63fd21ea8b68"
  stages:
    - stage: path
      stageUuid: "b2f11413-c4b9-85dd-af6c-5d2e906ec31c"
    - stage: trinity
      stageUuid: "4dfd3307-33c2-86cd-9935-2b7160a0a617"
    - stage: boundary
      stageUuid: "5cd025a2-f85b-899d-91d0-0adec31b862a"
    - stage: links
      stageUuid: "abf5bab3-c019-8c1e-956b-22e68f9c7416"
    - stage: horo
      stageUuid: "011a017c-7db4-8632-a0f8-acbc8770b68f"
    - stage: seal
      stageUuid: "fe1e5715-0a80-8c21-83ba-787e211b7906"
    - stage: uuid
      stageUuid: "2c62fe89-46d8-87c2-bd12-051bc3bf9d3a"
version: 2
---
# goodwill

Use for the excess of acquisition cost over fair value of identifiable net assets; subject to annual impairment testing under IFRS-3 and required cash-flow allocation to CGUs

Composes: [[legal/entities/business/combinations]] · [[fixed/assets]] · [[Consolidations]] · [[impairment]] · [[fair/value/measurements]].

**Law — [[law]]: goodwill is the residual — acquisition cost minus the fair value of identifiable net assets — not amortized but [[impairment]]-tested annually, allocated to the cash-generating units that justify it.**

## Standards
- IFRS-3 §32 (goodwill recognition)
- IAS-36 §80-99 (goodwill impairment testing)
- FASB ASC 805 (business combinations)
