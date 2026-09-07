---
name: schema
description: "Use when reaching the workflow SCHEMA — the shape a definition must take before the engine can read it — through its own namespace; the face re-exports the workflow barrel while the matter is still being lifted out of the hub."
atomPath: "workflow/schema"
coordinate: "workflow/schema · 1/base · e182f315"
contentUuid: "18e8794d-d681-5c2d-8282-7edb8fa703b1"
diamondUuid: "35d4742a-a0d1-8bad-8a98-78be17b1fb73"
uuid: "e182f315-ce7e-8fb2-ade3-1f608f28bd67"
horo: 1
typography:
  partition: workflow
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "32af7950-f2e2-8dfe-af9a-3bf40ee7d312"
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
      stageUuid: "ca1e7fd3-cd67-8844-818b-532b07183db4"
    - stage: seal
      stageUuid: "675e7f3c-b35d-8cbd-afdd-b43fd82b9b56"
    - stage: uuid
      stageUuid: "718ca90b-e6ba-8195-9798-88da584ab256"
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
