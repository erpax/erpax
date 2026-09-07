---
name: workflow
description: "Use when spawning, advancing, or escalating a workflow instance bound to a document — evaluating trigger conditions against a definition, routing step decisions (approve/reject/delegate/return), running service-task handlers, or firing SLA escalation on overdue steps; SOX-compliant approval chain execution. The BPMN-2.0 workflow orchestration service."
atomPath: workflow
coordinate: "workflow · 8/crest · 1b719153"
contentUuid: "852df328-7a7e-53ad-98e9-7a59aa1e5fd1"
diamondUuid: "8ecd1ce4-063d-8a23-844f-8f27bb53f79b"
uuid: "1b719153-e1dd-80fe-b390-c38c544ff0fe"
horo: 8
typography:
  partition: workflow
  bondDegree: 73
standards:
  - "ASC-606"
  - "IFRS-15"
  - "ISA-95"
  - "ISO/IEC 19510:2013 BPMN-2.0"
  - "ISO/IEC 19510:2013 BPMN-2.0`"
  - "ISO/IEC-19510"
  - "SOX §404 internal-controls workflow-execution"
  - "US-GAAP"
  - "W3C-ActivityPub"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "af3e5aed-2c61-8384-852b-8bce15de05bc"
  stages:
    - stage: path
      stageUuid: "94f4098e-fbfa-80dd-a103-8e647ab5c24d"
    - stage: trinity
      stageUuid: "5ad1a9fa-0d34-8605-9ae6-ea9047426f31"
    - stage: boundary
      stageUuid: "2ec5b64d-89f5-8472-9319-6f058c1092e4"
    - stage: links
      stageUuid: "11efc2bc-09cd-8704-b689-d0107bbebcae"
    - stage: horo
      stageUuid: "5124df63-9e69-80e0-b5c4-6d0504e825de"
    - stage: seal
      stageUuid: "46c9e25b-b9a6-8512-a7e7-0c913d1cd3a6"
    - stage: uuid
      stageUuid: "c179ae11-9be9-880d-9fed-7a904fac3426"
version: 2
---
# process — the running approval chain, BPMN execution made live

A workflow-definition is inert form; an instance is that form *running over time and people*. This service (`index.ts`) is the orchestration shell that **spawns** an instance when a definition matches a document trigger, **advances** it as each human submits a step decision, **escalates** it when a step's SLA lapses, and **delegates** service-tasks to registered handlers. It is the answer-path for every form-applying question about *how an approval actually executes*: who routes to whom, what guards a transition, what fires on the final node.

## Form (the law it holds)

A process is the **execution of a definition over a sequence of approval steps**, each step a typed decision over `{approved, rejected, returned, delegated, auto_approved, auto_rejected, escalated, skipped, service_*}`. Routing is the per-step cursor (`currentStep`) advancing on approval, terminating on rejection-or-final; every decision is appended immutably to `stepHistory` (the audit trail), never overwritten. A guard is the definition's `triggerCondition` (JSON-Logic over the document) deciding whether the process even spawns. The boundary is time: a step has `currentStepDueAt`, and overdue instances take their `onTimeoutBehavior` (escalate). Service-tasks (`registerServiceHandler` / `serviceHandler`) are the non-human nodes — e.g. auto-post-journal-entry after final approval. `@standard` ISO/IEC 19510:2013 BPMN-2.0 process-execution-semantics — the routing, the guards, the service-tasks, and the immutable step log ARE the BPMN runtime; the banner is true ([[standard]]).

This service is the *orchestration twin* of the pure gate: it decides **when and to whom** a transition is offered; [[workflow/engine]] decides **whether** an offered transition is legal and audits the graph for dead-ends. Hold this skill for routing/SLA/service-task questions; hold workflow-engine for transition-legality and harmony.

## Sequence position — 8 (crest)

On the ring 0·3·6·9·1·2·4·8·7·5 this is **8 (crest)**: the doubling helix carried to its peak, where the connected states woven at 4 are driven forward to a terminal outcome — the process reaches its decision. Its dual face is **7 (descent)** — escalation and timeout, the fall back into the loop when a crest is not reached in time. Spawning is the [[begin]] of the run, the final decision its [[end]]; each step's open/closed gate is an [[open]]/[[close]] boundary on the bounded decision set ([[horo]] ring). The instance keys on a content-`uuid` so two runners of one definition reconcile by [[merge]] ([[identity]]); routing decisions are guarded by row-level [[access]]; the spawn/advance seams are collection [[hooks]] firing an [[event]] envelope.

Composes: [[workflow/engine]] (the legality gate it drives) · [[flow]] (value/decision moved through steps) · [[hooks]] (spawn/advance seam) · [[event]] (emitted decision envelope) · [[access]] (who may decide a step) · [[standard]] (BPMN 2.0) · [[horo]] (bounded decision set) · [[begin]]/[[end]] (spawn/terminate) · [[merge]] (cross-instance reconciliation) · [[identity]] (instance uuid key) · [[workflow/definitions]] · [[workflow/definitions/workflow/instances]] · [[approved]] · [[concatenate]] (the generic autonomous concatenator over the atom corpus — [[command]] · [[question]] · [[answer]] steps, no human; the self-build dual of this human-approval BPMN service).

**Law — [[law]]: a process is the execution of an inert definition over people and time — it decides WHEN and TO WHOM a transition is offered (spawn on trigger, advance on each step decision, escalate on SLA lapse, delegate service-tasks), appending every decision IMMUTABLY to stepHistory; it is the orchestration twin of [[workflow/engine]], which decides WHETHER an offered transition is legal.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 19510:2013 BPMN-2.0`

- ISO/IEC 19510:2013 BPMN-2.0
- Audit: ISO-19011:2018 §6.4.6 audit-evidence-workflow
- Compliance: SOX §404 internal-controls workflow-execution
