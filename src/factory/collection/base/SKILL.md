---
name: base
description: "Use when a collection is declared — createAccountingCollection takes declarative metadata (emits, horoStates, access, audit) and wires every cross-cutting concern, so a collection says what it IS and never how it is plumbed."
atomPath: "factory/collection/base"
coordinate: "factory/collection/base · 8/crest · 35467a9c"
contentUuid: "2dcc63cc-b8bf-5941-a0d7-50ba833b7f6a"
diamondUuid: "b1c2d283-3902-80a5-8086-e1fc8c6cf4d9"
uuid: "35467a9c-6139-864b-8a2d-fb1d06ffcdc8"
horo: 8
typography:
  partition: factory
  bondDegree: 52
standards: []
bindings: []
signatures:
  computationUuid: "34d7b78c-59a3-8f57-97c5-82d59772405e"
  stages:
    - stage: path
      stageUuid: "83199b72-4b8d-81c1-9344-ff3cb4733d91"
    - stage: trinity
      stageUuid: "9ba42456-498b-8267-8888-87f8cf3fdf03"
    - stage: boundary
      stageUuid: "b13da414-ce44-8571-a6eb-716f24bf8100"
    - stage: links
      stageUuid: "18f5bc2a-aba2-8c83-91d3-7c48e26b13ae"
    - stage: horo
      stageUuid: "d3c37532-6a99-8200-b050-a5a764975eb5"
    - stage: seal
      stageUuid: "49a14bc1-f53e-8287-92ed-065e8d208131"
    - stage: uuid
      stageUuid: "e5267a29-9542-8067-ac17-78d6fe0d606d"
version: 2
---
# factory/collection/base — the collection every accounting table is

117 of 118 collections once inlined the same 25-line preamble. That is not verbosity, it is a **shape problem**: a programmatic refactor over 118 hand-copied preambles lands in 118 different shapes, which is exactly how one collection ended up with an import spliced into another import.

So the plumbing became declarative. A collection declares `emits`, `horoStates`, its access role, and the factory wires the rest: tenant + createdBy auto-population, the audit-trail hook, the tamper-proof content-uuid field ([[integrity]]), the horo ring validator ([[horo]]), the chain producers, and the computed diamond attached at config-build.

**content-uuid enforces IDENTITY; horo enforces flow HARMONY.** A collection declaring `horoStates` gets its flow field validated at BUILD time — off-ring, out-of-order or duplicated states throw before the app boots, rather than accepting a bad transition at runtime.

**Honest boundary.** The factory proves a collection is wired CONSISTENTLY, never that its fields model the domain correctly — the shape is judged by [[factory]]/collection/shape, and what the table MEANS is a human's call ([[rules]]/collapse).

Composes: [[factory]] · [[integrity]] · [[horo]] · [[auth]] · [[diamond]].
