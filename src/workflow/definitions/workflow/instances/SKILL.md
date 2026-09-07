---
name: instances
description: "Use when tracking the live run of a workflow-definition against a document — current step, assignee, SLA due date, step-history decisions (approved/rejected/delegated/escalated/auto), final outcome, and ISO-19011 §6.4.6 audit-event trail. The workflow execution-instance collection."
atomPath: "workflow/definitions/workflow/instances"
coordinate: "workflow/definitions/workflow/instances · 5/round · 366e2740"
contentUuid: "ce61abe1-4eab-5e34-b88d-2e23674b3fb3"
diamondUuid: "9b8ed999-b4d1-8479-afe5-4c478606cb98"
uuid: "366e2740-42e7-81cc-a5c0-e082b0f3d026"
horo: 5
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
  computationUuid: "2928e85b-3365-82b7-83e0-40d9e8fa1b83"
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
      stageUuid: "6a421771-1216-84c6-b0b6-f39b783b8269"
    - stage: seal
      stageUuid: "890a1125-1c21-8d98-8220-87225d147a2d"
    - stage: uuid
      stageUuid: "775d8ff8-e9fa-84d0-8ea6-6a89babfb964"
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
