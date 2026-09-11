---
name: engine
description: "Use when a document must change state under a declared state machine, or when auditing that machine for dead-ends and unreachable states — attemptTransition gates the move and returns the next state plus the content-uuid event it emits; deadEnds and noInbound name where the machine is incomplete."
atomPath: "workflow/engine"
coordinate: "workflow/engine · 5/round · b62f7ede"
contentUuid: "a8d02ece-e65b-5428-bb93-fb39c4d5d9d9"
diamondUuid: "032ff6c5-da62-8819-9b11-d91e8d323d66"
uuid: "b62f7ede-dc64-860a-a320-4ec664d2ae1f"
horo: 5
typography:
  partition: workflow
  bondDegree: 27
standards:
  - "OMG BPMN 2.0 process-execution-semantics"
bindings: []
signatures:
  computationUuid: "2cc55da8-59ed-81b8-8413-564282ffa231"
  stages:
    - stage: path
      stageUuid: "d26ebc48-f8cf-8785-be51-1f16d8273a43"
    - stage: trinity
      stageUuid: "6b684c46-e995-8411-b03b-26d52fe18cfb"
    - stage: boundary
      stageUuid: "f378a932-da13-8bc3-bedb-46d12969dd5a"
    - stage: links
      stageUuid: "c2c5cc39-a1d3-8621-9d5e-8542729627d5"
    - stage: horo
      stageUuid: "fbd15f29-0b45-822f-84a1-32a11714cfae"
    - stage: seal
      stageUuid: "f4b6ade0-45f4-8b8c-8183-aca35a4d16dc"
    - stage: uuid
      stageUuid: "96092d37-137b-8651-9e1e-9b7e6d72c26c"
version: 2
---
# workflow/engine — the state machine, read

A `WorkflowDefinitions.stateMachine` is **inert data until something reads it**. This is the
reader: `attemptTransition(sm, from, event)` decides whether the move is legal and returns the
next state with the content-uuid event to emit, and `outgoing` · `emittedEvents` ·
`crossDomainEdges` describe the machine's shape.

It also **audits itself**: `deadEnds` names states nothing leaves and `noInbound` names states
nothing reaches — the disconnected-organ gaps, found by the same code that runs the organism.

Pure: no I/O, so a collection's `beforeStatusChange` hook consumes `attemptTransition` and an
`afterChange` hook emits `result.emits`, while the tests need neither a DB nor a boot.

## Standards

- **OMG BPMN 2.0** — process-execution semantics.

Composes: [[workflow]] · [[uuid]].
