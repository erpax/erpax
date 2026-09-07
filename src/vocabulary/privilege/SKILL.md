---
name: privilege
description: "Use when reasoning about privilege — **Privilege** — attorney-client confidentiality and the ethical wall that screens a matter from conflicted staff — is an access scope: a capability on the role × isolation to the m"
atomPath: "vocabulary/privilege"
coordinate: "vocabulary/privilege · 1/base · cae4ca87"
contentUuid: "7e6d52f2-ec2d-5d97-a788-1b72ce30559d"
diamondUuid: "05c3cb24-2349-833e-826b-fff651e6c766"
uuid: "cae4ca87-db2a-8584-bc2c-54782a572381"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "25536620-4017-8996-a0eb-9a09e5751888"
  stages:
    - stage: path
      stageUuid: "dc0903fd-7f85-8432-a340-ede0f9480a67"
    - stage: trinity
      stageUuid: "bb42a9ab-c8b3-8b0b-a765-7a9cba395b2f"
    - stage: boundary
      stageUuid: "6e671a93-3b87-8059-b410-f3490cde7cf3"
    - stage: links
      stageUuid: "4514349a-4277-8e4f-a255-94851b26e73e"
    - stage: horo
      stageUuid: "390a4c00-8cf6-85fb-8f0f-efba738f7e1d"
    - stage: seal
      stageUuid: "0b017cdb-38ae-822c-8ccc-da9a91c374db"
    - stage: uuid
      stageUuid: "ae07135b-a9fe-8b81-8cd4-b736b594623e"
version: 2
---
# privilege — the confidentiality wall (access scope + crypto-shred)

**Privilege** — attorney-client confidentiality and the ethical wall that screens a [[matter]] from conflicted staff — is an [[access]] scope: a capability on the role × isolation to the matter's tenant, computed by the role→capability cross, never a by-name grant. erpax cannot natively keep a secret (its design limit is detect-not-prevent), so privilege is enforced two ways — [[access]] gates *reads*, and crypto-shred makes a sealed document unrecoverable once its key is destroyed (confidentiality as key management, the [[localize]] tamper-cost fusion). A [[conflict]] found screens the affected staff outside the wall; the wall itself is tamper-evident ([[proof]]). Composes [[access]] · [[matter]] · [[conflict]] · [[localize]] · [[proof]] · [[data/processing/activities]] · [[internal/controls]] · [[beyond]].

**Law — [[law]]: privilege is a computed [[access]] scope (capability × matter isolation) plus crypto-shred, never a by-name grant — since erpax keeps no native secret, confidentiality is enforced by gating reads and by destroying a key, not by trusting a label.**
