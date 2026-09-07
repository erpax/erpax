---
name: engine
description: "Use when a document must change state under a declared state machine, or when auditing that machine for dead-ends and unreachable states — attemptTransition gates the move and returns the next state plus the content-uuid event it emits; deadEnds and noInbound name where the machine is incomplete."
atomPath: "workflow/engine"
coordinate: "workflow/engine · 4/weave · 675cb8e9"
contentUuid: "d26148f9-5637-53d4-8e30-1b5b998c7bd9"
diamondUuid: "0975e1d2-c19b-8a8a-9ce3-ec4f557953fa"
uuid: "675cb8e9-8f95-8a63-a667-b16f952acc3f"
horo: 4
typography:
  partition: workflow
  bondDegree: 27
standards:
  - "OMG BPMN 2.0 process-execution-semantics"
bindings: []
signatures:
  computationUuid: "5c90de5b-06b9-8a25-960d-1f4cdbdf7f7c"
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
      stageUuid: "050af4c1-4078-8633-9d1f-91434738daf5"
    - stage: seal
      stageUuid: "f4b6ade0-45f4-8b8c-8183-aca35a4d16dc"
    - stage: uuid
      stageUuid: "9db5bf4c-6e12-890a-b0c9-2a96e2f45cb3"
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
