---
name: amendment
description: "Use when a contract is modified — amendment date, amendments previous (chain of amendments), amendment terms, amendments effect on prior terms, signature requirement."
atomPath: amendment
coordinate: amendment · 4/weave · 3e40eeb8
contentUuid: "f0135abc-d3d4-58f9-8d2f-060af3192bea"
diamondUuid: "d13540f2-ec5f-8176-b246-401ec255f5e5"
uuid: "3e40eeb8-ae34-87dc-a438-cbacef994d1d"
horo: 4
bonds:
  in:
    - amendments
    - contracts
    - law
    - matter
  out:
    - amendments
    - contracts
    - law
    - matter
typography:
  partition: amendment
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - amendments
    - contracts
    - law
    - matter
  matrix:
    - amendments
    - contracts
    - law
    - matter
  backlinks:
    - amendments
    - contracts
    - law
    - matter
signatures:
  computationUuid: "5b831902-0fce-8f07-9c8a-1e742390a2e9"
  stages:
    - stage: path
      stageUuid: "17d65a5f-b6e0-8dd3-9d6d-0c360fe00b0f"
    - stage: trinity
      stageUuid: "aab3b291-a2ef-8e18-b2c9-5e7ff3c475fa"
    - stage: boundary
      stageUuid: "7129251e-8884-8630-848f-c7ae8a2ff23c"
    - stage: links
      stageUuid: "abcfff1f-065c-89b5-93b6-065fa25a9160"
    - stage: horo
      stageUuid: "633e5910-4c23-86cf-9153-b9abafff10c5"
    - stage: seal
      stageUuid: "a2743f43-ffab-8e11-b2da-898b2ae613ee"
    - stage: uuid
      stageUuid: "3fa585ae-0bd4-8d25-9080-03ec95c4f213"
version: 2
---
# amendment

Use when a contract is modified — amendment date, amendments previous (chain of amendments), amendment terms, amendments effect on prior terms, signature requirement.

Composes: [[Contracts]] · [[customers/contracts/contract/amendments]] · [[matter]].

**Law — [[law]]: an amendment modifies a contract as a dated link in the chain of prior amendments — carrying its terms, its effect on prior terms, and its signature requirement.**

## Standards
- UCC-2-209
- PECL-Art-2.105
