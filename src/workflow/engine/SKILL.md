---
name: engine
description: "Use when a document must change state under a declared state machine, or when auditing that machine for dead-ends and unreachable states — attemptTransition gates the move and returns the next state plus the content-uuid event it emits; deadEnds and noInbound name where the machine is incomplete."
atomPath: "workflow/engine"
coordinate: "workflow/engine · 4/weave · 6938595f"
contentUuid: "93be48a3-eafe-5652-b8f0-cc26da56c94f"
diamondUuid: "7c752aa2-440a-8d8c-93d9-e44c3e47f7ba"
uuid: "6938595f-2d54-878a-989a-c60e57c03117"
horo: 4
typography:
  partition: workflow
  bondDegree: 27
standards:
  - "OMG BPMN 2.0 process-execution-semantics"
bindings: []
signatures:
  computationUuid: "ab92ed03-de1d-87d0-a04f-df71bb6ada84"
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
      stageUuid: "3dd2ffb4-0e23-8286-9e05-2b5f9592ea5a"
    - stage: seal
      stageUuid: "f4b6ade0-45f4-8b8c-8183-aca35a4d16dc"
    - stage: uuid
      stageUuid: "46b2bd05-d6e3-824f-b0c1-ea740da28bfd"
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
