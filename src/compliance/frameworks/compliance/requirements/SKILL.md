---
name: requirements
description: "Use when defining or querying individual control obligations within a compliance framework — code, title, description, section, severity (critical/high/medium/low) — linked to a ComplianceFramework; super-admin-only writes, tenant-read. The per-requirement obligation register that ComplianceGaps reference."
atomPath: "compliance/frameworks/compliance/requirements"
coordinate: "compliance/frameworks/compliance/requirements · 1/base · 522ea30d"
contentUuid: "2baec56f-41fd-5be1-8b42-00719bcb50c7"
diamondUuid: "c16c831f-85ad-8332-9a2a-a38151d9ef52"
uuid: "522ea30d-cdd6-8828-b6e7-66f924869942"
horo: 1
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
  computationUuid: "59425d0d-2a57-8c78-8e3e-25c183260fbc"
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
      stageUuid: "ca810b4d-387e-8d15-857d-ec82ee1b53de"
    - stage: seal
      stageUuid: "66c3d07c-0ea3-856a-a68a-827c41865036"
    - stage: uuid
      stageUuid: "6cea4752-ff11-81df-b9cd-adf89a719c6a"
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
