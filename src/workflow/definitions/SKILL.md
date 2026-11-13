---
name: definitions
description: "Use when authoring data-driven multi-step approval rules for any collection — BPMN-2.0 step kinds (approval, all-of-N, any-of-N, notification, service task, decision), assignee modes, SLA escalation, JSON-Logic conditions, and state-machine lifecycle gate without a code change. The reusable approval-template collection."
atomPath: "workflow/definitions"
coordinate: "workflow/definitions · 2/share · 2baa1150"
contentUuid: "589845fc-8d6c-5723-8a78-c7cb2a27bee9"
diamondUuid: "4055e614-64ad-8757-ac1a-86801783068d"
uuid: "2baa1150-3d06-8fc2-8f5e-4ae306b6d318"
horo: 2
typography:
  partition: workflow
  bondDegree: 43
standards:
  - "ISO-27002 §5.4 segregation-of-duties"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "ISO/IEC 19510:2013 BPMN-2.0"
  - "ISO/IEC 19510:2013 BPMN-2.0`"
  - "ISO/IEC-19510"
  - "SOX §404 internal-controls multi-step-approval"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ebbb473b-f538-8830-be2b-f5c25e58c4ad"
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
      stageUuid: "3827bdf4-41cc-857f-8793-5fa0311a6082"
    - stage: seal
      stageUuid: "aea55077-48eb-8973-b0c1-bfe6ce6e7f59"
    - stage: uuid
      stageUuid: "44d8a177-9cf3-8c5a-85b5-be2ee84aa43e"
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
