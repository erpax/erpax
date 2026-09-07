---
name: schema
description: "Use when reaching the workflow SCHEMA — the shape a definition must take before the engine can read it — through its own namespace; the face re-exports the workflow barrel while the matter is still being lifted out of the hub."
atomPath: "workflow/schema"
coordinate: "workflow/schema · 7/descent · 49ff3bdd"
contentUuid: "ee75f3fa-38ac-5688-8262-37754713827e"
diamondUuid: "f49c4fb3-b153-897f-a3a7-e36d2556b82c"
uuid: "49ff3bdd-bb06-8c3e-b63b-4a9e74bc57c3"
horo: 7
typography:
  partition: workflow
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "ab85540e-47da-8e01-83ea-7028a708a618"
  stages:
    - stage: path
      stageUuid: "904f5beb-d601-885d-91fd-0bc9e8659781"
    - stage: trinity
      stageUuid: "55ee42f7-be38-835d-a8c9-2d7bfc2733d6"
    - stage: boundary
      stageUuid: "5d3dbfb2-be11-84d3-a1cd-63317062db17"
    - stage: links
      stageUuid: "16037d38-ee6d-8d07-bad1-8b190e680945"
    - stage: horo
      stageUuid: "30355a7b-d989-8292-b382-286f5f39854c"
    - stage: seal
      stageUuid: "675e7f3c-b35d-8cbd-afdd-b43fd82b9b56"
    - stage: uuid
      stageUuid: "1d91004b-2ac2-8d93-9bb1-f201a6d121e3"
version: 2
---
# workflow/schema — the schema face of [[workflow]]

`index.ts` re-exports the parent barrel, so `@/workflow/schema` offers exactly what `@/workflow`
offers today. **The matter has not moved yet**: this atom is the namespace a hub split named for
the shape a workflow definition must take before an engine can read it, and its own `test.ts` pins the FACE so a caller importing through this path keeps
working while the extraction is finished.

Stated rather than dressed up: until the schema matter is lifted out of the parent, this is a
namespaced view, not a separate implementation ([[rules]]/concentration — matter belongs in the
child, and here it still sits in the hub).

Composes: [[workflow]].
