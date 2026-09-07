---
name: definitions
description: "Use when authoring data-driven multi-step approval rules for any collection — BPMN-2.0 step kinds (approval, all-of-N, any-of-N, notification, service task, decision), assignee modes, SLA escalation, JSON-Logic conditions, and state-machine lifecycle gate without a code change. The reusable approval-template collection."
atomPath: "workflow/definitions"
coordinate: "workflow/definitions · 4/weave · cb76583f"
contentUuid: "a0520e3f-2be9-55b3-8897-32d314635895"
diamondUuid: "a4cf1e59-a430-8161-96ba-50ebd64ebe0b"
uuid: "cb76583f-11cb-888c-97cc-026443399439"
horo: 4
typography:
  partition: workflow
  bondDegree: 46
standards:
  - "ASC-606"
  - "IFRS-15"
  - "ISA-95"
  - "ISO-27002 §5.4 segregation-of-duties"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "ISO/IEC 19510:2013 BPMN-2.0"
  - "ISO/IEC 19510:2013 BPMN-2.0`"
  - "ISO/IEC-19510"
  - "SOX §404 internal-controls multi-step-approval"
  - "US-GAAP"
  - "W3C-ActivityPub"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6cc4f369-b3b7-8f9d-8fc2-1b1bb487470d"
  stages:
    - stage: path
      stageUuid: "90418e82-4eb7-80e4-b3be-d098a1b0c205"
    - stage: trinity
      stageUuid: "d752ce2a-c803-8b2a-9291-54f1ccbfad79"
    - stage: boundary
      stageUuid: "94796516-91a4-831a-ba0b-b8a7e93383e6"
    - stage: links
      stageUuid: "0aec2b49-98ff-8849-8407-60e57bfb963d"
    - stage: horo
      stageUuid: "d223cd24-e062-83bb-a54e-d00ae1717bfb"
    - stage: seal
      stageUuid: "aea55077-48eb-8973-b0c1-bfe6ce6e7f59"
    - stage: uuid
      stageUuid: "50f430d0-c418-8684-b4b8-43f831b24195"
version: 2
---
# workflow-definitions

Workflow Definitions — BPMN-style multi-step approval definitions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[collections]], [[field]], [[hooks]], [[access]], [[standard]], [[proof]].

Workflow instances are gated by [[horo]] state machine transitions; audit evidence preserved via [[identity]] versioning.

**Law — [[law]]: a workflow-definition is the reusable, data-driven approval TEMPLATE — BPMN-2.0 step kinds, assignee modes, SLA escalation, and JSON-Logic conditions for any collection authored without a code change — inert form until [[workflow|a process]] runs it, its instances gated by [[horo]] state-machine transitions.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 19510:2013 BPMN-2.0`
- `@standard ISO-8601-1:2019 date-time`

- ISO/IEC 19510:2013 BPMN-2.0
- ISO-8601-1:2019 date-time
- SOX §404 internal-controls multi-step-approval
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail workflow-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation
