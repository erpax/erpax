---
name: standard
description: "Use when the Payload API's access must derive from and be gated by its legal surface — the strictest tier a collection's standards demand, and the endpoints that fall below it."
atomPath: "access/standard"
coordinate: "access/standard · 6/6 · 71b35936"
contentUuid: "c1313da7-5084-5b9d-92d4-3da47dd0d4fe"
diamondUuid: "52f4644f-87ba-809b-a494-f7b9c676b5e7"
uuid: "71b35936-d2d2-8a89-a728-bf9981f7b20d"
horo: 6
typography:
  partition: access
  bondDegree: 517
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
  computationUuid: "55089869-d3d3-8f9c-af5b-68a316d77261"
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
      stageUuid: "45880191-f18e-8f1c-8b3a-4e5c39c2c3ec"
    - stage: seal
      stageUuid: "6d3b6308-0ee5-8196-a23b-c1128ce4f9a2"
    - stage: uuid
      stageUuid: "d40d28ee-8033-8bbb-b9c5-2afccc9b8598"
version: 2
---
# access/standard — the API access derived from its law

The navigational cross ([[mesh]] standardApiCross) reaches standard → collection → endpoint. This closes the last edge: standard → ACCESS POLICY. Every operation of every collection sits in a SUPERPOSITION of (operation × its cited standards); `requiredAccessTier` collapses that to the strictest floor those standards demand (SOX/§404 · Наредба Н-18 → auditor-grade; GDPR · accounting → role-scoped; ISO-27001 → tenant-isolated), and `accessComplianceGaps` flags any endpoint whose declared access sits below its floor — writes take the full floor, reads relax one rung.

The auditor's clause→code trace now reaches the PERMISSION: a create-invoices call is governed by every standard the invoices atom cites, and if its access is weaker than SOX demands, the gap is named before the write.

**Honest boundary.** The standard→tier map is DECLARED, arguable, in the open — no theorem derives that §404 means delete-restricted; a human contests it here. And this reads the DECLARED access factory lexically; the compiler-final read (boot the config, resolve the real `access` object) is the gate's production path — a factory name is evidence, not proof.

**Law — [[law]]: an API operation carries at least the access its collection's strictest standard demands; an endpoint below its legal floor is a gap named before it can be called.**

Composes: [[mesh]] · [[access]] · [[rules]]/audience · [[law]].
