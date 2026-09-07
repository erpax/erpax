---
name: events
description: "Use when recording or querying every outbound external-API call (FX rate, VAT validation, sanctions screening, e-invoicing discovery, business registry, mTLS filing) — one row per call, kind-bucketed, country-scoped, source-attributed, result + error captured; SOX §404 / ISO 19011 evidence of every external system contacted. The external-API audit-trail collection."
atomPath: "api/audit/events"
coordinate: "api/audit/events · 8/crest · f7627a9d"
contentUuid: "c9e9dcd9-ac49-5f28-b6a2-3b26d632b650"
diamondUuid: "8470ae54-ed9e-8d90-b09f-04f9bb6d8586"
uuid: "f7627a9d-9815-85d7-9cec-06bab5c08548"
horo: 8
typography:
  partition: api
  bondDegree: 54
standards:
  - "EU 910/2014 eidas signature-evidence"
  - "EU-Taxonomy-2020/852"
  - "ISO-19011"
  - "ISO-19011:2018 audit-trail external-system-evidence"
  - "ISO-19011:2018 audit-trail external-system-evidence`"
  - "ISO/IEC-27007:2020 isms-auditing"
  - "ISO/IEC-27007:2020 isms-auditing`"
  - "SOX §404 internal-controls external-system-traceability"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e88f8db4-d69b-8ddf-a0b1-62cb3197ed19"
  stages:
    - stage: path
      stageUuid: "bf738222-5914-8955-a76b-9db80f3809f4"
    - stage: trinity
      stageUuid: "1069156d-40b0-887f-85b5-54380f72613e"
    - stage: boundary
      stageUuid: "4d521579-be7b-8fd5-9bca-5c4190ece268"
    - stage: links
      stageUuid: "a155ffda-06a3-889b-af5e-2eb0ca4e4c66"
    - stage: horo
      stageUuid: "07e53f23-6526-890a-afd9-4457798b348f"
    - stage: seal
      stageUuid: "8b1abacb-6f15-8b8c-81c3-84b4a999eab6"
    - stage: uuid
      stageUuid: "cc1ddb70-5b1f-8250-a78a-2a6744eaa8a4"
version: 2
---
# api-audit-events

API Audit Events — generic landing collection for every external-API.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19011:2018 audit-trail external-system-evidence`
- `@standard ISO/IEC-27007:2020 isms-auditing`

- ISO-19011:2018 audit-trail external-system-evidence
- ISO/IEC-27007:2020 isms-auditing
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls external-system-traceability
- EU 910/2014 eidas signature-evidence

Composes: [[access]] · [[auth]] · [[hooks]] · [[field]] · [[standard]].

**Law — [[law]]: every outbound external-API call lands one immutable row — kind-bucketed, country-scoped, source-attributed, result and error captured — so every external system contacted is provable evidence, never an untracked side-channel.**
