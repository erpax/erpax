---
name: privilege
description: "Use when reasoning about privilege — **Privilege** — attorney-client confidentiality and the ethical wall that screens a matter from conflicted staff — is an access scope: a capability on the role × isolation to the m"
atomPath: "vocabulary/privilege"
coordinate: "vocabulary/privilege · 2/share · 97430453"
contentUuid: "02f22d11-4851-51ac-a98c-ce39351f8b5b"
diamondUuid: "1e3a3a91-9db5-84b9-9c48-92489e803234"
uuid: "97430453-49f8-85d6-b63d-5809f7eb75c3"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 38
standards: []
bindings: []
signatures:
  computationUuid: "1437dd5f-74b6-8508-ac87-1ad30a45eaef"
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
      stageUuid: "29bbe5d3-ab08-88ad-9779-c0c052c68014"
    - stage: seal
      stageUuid: "6851fde5-94f0-82c6-bbeb-fd00523bd849"
    - stage: uuid
      stageUuid: "7589b695-0477-8baf-b4f0-d41fce19c062"
version: 2
---
# privilege — the confidentiality wall (access scope + crypto-shred)

**Privilege** — attorney-client confidentiality and the ethical wall that screens a [[matter]] from conflicted staff — is an [[access]] scope: a capability on the role × isolation to the matter's tenant, computed by the role→capability cross, never a by-name grant. erpax cannot natively keep a secret (its design limit is detect-not-prevent), so privilege is enforced two ways — [[access]] gates *reads*, and crypto-shred makes a sealed document unrecoverable once its key is destroyed (confidentiality as key management, the [[localize]] tamper-cost fusion). A [[conflict]] found screens the affected staff outside the wall; the wall itself is tamper-evident ([[proof]]). Composes [[access]] · [[matter]] · [[conflict]] · [[localize]] · [[proof]] · [[data/processing/activities]] · [[internal/controls]] · [[beyond]].

**Law — [[law]]: privilege is a computed [[access]] scope (capability × matter isolation) plus crypto-shred, never a by-name grant — since erpax keeps no native secret, confidentiality is enforced by gating reads and by destroying a key, not by trusting a label.**
