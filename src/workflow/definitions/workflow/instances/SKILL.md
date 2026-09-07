---
name: instances
description: "Use when tracking the live run of a workflow-definition against a document — current step, assignee, SLA due date, step-history decisions (approved/rejected/delegated/escalated/auto), final outcome, and ISO-19011 §6.4.6 audit-event trail. The workflow execution-instance collection."
atomPath: "workflow/definitions/workflow/instances"
coordinate: "workflow/definitions/workflow/instances · 8/crest · 3bdadf39"
contentUuid: "cbb802de-01c9-5677-bfc1-afff2c561425"
diamondUuid: "c01db655-c1f0-80d0-964d-a27aabced1e1"
uuid: "3bdadf39-1b99-85ad-9041-11e6f8753ca7"
horo: 8
typography:
  partition: workflow
  bondDegree: 36
standards:
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "ISO/IEC 19510:2013 BPMN-2.0"
  - "ISO/IEC 19510:2013 BPMN-2.0`"
  - "ISO/IEC-19510"
  - "SOX §404 internal-controls workflow-execution"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "976b9cc0-4508-8cd5-9f57-2ba24253817b"
  stages:
    - stage: path
      stageUuid: "ef31534c-b77a-8d21-add2-ccd21f5f21ad"
    - stage: trinity
      stageUuid: "0011597d-2a8e-899d-be6b-e7f65b921907"
    - stage: boundary
      stageUuid: "8a685cb2-cdd6-839b-8613-444f9a0df06f"
    - stage: links
      stageUuid: "2dc1a7b8-3beb-84ad-987e-4045e2a9e422"
    - stage: horo
      stageUuid: "4c4301e6-9ba4-8a21-96eb-4e0128d257fc"
    - stage: seal
      stageUuid: "890a1125-1c21-8d98-8220-87225d147a2d"
    - stage: uuid
      stageUuid: "364fc848-8166-89ce-995b-d5e59e46dc90"
version: 2
---
# workflow-instances

Workflow Instances — running execution of a [[workflow/definitions]] against a specific document.

Slice HHHH (2026-05-10): one instance per (definition × document). The instance walks the steps; each step decision is appended to `stepHistory`; on completion the underlying document is approved / rejected / posted as the workflow dictates.

Pairs with [[audit/events]] — every step transition emits an audit event for ISO 19011 §6.4.6 evidence.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[workflow/definitions]] · [[audit/events]] · [[users]] · [[hooks]] · [[access]] · [[field]] · [[approved]].

**Law — [[law]]: one instance per (definition × document) walks the steps, appending every decision to `stepHistory` and emitting an audit event per transition — the live run is its own tamper-evident evidence trail.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 19510:2013 BPMN-2.0`
- `@standard ISO-8601-1:2019 date-time`

- ISO/IEC 19510:2013 BPMN-2.0
- ISO-8601-1:2019 date-time
- ISO-19011:2018 §6.4.6 audit-evidence-workflow
- SOX §404 internal-controls workflow-execution
- ISO-27001 A.5.23 cloud-service-tenant-isolation
