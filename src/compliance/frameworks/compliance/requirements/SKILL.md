---
name: requirements
description: "Use when defining or querying individual control obligations within a compliance framework — code, title, description, section, severity (critical/high/medium/low) — linked to a ComplianceFramework; super-admin-only writes, tenant-read. The per-requirement obligation register that ComplianceGaps reference."
atomPath: "compliance/frameworks/compliance/requirements"
coordinate: "compliance/frameworks/compliance/requirements · 2/share · f73af6e3"
contentUuid: "5575812d-0d50-5fc0-adeb-51ef34bfa0b1"
diamondUuid: "4bd68a4a-2719-8daf-8a89-3c1b9bb4031f"
uuid: "f73af6e3-a982-80f7-82b3-065da0e018a9"
horo: 2
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
  computationUuid: "9b0c4b26-97a6-8312-bb2f-985feacac902"
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
      stageUuid: "c6204815-afb6-833b-b17d-790177b3b120"
    - stage: seal
      stageUuid: "66c3d07c-0ea3-856a-a68a-827c41865036"
    - stage: uuid
      stageUuid: "7de63c42-cd14-8da1-accb-33bc5d6216ab"
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
