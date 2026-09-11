---
name: requirements
description: "Use when defining or querying individual control obligations within a compliance framework — code, title, description, section, severity (critical/high/medium/low) — linked to a ComplianceFramework; super-admin-only writes, tenant-read. The per-requirement obligation register that ComplianceGaps reference."
atomPath: "compliance/frameworks/compliance/requirements"
coordinate: "compliance/frameworks/compliance/requirements · 7/descent · 6e8991c3"
contentUuid: "c0653144-7f62-50fe-86b6-a76de825a0f8"
diamondUuid: "0e392f69-0cf6-80f3-9170-bf7559dac547"
uuid: "6e8991c3-dc80-8fd0-8fda-0d11a9848f43"
horo: 7
typography:
  partition: compliance
  bondDegree: 36
standards:
  - "ISO-37301"
  - "ISO-37301:2021 obligation-register"
  - "ISO-37301:2021 obligation-register`"
  - "SOX §404 control-objective"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f4022340-ef32-8c44-a40b-67096c611f65"
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
      stageUuid: "d2cd19b9-1f78-8c13-bc52-22677acc5f40"
    - stage: seal
      stageUuid: "66c3d07c-0ea3-856a-a68a-827c41865036"
    - stage: uuid
      stageUuid: "511cb66b-1c76-8722-a24e-0f405c72fd43"
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
