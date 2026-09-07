---
name: findings
description: "Use when recording, tracking, or resolving audit findings against internal controls — control deficiency, significant deficiency, material weakness, misstatement; severity, root cause, management response, remediation status, ISMS-audit (ISO/IEC 27007) and SOX §404 deficiency workflow. The audit-findings ISO-19011 evidence collection."
atomPath: "internal/controls/audit/findings"
coordinate: "internal/controls/audit/findings · 7/descent · 80dd2f30"
contentUuid: "36b6b547-14a4-5419-bd8d-0fb0e70ce606"
diamondUuid: "fe191f67-79fe-8f7f-8c64-46d62853015e"
uuid: "80dd2f30-deda-814a-af72-b1fb31ed0cec"
horo: 7
typography:
  partition: internal
  bondDegree: 30
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
  computationUuid: "78461596-a30e-8100-96a3-cff2dc172bf5"
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
      stageUuid: "98aae258-6dae-8c32-a3bd-357ab57e48d0"
    - stage: seal
      stageUuid: "95e175e4-276a-82e7-a54c-a0a432dfff48"
    - stage: uuid
      stageUuid: "6523bdb5-fd72-81a4-932c-95921d8921e9"
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
