---
name: frameworks
description: "Use when registering or browsing the reference library of compliance frameworks — IFRS, SOX, GDPR, ISO-27001, COSO, tax, ESG, banking — with code, category, issuing body, effective date, and official resource URL; super-admin-only writes, tenant-read. The read-only compliance-framework master that ComplianceRequirements link to."
atomPath: "compliance/frameworks"
coordinate: "compliance/frameworks · 8/crest · 5fcbda8b"
contentUuid: "4d425667-a8e1-511b-89b7-0a464278bc49"
diamondUuid: "0dd71cf1-9956-8b64-8275-611febe7fcfe"
uuid: "5fcbda8b-c582-8e7e-b3d1-9714c22ac2a4"
horo: 8
typography:
  partition: compliance
  bondDegree: 6
standards:
  - "COSO-2013"
  - "COSO-2013 internal-control-integrated-framework"
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management-systems"
  - "ISO-37301:2021 compliance-management-systems`"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "bd2abdbd-26c0-80a4-8e20-69a4276fb0bc"
  stages:
    - stage: path
      stageUuid: "52125b33-5e80-8de4-84b6-244511383a6f"
    - stage: trinity
      stageUuid: "3393338b-d10f-8ecb-9837-fc858f50360c"
    - stage: boundary
      stageUuid: "d9625487-5780-8264-9384-035ec75f0e2c"
    - stage: links
      stageUuid: "5af70cb3-e051-8ffb-932b-b6010fd888c2"
    - stage: horo
      stageUuid: "5491453b-a650-8ba2-8d8f-53835aa5d1f2"
    - stage: seal
      stageUuid: "895746e9-e7fa-8a41-ba9f-2cf92387a576"
    - stage: uuid
      stageUuid: "21a5610c-b378-8bec-8929-ad0d74fc14ab"
version: 2
---
# compliance-frameworks

Compliance Frameworks — reference library of regulatory and control frameworks.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-37301:2021 compliance-management-systems`

- ISO-37301:2021 compliance-management-systems
- COSO-2013 internal-control-integrated-framework
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[compliance/frameworks/compliance/requirements]].
