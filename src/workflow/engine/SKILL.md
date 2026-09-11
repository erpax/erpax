---
name: engine
description: "Use when a document must change state under a declared state machine, or when auditing that machine for dead-ends and unreachable states — attemptTransition gates the move and returns the next state plus the content-uuid event it emits; deadEnds and noInbound name where the machine is incomplete."
atomPath: "workflow/engine"
coordinate: "workflow/engine · 7/descent · 6bf62035"
contentUuid: "c6da8f65-f6d1-53cf-a2b5-079dcff1a143"
diamondUuid: "8df47fe9-a377-8e03-b6f2-ce54f7a2baba"
uuid: "6bf62035-4b9c-8cd8-94ab-6fd466ee5b0c"
horo: 7
typography:
  partition: workflow
  bondDegree: 27
standards:
  - "OMG BPMN 2.0 process-execution-semantics"
bindings: []
signatures:
  computationUuid: "c8c086ac-14e4-8097-96cc-30905d170f3b"
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
      stageUuid: "398045bf-107d-8c06-9689-3ca66cbed3e1"
    - stage: seal
      stageUuid: "f4b6ade0-45f4-8b8c-8183-aca35a4d16dc"
    - stage: uuid
      stageUuid: "48d79973-2532-8164-9947-3216c814555d"
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
