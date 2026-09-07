---
name: graph
description: "Use when reaching the diamond as a GRAPH — atoms and the bonds between them — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/graph"
coordinate: "diamond/graph · 4/weave · c493d6d1"
contentUuid: "1b5a2fd0-3f5b-524b-be7d-d052880f9e49"
diamondUuid: "2166b07c-9517-8afa-8f4b-571e7479b39e"
uuid: "c493d6d1-e3f9-8a71-8b08-0c9ca66c0e42"
horo: 4
typography:
  partition: diamond
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "ef9d069a-0706-8a88-9eed-98b6e5a0d8e4"
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
      stageUuid: "4882fbde-0fff-8470-a08a-a3f71701c3c3"
    - stage: seal
      stageUuid: "ecd99946-6efe-8ea6-a356-3f68868352e0"
    - stage: uuid
      stageUuid: "78f93254-9d1b-8ac3-b82a-df6c5e7add70"
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
