---
name: privilege
description: "Use when reasoning about privilege — **Privilege** — attorney-client confidentiality and the ethical wall that screens a matter from conflicted staff — is an access scope: a capability on the role × isolation to the m"
atomPath: "vocabulary/privilege"
coordinate: "vocabulary/privilege · 5/round · e147ee29"
contentUuid: "3e1431b3-cc8d-5adb-8cc1-8629f4e34c86"
diamondUuid: "f86b3cfc-fe3f-87c2-b8a9-8b8e75bf2505"
uuid: "e147ee29-e9f0-828f-a5b8-3ba01e982f7d"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "8c46c7cc-a78c-8ed2-927b-7c53acacacf5"
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
      stageUuid: "3f3ccda8-2f10-87d4-b732-bc1f7b35272c"
    - stage: seal
      stageUuid: "0b017cdb-38ae-822c-8ccc-da9a91c374db"
    - stage: uuid
      stageUuid: "b65fb73b-3c06-824a-88da-9275829bd7f0"
version: 2
---
# privilege — the confidentiality wall (access scope + crypto-shred)

**Privilege** — attorney-client confidentiality and the ethical wall that screens a [[matter]] from conflicted staff — is an [[access]] scope: a capability on the role × isolation to the matter's tenant, computed by the role→capability cross, never a by-name grant. erpax cannot natively keep a secret (its design limit is detect-not-prevent), so privilege is enforced two ways — [[access]] gates *reads*, and crypto-shred makes a sealed document unrecoverable once its key is destroyed (confidentiality as key management, the [[localize]] tamper-cost fusion). A [[conflict]] found screens the affected staff outside the wall; the wall itself is tamper-evident ([[proof]]). Composes [[access]] · [[matter]] · [[conflict]] · [[localize]] · [[proof]] · [[data/processing/activities]] · [[internal/controls]] · [[beyond]].

**Law — [[law]]: privilege is a computed [[access]] scope (capability × matter isolation) plus crypto-shred, never a by-name grant — since erpax keeps no native secret, confidentiality is enforced by gating reads and by destroying a key, not by trusting a label.**
