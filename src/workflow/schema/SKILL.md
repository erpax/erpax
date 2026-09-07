---
name: schema
description: "Use when reaching the workflow SCHEMA — the shape a definition must take before the engine can read it — through its own namespace; the face re-exports the workflow barrel while the matter is still being lifted out of the hub."
atomPath: "workflow/schema"
coordinate: "workflow/schema · 5/round · 5a62a8ba"
contentUuid: "fbd71019-e866-587b-8c6a-d026e8106d79"
diamondUuid: "0dde1aed-1f8d-8297-bb90-06e0b11e3fbc"
uuid: "5a62a8ba-80ee-8565-a810-26aabd0bf4df"
horo: 5
typography:
  partition: workflow
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "fbab4dc4-b054-8546-9a3a-e0e392cf4871"
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
      stageUuid: "ef22ff76-fd8f-8ec1-86e1-0ea3650c0e65"
    - stage: seal
      stageUuid: "675e7f3c-b35d-8cbd-afdd-b43fd82b9b56"
    - stage: uuid
      stageUuid: "5ad4996d-4077-8e67-b744-71d989a5af84"
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
