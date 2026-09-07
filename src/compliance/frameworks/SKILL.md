---
name: frameworks
description: "Use when registering or browsing the reference library of compliance frameworks — IFRS, SOX, GDPR, ISO-27001, COSO, tax, ESG, banking — with code, category, issuing body, effective date, and official resource URL; super-admin-only writes, tenant-read. The read-only compliance-framework master that ComplianceRequirements link to."
atomPath: "compliance/frameworks"
coordinate: "compliance/frameworks · 2/share · 71e6ff18"
contentUuid: "3349bdeb-fc65-5b43-816d-dc9937592b97"
diamondUuid: "dcf3a00f-824f-8caf-92f4-befbdce8a9c9"
uuid: "71e6ff18-4bd2-849b-9f33-0d661a61fd80"
horo: 2
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
  computationUuid: "bec63dee-ec9a-8ba6-a3b6-9ccc68545570"
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
      stageUuid: "aad231c0-58c5-8852-a54a-31ceb2c3d2f3"
    - stage: seal
      stageUuid: "895746e9-e7fa-8a41-ba9f-2cf92387a576"
    - stage: uuid
      stageUuid: "1d3dafbb-ad86-818d-9f5c-ab693284aded"
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
