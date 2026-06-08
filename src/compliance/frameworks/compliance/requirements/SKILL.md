---
name: requirements
description: "Use when defining or querying individual control obligations within a compliance framework — code, title, description, section, severity (critical/high/medium/low) — linked to a ComplianceFramework; super-admin-only writes, tenant-read. The per-requirement obligation register that ComplianceGaps reference."
atomPath: compliance/frameworks/compliance/requirements
coordinate: compliance/frameworks/compliance/requirements · 8/crest · 13aaf2c7
contentUuid: "c4bc2eaf-ef75-5483-9ecd-66933b3abf04"
diamondUuid: "b0964d4c-2d24-8248-bcf8-2127a3bb1577"
uuid: "13aaf2c7-0a12-8ee7-bb31-a9acb5aac02a"
horo: 8
bonds:
  in:
    - applicant
    - browser
    - carrier
    - experience
    - frameworks
    - gaps
    - location
    - memory
    - occupational
    - processor
    - software
    - storage
  out:
    - applicant
    - browser
    - carrier
    - experience
    - frameworks
    - gaps
    - location
    - memory
    - occupational
    - processor
    - software
    - storage
typography:
  partition: compliance
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-37301"
  - "ISO-37301:2021 obligation-register"
  - "SOX §404 control-objective"
  - "US-CTA-2021"
bindings: []
neighbors:
  wikilink:
    - gaps
  matrix:
    - applicant
    - browser
    - carrier
    - experience
    - frameworks
    - gaps
    - location
    - memory
    - occupational
    - processor
    - software
    - storage
  backlinks:
    - applicant
    - browser
    - carrier
    - experience
    - frameworks
    - gaps
    - location
    - memory
    - occupational
    - processor
    - software
    - storage
signatures:
  computationUuid: "7265b0d7-ed03-8eb5-8bc1-4ce509de7fcb"
  stages:
    - stage: path
      stageUuid: "12c5ca21-ec66-85c6-ac1b-89a64544597b"
    - stage: trinity
      stageUuid: "8e1787f9-d7f1-836d-9678-5f711b2733ab"
    - stage: boundary
      stageUuid: "5d6094c4-4b22-8b20-accb-04375d9242fc"
    - stage: links
      stageUuid: "379eb10e-62d0-8e8b-8482-ee00d61563d7"
    - stage: horo
      stageUuid: "9ef8aabc-265d-8978-9b65-d8100b0ebd43"
    - stage: seal
      stageUuid: "66c3d07c-0ea3-856a-a68a-827c41865036"
    - stage: uuid
      stageUuid: "62ed0cb1-9d6f-8dc1-9769-2f4acdac4b83"
version: 2
---
# compliance-requirements

Compliance Requirements — per-requirement obligation register within a compliance framework.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-37301:2021 obligation-register
- SOX §404 control-objective
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[compliance/frameworks/compliance/requirements/compliance/gaps]].
