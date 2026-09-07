---
name: privilege
description: "Use when reasoning about privilege — **Privilege** — attorney-client confidentiality and the ethical wall that screens a matter from conflicted staff — is an access scope: a capability on the role × isolation to the m"
atomPath: "vocabulary/privilege"
coordinate: "vocabulary/privilege · 2/share · e5909e6f"
contentUuid: "e2510642-89ef-5ac8-a61a-e23696f83c23"
diamondUuid: "146086f3-56d8-8c81-adac-d1e03f107748"
uuid: "e5909e6f-fb68-8584-b2b1-0dafb586c251"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "666a6af9-d5ec-8aff-86da-0db9857d9b21"
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
      stageUuid: "0ccee222-b7ef-833b-b828-f7d9e49ce43a"
    - stage: seal
      stageUuid: "0b017cdb-38ae-822c-8ccc-da9a91c374db"
    - stage: uuid
      stageUuid: "4acd36bb-daeb-8c8e-88f1-7eec14b205c2"
version: 2
---
# privilege — the confidentiality wall (access scope + crypto-shred)

**Privilege** — attorney-client confidentiality and the ethical wall that screens a [[matter]] from conflicted staff — is an [[access]] scope: a capability on the role × isolation to the matter's tenant, computed by the role→capability cross, never a by-name grant. erpax cannot natively keep a secret (its design limit is detect-not-prevent), so privilege is enforced two ways — [[access]] gates *reads*, and crypto-shred makes a sealed document unrecoverable once its key is destroyed (confidentiality as key management, the [[localize]] tamper-cost fusion). A [[conflict]] found screens the affected staff outside the wall; the wall itself is tamper-evident ([[proof]]). Composes [[access]] · [[matter]] · [[conflict]] · [[localize]] · [[proof]] · [[data/processing/activities]] · [[internal/controls]] · [[beyond]].

**Law — [[law]]: privilege is a computed [[access]] scope (capability × matter isolation) plus crypto-shred, never a by-name grant — since erpax keeps no native secret, confidentiality is enforced by gating reads and by destroying a key, not by trusting a label.**
