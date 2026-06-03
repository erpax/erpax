---
name: workflow-engine
description: Use when executing or validating finite-state machines — gating transitions, detecting dead-ends, or auditing workflow harmony.
---

# workflow-engine — the inert state machine made LIVE, self-auditing

A `WorkflowDefinitions.stateMachine` is inert data until something reads it. This pure engine (`index.ts`) is that reader: it (a) **gates** a document transition against the machine and (b) **audits** the machine's harmony. The same code that runs the organism detects where the organism is incomplete — the keystone closing the data-vs-behaviour gap. No I/O, so it is wholly testable (`index.test.ts`, `fixtures.ts`).

## Form (the law it holds)

A transition is permitted **iff** an edge `{from, on}` exists; the engine returns the next state and the content-uuid **`emits`** event, else a `reason` (unknown / terminal / no-edge). It never mutates — a collection `beforeStatusChange` [[hooks]] hook consumes `attemptTransition`, an `afterChange` hook emits `result.emits` as an [[event]]. Harmony is a graph property, not opinion: a non-terminal state with no outgoing edge is a **dead-end** (`deadEnds`), a state with no inbound edge is **unreachable** (`noInbound`) — these are exactly the "disconnected organ" gaps, the [[aura]] holes of a machine. `crossDomainEdges` are the federating seams where one domain's event drives another. `@standard` OMG BPMN 2.0 process-execution-semantics — the banner is true, the gating IS the semantics ([[standard]]).

## Sequence position — 4 (weave)

On the ring 0·3·6·9·1·2·4·8·7·5 this is **4 (weave)**: it connects discrete states into a single live machine, gating [[flow]] from state to state. Its dual face is **9 (unity)** — the harmony audit folds the whole graph back to a verdict (every organ connected). The emitted events key on the content-`uuid` ([[identity]]), so two instances running the same definition reconcile by [[merge]]; the bounded state set is a [[horo]] ring.

Composes: [[flow]] (the movement gated) · [[event]] (the emitted envelope) · [[hooks]] (the consuming seam) · [[identity]] (event aggregate key) · [[standard]] (BPMN 2.0) · [[horo]] (the bounded state set) · [[merge]] (cross-instance reconciliation).

## Standards
- OMG BPMN 2.0 process-execution-semantics
