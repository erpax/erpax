---
name: engine
description: "Use when a document must change state under a declared state machine, or when auditing that machine for dead-ends and unreachable states — attemptTransition gates the move and returns the next state plus the content-uuid event it emits; deadEnds and noInbound name where the machine is incomplete."
atomPath: "workflow/engine"
coordinate: "workflow/engine · 8/crest · 878dc7e7"
contentUuid: "50bceb94-0689-5114-aff3-9ea25b96723b"
diamondUuid: "a07cb174-9e1e-85b3-a00a-70bbc868f899"
uuid: "878dc7e7-b9fc-851a-be2e-7279404b5db0"
horo: 8
typography:
  partition: workflow
  bondDegree: 27
standards:
  - "OMG BPMN 2.0 process-execution-semantics"
bindings: []
signatures:
  computationUuid: "63b5fefb-526e-8a31-9944-6c177b045b8f"
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
      stageUuid: "c3f6ef06-3d68-8755-b813-5ee6b64fee7f"
    - stage: seal
      stageUuid: "f4b6ade0-45f4-8b8c-8183-aca35a4d16dc"
    - stage: uuid
      stageUuid: "a9ba3267-fc33-8dcb-8396-f8fe4754d3e8"
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
