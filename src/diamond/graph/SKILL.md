---
name: graph
description: "Use when reaching the diamond as a GRAPH — atoms and the bonds between them — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/graph"
coordinate: "diamond/graph · 7/descent · e1d1d2e9"
contentUuid: "ec697eb3-6fa4-5150-8ff4-38c54457ecfe"
diamondUuid: "ff500029-a2dc-881f-a352-b52d1d261636"
uuid: "e1d1d2e9-42fe-8df4-ac25-cccb7e0fc356"
horo: 7
typography:
  partition: diamond
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "37e7ff30-16bc-8445-82a0-4ca5406c2824"
  stages:
    - stage: path
      stageUuid: "3f20a1eb-be55-82cf-9420-bb5ee752da1f"
    - stage: trinity
      stageUuid: "b389dbe8-fff8-8e46-af78-e1bab2257e21"
    - stage: boundary
      stageUuid: "e32e7f71-cb58-8419-acac-f43c669f9dca"
    - stage: links
      stageUuid: "b99f07d9-7c8e-876f-b190-47850625c816"
    - stage: horo
      stageUuid: "1ce76a7d-6b1d-8e71-b342-430e61d73fb6"
    - stage: seal
      stageUuid: "ecd99946-6efe-8ea6-a356-3f68868352e0"
    - stage: uuid
      stageUuid: "1f44d2ce-81c4-80ee-af48-357d7e31908e"
version: 2
---
# diamond/graph — the graph face of [[diamond]]

`index.ts` re-exports the parent barrel, so `@/diamond/graph` offers exactly what `@/diamond`
offers today. **The matter has not moved yet**: this atom is the namespace a hub split named for
the diamond read as a graph of atoms and their bonds, and its own `test.ts` pins the FACE so a caller importing through this path keeps
working while the extraction is finished.

Stated rather than dressed up: until the graph matter is lifted out of the parent, this is a
namespaced view, not a separate implementation ([[rules]]/concentration — matter belongs in the
child, and here it still sits in the hub).

Composes: [[diamond]].
