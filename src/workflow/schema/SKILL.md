---
name: schema
description: "Use when reaching the workflow SCHEMA — the shape a definition must take before the engine can read it — through its own namespace; the face re-exports the workflow barrel while the matter is still being lifted out of the hub."
atomPath: "workflow/schema"
coordinate: "workflow/schema · 5/round · c13f5e6c"
contentUuid: "6beede70-d2ee-514c-ac0f-43c4cfc6bd20"
diamondUuid: "67be9b69-87cf-8d94-90dc-cf7a255099fe"
uuid: "c13f5e6c-0986-878e-bff5-2487479c3c7b"
horo: 5
typography:
  partition: workflow
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "94e3bd87-5380-88ea-84c4-573e241a2b04"
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
      stageUuid: "a481a05b-13a2-872d-9037-d0fb53bee71d"
    - stage: seal
      stageUuid: "675e7f3c-b35d-8cbd-afdd-b43fd82b9b56"
    - stage: uuid
      stageUuid: "9314ddc4-578d-8325-9e01-37ff9d20c122"
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
