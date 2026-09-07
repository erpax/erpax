---
name: schema
description: "Use when reaching the workflow SCHEMA — the shape a definition must take before the engine can read it — through its own namespace; the face re-exports the workflow barrel while the matter is still being lifted out of the hub."
atomPath: "workflow/schema"
coordinate: "workflow/schema · 8/crest · 9375cd6f"
contentUuid: "bba12736-752b-5957-8efe-e92411fd8782"
diamondUuid: "4fdec6f7-ee90-8d29-8305-6ce6b8477fa0"
uuid: "9375cd6f-d11f-8a0f-b1a2-187edec6085d"
horo: 8
typography:
  partition: workflow
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "af0390b1-1f16-8fa6-8e4d-12e8e20b2527"
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
      stageUuid: "e4c720cb-385e-8fc4-ad3d-d98bfd742dac"
    - stage: seal
      stageUuid: "675e7f3c-b35d-8cbd-afdd-b43fd82b9b56"
    - stage: uuid
      stageUuid: "c4df7406-f177-8a88-b76b-e78db49b2cc9"
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
