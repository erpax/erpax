---
name: frameworks
description: "Use when registering or browsing the reference library of compliance frameworks — IFRS, SOX, GDPR, ISO-27001, COSO, tax, ESG, banking — with code, category, issuing body, effective date, and official resource URL; super-admin-only writes, tenant-read. The read-only compliance-framework master that ComplianceRequirements link to."
atomPath: "compliance/frameworks"
coordinate: "compliance/frameworks · 7/descent · 959d28b0"
contentUuid: "167d574b-308b-548d-a436-c6fcad810471"
diamondUuid: "cc8987c0-f8f1-8593-ae41-3674f2ff4a5f"
uuid: "959d28b0-0957-8b44-9c77-5abaa2325880"
horo: 7
bonds:
  in:
    - requirements
    - standard
  out:
    - requirements
    - standard
typography:
  partition: compliance
  bondDegree: 0
  neighbors: []
standards:
  - "COSO-2013"
  - "COSO-2013 internal-control-integrated-framework"
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management-systems"
  - "ISO-37301:2021 compliance-management-systems`"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - requirements
  matrix:
    - requirements
    - standard
  backlinks:
    - requirements
    - standard
signatures:
  computationUuid: "225a34af-0152-8f20-a577-1d8f3ccf05b1"
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
      stageUuid: "9fd70ffe-7ed7-803a-9829-f55cf998eacb"
    - stage: seal
      stageUuid: "895746e9-e7fa-8a41-ba9f-2cf92387a576"
    - stage: uuid
      stageUuid: "abf85d4b-c83e-896c-a241-494b2ffc65c8"
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
