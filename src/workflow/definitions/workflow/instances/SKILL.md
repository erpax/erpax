---
name: instances
description: "Use when tracking the live run of a workflow-definition against a document — current step, assignee, SLA due date, step-history decisions (approved/rejected/delegated/escalated/auto), final outcome, and ISO-19011 §6.4.6 audit-event trail. The workflow execution-instance collection."
atomPath: "workflow/definitions/workflow/instances"
coordinate: "workflow/definitions/workflow/instances · 8/crest · 53e58826"
contentUuid: "fa73e5ae-5202-5683-8306-75d6658c8a70"
diamondUuid: "455a5c6f-1ab8-8370-ad31-d23971ce41fd"
uuid: "53e58826-8fd8-8f24-9561-1b6eb30c77c8"
horo: 8
typography:
  partition: workflow
  bondDegree: 34
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
  computationUuid: "e70e5dff-0977-8218-88d7-674cc40d0aa9"
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
      stageUuid: "3702ff97-6f8e-8e2c-9b8b-a8e8cf8fed99"
    - stage: seal
      stageUuid: "890a1125-1c21-8d98-8220-87225d147a2d"
    - stage: uuid
      stageUuid: "c5ce40a4-b968-89f3-83fb-26e7ea49e02b"
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
