---
name: engine
description: "Use when executing or validating finite-state machines — gating transitions, detecting dead-ends, or auditing workflow harmony."
atomPath: "workflow/engine"
coordinate: "workflow/engine · 7/descent · 25ec3863"
contentUuid: "8fcc58c9-63f5-5748-b491-8f1a3ae2d3b0"
diamondUuid: "6347a6e6-e641-8ce5-90b9-726d2015521f"
uuid: "25ec3863-9308-8988-8234-65cb450db9f3"
horo: 7
typography:
  partition: workflow
  bondDegree: 35
standards:
  - "OMG BPMN 2.0 process-execution-semantics"
bindings: []
signatures:
  computationUuid: "a5ab4306-0984-872c-8090-c9e0692fcdbd"
  stages:
    - stage: path
      stageUuid: "d26ebc48-f8cf-8785-be51-1f16d8273a43"
    - stage: trinity
      stageUuid: "6b684c46-e995-8411-b03b-26d52fe18cfb"
    - stage: boundary
      stageUuid: "5e418758-46ec-802c-83d8-230236690856"
    - stage: links
      stageUuid: "1e72931c-e40b-80b3-a6ad-4c7c475af10d"
    - stage: horo
      stageUuid: "9d889635-fb3d-8ca0-8088-959746484ad6"
    - stage: seal
      stageUuid: "a312714d-904f-82f6-ab4d-eec1d3b25988"
    - stage: uuid
      stageUuid: "fe7ce00b-dd0e-8837-963d-9e18cda648b1"
version: 2
---
# workflow-engine — the inert state machine made LIVE, self-auditing

A `WorkflowDefinitions.stateMachine` is inert data until something reads it. This pure engine (`index.ts`) is that reader: it (a) **gates** a document transition against the machine and (b) **audits** the machine's harmony. The same code that runs the organism detects where the organism is incomplete — the keystone closing the data-vs-behaviour gap. No I/O, so it is wholly testable (`index.test.ts`, `fixtures.ts`).

## Form (the law it holds)

A transition is permitted **iff** an edge `{from, on}` exists; the engine returns the next state and the content-uuid **`emits`** event, else a `reason` (unknown / terminal / no-edge). It never mutates — a collection `beforeStatusChange` [[hooks]] hook consumes `attemptTransition`, an `afterChange` hook emits `result.emits` as an [[event]]. Harmony is a graph property, not opinion: a non-terminal state with no outgoing edge is a **dead-end** (`deadEnds`), a state with no inbound edge is **unreachable** (`noInbound`) — these are exactly the "disconnected organ" gaps, the [[aura]] holes of a machine. `crossDomainEdges` are the federating seams where one domain's event drives another. `@standard` OMG BPMN 2.0 process-execution-semantics — the banner is true, the gating IS the semantics ([[standard]]).

## Sequence position — 4 (weave)

On the ring 0·3·6·9·1·2·4·8·7·5 this is **4 (weave)**: it connects discrete states into a single live machine, gating [[flow]] from state to state. Its dual face is **9 (unity)** — the harmony audit folds the whole graph back to a verdict (every organ connected). The emitted events key on the content-`uuid` ([[identity]]), so two instances running the same definition reconcile by [[merge]]; the bounded state set is a [[horo]] ring.

Composes: [[flow]] (the movement gated) · [[event]] (the emitted envelope) · [[hooks]] (the consuming seam) · [[identity]] (event aggregate key) · [[standard]] (BPMN 2.0) · [[horo]] (the bounded state set) · [[merge]] (cross-instance reconciliation).

**Law — [[law]]: the engine is the pure reader of an inert state machine — it PERMITS a transition iff an edge {from, on} exists (else a typed reason) and it AUDITS the graph's harmony (a non-terminal state with no outgoing edge is a dead-end, one with no inbound is unreachable — the [[aura]] holes), never mutating; the same code that runs the organism finds where it is incomplete.**

## Standards
- OMG BPMN 2.0 process-execution-semantics
