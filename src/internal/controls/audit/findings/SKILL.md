---
name: findings
description: "Use when recording, tracking, or resolving audit findings against internal controls — control deficiency, significant deficiency, material weakness, misstatement; severity, root cause, management response, remediation status, ISMS-audit (ISO/IEC 27007) and SOX §404 deficiency workflow. The audit-findings ISO-19011 evidence collection."
atomPath: "internal/controls/audit/findings"
coordinate: "internal/controls/audit/findings · 8/crest · 0501e9ce"
contentUuid: "6e6a4540-59ff-5b61-8a26-6466270cea82"
diamondUuid: "2d7a7544-fa51-830b-be16-36a8f5269cb5"
uuid: "0501e9ce-beec-8b99-801a-16d16421c9fb"
horo: 8
typography:
  partition: internal
  bondDegree: 24
standards:
  - "COSO-2013"
  - "ISO-19011:2018 audit-finding"
  - "ISO-19011:2018 audit-finding`"
  - "ISO/IEC-27007:2020 ISMS-auditing"
  - "ISO/IEC-27007:2020 ISMS-auditing`"
  - "SOX §404 internal-controls deficiency-tracking"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "bd2be2f8-4453-8ed5-b842-f5be18d3aa8c"
  stages:
    - stage: path
      stageUuid: "793ca585-325a-8e30-96f9-74a39aff22b7"
    - stage: trinity
      stageUuid: "2125443f-49dd-8adf-acde-add375e74d36"
    - stage: boundary
      stageUuid: "97060c2e-77b0-81b2-a2e2-766ea264a197"
    - stage: links
      stageUuid: "6ed701a1-e071-890a-bc8e-ea3d8b841f5e"
    - stage: horo
      stageUuid: "f1f00377-5f21-8d9b-a01d-ab9e4bde1d71"
    - stage: seal
      stageUuid: "95e175e4-276a-82e7-a54c-a0a432dfff48"
    - stage: uuid
      stageUuid: "d70386e6-1dc0-8848-8970-1ba22ac5e4c0"
version: 2
---
# audit-findings

Audit Findings — issues raised by internal/external auditors against controls.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

The `seed.ts` records the **erpax-court** self-audit (`court-docket.ts`): the society's
adversarial review — auditors → prosecutors ∥ defense → judges — persisted as permanent,
tamper-evident findings ([[proof]] · [[akashic]]), the system judging itself. Each case
carries its disposition (remediated · open · overruled · dismissed), keyed idempotently by
the proceeding run-id so a re-seed never duplicates.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19011:2018 audit-finding`
- `@standard ISO/IEC-27007:2020 ISMS-auditing`

- ISO-19011:2018 audit-finding
- ISO/IEC-27007:2020 ISMS-auditing
- SOX §404 internal-controls deficiency-tracking
- ISO-19011:2018 audit-trail

Composes: [[internal/controls/audit/findings/remediation/plans]] · [[access]] · [[hooks]] · [[proof]] · [[akashic]].

**Law — [[law]]: an audit finding is an issue raised against a control — classified by severity (deficiency / significant deficiency / material weakness / misstatement) with root cause, management response and remediation status — persisted as permanent, tamper-evident evidence ([[proof]]).**
