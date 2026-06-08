---
name: frameworks
description: "Use when registering or browsing the reference library of compliance frameworks — IFRS, SOX, GDPR, ISO-27001, COSO, tax, ESG, banking — with code, category, issuing body, effective date, and official resource URL; super-admin-only writes, tenant-read. The read-only compliance-framework master that ComplianceRequirements link to."
atomPath: compliance/frameworks
coordinate: compliance/frameworks · 4/weave · 1050fa30
contentUuid: "10f80006-63d4-5dc3-a67d-56eb580eef13"
diamondUuid: "14d43072-5161-8978-b4d7-d3840230969a"
uuid: "1050fa30-2bcd-8dad-9732-b9127754496a"
horo: 4
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
  - "US-CTA-2021"
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
  computationUuid: "1878db78-8057-84b6-a257-9b8af94ff1fb"
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
      stageUuid: "c7bc7491-f172-805e-bbf6-ec2ba0f130fa"
    - stage: seal
      stageUuid: "895746e9-e7fa-8a41-ba9f-2cf92387a576"
    - stage: uuid
      stageUuid: "4267800e-0516-8ec6-a417-02dc894e8501"
version: 2
---
# compliance-frameworks

Compliance Frameworks — reference library of regulatory and control frameworks.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-37301:2021 compliance-management-systems
- COSO-2013 internal-control-integrated-framework
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[compliance/frameworks/compliance/requirements]].
