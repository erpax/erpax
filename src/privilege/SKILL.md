---
name: privilege
description: "Use when reasoning about privilege — **Privilege** — attorney-client confidentiality and the ethical wall that screens a matter from conflicted staff — is an access scope: a capability on the role × isolation to the m"
atomPath: privilege
coordinate: privilege · 7/descent · 96e57864
contentUuid: "5f79360e-c38a-5211-8df6-ec3ebba32573"
diamondUuid: "d64ed830-2909-8a47-b144-ddb986ad2ded"
uuid: "96e57864-1959-8c33-9788-8b63d5990e97"
horo: 7
bonds:
  in:
    - access
    - activities
    - beyond
    - confidentiality
    - conflict
    - controls
    - law
    - localize
    - matter
    - proof
    - requisitions
    - runs
  out:
    - access
    - activities
    - beyond
    - confidentiality
    - conflict
    - controls
    - law
    - localize
    - matter
    - proof
    - requisitions
    - runs
typography:
  partition: privilege
  bondDegree: 38
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - activities
    - beyond
    - conflict
    - controls
    - law
    - localize
    - matter
    - proof
  matrix:
    - access
    - activities
    - beyond
    - confidentiality
    - conflict
    - controls
    - law
    - localize
    - matter
    - proof
    - requisitions
    - runs
  backlinks:
    - access
    - activities
    - beyond
    - confidentiality
    - conflict
    - controls
    - law
    - localize
    - matter
    - proof
    - requisitions
    - runs
signatures:
  computationUuid: "a3137eee-f860-8723-8be4-9b48e13407f1"
  stages:
    - stage: path
      stageUuid: "825e3197-ea0a-8650-95df-a77b9f0a0b38"
    - stage: trinity
      stageUuid: "d92ee32e-5f66-8ab7-8191-b817d97777ce"
    - stage: boundary
      stageUuid: "27cc47fe-fb70-827d-8bd5-17c9cdadf9d4"
    - stage: links
      stageUuid: "66d36f31-bd5c-811f-b8a9-c8c905d6d7e2"
    - stage: horo
      stageUuid: "6d1f61b1-81fc-8d12-add7-bf65db1ccebb"
    - stage: seal
      stageUuid: "131f077b-ebbe-8e13-8d49-19597c56e685"
    - stage: uuid
      stageUuid: "5a27a9a5-a047-8da4-88dc-1456867591c2"
version: 2
---
# privilege — the confidentiality wall (access scope + crypto-shred)

**Privilege** — attorney-client confidentiality and the ethical wall that screens a [[matter]] from conflicted staff — is an [[access]] scope: a capability on the role × isolation to the matter's tenant, computed by the role→capability cross, never a by-name grant. erpax cannot natively keep a secret (its design limit is detect-not-prevent), so privilege is enforced two ways — [[access]] gates *reads*, and crypto-shred makes a sealed document unrecoverable once its key is destroyed (confidentiality as key management, the [[localize]] tamper-cost fusion). A [[conflict]] found screens the affected staff outside the wall; the wall itself is tamper-evident ([[proof]]). Composes [[access]] · [[matter]] · [[conflict]] · [[localize]] · [[proof]] · [[data/processing/activities]] · [[internal/controls]] · [[beyond]].

**Law — [[law]]: privilege is a computed [[access]] scope (capability × matter isolation) plus crypto-shred, never a by-name grant — since erpax keeps no native secret, confidentiality is enforced by gating reads and by destroying a key, not by trusting a label.**
