---
name: graph
description: "Use when reaching the diamond as a GRAPH — atoms and the bonds between them — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/graph"
coordinate: "diamond/graph · 7/descent · a45a0b7f"
contentUuid: "01df9200-b760-553d-931e-d74e0dc896a6"
diamondUuid: "db3dfab9-da41-836b-ac09-74fed96cfa37"
uuid: "a45a0b7f-d76f-8079-95b4-e10fab48e1a6"
horo: 7
typography:
  partition: diamond
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "395cad51-9fc4-8851-a68e-453869dc4f4b"
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
      stageUuid: "176c04fa-97a2-8691-b546-dbcd4cd79808"
    - stage: seal
      stageUuid: "ecd99946-6efe-8ea6-a356-3f68868352e0"
    - stage: uuid
      stageUuid: "021fb110-3829-8112-b8ab-234b8df3fbf5"
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
