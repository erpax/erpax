---
name: definitions
description: "Use when authoring data-driven multi-step approval rules for any collection — BPMN-2.0 step kinds (approval, all-of-N, any-of-N, notification, service task, decision), assignee modes, SLA escalation, JSON-Logic conditions, and state-machine lifecycle gate without a code change. The reusable approval-template collection."
atomPath: workflow/definitions
coordinate: workflow/definitions · 4/weave · e692092e
contentUuid: "b1537ef3-6562-55a4-b4f0-0adfd722542c"
diamondUuid: "d11d93eb-c3a5-8227-9cf2-fa2a44cb7a2f"
uuid: "e692092e-43d6-8018-8982-4d8345951bda"
horo: 4
bonds:
  in:
    - access
    - backlog
    - collections
    - definition
    - fields
    - hooks
    - horo
    - identity
    - instances
    - law
    - priority
    - proof
    - runbook
    - standard
    - workflow
  out:
    - access
    - backlog
    - collections
    - definition
    - fields
    - hooks
    - horo
    - identity
    - instances
    - law
    - priority
    - proof
    - runbook
    - standard
    - workflow
typography:
  partition: workflow
  bondDegree: 0
  neighbors: []
standards:
  - "ASC-606"
  - "IFRS-15"
  - "ISA-95"
  - "ISO-19011:2018 audit-trail workflow-evidence"
  - "ISO-27002 §5.4 segregation-of-duties"
  - "ISO-8601-1:2019 date-time"
  - "ISO/IEC 19510:2013 BPMN-2.0"
  - "SOX §404 internal-controls multi-step-approval"
  - "US-GAAP"
  - "W3C-ActivityPub"
bindings: []
neighbors:
  wikilink:
    - access
    - collections
    - fields
    - hooks
    - horo
    - identity
    - law
    - proof
    - standard
    - workflow
  matrix:
    - access
    - backlog
    - collections
    - definition
    - fields
    - hooks
    - horo
    - identity
    - instances
    - law
    - priority
    - proof
    - runbook
    - standard
    - workflow
  backlinks:
    - access
    - backlog
    - collections
    - definition
    - fields
    - hooks
    - horo
    - identity
    - instances
    - law
    - priority
    - proof
    - runbook
    - standard
    - workflow
signatures:
  computationUuid: "e6acd167-26c0-867d-acaa-23087782e6c7"
  stages:
    - stage: path
      stageUuid: "90418e82-4eb7-80e4-b3be-d098a1b0c205"
    - stage: trinity
      stageUuid: "d752ce2a-c803-8b2a-9291-54f1ccbfad79"
    - stage: boundary
      stageUuid: "94796516-91a4-831a-ba0b-b8a7e93383e6"
    - stage: links
      stageUuid: "68e236ef-6ac2-8a4f-b058-f18977610310"
    - stage: horo
      stageUuid: "7f28c3e5-7687-8059-97ad-7d59fc5e08c6"
    - stage: seal
      stageUuid: "6e575265-1747-8f23-9be9-65556517d4d6"
    - stage: uuid
      stageUuid: "6a8932ab-d548-875a-b2cf-a0f964cb84c0"
version: 2
---
# workflow-definitions

Workflow Definitions — BPMN-style multi-step approval definitions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[collections]], [[fields]], [[hooks]], [[access]], [[standard]], [[proof]].

Workflow instances are gated by [[horo]] state machine transitions; audit evidence preserved via [[identity]] versioning.

**Law — [[law]]: a workflow-definition is the reusable, data-driven approval TEMPLATE — BPMN-2.0 step kinds, assignee modes, SLA escalation, and JSON-Logic conditions for any collection authored without a code change — inert form until [[workflow|a process]] runs it, its instances gated by [[horo]] state-machine transitions.**

## Standards
- ISO/IEC 19510:2013 BPMN-2.0
- ISO-8601-1:2019 date-time
- SOX §404 internal-controls multi-step-approval
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail workflow-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation
