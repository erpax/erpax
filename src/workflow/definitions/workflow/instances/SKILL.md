---
name: instances
description: "Use when tracking the live run of a workflow-definition against a document — current step, assignee, SLA due date, step-history decisions (approved/rejected/delegated/escalated/auto), final outcome, and ISO-19011 §6.4.6 audit-event trail. The workflow execution-instance collection."
atomPath: workflow/definitions/workflow/instances
coordinate: workflow/definitions/workflow/instances · 5/round · 27a86996
contentUuid: "ed0fbb13-2605-52ff-9ba8-26baf8711d2b"
diamondUuid: "027f8f01-ff33-846a-be38-23f8324d08bb"
uuid: "27a86996-3efd-845f-9abc-90801f13fb96"
horo: 5
bonds:
  in:
    - access
    - approved
    - definitions
    - escalation
    - events
    - fields
    - hooks
    - law
    - resolution
    - ticket
    - users
    - workflow
  out:
    - access
    - approved
    - definitions
    - escalation
    - events
    - fields
    - hooks
    - law
    - resolution
    - ticket
    - users
    - workflow
typography:
  partition: workflow
  bondDegree: 36
  neighbors: []
standards:
  - "ISO-19011:2018 §6.4.6 audit-evidence-workflow"
  - "ISO-8601-1:2019 date-time"
  - "ISO/IEC 19510:2013 BPMN-2.0"
  - "SOX §404 internal-controls workflow-execution"
bindings: []
neighbors:
  wikilink:
    - access
    - approved
    - definitions
    - events
    - fields
    - hooks
    - law
    - users
  matrix:
    - access
    - approved
    - definitions
    - escalation
    - events
    - fields
    - hooks
    - law
    - resolution
    - ticket
    - users
    - workflow
  backlinks:
    - access
    - approved
    - definitions
    - escalation
    - events
    - fields
    - hooks
    - law
    - resolution
    - ticket
    - users
    - workflow
signatures:
  computationUuid: "1c975878-cdb7-8c74-9b31-58878d8c49a9"
  stages:
    - stage: path
      stageUuid: "ef31534c-b77a-8d21-add2-ccd21f5f21ad"
    - stage: trinity
      stageUuid: "0011597d-2a8e-899d-be6b-e7f65b921907"
    - stage: boundary
      stageUuid: "8a685cb2-cdd6-839b-8613-444f9a0df06f"
    - stage: links
      stageUuid: "a6266696-53a0-8529-9b6f-1f1b5cbb97b9"
    - stage: horo
      stageUuid: "97e75bb5-f49e-8546-b777-3cb706131c90"
    - stage: seal
      stageUuid: "890a1125-1c21-8d98-8220-87225d147a2d"
    - stage: uuid
      stageUuid: "f6b21023-abfa-89ae-baa6-0c4bd944cef4"
version: 2
---
# workflow-instances

Workflow Instances — running execution of a [[workflow/definitions]] against a specific document.

Slice HHHH (2026-05-10): one instance per (definition × document). The instance walks the steps; each step decision is appended to `stepHistory`; on completion the underlying document is approved / rejected / posted as the workflow dictates.

Pairs with [[audit/events]] — every step transition emits an audit event for ISO 19011 §6.4.6 evidence.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[workflow/definitions]] · [[audit/events]] · [[users]] · [[hooks]] · [[access]] · [[fields]] · [[approved]].

**Law — [[law]]: one instance per (definition × document) walks the steps, appending every decision to `stepHistory` and emitting an audit event per transition — the live run is its own tamper-evident evidence trail.**

## Standards
- ISO/IEC 19510:2013 BPMN-2.0
- ISO-8601-1:2019 date-time
- ISO-19011:2018 §6.4.6 audit-evidence-workflow
- SOX §404 internal-controls workflow-execution
- ISO-27001 A.5.23 cloud-service-tenant-isolation
