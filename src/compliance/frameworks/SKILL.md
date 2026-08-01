---
name: frameworks
description: "Use when registering or browsing the reference library of compliance frameworks — IFRS, SOX, GDPR, ISO-27001, COSO, tax, ESG, banking — with code, category, issuing body, effective date, and official resource URL; super-admin-only writes, tenant-read. The read-only compliance-framework master that ComplianceRequirements link to."
atomPath: "compliance/frameworks"
coordinate: "compliance/frameworks · 8/crest · 1dd70e90"
contentUuid: "fa46bafe-5525-54a8-bcb8-3fe2c4e08433"
diamondUuid: "466331b9-1d1a-8eea-ae95-a2ed942ee3bd"
uuid: "1dd70e90-5578-8da8-aa0c-689e31ad6128"
horo: 8
typography:
  partition: compliance
  bondDegree: 0
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
  computationUuid: "5bb29dfe-103d-8b67-b524-4eee7c5a39af"
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
      stageUuid: "edd6fa04-4f27-8d05-9b68-7b23dd71a5aa"
    - stage: seal
      stageUuid: "895746e9-e7fa-8a41-ba9f-2cf92387a576"
    - stage: uuid
      stageUuid: "ec6ea614-6a29-869a-9322-0073a3bb8201"
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
