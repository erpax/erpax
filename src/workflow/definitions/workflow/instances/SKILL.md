---
name: instances
description: "Use when tracking the live run of a workflow-definition against a document — current step, assignee, SLA due date, step-history decisions (approved/rejected/delegated/escalated/auto), final outcome, and ISO-19011 §6.4.6 audit-event trail. The workflow execution-instance collection."
atomPath: "workflow/definitions/workflow/instances"
coordinate: "workflow/definitions/workflow/instances · 4/weave · ec3c801f"
contentUuid: "cfbb4b77-aea5-5e80-9ac1-5e89bcaffe49"
diamondUuid: "80686a05-ac4a-84dd-bcce-ce4605457d1e"
uuid: "ec3c801f-f7b1-89e0-aa5a-50d230f16629"
horo: 4
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
  computationUuid: "ecbd0899-c982-865e-983c-69fe5621db02"
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
      stageUuid: "3ab03a54-fbdc-81df-b355-eedff763bd53"
    - stage: seal
      stageUuid: "890a1125-1c21-8d98-8220-87225d147a2d"
    - stage: uuid
      stageUuid: "6eb71d94-0eac-8998-b3c9-bac282167af2"
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
