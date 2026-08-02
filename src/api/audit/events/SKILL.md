---
name: events
description: "Use when recording or querying every outbound external-API call (FX rate, VAT validation, sanctions screening, e-invoicing discovery, business registry, mTLS filing) — one row per call, kind-bucketed, country-scoped, source-attributed, result + error captured; SOX §404 / ISO 19011 evidence of every external system contacted. The external-API audit-trail collection."
atomPath: "api/audit/events"
coordinate: "api/audit/events · 4/weave · 795f2cdf"
contentUuid: "7d062054-961e-58f7-8899-accace3e1ecc"
diamondUuid: "25fdaa70-014e-8263-93c0-549411cccc65"
uuid: "795f2cdf-708e-82d8-a89b-ad201ae0daf5"
horo: 4
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
  computationUuid: "0ec0c9bb-a7d3-8fc8-bad2-de3a2891f37a"
  stages:
    - stage: path
      stageUuid: "bf738222-5914-8955-a76b-9db80f3809f4"
    - stage: trinity
      stageUuid: "1069156d-40b0-887f-85b5-54380f72613e"
    - stage: boundary
      stageUuid: "4d521579-be7b-8fd5-9bca-5c4190ece268"
    - stage: links
      stageUuid: "ac3ad4ea-0836-82dd-b5b4-4df24b8b6ddf"
    - stage: horo
      stageUuid: "f82e12da-43b6-8406-a662-5953273e185e"
    - stage: seal
      stageUuid: "8b1abacb-6f15-8b8c-81c3-84b4a999eab6"
    - stage: uuid
      stageUuid: "21321de7-abf4-8856-a35c-a1e97c48439b"
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
