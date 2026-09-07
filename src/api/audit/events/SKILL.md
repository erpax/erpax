---
name: events
description: "Use when recording or querying every outbound external-API call (FX rate, VAT validation, sanctions screening, e-invoicing discovery, business registry, mTLS filing) — one row per call, kind-bucketed, country-scoped, source-attributed, result + error captured; SOX §404 / ISO 19011 evidence of every external system contacted. The external-API audit-trail collection."
atomPath: "api/audit/events"
coordinate: "api/audit/events · 5/round · 8c2a509d"
contentUuid: "f48558d7-e433-5ea6-8f72-799d5dc690d5"
diamondUuid: "cc9e8284-911a-853b-9276-718d9b80cee3"
uuid: "8c2a509d-541d-8d2f-afaf-0f0363af85fa"
horo: 5
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
  computationUuid: "b18a5676-bb58-8770-a640-51ef7d2cdafd"
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
      stageUuid: "656573c5-941e-8387-9b3e-30f8a3d23314"
    - stage: seal
      stageUuid: "8b1abacb-6f15-8b8c-81c3-84b4a999eab6"
    - stage: uuid
      stageUuid: "6d78fb02-d77f-8919-9746-cec18193e39c"
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
