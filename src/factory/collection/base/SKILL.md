---
name: base
description: "Use when a collection is declared — createAccountingCollection takes declarative metadata (emits, horoStates, access, audit) and wires every cross-cutting concern, so a collection says what it IS and never how it is plumbed."
atomPath: "factory/collection/base"
coordinate: "factory/collection/base · 7/descent · ee65fee9"
contentUuid: "7276ec45-e3fe-5f97-8bd7-f469af973898"
diamondUuid: "4459c7f2-c3fd-8a99-a78a-81171ec02b3f"
uuid: "ee65fee9-fb30-8574-b7a6-f1db508cca3f"
horo: 7
typography:
  partition: factory
  bondDegree: 52
standards: []
bindings: []
signatures:
  computationUuid: "c6019466-774d-8f55-99a1-932c0851a777"
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
      stageUuid: "04037c88-b722-828e-897a-75d0b9a206da"
    - stage: seal
      stageUuid: "49a14bc1-f53e-8287-92ed-065e8d208131"
    - stage: uuid
      stageUuid: "67959ed5-96a6-8bf3-9d70-596ed82435b2"
version: 2
---
# factory/collection/base — the collection every accounting table is

117 of 118 collections once inlined the same 25-line preamble. That is not verbosity, it is a **shape problem**: a programmatic refactor over 118 hand-copied preambles lands in 118 different shapes, which is exactly how one collection ended up with an import spliced into another import.

So the plumbing became declarative. A collection declares `emits`, `horoStates`, its access role, and the factory wires the rest: tenant + createdBy auto-population, the audit-trail hook, the tamper-proof content-uuid field ([[integrity]]), the horo ring validator ([[horo]]), the chain producers, and the computed diamond attached at config-build.

**content-uuid enforces IDENTITY; horo enforces flow HARMONY.** A collection declaring `horoStates` gets its flow field validated at BUILD time — off-ring, out-of-order or duplicated states throw before the app boots, rather than accepting a bad transition at runtime.

**Honest boundary.** The factory proves a collection is wired CONSISTENTLY, never that its fields model the domain correctly — the shape is judged by [[factory]]/collection/shape, and what the table MEANS is a human's call ([[rules]]/collapse).

Composes: [[factory]] · [[integrity]] · [[horo]] · [[auth]] · [[diamond]].
