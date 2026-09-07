---
name: privilege
description: "Use when reasoning about privilege — **Privilege** — attorney-client confidentiality and the ethical wall that screens a matter from conflicted staff — is an access scope: a capability on the role × isolation to the m"
atomPath: "vocabulary/privilege"
coordinate: "vocabulary/privilege · 4/weave · 19543454"
contentUuid: "029c51ed-6009-5214-9b86-2caaf2bf27dc"
diamondUuid: "3ed74bdd-2312-8288-8c4f-988acf9ddbdc"
uuid: "19543454-e95a-8381-97ae-c76d46adc0aa"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "78d792b0-438f-8d91-851a-b230bf9c5b7a"
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
      stageUuid: "3dd31af9-ff10-815b-95a9-8107c28cc14a"
    - stage: seal
      stageUuid: "0b017cdb-38ae-822c-8ccc-da9a91c374db"
    - stage: uuid
      stageUuid: "e98c9026-aff8-8af3-bc99-05afb30280a8"
version: 2
---
# privilege — the confidentiality wall (access scope + crypto-shred)

**Privilege** — attorney-client confidentiality and the ethical wall that screens a [[matter]] from conflicted staff — is an [[access]] scope: a capability on the role × isolation to the matter's tenant, computed by the role→capability cross, never a by-name grant. erpax cannot natively keep a secret (its design limit is detect-not-prevent), so privilege is enforced two ways — [[access]] gates *reads*, and crypto-shred makes a sealed document unrecoverable once its key is destroyed (confidentiality as key management, the [[localize]] tamper-cost fusion). A [[conflict]] found screens the affected staff outside the wall; the wall itself is tamper-evident ([[proof]]). Composes [[access]] · [[matter]] · [[conflict]] · [[localize]] · [[proof]] · [[data/processing/activities]] · [[internal/controls]] · [[beyond]].

**Law — [[law]]: privilege is a computed [[access]] scope (capability × matter isolation) plus crypto-shred, never a by-name grant — since erpax keeps no native secret, confidentiality is enforced by gating reads and by destroying a key, not by trusting a label.**
