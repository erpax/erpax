---
name: findings
description: "Use when recording, tracking, or resolving audit findings against internal controls — control deficiency, significant deficiency, material weakness, misstatement; severity, root cause, management response, remediation status, ISMS-audit (ISO/IEC 27007) and SOX §404 deficiency workflow. The audit-findings ISO-19011 evidence collection."
atomPath: internal/controls/audit/findings
coordinate: internal/controls/audit/findings · 8/crest · f136fef9
contentUuid: "e7e768e5-f19b-5dd8-94e5-a282c737fc97"
diamondUuid: "c5c2fc74-032f-8636-b97a-bdeed4f8342e"
uuid: "f136fef9-7ef3-88b3-b4e9-1e6d1bd2cb67"
horo: 8
bonds:
  in:
    - access
    - akashic
    - audit
    - finding
    - functions
    - hooks
    - law
    - materiality
    - plans
    - proof
    - provisions
  out:
    - access
    - akashic
    - finding
    - functions
    - hooks
    - law
    - materiality
    - plans
    - proof
    - provisions
typography:
  partition: internal
  bondDegree: 0
  neighbors: []
standards:
  - "COSO-2013"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "IAS-1"
  - "IFRS-9"
  - "ILO-C105"
  - "ISO-19011"
  - "ISO-19011:2018 audit-finding"
  - "ISO-19011:2018 audit-trail"
  - "ISO/IEC-27007:2020 ISMS-auditing"
  - "ISO/IEC-29119"
  - SOX
  - "SOX §404 internal-controls deficiency-tracking"
  - "US-GAAP"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - access
    - akashic
    - hooks
    - law
    - plans
    - proof
  matrix:
    - access
    - akashic
    - finding
    - functions
    - hooks
    - law
    - materiality
    - plans
    - proof
    - provisions
  backlinks:
    - access
    - akashic
    - finding
    - functions
    - hooks
    - law
    - materiality
    - plans
    - proof
    - provisions
signatures:
  computationUuid: "26fdcee2-bbab-86b8-b04d-a28d321a76d7"
  stages:
    - stage: path
      stageUuid: "793ca585-325a-8e30-96f9-74a39aff22b7"
    - stage: trinity
      stageUuid: "2125443f-49dd-8adf-acde-add375e74d36"
    - stage: boundary
      stageUuid: "f4a3cffa-c5f3-8ef4-83a9-a704697bde43"
    - stage: links
      stageUuid: "6ed701a1-e071-890a-bc8e-ea3d8b841f5e"
    - stage: horo
      stageUuid: "1ed49580-b280-8f40-9b4d-e6792114d919"
    - stage: seal
      stageUuid: "95e175e4-276a-82e7-a54c-a0a432dfff48"
    - stage: uuid
      stageUuid: "d363eab9-d3ea-8982-b49e-d9586df9abf2"
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
- ISO-19011:2018 audit-finding
- ISO/IEC-27007:2020 ISMS-auditing
- SOX §404 internal-controls deficiency-tracking
- ISO-19011:2018 audit-trail

Composes: [[internal/controls/audit/findings/remediation/plans]] · [[access]] · [[hooks]] · [[proof]] · [[akashic]].

**Law — [[law]]: an audit finding is an issue raised against a control — classified by severity (deficiency / significant deficiency / material weakness / misstatement) with root cause, management response and remediation status — persisted as permanent, tamper-evident evidence ([[proof]]).**
