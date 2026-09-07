---
name: standard
description: "Use when the Payload API's access must derive from and be gated by its legal surface — the strictest tier a collection's standards demand, and the endpoints that fall below it."
atomPath: "access/standard"
coordinate: "access/standard · 6/6 · c9671412"
contentUuid: "a21d86f0-bb27-5ebb-8fb8-a4456595b794"
diamondUuid: "262c49ff-a35d-8d95-9e3c-92b0647ddff8"
uuid: "c9671412-0b56-8983-bcb0-0d916de3a304"
horo: 6
typography:
  partition: access
  bondDegree: 567
standards:
  - "BG Наредба Н-18 §СУПТО — fiscal writes are inspector-auditable, no delete on posted"
  - "CoE-108+"
  - "GDPR §17 right-to-erasure · §15 right-of-access — data-subject controls"
  - "ISO-27001"
  - "ISO/IEC 27001 A.5.15 access-control — role-required, tenant-isolated"
  - "ISO/IEC-27001:2022"
  - "NIST-SP-800-108"
  - "NIST-SP-800-108 — healed from ungated-mandatory by chatHealUngatedMandatory (fail-closed .ts gate)"
  - "NIST-SP-800-38D"
  - "NIST-SP-800-38D — healed from ungated-mandatory by chatHealUngatedMandatory (fail-closed .ts gate)"
  - "NIST-SP-800-57"
  - "NIST-SP-800-57 — healed from ungated-mandatory by chatHealUngatedMandatory (fail-closed .ts gate)"
  - "NIST-SP-800-63"
  - "NIST-SP-800-92"
  - "NIST-SP-800-92 — healed from ungated-mandatory by chatHealUngatedMandatory (fail-closed .ts gate)"
  - "Naredba-N-18"
  - "PCI-DSS"
  - "PCI-DSS — healed from ungated-mandatory by chatHealUngatedMandatory (fail-closed .ts gate)"
  - SOX
  - "SOX:2002 §404 internal-controls — you cannot post to a closed period"
bindings: []
signatures:
  computationUuid: "553a6b19-3b2d-8360-a73c-0fa0c13811d5"
  stages:
    - stage: path
      stageUuid: "5bb5aee6-276c-82c9-94ac-83e3349361cb"
    - stage: trinity
      stageUuid: "a9b8a6e0-0a29-824e-9e4d-6cdf6e1bb800"
    - stage: boundary
      stageUuid: "92f45ea3-2b86-832f-895f-28a5ecd712b4"
    - stage: links
      stageUuid: "8f95aa80-74bf-8c3d-9a60-aab99e8165fa"
    - stage: horo
      stageUuid: "3ee3020a-4c50-8a15-a180-3b9efbc383f4"
    - stage: seal
      stageUuid: "6d3b6308-0ee5-8196-a23b-c1128ce4f9a2"
    - stage: uuid
      stageUuid: "d76585bb-6329-85db-84c7-8755f8ad63aa"
version: 2
---
# access/standard — the API access derived from its law

The navigational cross ([[mesh]] standardApiCross) reaches standard → collection → endpoint. This closes the last edge: standard → ACCESS POLICY. Every operation of every collection sits in a SUPERPOSITION of (operation × its cited standards); `requiredAccessTier` collapses that to the strictest floor those standards demand (SOX/§404 · Наредба Н-18 → auditor-grade; GDPR · accounting → role-scoped; ISO-27001 → tenant-isolated), and `accessComplianceGaps` flags any endpoint whose declared access sits below its floor — writes take the full floor, reads relax one rung.

The auditor's clause→code trace now reaches the PERMISSION: a create-invoices call is governed by every standard the invoices atom cites, and if its access is weaker than SOX demands, the gap is named before the write.

**Honest boundary.** The standard→tier map is DECLARED, arguable, in the open — no theorem derives that §404 means delete-restricted; a human contests it here. And this reads the DECLARED access factory lexically; the compiler-final read (boot the config, resolve the real `access` object) is the gate's production path — a factory name is evidence, not proof.

**Law — [[law]]: an API operation carries at least the access its collection's strictest standard demands; an endpoint below its legal floor is a gap named before it can be called.**

Composes: [[mesh]] · [[access]] · [[rules]]/audience · [[law]].
