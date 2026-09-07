---
name: requirements
description: "Use when defining or querying individual control obligations within a compliance framework — code, title, description, section, severity (critical/high/medium/low) — linked to a ComplianceFramework; super-admin-only writes, tenant-read. The per-requirement obligation register that ComplianceGaps reference."
atomPath: "compliance/frameworks/compliance/requirements"
coordinate: "compliance/frameworks/compliance/requirements · 2/share · f6c2fdef"
contentUuid: "d130dee8-4d30-5b1e-8652-ef525c4b5437"
diamondUuid: "22e92800-7110-8889-b202-bef907930365"
uuid: "f6c2fdef-7450-8c50-92ce-a254810ccbed"
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
  computationUuid: "57d9feb7-62e0-8b23-83f5-0919d47928a3"
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
      stageUuid: "b3289cad-769b-82ed-80aa-32ff99187a1f"
    - stage: seal
      stageUuid: "66c3d07c-0ea3-856a-a68a-827c41865036"
    - stage: uuid
      stageUuid: "e47dfc6a-0ca0-8642-a61a-6e953fcc1c89"
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
