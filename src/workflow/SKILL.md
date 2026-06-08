---
name: workflow
description: "Use when spawning, advancing, or escalating a workflow instance bound to a document — evaluating trigger conditions against a definition, routing step decisions (approve/reject/delegate/return), running service-task handlers, or firing SLA escalation on overdue steps; SOX-compliant approval chain execution. The BPMN-2.0 workflow orchestration service."
atomPath: workflow
coordinate: workflow · 1/base · efe72732
contentUuid: "14520150-4c97-55b4-989a-dec0b07e57db"
diamondUuid: "4b07506c-a01d-82b5-9d64-9abc727d7e23"
uuid: "efe72732-badf-8ab8-a2e1-90f8de484a17"
horo: 1
bonds:
  in:
    - access
    - answer
    - approved
    - begin
    - close
    - command
    - concatenate
    - defect
    - definitions
    - end
    - engine
    - event
    - flow
    - hooks
    - horo
    - identity
    - incident
    - instances
    - law
    - merge
    - open
    - question
    - request
    - risk
    - scouting
    - sla
    - standard
    - step
    - submission
  out:
    - access
    - answer
    - approved
    - begin
    - close
    - command
    - concatenate
    - defect
    - definitions
    - end
    - engine
    - event
    - flow
    - hooks
    - horo
    - identity
    - incident
    - instances
    - law
    - merge
    - open
    - question
    - request
    - risk
    - scouting
    - sla
    - standard
    - step
    - submission
typography:
  partition: workflow
  bondDegree: 91
  neighbors: []
standards:
  - "ASC-606"
  - "IFRS-15"
  - "ISA-95"
  - "ISO-19011:2018 §6.4.6 audit-evidence-workflow"
  - "ISO/IEC 19510:2013 BPMN-2.0"
  - "SOX §404 internal-controls workflow-execution"
  - "US-GAAP"
  - "W3C-ActivityPub"
bindings: []
neighbors:
  wikilink:
    - access
    - answer
    - approved
    - begin
    - close
    - command
    - concatenate
    - definitions
    - end
    - engine
    - event
    - flow
    - hooks
    - horo
    - identity
    - instances
    - law
    - merge
    - open
    - question
    - standard
  matrix:
    - access
    - answer
    - approved
    - begin
    - close
    - command
    - concatenate
    - defect
    - definitions
    - end
    - engine
    - event
    - flow
    - hooks
    - horo
    - identity
    - incident
    - instances
    - law
    - merge
    - open
    - question
    - request
    - risk
    - scouting
    - sla
    - standard
    - step
    - submission
  backlinks:
    - access
    - answer
    - approved
    - begin
    - close
    - command
    - concatenate
    - defect
    - definitions
    - end
    - engine
    - event
    - flow
    - hooks
    - horo
    - identity
    - incident
    - instances
    - law
    - merge
    - open
    - question
    - request
    - risk
    - scouting
    - sla
    - standard
    - step
    - submission
signatures:
  computationUuid: "c6b659e7-8d6c-8acd-a300-2e020ffb18e0"
  stages:
    - stage: path
      stageUuid: "94f4098e-fbfa-80dd-a103-8e647ab5c24d"
    - stage: trinity
      stageUuid: "5ad1a9fa-0d34-8605-9ae6-ea9047426f31"
    - stage: boundary
      stageUuid: "8e7e855f-0401-85a8-bdf0-03f230b6109a"
    - stage: links
      stageUuid: "2b2be7bc-c8ec-892f-af0a-dc286bafd288"
    - stage: horo
      stageUuid: "379bf587-b9d4-8d53-8c5a-8973be6a3cfd"
    - stage: seal
      stageUuid: "485d4bdf-e79b-8de8-bc49-cc4c3a037885"
    - stage: uuid
      stageUuid: "ec2bd8fe-2df3-8daf-8e5e-ead393cd2430"
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
- ISO/IEC 19510:2013 BPMN-2.0
- Audit: ISO-19011:2018 §6.4.6 audit-evidence-workflow
- Compliance: SOX §404 internal-controls workflow-execution
