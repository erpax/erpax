---
name: graph
description: "Use when reaching the diamond as a GRAPH — atoms and the bonds between them — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/graph"
coordinate: "diamond/graph · 1/base · a85aea77"
contentUuid: "3da1bf5d-9e60-5ece-96ba-fda6dc734706"
diamondUuid: "431ef9fc-0b43-803f-8f09-7bd5b92f8a97"
uuid: "a85aea77-7b7a-86ee-85ae-d6aa559df6d7"
horo: 1
typography:
  partition: diamond
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "4d40af9d-2c68-8c02-bd51-b453dffba809"
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
      stageUuid: "f14dc13d-b949-89da-b616-9913787d22a7"
    - stage: seal
      stageUuid: "ecd99946-6efe-8ea6-a356-3f68868352e0"
    - stage: uuid
      stageUuid: "205a5046-553c-833f-8f5c-e7271be14980"
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
