---
name: requirements
description: "Use when defining or querying individual control obligations within a compliance framework — code, title, description, section, severity (critical/high/medium/low) — linked to a ComplianceFramework; super-admin-only writes, tenant-read. The per-requirement obligation register that ComplianceGaps reference."
atomPath: "compliance/frameworks/compliance/requirements"
coordinate: "compliance/frameworks/compliance/requirements · 5/round · de18b883"
contentUuid: "c4408a3a-552d-5082-8a6b-97fba20de224"
diamondUuid: "21135dec-a101-887f-a259-f56bc607894c"
uuid: "de18b883-4b75-8e77-ae4b-9570ec01ef39"
horo: 5
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
  - "ISO-37301:2021 obligation-register`"
  - "SOX §404 control-objective"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "5976fb15-be0a-8530-ba60-8a524c526930"
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
      stageUuid: "195a2508-3d57-8489-a50e-19d32960006c"
    - stage: seal
      stageUuid: "66c3d07c-0ea3-856a-a68a-827c41865036"
    - stage: uuid
      stageUuid: "102ef7b8-7d40-801f-bf35-e2e3539e946f"
version: 2
---
# compliance-requirements

Compliance Requirements — per-requirement obligation register within a compliance framework.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-37301:2021 obligation-register`

- ISO-37301:2021 obligation-register
- SOX §404 control-objective
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[compliance/frameworks/compliance/requirements/compliance/gaps]].
