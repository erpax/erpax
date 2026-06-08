---
name: engine
description: "Use when executing or validating finite-state machines — gating transitions, detecting dead-ends, or auditing workflow harmony."
atomPath: workflow/engine
coordinate: workflow/engine · 5/round · 842f6a9b
contentUuid: "4d519b36-7c6e-5783-ba20-474bb92dcb46"
diamondUuid: "5b084c8d-befd-8bdc-8c07-4e174a7afe7b"
uuid: "842f6a9b-c2e0-8505-a150-51d6ef1a054b"
horo: 5
bonds:
  in:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
    - workflow
  out:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
typography:
  partition: workflow
  bondDegree: 35
  neighbors:
    - aura
standards:
  - "OMG BPMN 2.0 process-execution-semantics"
bindings: []
neighbors:
  wikilink:
    - aura
    - event
    - flow
    - hooks
    - horo
    - identity
    - law
    - merge
    - standard
  matrix:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
  backlinks:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
signatures:
  computationUuid: "c1b122c5-ef8c-804c-b2bc-51fbaad83b39"
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
      stageUuid: "9b4f3143-99e8-861a-9fbb-2b807ab46c7d"
    - stage: seal
      stageUuid: "a312714d-904f-82f6-ab4d-eec1d3b25988"
    - stage: uuid
      stageUuid: "cecd44a7-bc39-85a4-a7a3-4f092e2ea2ec"
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
